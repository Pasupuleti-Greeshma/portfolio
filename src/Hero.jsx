import React from 'react';
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "./Icons";
import { personalInfo, stats, marqueeTech } from './portfolioData';

export default function Hero() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center items-center pt-20 pb-4 overflow-hidden bg-grid-pattern">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-pink-500 to-purple-600/15 rounded-full blur-[140px] animate-pulse-slow"></div>
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[130px]"></div>
        <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill border border-blue-500/30 text-xs font-mono text-blue-300 mb-8 animate-float">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4"></span>
          <span>Open for Opportunities & Collaborations</span>
          <span className="text-gray-500">|</span>
          <span className="flex items-center gap-1 text-gray-300">
            <MapPin className="w-3 h-3 text-blue-400" /> Hyderabad, India
          </span>
        </div>

        <div className="relative mb-8 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-2 leading-none">
            {personalInfo.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">{personalInfo.surname}</span>
          </h1>
          <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mt-4"></div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mb-8">
          <span className="font-mono text-sm md:text-base text-blue-400 font-semibold tracking-wider uppercase bg-blue-500/10 border border-white/10 px-3 py-1 rounded-md">
            {personalInfo.role}
          </span>
          <span className="text-zinc-600">&middot;</span>
          <span className="font-mono text-sm md:text-base text-zinc-300 tracking-wider">
            Spring Boot & React Specialist
          </span>
          <span className="text-zinc-600">&middot;</span>
          <span className="font-mono text-sm md:text-base text-zinc-300 tracking-wider">
            2.5+ Years Exp
          </span>
        </div>

        <p className="max-w-2xl text-base sm:text-lg text-zinc-400 font-light leading-relaxed mb-5">
          {personalInfo.tagline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <a
            href="#projects"
            className="group px-7 py-3.5 rounded-full bg-blue-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-pink-500/25 hover:shadow-blue-500/50 hover:scale-105 flex items-center gap-2"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full glass-panel hover:glass-panel/10 text-zinc-300 font-medium text-sm transition-all duration-300 flex items-center gap-2 border border-white/10"
          >
            <Github className="w-4 h-4 text-white" />
            <span>GitHub Profile</span>
          </a>

          <a
            href={'mailto:' + personalInfo.email}
            className="px-6 py-3.5 rounded-full glass-panel hover:glass-panel/10 text-zinc-200 font-medium text-sm transition-all duration-300 flex items-center gap-2 border border-white/15"
          >
            <Mail className="w-4 h-4 text-blue-400" />
            <span>Email Me</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-8 border-t border-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="p-4 rounded-2xl glass-panel text-center group hover:border-blue-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white group-hover:text-blue-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider font-mono mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full mt-8 pt-8 pb-4 border-y border-white/10 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-3 text-center">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-200/60">
            Tech Arsenal & Frameworks
          </span>
        </div>
        <div className="flex overflow-hidden relative">
          <div className="flex gap-12 animate-marquee items-center pl-4">
            {[...marqueeTech, ...marqueeTech, ...marqueeTech].map((tech, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-3 transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-110 cursor-pointer shrink-0"
              >
                <img src={tech.icon} alt={tech.name} className="w-5 h-5 object-contain" />
                <span className="text-xs font-mono text-zinc-400 tracking-wider uppercase hover:text-white">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}