import React from 'react';
import { Star } from 'lucide-react';
import { Accent, Reveal, SectionHead, SpotlightCard } from './ui';
import { TESTIMONIALS } from '../data/homeData';

/** Placeholder testimonials. Edit them in src/data/homeData.ts */
export const Testimonials: React.FC = () => (
  <section id="testimonials" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <SectionHead
        eyebrow="Testimonials"
        title={
          <>
            Local owners who <Accent>made the switch.</Accent>
          </>
        }
        sub="Real results from real businesses, in their own words."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={i} delay={i * 0.1} className="h-full">
            <SpotlightCard className="h-full">
              <figure className="flex h-full flex-col p-7 sm:p-8">
                <div className="flex gap-1 text-accent" role="img" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-slate-200 sm:text-base">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-7 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-white/25 bg-white/[0.04] text-sm font-semibold text-slate-400"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {t.result}
                  </span>
                </figcaption>
              </figure>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
