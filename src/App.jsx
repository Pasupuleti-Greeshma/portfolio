import React, { wCitState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Experience from './Experience';
import Projects from './Projects';
import SkillsAndEducation from './SkillsAndEducation';
import Contact from './Contact';

export default function App() {
  const [section, setSection] = React.useState('hero');

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'projects', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans relative overflow-hidden">
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="fixed top-1/3 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed -bottom-40 left-1/3 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <Navbar activeSection={section} />
      <main className="relative z-10">
        <Hero />
        <Experience />
        <Projects />
        <SkillsAndEducation />
        <Contact />
      </main>
    </div>
  );
}