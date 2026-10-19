import React, { useState } from 'react';
import { ExternalLink, Layers, CheckCircle, Eye, Code2 } from "lucide-react";
import { GithubIcon as Github } from "./Icons";
import { projects } from './portfolioData';

export default function Projects() {
  const [viewModes, setViewModes] = useState({});

  const toggleViewMode = (id) => {
    setViewModes(prev => ({
      ...prev,
      [id]: prev[id] === 'code' ? 'preview' : 'code'
    }));
  };

  return (
    <section id="projects" className="py-12 relative bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono text-cyan-400 mb-3 uppercase tracking-wider border border-cyan-500/20">
            <Layers className="w-3.5 h-3.5" /> Selected Works
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            Enterprise platforms, high-concurrency systems, and full-stack solutions built with clean code and robust architectural patterns.
          </p>
        </div>

        <div className="space-y-16">
          {projects.map((proj, idx) => {
            const isEven = idx % 2 === 1;
            const currentMode = viewModes[proj.id] || 'preview';

            return (
              <div
                key={proj.id}
                className={`flex flex-col ${
                  isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } gap-10 lg:gap-14 items-center`}
              >
                {/* Media & Interactive Window */}
                <div className="w-full lg:w-1/2">
                  <div className="relative group">
                    <div 
                      className="absolute -inset-2.5 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                      style={{ backgroundColor: proj.accentColor }}
                    ></div>
                    
                    <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-2xl shadow-indigo-950/40">
                      {/* Window Header */}
                      <div className="h-10 bg-slate-950/90 border-b border-slate-800/80 px-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                          <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                          <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-slate-400">
                            {currentMode === 'preview' ? `${proj.category} UI Preview` : `${proj.title.toLowerCase().replace(/\s+/g, '-')}.ts`}
                          </span>
                        </div>

                        {/* View Switcher Button (Preview / Code) */}
                        <button
                          type="button"
                          onClick={() => toggleViewMode(proj.id)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-colors border border-slate-700/60 cursor-pointer"
                          title="Toggle between Interactive UI Preview & Code Architecture"
                        >
                          {currentMode === 'preview' ? (
                            <>
                              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                              <span>View Code</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5 text-cyan-400" />
                              <span>View Preview</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Window Content: High-res UI Mockup Image OR Code */}
                      {currentMode === 'preview' ? (
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 flex items-center justify-center group/img">
                          <img 
                            src={proj.image || '/project-pgmove.jpg'} 
                            alt={`${proj.title} Platform UI`} 
                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                        </div>
                      ) : (
                        <pre className="p-6 m-0 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed bg-[#0a0f1d]/95 min-h-[260px] max-h-[380px]">
                          <code>{proj.codeSnippet}</code>
                        </pre>
                      )}

                      {/* Window Footer Info */}
                      <div className="px-5 py-2.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: proj.accentColor }}></span>
                          Production Ready & Tested
                        </span>
                        <span className="text-slate-500 font-mono">React • Spring Boot • Cloud</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="w-full lg:w-1/2 space-y-5">
                  <div className="flex items-center gap-3">
                    <span 
                      className="text-xs font-mono font-bold px-3 py-1 rounded-full border shadow-sm"
                      style={{ 
                        color: proj.accentColor, 
                        borderColor: `${proj.accentColor}50`,
                        backgroundColor: `${proj.accentColor}15`
                      }}
                    >
                      PROJECT {proj.id}
                    </span>
                    <span className="h-px flex-1 bg-slate-800"></span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1.5">
                      {proj.title}
                    </h3>
                    <p className="text-sm font-mono text-cyan-400 font-medium">
                      {proj.subtitle}
                    </p>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                    {proj.description}
                  </p>

                  <div className="space-y-2">
                    {proj.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {proj.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 text-xs font-mono rounded-lg bg-slate-900/90 border border-slate-700/80 text-slate-200 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-3">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider transition-all border border-slate-700/80 hover:border-cyan-500/50 shadow-md shadow-indigo-950/30"
                    >
                      <Github className="w-4 h-4" /> View Source
                    </a>
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20"
                    >
                      <ExternalLink className="w-4 h-4 text-white" /> Live Demo
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
