import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LogoBar } from './components/LogoBar';
import { ProblemSolution } from './components/ProblemSolution';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { BottomCTA } from './components/BottomCTA';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { BlogModal } from './components/BlogModal';
import { ContactPage } from './components/ContactPage';
import { BlogPage } from './components/BlogPage';
import { LegalPage } from './components/LegalPage';
import { Button, scrollToId } from './components/ui';

type View = 'home' | 'contact' | 'blog' | 'privacy' | 'terms';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quotePlan, setQuotePlan] = useState<string | undefined>(undefined);
  const [quoteBusiness, setQuoteBusiness] = useState<string | undefined>(undefined);
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  // Plan picked from the pricing cards, passed into the free-mockup form
  const [formPlan, setFormPlan] = useState<string | undefined>(undefined);
  // Mobile sticky CTA visibility
  const [showStickyCta, setShowStickyCta] = useState(false);

  /* ---------------- hash-based "pages" (kept from the original app) ---------------- */
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#contact') setCurrentView('contact');
      else if (hash === '#blog') setCurrentView('blog');
      else if (hash === '#privacy') setCurrentView('privacy');
      else if (hash === '#terms') setCurrentView('terms');
      else setCurrentView('home');
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  /* ---------------- sticky mobile CTA: show after the hero, hide over the form ---------------- */
  useEffect(() => {
    if (currentView !== 'home') {
      setShowStickyCta(false);
      return;
    }
    let formVisible = false;
    const update = () => setShowStickyCta(window.scrollY > 640 && !formVisible);
    const form = document.getElementById('get-mockup');
    const io = form
      ? new IntersectionObserver(([entry]) => {
          formVisible = entry.isIntersecting;
          update();
        })
      : null;
    if (form && io) io.observe(form);
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', update);
      io?.disconnect();
    };
  }, [currentView]);

  /* ---------------- actions ---------------- */
  const handleOpenQuote = (plan?: string, business?: string) => {
    setQuotePlan(plan);
    setQuoteBusiness(business);
    setIsQuoteOpen(true);
  };

  const handleNavigateHome = (sectionId?: string) => {
    setCurrentView('home');
    const h = window.location.hash;
    if (['#privacy', '#terms', '#contact', '#blog'].includes(h)) {
      window.history.replaceState(null, '', window.location.pathname + (sectionId ? `#${sectionId}` : ''));
    }
    if (sectionId) {
      // wait for the home view to render before scrolling
      setTimeout(() => scrollToId(sectionId), 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToForm = (plan?: string) => {
    if (plan) setFormPlan(plan);
    handleNavigateHome('get-mockup');
  };

  const navigateToView = (view: Exclude<View, 'home'>) => {
    setCurrentView(view);
    window.location.hash = `#${view}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#060e0e] font-sans text-[#f6f9f7]">
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[#060e0e]"
      >
        Skip to content
      </a>

      <Navbar
        currentView={currentView}
        onGetMockup={() => goToForm()}
        onNavigateHome={handleNavigateHome}
        onOpenQuote={() => handleOpenQuote()}
        onOpenContact={() => navigateToView('contact')}
        onOpenBlog={() => navigateToView('blog')}
        onOpenLegal={(type) => navigateToView(type)}
      />

      <main id="main" tabIndex={-1} className="flex-grow outline-none">
        {currentView === 'contact' ? (
          <ContactPage onBackToHome={() => handleNavigateHome()} onOpenQuote={() => handleOpenQuote()} />
        ) : currentView === 'blog' ? (
          <BlogPage onBackToHome={() => handleNavigateHome()} onOpenQuote={() => handleOpenQuote()} />
        ) : currentView === 'privacy' || currentView === 'terms' ? (
          <LegalPage
            initialType={currentView}
            onBackToHome={() => handleNavigateHome()}
            onOpenQuote={() => handleOpenQuote()}
            onOpenContact={() => navigateToView('contact')}
          />
        ) : (
          <>
            <Hero onGetMockup={() => goToForm()} onSeePricing={() => scrollToId('pricing')} />
            <LogoBar />
            <ProblemSolution />
            <Services />
            <Pricing onSelectPlan={(plan) => goToForm(plan)} />
            <PortfolioShowcase />
            <Process onGetMockup={() => goToForm()} />
            <Testimonials />
            <FAQ onAskQuestion={() => navigateToView('contact')} />
            <BottomCTA plan={formPlan} onBookCall={() => handleOpenQuote()} />
          </>
        )}
      </main>

      <Footer
        onGetMockup={() => goToForm()}
        onOpenBlog={() => navigateToView('blog')}
        onOpenContact={() => navigateToView('contact')}
        onOpenPrivacy={() => navigateToView('privacy')}
        onOpenTerms={() => navigateToView('terms')}
        onNavigateHome={handleNavigateHome}
      />

      {/* Mobile sticky call-to-action */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#060e0e]/90 p-3 backdrop-blur-xl transition-transform duration-300 lg:hidden ${
          showStickyCta ? 'translate-y-0' : 'translate-y-full'
        }`}
        aria-hidden={!showStickyCta}
      >
        <Button size="lg" arrow className="w-full" onClick={() => goToForm()} disabled={!showStickyCta}>
          Get My Free Mockup
        </Button>
      </div>

      {/* Existing modals (booking + blog) */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        preselectedPlan={quotePlan}
        prefilledBusiness={quoteBusiness}
      />
      <BlogModal isOpen={isBlogOpen} onClose={() => setIsBlogOpen(false)} onOpenQuote={() => handleOpenQuote()} />
    </div>
  );
}
