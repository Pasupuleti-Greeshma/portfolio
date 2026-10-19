import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "./Icons";
import { personalInfo } from './portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const navBg = scrolled 
    ? 'py-4 bg-white/5/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-purple-900/5' 
    : 'py-6 bg-transparent';

  return (
    <nav className={'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ' + navBg}>
      <div className='max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between'>
        <a href='#' className='flex items-center gap-2 group text-xl font-bold tracking-tight text-white font-extrabold'>
          <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-mono font-bold text-lg text-white font-extrabold shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300'>
            GP
          </div>
          <span className='font-mono text-base tracking-normal'>
            Greeshma<span className='text-pink-500'>.</span>dev
          </span>
        </a>

        <div className='hidden md:flex items-center gap-8'>
          <ul className='flex items-center gap-7'>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a 
                  href={link.href}
                  className='text-sm font-medium text-gray-400 hover:text-white font-extrabold transition-colors relative group py-1'
                >
                  {link.label}
                  <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-full'></span>
                </a>
              </li>
            ))}
          </ul>

          <div className='h-4 w-px bg-white/5/10 mx-2'></div>

          <div className='flex items-center gap-3'>
            <a
              href={personalInfo.github}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='GitHub'
              className='p-2 rounded-lg text-gray-400 hover:text-white font-extrabold hover:bg-white/5/5 transition-all'
            >
              <Github className='w-4 h-4' />
            </a>
            <a
              href={personalInfo.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn'
              className='p-2 rounded-lg text-gray-400 hover:text-white font-extrabold hover:bg-white/5/5 transition-all'
            >
              <Linkedin className='w-4 h-4' />
            </a>
            <a
              href='#contact'
              className='inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider text-white font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 hover:bg-blue-500 rounded-full transition-all duration-300 shadow-md shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02]'
            >
              Hire Me
              <ArrowUpRight className='w-3.5 h-3.5' />
            </a>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className='md:hidden p-2 rounded-lg text-gray-400 hover:text-white font-extrabold bg-white/5/5 border border-white/10'
          aria-label='Toggle Navigation'
        >
          {mobileOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
        </button>
      </div>

      {mobileOpen && (
        <div className='md:hidden bg-[#0a0f1d] border-b border-white/10 px-6 py-6 shadow-2xl'>
          <ul className='flex flex-col gap-4'>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className='text-base text-gray-300 hover:text-white font-extrabold transition-colors block py-1'
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className='pt-4 border-t border-white/10 flex gap-4'>
              <a
                href={personalInfo.github}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-sm text-gray-400 hover:text-white font-extrabold'
              >
                <Github className='w-4 h-4' /> GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-sm text-gray-400 hover:text-white font-extrabold'
              >
                <Linkedin className='w-4 h-4' /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
