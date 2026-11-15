import React from 'react';
import { Check, X } from 'lucide-react';
import { Accent, Reveal, SectionHead } from './ui';
import { PROBLEMS, SOLUTIONS } from '../data/homeData';

export const ProblemSolution: React.FC = () => (
  <section id="why" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <SectionHead
        eyebrow="The problem"
        title={
          <>
            An old website is quietly sending your customers <Accent>to the competition.</Accent>
          </>
        }
        sub="When someone needs a roofer, plumber or stylist, they search on their phone and call the first business that looks trustworthy and easy. Here’s what that means for you."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-2 lg:gap-6">
        {/* Before */}
        <Reveal>
          <div className="h-full rounded-3xl border border-white/10 bg-[#0a1313] p-6 sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
              Your site today
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Visitors leave. Calls go elsewhere.
            </h3>
            <ul className="mt-7 space-y-4">
              {PROBLEMS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-400">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-400">
                    <X className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* After */}
        <Reveal delay={0.1}>
          <div className="relative h-full overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-b from-[#12220f] to-[#0b1919] p-6 sm:p-9">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-[90px]"
              aria-hidden="true"
            />
            <p className="relative text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              With Nearsite
            </p>
            <h3 className="relative mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              More calls, bookings and reviews.
            </h3>
            <ul className="relative mt-7 space-y-4">
              {SOLUTIONS.map((s) => (
                <li key={s} className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-200">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[#060e0e]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3.5} aria-hidden="true" />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
