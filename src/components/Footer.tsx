import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { submitNewsletterToApp } from '../services/api';

interface FooterProps {
  onOpenQuote: () => void;
  onOpenBlog: () => void;
  onOpenContact: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQuote,
  onOpenBlog,
  onOpenContact,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      submitNewsletterToApp({
        email: email.trim(),
        createdAt: new Date().toISOString(),
      });
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 4000);
      setEmail('');
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#060e0e] border-t border-white/5 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-400 overflow-hidden">
      {/* Decorative crosshairs */}
      <div className="absolute top-0 left-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>
      <div className="absolute top-0 right-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Top 4-Column Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/5">
          {/* Column 1: Brand & Newsletter (Span 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4v16L20 4v16" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Nearsite
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
              Modern, high-converting websites for local businesses.
            </p>

            {/* Newsletter Input Form */}
            <form onSubmit={handleSubscribe} className="pt-2 max-w-sm">
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0b1919] border border-white/15 rounded-full py-2 pl-4 pr-24 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 bg-white hover:bg-slate-200 text-black font-semibold text-xs px-4 py-1.5 rounded-full transition-colors"
                >
                  Submit
                </button>
              </div>
              {isSubscribed && (
                <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Subscribed successfully!
                </p>
              )}
            </form>
          </div>

          {/* Column 2: Pages */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Pages
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => scrollTo('about-why-us')}
                  className="hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button onClick={onOpenBlog} className="hover:text-white transition-colors">
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('pricing-section')}
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={onOpenBlog} className="hover:text-white transition-colors">
                  Blog Details
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => scrollTo('process-section')}
                  className="hover:text-white transition-colors"
                >
                  Scalable growth
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('why-aurivus-section')}
                  className="hover:text-white transition-colors"
                >
                  What benefits
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('testimonials-section')}
                  className="hover:text-white transition-colors"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('faq-section')}
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href="mailto:Nearsiteahmad@gmail.com"
                  className="hover:text-emerald-400 text-white transition-colors"
                >
                  Nearsiteahmad@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar matching screenshot */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© 2026 Nearsite. All rights reserved.</div>

          <div className="flex items-center gap-6">
            <button onClick={onOpenPrivacy} className="hover:text-slate-300 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={onOpenTerms} className="hover:text-slate-300 transition-colors cursor-pointer">
              Terms of Service
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
