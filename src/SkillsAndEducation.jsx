import React from 'react';
import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  Cpu,
  GraduationCap,
  Award,
  Sparkles
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

const categoryAccents = {
  "Frontend Development": {
    glow: "from-cyan-500/20 to-blue-500/10",
    borderHover: "hover:border-cyan-500/50",
    iconBg: "bg-cyan-950/80 border-cyan-500/30 text-cyan-400",
    badgeHover: "hover:border-cyan-400/60 hover:text-cyan-300"
  },
  "Backend Engineering": {
    glow: "from-blue-600/20 to-indigo-600/10",
    borderHover: "hover:border-blue-500/50",
    iconBg: "bg-blue-950/80 border-blue-500/30 text-blue-400",
    badgeHover: "hover:border-blue-400/60 hover:text-blue-300"
  },
  "Databases & Cloud": {
    glow: "from-emerald-500/20 to-teal-500/10",
    borderHover: "hover:border-emerald-500/50",
    iconBg: "bg-emerald-950/80 border-emerald-500/30 text-emerald-400",
    badgeHover: "hover:border-emerald-400/60 hover:text-emerald-300"
  },
  "AI & Next-Gen Workflows": {
    glow: "from-purple-500/20 to-indigo-500/10",
    borderHover: "hover:border-purple-500/50",
    iconBg: "bg-purple-950/80 border-purple-500/30 text-purple-400",
    badgeHover: "hover:border-purple-400/60 hover:text-purple-300"
  }
};

export default function SkillsAndEducation() {
  return (
    <section id="skills" className="py-16 relative bg-transparent overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono text-cyan-400 mb-3 uppercase tracking-wider border border-cyan-500/20">
            <Cpu className="w-3.5 h-3.5" /> Technical Matrix
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Technical Arsenal
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            Comprehensive skill set across modern frontend engineering, scalable backend design, databases, cloud, and cutting-edge AI architectures.
          </p>
        </div>

        {/* 2x2 Balanced Modern Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {skillCategories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Code2;
            const accent = categoryAccents[cat.title] || {
              glow: "from-blue-500/20 to-indigo-500/10",
              borderHover: "hover:border-cyan-500/50",
              iconBg: "bg-slate-900 border-slate-700 text-cyan-400",
              badgeHover: "hover:border-cyan-400/60 hover:text-cyan-300"
            };

            return (
              <div
                key={idx}
                className={`rounded-2xl p-7 md:p-8 bg-slate-900/90 border border-slate-800/90 ${accent.borderHover} transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden shadow-xl shadow-indigo-950/20 flex flex-col justify-between`}
              >
                {/* Subtle Card Ambient Glow */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${accent.glow} rounded-full blur-3xl opacity-30 group-hover:opacity-70 transition-opacity pointer-events-none`}></div>

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-3.5">
                      <div className={`p-3 rounded-xl border ${accent.iconBg} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {cat.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 font-medium">
                      {cat.skills.length} Technologies
                    </span>
                  </div>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`px-3 py-1.5 text-xs font-mono font-medium rounded-xl bg-slate-950/90 border border-slate-800 text-slate-200 ${accent.badgeHover} hover:bg-slate-900 transition-all duration-200 cursor-default shadow-sm select-none`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom subtle indicator */}
                <div className="mt-6 pt-3 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80"></span>
                    Verified & Industry Applied
                  </span>
                  <span className="text-slate-600">v2.5+</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Education Section */}
        <div id="education" className="pt-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono text-cyan-400 mb-3 uppercase tracking-wider border border-cyan-500/20">
              <GraduationCap className="w-3.5 h-3.5" /> Academic Background
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Education & Academic Excellence
            </h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl p-8 md:p-10 bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/40 shadow-xl shadow-indigo-950/20 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-medium">
                    <Award className="w-3.5 h-3.5 text-cyan-400" /> High Distinction Scholar
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {personalInfo.education.institution}
                  </h4>
                  <p className="text-base text-slate-200 font-medium">
                    {personalInfo.education.degree}
                  </p>
                  <p className="text-sm text-slate-400 font-normal">
                    {personalInfo.education.highlight}
                  </p>
                </div>

                <div className="text-left md:text-right shrink-0 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    {personalInfo.education.score}
                  </div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-1">
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
