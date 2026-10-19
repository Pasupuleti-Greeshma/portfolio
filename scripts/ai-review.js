import fs from 'node:fs'; // Node.js built-in file system module to read and write files (e.g., .env, reports)
import path from 'node:path'; // Node.js path module to handle cross-platform directory and file paths safely
import { execSync } from 'node:child_process'; // Executes terminal/shell commands synchronously (used to run git commands)

// ==========================================
// 1. ENVIRONMENT CONFIGURATION & KEY LOADING
// ==========================================

// If GEMINI_API_KEY is not already loaded into process.env, look for a local .env file
if (!process.env.GEMINI_API_KEY) {
  const envPath = path.resolve(process.cwd(), '.env'); // Get the absolute path to .env in project root
  if (fs.existsSync(envPath)) { // Check if .env file exists on disk
    const envContent = fs.readFileSync(envPath, 'utf-8'); // Read .env file content as text
    const match = envContent.match(/^GEMINI_API_KEY=(.*)$/m); // Extract the key using regex matching
    if (match) {
      process.env.GEMINI_API_KEY = match[1].trim(); // Save the extracted key into process.env, trimming extra whitespace
    }
  }
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Store the resolved API key in a constant

// Stop immediately with an exit code of 1 if no API key is provided
if (!GEMINI_API_KEY) {
  console.error("❌ Error: GEMINI_API_KEY is missing. Add it to .env or pass it as an environment variable.");
  process.exit(1); // Non-zero exit code terminates execution and marks CI job as failed
}

// ==========================================
// 2. EXTRACT GIT DIFF (CODE CHANGES)
// ==========================================

/**
 * Extracts code differences (git diff) while filtering out large generated files.
 * @returns {string} The text content of the git diff
 */
function getGitDiff() {
  try {
    // In GitHub Actions PR, compare against the target base branch (e.g., origin/main).
    // In local development or manual runs, fallback to comparing against the previous commit (HEAD~1).
    const baseSha = process.env.GITHUB_BASE_REF
      ? `origin/${process.env.GITHUB_BASE_REF}`
      : 'HEAD~1';

    let diff = '';
    // List of auto-generated or bulky files that the AI does NOT need to review
    const ignoreList = [':(exclude)package-lock.json', ':(exclude)dist', ':(exclude)build_test.log'];
    const ignoreArgs = ignoreList.map(item => `"${item}"`).join(' '); // Wrap exclusions in quotes for cross-platform shell safety

    // Try comparing the feature branch against the base branch
    try {
      diff = execSync(`git diff ${baseSha}...HEAD -- . ${ignoreArgs}`, {
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024, // Allow up to 10MB of diff output in memory
      });
    } catch {
      // Fallback: compare last commit with current HEAD if the base branch reference fails
      diff = execSync(`git diff HEAD~1 HEAD -- . ${ignoreArgs}`, {
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024,
      });
    }

    // If there are no committed differences, check for any uncommitted staged/unstaged changes in the working tree
    if (!diff.trim()) {
      diff = execSync(`git diff -- . ${ignoreArgs}`, {
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024,
      });
    }

    return diff; // Return the collected git diff string
  } catch (err) {
    console.warn("⚠️ Warning: Could not obtain full git diff:", err.message);
    return ''; // Return empty string if diff extraction encounters an unexpected error
  }
}

// ==========================================
// 3. AI EVALUATION VIA GOOGLE GEMINI API
// ==========================================

/**
 * Sends code diff to Google Gemini API (gemini-3.8-flash) and receives a structured JSON evaluation.
 * @param {string} diffText - The git diff to review
 * @returns {Promise<object>} The parsed JSON review object from Gemini
 */
async function requestAiReview(diffText) {
  const model = "gemini-3.8-flash"; // High-speed, high-token-capacity free model on Google AI Studio
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`; // Official REST API endpoint

  // Strict system prompt guiding the AI to act as a security gatekeeper and output strict JSON
  const prompt = `You are a Senior Staff Engineer & Security Gatekeeper reviewing code changes for a React + Vite + Tailwind CSS portfolio project.

Your objective is to evaluate whether these code changes are safe and of high enough quality to be MERGED into the 'main' branch.

Evaluate the git diff across:
1. **Code Quality & React Best Practices**: Hooks rules, crash risks, unhandled exceptions, memory leaks.
2. **Design, UI & Tailwind CSS**: Broken CSS/layout, responsiveness across devices.
3. **SEO, Accessibility (a11y) & HTML Semantics**: Valid semantic markup, essential accessibility tags.
4. **Security & Vulnerabilities**: Exposed API keys, secrets, tokens, XSS vulnerabilities, unsafe links.

Decision Rules:
- Mark "passed": true IF there are NO critical bugs, NO syntax errors, NO secret leaks, and NO security vulnerabilities.
- Mark "passed": false IF there are security vulnerabilities (e.g., exposed API keys), severe breaking bugs, or blatant syntax/rendering errors that will break the site.

You MUST respond strictly with valid JSON conforming to this schema (do not wrap in markdown or backticks):
{
  "passed": boolean,
  "score": number, // 1 to 10
  "summary": string,
  "pros": string[],
  "concerns": string[],
  "criticalBlockers": string[],
  "recommendations": string
}

Code Diff to Review:
${diffText}
`;

  // Payload structure expected by Google Generative Language API
  const payload = {
    contents: [
      {
        parts: [{ text: prompt }] // Send our prompt containing review guidelines and diff
      }
    ],
    generationConfig: {
      temperature: 0.1, // Low temperature for deterministic, consistent, strict code analysis
      responseMimeType: "application/json" // Force the model to return valid parseable JSON only
    }
  };

  // Perform HTTP POST request using Node's native fetch API
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': GEMINI_API_KEY // Pass the API key securely via Google header
    },
    body: JSON.stringify(payload)
  });

  // Handle network or HTTP errors from Google API
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error (HTTP ${response.status}): ${errorBody}`);
  }

  const result = await response.json(); // Parse API response JSON envelope
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text; // Extract generated text response

  if (!rawText) {
    throw new Error("Empty response received from Gemini API.");
  }

  try {
    return JSON.parse(rawText); // Parse the LLM's text output into a real JavaScript object
  } catch (parseErr) {
    console.error("Raw response could not be parsed as JSON:", rawText);
    throw new Error(`Failed to parse AI review output as JSON: ${parseErr.message}`);
  }
}

// ==========================================
// 4. FORMAT MARKDOWN REPORT
// ==========================================

/**
 * Converts structured JSON evaluation into clean, readable GitHub Markdown.
 * @param {object} evaluation - The parsed review evaluation
 * @returns {string} Formatted markdown report
 */
function generateMarkdownReport(evaluation) {
  // Determine badge and title based on pass/fail status
  const statusBadge = evaluation.passed
    ? "✅ **STATUS: PASSED (Approved for Merge)**"
    : "❌ **STATUS: FAILED (Merge Blocked - Fixes Required)**";

  let md = `## 🤖 AI Code Review Decision: ${evaluation.passed ? 'PASSED ✅' : 'FAILED ❌'}\n\n`;
  md += `${statusBadge}\n\n`;
  md += `**Quality Score:** ${evaluation.score}/10\n\n`;
  md += `### 🌟 Summary\n${evaluation.summary}\n\n`;

  // Append critical blockers if any exist (these caused the failure)
  if (evaluation.criticalBlockers && evaluation.criticalBlockers.length > 0) {
    md += `### 🚫 Critical Blockers (Must fix before merge):\n`;
    for (const blocker of evaluation.criticalBlockers) {
      md += `- ⛔ ${blocker}\n`;
    }
    md += `\n`;
  }

  // Append warnings or suggestions that are good to improve
  if (evaluation.concerns && evaluation.concerns.length > 0) {
    md += `### ⚠️ Areas for Improvement:\n`;
    for (const concern of evaluation.concerns) {
      md += `- 🔸 ${concern}\n`;
    }
    md += `\n`;
  }

  // Append things the developer did well
  if (evaluation.pros && evaluation.pros.length > 0) {
    md += `### ✨ Positive Highlights:\n`;
    for (const pro of evaluation.pros) {
      md += `- ✔️ ${pro}\n`;
    }
    md += `\n`;
  }

  // Append action items and architectural guidance
  if (evaluation.recommendations) {
    md += `### 💡 Recommendations & Next Steps:\n${evaluation.recommendations}\n`;
  }

  return md;
}

// ==========================================
// 5. MAIN EXECUTION PIPELINE
// ==========================================

async function main() {
  console.log("🚀 Starting Automated AI Portfolio Code Review Gatekeeper...");
  const diff = getGitDiff(); // Step 1: Collect code diff

  // If there are no modifications to review, pass gracefully
  if (!diff || !diff.trim()) {
    console.log("ℹ️ No code changes detected. Review automatically passed.");
    return;
  }

  // Truncate diff if larger than 50,000 characters to stay well within token limits and avoid timeouts
  const truncatedDiff = diff.length > 50000 ? diff.slice(0, 50000) + "\n\n...[diff truncated for length]..." : diff;
  console.log(`📝 Diff extracted (${truncatedDiff.length} characters). Querying Gemini AI gatekeeper...`);

  // Step 2: Request evaluation from Gemini AI
  const evaluation = await requestAiReview(truncatedDiff);
  // Step 3: Format the JSON evaluation into Markdown
  const markdownReport = generateMarkdownReport(evaluation);

  // Print review in local console / CI console logs
  console.log("\n==================== AI CODE REVIEW ====================\n");
  console.log(markdownReport);
  console.log("========================================================\n");

  // Save report to file so GitHub Actions can read and post it as a PR comment
  fs.writeFileSync(path.resolve(process.cwd(), 'ai-review-report.md'), markdownReport, 'utf-8');

  // If running inside GitHub Actions, also append to the GitHub Workflow Run Summary page
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdownReport);
  }

  // Step 4: Enforce Merge Gatekeeper Decision
  if (!evaluation.passed) {
    console.error("❌ MERGE GATE FAILED: AI detected critical issues or vulnerabilities.");
    console.error("Please address the blockers listed above before merging into main.");
    process.exit(1); // Exit code 1 fails the GitHub Actions check, blocking PR merge
  }

  console.log("🎉 MERGE GATE PASSED: Code meets all quality & security standards!");
}

// Global error handler for uncaught exceptions
main().catch(err => {
  console.error("❌ Review script encountered an error:", err);
  process.exit(1); // Exit with failure if any unhandled error occurs
});
