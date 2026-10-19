import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

// Load .env if present in root
if (!process.env.GEMINI_API_KEY) {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/^GEMINI_API_KEY=(.*)$/m);
    if (match) {
      process.env.GEMINI_API_KEY = match[1].trim();
    }
  }
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ Error: GEMINI_API_KEY is missing. Add it to .env or pass it as an environment variable.");
  process.exit(1);
}

// 1. Get git diff
function getGitDiff() {
  try {
    const baseSha = process.env.GITHUB_BASE_REF
      ? `origin/${process.env.GITHUB_BASE_REF}`
      : 'HEAD~1';

    let diff = '';
    const ignoreList = [':(exclude)package-lock.json', ':(exclude)dist', ':(exclude)build_test.log'];
    const ignoreArgs = ignoreList.map(item => `"${item}"`).join(' ');

    try {
      diff = execSync(`git diff ${baseSha}...HEAD -- . ${ignoreArgs}`, {
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024,
      });
    } catch {
      diff = execSync(`git diff HEAD~1 HEAD -- . ${ignoreArgs}`, {
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024,
      });
    }

    if (!diff.trim()) {
      diff = execSync(`git diff -- . ${ignoreArgs}`, {
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024,
      });
    }

    return diff;
  } catch (err) {
    console.warn("⚠️ Warning: Could not obtain full git diff:", err.message);
    return '';
  }
}

// 2. Call Google Gemini API (Free tier: gemini-3.8-flash) with structured JSON evaluation
async function requestAiReview(diffText) {
  const model = "gemini-3.8-flash";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

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

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.1,
      responseMimeType: "application/json"
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': GEMINI_API_KEY
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error (HTTP ${response.status}): ${errorBody}`);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("Empty response received from Gemini API.");
  }

  try {
    return JSON.parse(rawText);
  } catch (parseErr) {
    console.error("Raw response could not be parsed as JSON:", rawText);
    throw new Error(`Failed to parse AI review output as JSON: ${parseErr.message}`);
  }
}

function generateMarkdownReport(evaluation) {
  const statusBadge = evaluation.passed
    ? "✅ **STATUS: PASSED (Approved for Merge)**"
    : "❌ **STATUS: FAILED (Merge Blocked - Fixes Required)**";

  let md = `## 🤖 AI Code Review Decision: ${evaluation.passed ? 'PASSED ✅' : 'FAILED ❌'}\n\n`;
  md += `${statusBadge}\n\n`;
  md += `**Quality Score:** ${evaluation.score}/10\n\n`;
  md += `### 🌟 Summary\n${evaluation.summary}\n\n`;

  if (evaluation.criticalBlockers && evaluation.criticalBlockers.length > 0) {
    md += `### 🚫 Critical Blockers (Must fix before merge):\n`;
    for (const blocker of evaluation.criticalBlockers) {
      md += `- ⛔ ${blocker}\n`;
    }
    md += `\n`;
  }

  if (evaluation.concerns && evaluation.concerns.length > 0) {
    md += `### ⚠️ Areas for Improvement:\n`;
    for (const concern of evaluation.concerns) {
      md += `- 🔸 ${concern}\n`;
    }
    md += `\n`;
  }

  if (evaluation.pros && evaluation.pros.length > 0) {
    md += `### ✨ Positive Highlights:\n`;
    for (const pro of evaluation.pros) {
      md += `- ✔️ ${pro}\n`;
    }
    md += `\n`;
  }

  if (evaluation.recommendations) {
    md += `### 💡 Recommendations & Next Steps:\n${evaluation.recommendations}\n`;
  }

  return md;
}

async function main() {
  console.log("🚀 Starting Automated AI Portfolio Code Review Gatekeeper...");
  const diff = getGitDiff();

  if (!diff || !diff.trim()) {
    console.log("ℹ️ No code changes detected. Review automatically passed.");
    return;
  }

  const truncatedDiff = diff.length > 50000 ? diff.slice(0, 50000) + "\n\n...[diff truncated for length]..." : diff;
  console.log(`📝 Diff extracted (${truncatedDiff.length} characters). Querying Gemini AI gatekeeper...`);

  const evaluation = await requestAiReview(truncatedDiff);
  const markdownReport = generateMarkdownReport(evaluation);

  console.log("\n==================== AI CODE REVIEW ====================\n");
  console.log(markdownReport);
  console.log("========================================================\n");

  // Save report for PR comment
  fs.writeFileSync(path.resolve(process.cwd(), 'ai-review-report.md'), markdownReport, 'utf-8');

  // Also write to GitHub step summary if running in CI
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdownReport);
  }

  if (!evaluation.passed) {
    console.error("❌ MERGE GATE FAILED: AI detected critical issues or vulnerabilities.");
    console.error("Please address the blockers listed above before merging into main.");
    process.exit(1); // Non-zero exit code fails GitHub Actions check
  }

  console.log("🎉 MERGE GATE PASSED: Code meets all quality & security standards!");
}

main().catch(err => {
  console.error("❌ Review script encountered an error:", err);
  process.exit(1);
});
