import React from 'react';
import { CalendarCheck, Mail, Phone } from 'lucide-react';
import { Accent, Eyebrow, Reveal } from './ui';
import { LeadForm } from './LeadForm';
import { CONTACT } from '../data/homeData';

interface BottomCTAProps {
  plan?: string;
  onBookCall: () => void;
}

/** Final call to action with the working free-mockup form. */
export const BottomCTA: React.FC<BottomCTAProps> = ({ plan, onBookCall }) => (
  <section id="get-mockup" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
    <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
    <div
      className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      aria-hidden="true"
    />

    <div className="relative mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
      <Reveal>
        <Eyebrow>Free, no obligation</Eyebrow>
        <h2 className="mt-5 text-balance text-[2.2rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
          See your new website <Accent>before you commit.</Accent>
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
          Tell us about your business and we’ll design a free mockup of your new site. If you love it, we
          build it. If not, you’ve lost nothing.
        </p>

        <ul className="mt-8 space-y-3 text-slate-300">
          {[
            'A custom design made for your business',
            'A clear price, with no pressure to buy',
            'Booking, follow-up and review tools explained in plain English',
          ].map((t) => (
            <li key={t} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-10 space-y-3 border-t border-white/10 pt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
            Prefer to talk it through?
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onBookCall}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.08]"
            >
              <CalendarCheck className="h-4 w-4 text-accent" aria-hidden="true" />
              Book a call
            </button>
            {CONTACT.phone && (
              <a
                href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.08]"
              >
                <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                {CONTACT.phone}
              </a>
            )}
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.08]"
            >
              <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
              {CONTACT.email}
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <LeadForm plan={plan} />
      </Reveal>
    </div>
  </section>
);
