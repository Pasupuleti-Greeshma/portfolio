import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Experience from './Experience';
import Projects from './Projects';
import SkillsAndEducation from './SkillsAndEducation';
import Contact from './Contact';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'skills', 'contact'];
      const scrollPos = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf5ff] text-slate-800 font-sans selection:bg-pink-500/20 selection:text-pink-700 relative overflow-hidden">
      <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-pink-300/30 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="fixed top-1/3 -right-40 w-[600px] h-[600px] bg-purple-300/25 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed -bottom-40 left-1/4 w-[600px] h-[600px] bg-fuchsia-300/25 rounded-full blur-[140px] pointer-events-none -z-10" />


      <Navbar activeSection={activeSection} />
      <main className="relative z-10 flex flex-col gap-28 sm:gap-36 pb-28">
        <Hero />
        <Experience />
        <Projects />
        <SkillsAndEducation />
        <Contact />
      </main>
    </div>
  );
}