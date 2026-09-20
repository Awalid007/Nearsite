import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenContact: () => void;
  onOpenBlog: () => void;
  currentView?: 'home' | 'contact' | 'blog';
  onNavigateHome?: (sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuote,
  onOpenContact,
  onOpenBlog,
  currentView = 'home',
  onNavigateHome,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPagesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setIsPagesDropdownOpen(false);
    if (onNavigateHome) {
      onNavigateHome(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      id="main-navbar"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060e0e]/90 backdrop-blur-md border-b border-white/10 py-3.5'
          : 'bg-[#060e0e]/60 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo: Nearsite with emerald icon */}
          <a
            href="#"
            id="brand-logo"
            className="flex items-center gap-2.5 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateHome) {
                onNavigateHome();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform duration-200 shadow-sm shadow-emerald-500/20">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4v16L20 4v16" className="text-emerald-400" />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center">
              Nearsite
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              id="nav-link-about"
              onClick={() => scrollToSection('about-why-us')}
              className={`px-3 py-1.5 text-xs lg:text-sm font-normal transition-colors cursor-pointer ${
                currentView === 'home' ? 'text-slate-300 hover:text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              About
            </button>
            <button
              id="nav-link-pricing"
              onClick={() => scrollToSection('pricing-section')}
              className="px-3 py-1.5 text-xs lg:text-sm font-normal text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Pricing
            </button>

            {/* Pages Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="nav-link-pages"
                type="button"
                onClick={() => setIsPagesDropdownOpen(!isPagesDropdownOpen)}
                className="px-3 py-1.5 text-xs lg:text-sm font-normal text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Pages</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isPagesDropdownOpen ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
              </button>

              <AnimatePresence>
                {isPagesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-2 w-48 bg-[#0b1919] border border-white/10 rounded-xl shadow-2xl py-2 z-50 overflow-hidden"
                  >
                    <button
                      onClick={() => scrollToSection('services-section')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-emerald-500/10 transition-colors"
                    >
                      Services (What We Do)
                    </button>
                    <button
                      onClick={() => scrollToSection('why-aurivus-section')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-emerald-500/10 transition-colors"
                    >
                      Benefits &amp; Advantage
                    </button>
                    <button
                      onClick={() => scrollToSection('process-section')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-emerald-500/10 transition-colors"
                    >
                      Proven 4-Step Process
                    </button>
                    <button
                      onClick={() => scrollToSection('testimonials-section')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-emerald-500/10 transition-colors"
                    >
                      Testimonials
                    </button>
                    <button
                      onClick={() => scrollToSection('faq-section')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-emerald-500/10 transition-colors"
                    >
                      FAQ
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              id="nav-link-booking"
              onClick={onOpenQuote}
              className="px-3 py-1.5 text-xs lg:text-sm font-normal text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer rounded-lg flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Booking</span>
            </button>
            <button
              id="nav-link-blog"
              onClick={onOpenBlog}
              className={`px-3 py-1.5 text-xs lg:text-sm transition-colors cursor-pointer rounded-lg ${
                currentView === 'blog'
                  ? 'text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30'
                  : 'font-normal text-slate-300 hover:text-white'
              }`}
            >
              Blog
            </button>
            <button
              id="nav-link-contact"
              onClick={onOpenContact}
              className={`px-3 py-1.5 text-xs lg:text-sm transition-colors cursor-pointer rounded-lg ${
                currentView === 'contact'
                  ? 'text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30'
                  : 'font-normal text-slate-300 hover:text-white'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Desktop Right Button: Get a Free Quote (Outlined pill) */}
          <div className="hidden md:flex items-center">
            <motion.button
              id="nav-get-quote-cta"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenQuote}
              className="border border-white/20 bg-white/[0.04] hover:bg-white/[0.09] text-white text-xs lg:text-sm font-medium px-4 py-2 rounded-full transition-colors hover:border-white/35 cursor-pointer"
            >
              Get a Free Quote
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="text-xs font-medium border border-white/20 bg-white/[0.05] text-white px-3 py-1.5 rounded-full"
            >
              Quote
            </button>
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#060e0e]/95 backdrop-blur-md border-b border-white/10 px-4 pt-3 pb-6 space-y-2 shadow-2xl overflow-hidden"
          >
            <button
              onClick={() => scrollToSection('about-why-us')}
              className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('pricing-section')}
              className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('services-section')}
              className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('process-section')}
              className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white"
            >
              Process
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBlog();
              }}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                currentView === 'blog'
                  ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenContact();
              }}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                currentView === 'contact'
                  ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full text-left px-3 py-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2 font-medium"
            >
              <span>📅</span>
              <span>Book a Free Call</span>
            </button>
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full bg-emerald-500 text-black font-bold text-xs py-2.5 rounded-full hover:bg-emerald-400 transition-colors"
              >
                Get a Free Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
