import React from 'react';
import { Calendar, MapPin, Briefcase, Building2, CheckCircle2, Sparkles } from 'lucide-react';
import { experiences } from './portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-16 relative bg-transparent overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono text-cyan-400 mb-3 uppercase tracking-wider border border-cyan-500/20">
            <Briefcase className="w-3.5 h-3.5" /> Career Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Professional Experience
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            Over 2.5 years of architecting robust enterprise backend systems, reactive web products, and modern AI-augmented cloud architectures.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
          {experiences.map((exp, idx) => {
            const isCurrent = idx === 0;

            return (
              <div key={idx} className="relative group">
                {/* Timeline Node Icon */}
                <div className={`absolute -left-[35px] md:-left-[51px] top-1.5 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCurrent 
                    ? 'bg-slate-950 border-cyan-400 text-cyan-400 shadow-lg shadow-cyan-500/30 ring-4 ring-cyan-950/60' 
                    : 'bg-slate-900 border-slate-700 text-slate-400 group-hover:border-cyan-500/50 group-hover:text-cyan-300'
                }`}>
                  <Building2 className="w-3.5 h-3.5" />
                </div>

                {/* Experience Card */}
                <div className="rounded-2xl p-6 md:p-8 bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/40 shadow-xl shadow-indigo-950/20 transition-all duration-300 relative group/card">
                  {/* Card Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5 pb-5 border-b border-slate-800/80">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {exp.role}
                        </h3>
                        {exp.badge && (
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold tracking-wide border ${
                            isCurrent
                              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}>
                            {exp.badge}
                          </span>
                        )}
                      </div>

                      <div className="text-base font-semibold text-cyan-400 flex items-center gap-2">
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    {/* Metadata Pills (Period & Location) */}
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-normal">
                    {exp.summary}
                  </p>

                  {/* Key Highlights / Achievements */}
                  <div className="space-y-3 mb-6 bg-slate-950/50 rounded-xl p-4 md:p-5 border border-slate-800/60">
                    <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      Key Contributions & Impact
                    </div>
                    {exp.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-300 leading-relaxed font-normal">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
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
