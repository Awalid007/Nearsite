import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LogoBar } from './components/LogoBar';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { WhyWorksBetter } from './components/WhyWorksBetter';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { BottomCTA } from './components/BottomCTA';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { ContactModal } from './components/ContactModal';
import { BlogModal } from './components/BlogModal';
import { ContactPage } from './components/ContactPage';
import { BlogPage } from './components/BlogPage';
import { LegalPage } from './components/LegalPage';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'contact' | 'blog' | 'privacy' | 'terms'>('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quotePlan, setQuotePlan] = useState<string | undefined>(undefined);
  const [quoteBusiness, setQuoteBusiness] = useState<string | undefined>(undefined);

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#contact') {
        setCurrentView('contact');
      } else if (hash === '#blog') {
        setCurrentView('blog');
      } else if (hash === '#privacy') {
        setCurrentView('privacy');
      } else if (hash === '#terms') {
        setCurrentView('terms');
      } else if (hash === '#home' || hash === '' || hash.startsWith('#about') || hash.startsWith('#pricing') || hash.startsWith('#services')) {
        setCurrentView('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenQuote = (plan?: string, business?: string) => {
    setQuotePlan(plan);
    setQuoteBusiness(business);
    setIsQuoteOpen(true);
  };

  const handleNavigateHome = (sectionId?: string) => {
    setCurrentView('home');
    if (window.location.hash && (window.location.hash === '#privacy' || window.location.hash === '#terms' || window.location.hash === '#contact' || window.location.hash === '#blog')) {
      window.history.replaceState(null, '', window.location.pathname + (sectionId ? `#${sectionId}` : ''));
    }
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const yOffset = -80;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToContact = () => {
    setCurrentView('contact');
    window.location.hash = '#contact';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBlog = () => {
    setCurrentView('blog');
    window.location.hash = '#blog';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLegal = (type: 'privacy' | 'terms') => {
    setCurrentView(type);
    window.location.hash = `#${type}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#060e0e] text-[#f6f9f7] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col selection:bg-emerald-400 selection:text-black">
      {/* 🧭 NAVIGATION */}
      <Navbar
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        onOpenQuote={() => handleOpenQuote()}
        onOpenContact={navigateToContact}
        onOpenBlog={navigateToBlog}
        onOpenLegal={navigateToLegal}
      />

      {/* Main Content: Dedicated Page or Homepage */}
      <main className="flex-grow">
        {currentView === 'contact' ? (
          <ContactPage
            onBackToHome={() => handleNavigateHome()}
            onOpenQuote={() => handleOpenQuote()}
          />
        ) : currentView === 'blog' ? (
          <BlogPage
            onBackToHome={() => handleNavigateHome()}
            onOpenQuote={() => handleOpenQuote()}
          />
        ) : currentView === 'privacy' || currentView === 'terms' ? (
          <LegalPage
            initialType={currentView}
            onBackToHome={() => handleNavigateHome()}
            onOpenQuote={() => handleOpenQuote()}
            onOpenContact={navigateToContact}
          />
        ) : (
          <>
            {/* 🦸 HERO SECTION with Founder Intro Video */}
            <Hero
              onOpenQuote={() => handleOpenQuote()}
            />

            {/* 🏢 LOGO BAR */}
            <LogoBar
              onSelectClient={(clientName) => {
                handleOpenQuote('Basic', clientName);
              }}
            />

            {/* 🛠️ SERVICES SECTION ("What We Do") */}
            <Services
              onSelectService={(serviceName) => {
                handleOpenQuote('Basic', serviceName);
              }}
            />

            {/* 💡 WHY US SECTION ("Why Nearsite" Bento Grid) */}
            <WhyUs />

            {/* 🌟 WHAT BENEFITS ("Why Aurivus works better" Vertical Flow) */}
            <WhyWorksBetter />

            {/* ⚙️ PROVEN 4-STEP PROCESS (Week 1, Week 2, Week 3-4, Week 5+) */}
            <Process
              onStartProcess={() => handleOpenQuote()}
            />

            {/* 💬 TESTIMONIALS ("Trusted by the world's leading teams") */}
            <Testimonials />

            {/* 💰 PRICING SECTION ("Transparent pricing that grows with you") */}
            <Pricing
              onSelectPlan={(planName) => handleOpenQuote(planName)}
            />

            {/* ❓ FAQ SECTION ("We've got the answers") */}
            <FAQ
              onAskQuestion={navigateToContact}
            />

            {/* 📣 BOTTOM CTA BANNER (Large Emerald Glowing Card) */}
            <BottomCTA
              onOpenQuote={() => handleOpenQuote()}
              onOpenContact={navigateToContact}
            />
          </>
        )}
      </main>

      {/* 🔻 FOOTER */}
      <Footer
        onOpenQuote={() => handleOpenQuote()}
        onOpenBlog={navigateToBlog}
        onOpenContact={navigateToContact}
        onOpenPrivacy={() => navigateToLegal('privacy')}
        onOpenTerms={() => navigateToLegal('terms')}
      />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        preselectedPlan={quotePlan}
        prefilledBusiness={quoteBusiness}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <BlogModal
        isOpen={isBlogOpen}
        onClose={() => setIsBlogOpen(false)}
        onOpenQuote={() => handleOpenQuote()}
      />
    </div>
  );
}
