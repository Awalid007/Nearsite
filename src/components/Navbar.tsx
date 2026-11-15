import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { NAV_LINKS } from '../data/homeData';
import { Button } from './ui';

interface NavbarProps {
  onGetMockup: () => void;
  onOpenQuote: () => void;
  onOpenContact: () => void;
  onOpenBlog: () => void;
  onOpenLegal?: (type: 'privacy' | 'terms') => void;
  currentView?: 'home' | 'contact' | 'blog' | 'privacy' | 'terms';
  onNavigateHome?: (sectionId?: string) => void;
}

export const Logo: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <a
    href="#home"
    onClick={onClick}
    aria-label="Nearsite home"
    className="flex items-center gap-2.5 rounded-lg"
  >
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-[#060e0e]">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 19V5l14 14V5" />
      </svg>
    </span>
    <span className="text-lg font-bold tracking-tight text-white">Nearsite</span>
  </a>
);

export const Navbar: React.FC<NavbarProps> = ({
  onGetMockup,
  onOpenContact,
  onOpenBlog,
  currentView = 'home',
  onNavigateHome,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape and lock page scroll while it's open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const goSection = (id: string) => {
    setOpen(false);
    onNavigateHome?.(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled || open
            ? 'border-b border-white/10 bg-[#060e0e]/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          <Logo onClick={() => onNavigateHome?.()} />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => goSection(l.id)}
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={onOpenBlog}
                aria-current={currentView === 'blog' ? 'page' : undefined}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                Blog
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenContact}
                aria-current={currentView === 'contact' ? 'page' : undefined}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                Contact
              </button>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <Button onClick={onGetMockup} className="!px-4 sm:!px-5">
              <span className="sm:hidden">Free Mockup</span>
              <span className="hidden sm:inline">Get My Free Mockup</span>
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/[0.08] lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 overflow-y-auto bg-[#060e0e]/95 px-4 pb-10 pt-24 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto flex max-w-md flex-col">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                >
                  <button
                    type="button"
                    onClick={() => goSection(l.id)}
                    className="w-full border-b border-white/10 py-4 text-left text-2xl font-semibold tracking-tight text-white"
                  >
                    {l.label}
                  </button>
                </motion.li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onOpenBlog();
                  }}
                  className="w-full border-b border-white/10 py-4 text-left text-2xl font-semibold tracking-tight text-white"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onOpenContact();
                  }}
                  className="w-full border-b border-white/10 py-4 text-left text-2xl font-semibold tracking-tight text-white"
                >
                  Contact
                </button>
              </li>
              <li className="pt-8">
                <Button
                  size="lg"
                  arrow
                  className="w-full"
                  onClick={() => {
                    setOpen(false);
                    onGetMockup();
                  }}
                >
                  Get My Free Mockup
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
