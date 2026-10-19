import React from 'react';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { experiences } from './portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative bg-[#030712] overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-blue-400 mb-3 uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" /> Track Record
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Professional Experience
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base">
            Over 2.5 years of architecting robust backend systems, real-time web products, and modern cloud infrastructures.
          </p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <div 
              key={idx}
              className="glass-panel rounded-3xl p-8 md:p-10 border border-white/10 hover:border-blue-500/30 transition-all duration-300 relative group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-3">
                    <span 
                      className="w-3 h-3 rounded-full animate-pulse" 
                      style={{backgroundColor: exp.badgeColor}}
                    ></span>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {exp.company}
                    </h3>
                  </div>
                  <div className="text-lw font-medium text-blue-400 mt-1">
                    {exp.role}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 font-light">
                {exp.summary}
              </p>

              <div className="space-y-3 mb-8">
                {exp.highlights.map((item, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-3 group/item">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 group-hover/item:scale-150 transition-transform"></span>
                    <p className="text-sm text-zinc-400 leading-relaxed group-hover/item:text-zinc-200 transition-colors">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {exp.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 text-xs font-mono rounded-lg bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:border-blue-500/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}