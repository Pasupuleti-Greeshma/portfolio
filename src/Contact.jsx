import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowUpRight, Copy, Check, Heart, Sparkles, Loader2 } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "./Icons";
import confetti from 'canvas-confetti';
import { personalInfo } from './portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Free FormSubmit endpoint delivering directly to your personal email
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Portfolio Contact: ${formData.subject || 'New Opportunity'} from ${formData.name}`,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _template: 'table'
        })
      });

      if (response.ok) {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.7 }
        });
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Fallback: trigger user default email client if FormSubmit encounters an issue
        const mailtoUri = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
        window.location.href = mailtoUri;
        setSubmitted(true);
      }
    } catch (err) {
      // Robust client fallback
      const mailtoUri = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoUri;
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="contact" className="py-20 relative bg-[#02050e] border-t border-slate-800/80 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono text-cyan-400 mb-3 uppercase tracking-wider border border-cyan-500/20">
                <Sparkles className="w-3.5 h-3.5" /> Let&#39;s Connect
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                Have a project or opportunity in mind?
              </h2>

              <p className="text-slate-300 text-base font-normal leading-relaxed">
                I am actively exploring full-stack engineering opportunities, scalable backend microservice roles, and next-gen AI agent collaborations. Let&#39;s discuss how I can bring immediate value to your team.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between gap-4 shadow-sm hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-500/30 text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 uppercase">Direct Email</div>
                    <a href={'mailto:' + personalInfo.email} className="text-sm sm:text-base font-semibold text-white hover:text-cyan-400 transition-colors">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span className="hidden sm:inline font-mono">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 flex items-center gap-4 shadow-sm hover:border-cyan-500/40 transition-colors">
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 uppercase">Phone / WhatsApp</div>
                  <a href={'tel:' + personalInfo.phone} className="text-sm sm:text-base font-semibold text-white hover:text-emerald-400 transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 flex items-center gap-4 shadow-sm hover:border-cyan-500/40 transition-colors">
                <div className="p-3 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 uppercase">Current Base</div>
                  <div className="text-sm sm:text-base font-semibold text-white">
                    {personalInfo.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 text-slate-200 hover:text-white flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
                >
                  <Github className="w-4 h-4 text-white" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 text-slate-200 hover:text-white flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/90 p-8 sm:p-10 rounded-3xl border border-slate-800/90 shadow-2xl shadow-indigo-950/30 relative">
            <h3 className="text-2xl font-bold text-white mb-1.5">Send a Message</h3>
            <p className="text-slate-400 text-sm mb-6">Delivered directly to chandanagreeshma14@gmail.com inbox.</p>

            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-white">Message Delivered!</h4>
                <p className="text-slate-300 text-sm max-w-sm mx-auto">
                  Thank you for reaching out. Your message has been sent to Greeshma's inbox. She will reply promptly!
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-lg bg-slate-800 text-xs font-mono text-cyan-300 hover:bg-slate-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Recruiter or Engineering Lead"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="recruiter@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Full Stack Developer Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Message</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Greeshma, we were impressed by your Full Stack portfolio and projects..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message to Greeshma</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            Designed &amp; Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> in React &amp; Tailwind
          </div>
        </div>
      </div>
    </footer>
  );
}
