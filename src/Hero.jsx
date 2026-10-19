import React, { useRef } from 'react';
import { ArrowRight, Mail, MapPin, Code2, ChevronLeft, ChevronRight } from "lucide-react";
import { GithubIcon as Github } from "./Icons";
import { personalInfo, stats, marqueeTech } from './portfolioData';

export default function Hero() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="relative min-h-[92vh] flex flex-col justify-between items-center pt-28 pb-8 overflow-hidden bg-grid-pattern">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/15 to-indigo-600/15 rounded-full blur-[140px] animate-pulse-slow"></div>
        <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 left-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center flex-1 justify-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 shadow-lg shadow-indigo-950/20 text-xs font-medium text-slate-200 mb-6 backdrop-blur-md hover:border-cyan-500/50 transition-all duration-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-100 font-semibold tracking-wide">Open for Opportunities & Collaborations</span>
          <span className="text-slate-600 select-none">|</span>
          <span className="inline-flex items-center gap-1.5 text-slate-300 font-normal">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Hyderabad, India
          </span>
        </div>

        {/* Hero Name / Headline */}
        <div className="relative mb-5 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-tight">
            {personalInfo.name}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              {personalInfo.surname}
            </span>
          </h1>
        </div>

        {/* Role & Core Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mb-5">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm text-cyan-300 font-semibold tracking-wide uppercase bg-cyan-950/60 border border-cyan-500/30 px-3.5 py-1 rounded-full">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            {personalInfo.role}
          </span>
          <span className="font-mono text-xs sm:text-sm text-slate-300 bg-slate-800/80 border border-slate-700/60 px-3.5 py-1 rounded-full">
            Spring Boot & React Specialist
          </span>
          <span className="font-mono text-xs sm:text-sm text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 px-3.5 py-1 rounded-full">
            2.5+ Years Exp
          </span>
        </div>

        {/* Tagline */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8">
          {personalInfo.tagline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <a
            href="#projects"
            className="group px-7 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-cyan-500/40 hover:scale-105 flex items-center gap-2"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium text-sm transition-all duration-300 flex items-center gap-2 border border-slate-700/80 hover:border-cyan-500/40 shadow-sm"
          >
            <Github className="w-4 h-4 text-white" />
            <span>GitHub Profile</span>
          </a>

          <a
            href={'mailto:' + personalInfo.email}
            className="px-6 py-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium text-sm transition-all duration-300 flex items-center gap-2 border border-slate-700/80 hover:border-cyan-500/40 shadow-sm"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Email Me</span>
          </a>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 w-full max-w-3xl">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 text-center hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all duration-300 shadow-md shadow-indigo-950/20 group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white group-hover:text-cyan-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Arsenal & Frameworks with Scroll Buttons */}
      <div className="w-full mt-10 pt-4 pb-3 border-y border-slate-800/80 bg-slate-950/80 backdrop-blur-md relative group/arsenal">
        <div className="max-w-7xl mx-auto px-6 mb-2.5 flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            Tech Arsenal & Frameworks
          </span>

          {/* Left and Right Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/60 text-slate-300 hover:text-cyan-300 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/60 text-slate-300 hover:text-cyan-300 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Container with Smooth Touch & Mouse Drag */}
        <div className="relative px-4">
          <div 
            ref={scrollRef}
            className="flex gap-3.5 overflow-x-auto scroll-smooth py-1 px-2 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[...marqueeTech, ...marqueeTech].map((tech, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/70 hover:border-cyan-400/60 shadow-sm transition-all duration-200 cursor-pointer shrink-0 select-none group/item"
              >
                <img src={tech.icon} alt={tech.name} className="w-5 h-5 object-contain" />
                <span className="text-xs font-mono text-slate-200 font-semibold tracking-wider uppercase group-hover/item:text-cyan-300">
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
