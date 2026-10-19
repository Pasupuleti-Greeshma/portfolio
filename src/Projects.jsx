import React from 'react';
import { ExternalLink, Code2, Layers, CheckCircle } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "./Icons";
import { projects } from './portfolioData';

export default function Projects() {
  return (
    <section id="projects" className="py-4 relative bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-pink-600 mb-3 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" /> Selected Works
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base">
            Enterprise platforms, high-concurrency systems, and full-stack solutions built with clean code and robust architectural patterns.
          </p>
        </div>

        <div className="space-y-10">
          {projects.map((proj, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={proj.id}
                className={`flex flex-col ${
                  isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } gap-12 lg:gap-16 items-center`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="relative group">
                    <div 
                      className="absolute -inset-3 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                      style={{backgroundColor: proj.accentColor}}
                    ></div>
                    
                    <div className="code-window relative">
                      <div className="h-10 bg-white/5 border-b border-pink-100 px-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                          <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                          <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-600">
                          {proj.title.toLowerCase().replace(/\s+/g, '-')}.ts
                        </span>
                        <Code2 className="w-4 h-4 text-zinc-500" />
                      </div>

                      <pre className="p-6 m-0 rounded-b-none font-mono text-xs sm:text-sm text-slate-700 overflow-x-auto leading-relaxed bg-[#0a0f1d]/90">
                        <code>{proj.codeSnippet}</code>
                      </pre>

                      <div className="px-6 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{backgroundColor: proj.accentColor}}></span>
                          Production Ready
                        </span>
                        <span>UTF-8 & portal</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex items-center gap-3">
                    <span 
                      className="text-xs font-mono font-bold px-3 py-1 rounded-full border"
                      style={{ 
                        color: proj.accentColor, 
                        borderColor: `${proj.accentColor}40`,
                        backgroundColor: `${proj.accentColor}15`
                      }}
                    >
                      PROJECT {proj.id}
                    </span>
                    <span className="h-px flex-1 bg-white/10"></span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-sm font-mono text-pink-600">
                      {proj.subtitle}
                    </p>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                    {proj.description}
                  </p>

                  <div className="space-y-2.5">
                    {proj.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 text-xs font-mono rounded-lg glass-pill text-slate-700 border border-pink-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-lg shadow-white/10"
                    >
                      <Github className="w-4 h-4" /> View Source
                    </a>
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-pink-100 hover:border-white/30 text-slate-900 font-semibold text-xs uppercase tracking-wider transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-pink-600" /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}