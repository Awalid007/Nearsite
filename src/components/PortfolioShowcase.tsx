import React, { useState } from 'react';
import { PORTFOLIO_CASES } from '../data/siteData';
import { Star, Check, ExternalLink, ArrowRight, Smartphone, Monitor } from 'lucide-react';

interface PortfolioShowcaseProps {
  onOpenQuoteWithBusiness: (business: string) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ onOpenQuoteWithBusiness }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('verde');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  const activeCase = PORTFOLIO_CASES.find((c) => c.id === selectedCaseId) || PORTFOLIO_CASES[0];

  return (
    <section id="portfolio-section" className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span>Our Work in Action</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Websites that turn local clicks into real-world customers
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Explore recent websites designed and launched by Nearsite for local neighborhood favorites.
          </p>
        </div>

        {/* Business Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {PORTFOLIO_CASES.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCaseId(item.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCaseId === item.id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {item.businessName}
            </button>
          ))}
        </div>

        {/* Active Case Study Spotlight */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-slate-800/80 rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl">
          {/* Left: Case Info & Metrics */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {activeCase.badge}
              </span>
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {activeCase.businessName}
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {activeCase.headline}
            </p>

            {/* Impact Metric Callout */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30">
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">
                Verified Outcome:
              </div>
              <div className="text-base font-bold text-white">
                {activeCase.results}
              </div>
            </div>

            {/* Key Features implemented */}
            <div className="space-y-2">
              <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                Included Features:
              </div>
              <div className="space-y-1.5">
                {activeCase.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenQuoteWithBusiness(activeCase.businessName)}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
              >
                <span>Get a Site Like {activeCase.businessName.split(' ')[0]}’s</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Device Mockup Preview */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Device Switcher */}
            <div className="flex items-center gap-2 mb-4 bg-slate-900/80 p-1 rounded-xl border border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => setDeviceMode('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  deviceMode === 'desktop' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop View</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  deviceMode === 'mobile' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile View (99 Speed)</span>
              </button>
            </div>

            {/* Mockup Frame */}
            {deviceMode === 'desktop' ? (
              <div className="w-full max-w-xl bg-slate-950 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden text-left">
                {/* Desktop top bar */}
                <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="font-mono text-[11px] text-slate-300">
                      https://www.{activeCase.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
                    </span>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-mono border border-emerald-800">
                    99/100 Core Vitals
                  </span>
                </div>

                {/* Mock Content */}
                <div className="p-6 bg-slate-900/50 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="font-extrabold text-white text-base">
                      {activeCase.businessName}
                    </div>
                    <div className="text-xs text-slate-400 flex gap-3">
                      <span>Menu / Services</span>
                      <span>About</span>
                      <span className="text-emerald-400 font-bold">Contact / Book</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-xl border border-slate-700 space-y-2">
                    <div className="text-[11px] text-emerald-400 font-mono uppercase">
                      Local Authority Guaranteed
                    </div>
                    <div className="text-lg font-bold text-white">
                      {activeCase.headline}
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <span className="bg-emerald-500 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg">
                        Get Started Today
                      </span>
                      <span className="text-xs text-slate-300">
                        ⭐ 5.0 Star Rated locally
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-64 bg-slate-950 rounded-[32px] p-3 border-4 border-slate-700 shadow-2xl text-left">
                {/* Mobile screen notch */}
                <div className="w-20 h-3 bg-slate-800 rounded-full mx-auto mb-2" />
                <div className="bg-slate-900 rounded-2xl p-4 space-y-3">
                  <div className="text-xs font-bold text-white flex justify-between items-center">
                    <span>{activeCase.businessName.split(' ')[0]}</span>
                    <span className="text-[10px] bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded font-bold">
                      CALL NOW
                    </span>
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg text-xs space-y-1">
                    <div className="font-bold text-emerald-400 text-[11px]">
                      {activeCase.badge}
                    </div>
                    <div className="text-slate-200 font-semibold text-xs">
                      1-Tap Mobile Booking
                    </div>
                  </div>
                  <div className="bg-emerald-500 text-slate-950 text-center py-1.5 rounded-lg text-xs font-bold">
                    Book Appointment
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
