import React from 'react';
import { Check } from 'lucide-react';
import { Accent, Button, Reveal, SectionHead } from './ui';
import { TIERS } from '../data/homeData';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => (
  <section id="pricing" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <SectionHead
        eyebrow="Pricing"
        title={
          <>
            Simple pricing that <Accent>pays for itself.</Accent>
          </>
        }
        sub="One build fee, then a low monthly plan that keeps everything running. Your free mockup comes with an exact quote for your business."
      />

      <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3 lg:gap-6">
        {TIERS.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.1} className="h-full">
            <div
              className={`relative flex h-full flex-col rounded-3xl border p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-9 ${
                t.popular
                  ? 'border-accent/50 bg-gradient-to-b from-[#142a10] to-[#0b1919] shadow-[0_20px_80px_-30px_rgba(200,255,62,0.35)]'
                  : 'border-white/10 bg-surface'
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#060e0e]">
                  Most popular
                </span>
              )}

              <h3 className="text-xl font-semibold text-white">{t.name}</h3>
              <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-slate-400">{t.tagline}</p>

              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  One-time build
                </p>
                <p className="mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {t.build}
                </p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Monthly plan
                </p>
                <p className="mt-1 text-xl font-semibold text-accent sm:text-2xl">
                  {t.monthly}
                  <span className="text-sm font-medium text-slate-400"> / month</span>
                </p>
              </div>

              <div className="mt-6 flex-1 border-t border-white/10 pt-6">
                {t.includesLabel && (
                  <p className="mb-3 text-sm font-semibold text-white">{t.includesLabel}</p>
                )}
                <ul className="space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[15px] leading-snug text-slate-300">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={3} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                size="lg"
                variant={t.popular ? 'primary' : 'ghost'}
                arrow
                className="mt-8 w-full"
                onClick={() => onSelectPlan(t.name)}
              >
                Get My Free Mockup
              </Button>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-400">
        Final pricing depends on the number of pages and features you need. No surprises: you’ll see the
        exact price with your free mockup.
      </p>
    </div>
  </section>
);
