import React from 'react';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Cloud, 
  Cpu, 
  GraduationCap, 
  Award 
} from 'lucide-react';
import { skillCategories, personalInfo } from './portfolioData';

const iconMap = {
  code: Code2,
  layout: Layout,
  server: Server,
  database: Database,
  cloud: Cloud,
  cpu: Cpu
};

export default function SkillsAndEducation() {
  return (
    <section id="skills" className="py-20 relative bg-[#030712] overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-blue-400 mb-3 uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" /> Technical Matrix
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Technical Arsenal
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base">
            Comprehensive skill set across modern frontend engineering, scalable backend design, databases, cloud, and cutting-edge I architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-28">
          {skillCategories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Code2;
            return (
              <div
                key={idx}
                className="glass-panel rounded-3xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/15 transition-all"></div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-blue-500/40 text-blue-400 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lw font-bold text-white tracking-tight">
                    {cat.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 text-xs font-mono rounded-xl bg-white/5 border border-white/5 text-zinc-300 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div id="education" className="pt-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-blue-400 mb-3 uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" /> Academic Background
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Education & Academic Excellence
            </h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-panel rounded-3xl p-8 md:p-10 border border-white/10 hover:border-blue-500/30 transition-all relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono">
                    <Award className="w-3.5 h-3.5" /> High Distinction Scholar
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {personalInfo.education.institution}
                  </h4>
                  <p className="text-base text-zinc-300 font-medium">
                    {personalInfo.education.degree}
                  </p>
                  <p className="text-sm text-zinc-400 font-light">
                    {personalInfo.education.highlight}
                  </p>
                </div>

                <div className="text-left md:text-right shrink-0">
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    {personalInfo.education.score}
                  </div>
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1">
                    Cumulative Grade Point
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}