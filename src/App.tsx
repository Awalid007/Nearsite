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
import { LegalModal } from './components/LegalModal';
import { ContactPage } from './components/ContactPage';
import { BlogPage } from './components/BlogPage';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'contact' | 'blog'>('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quotePlan, setQuotePlan] = useState<string | undefined>(undefined);
  const [quoteBusiness, setQuoteBusiness] = useState<string | undefined>(undefined);

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#contact') {
        setCurrentView('contact');
      } else if (hash === '#blog') {
        setCurrentView('blog');
      } else if (hash === '#privacy') {
        setLegalModalType('privacy');
      } else if (hash === '#terms') {
        setLegalModalType('terms');
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBlog = () => {
    setCurrentView('blog');
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
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
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

      <LegalModal
        isOpen={!!legalModalType}
        type={legalModalType}
        onSelectType={(newType) => setLegalModalType(newType)}
        onClose={() => {
          setLegalModalType(null);
          if (window.location.hash === '#privacy' || window.location.hash === '#terms') {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
      />
    </div>
  );
}
