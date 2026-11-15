import React from 'react';
import { Accent, Button, Reveal, SectionHead } from './ui';
import { STEPS } from '../data/homeData';

interface ProcessProps {
  onGetMockup: () => void;
}

export const Process: React.FC<ProcessProps> = ({ onGetMockup }) => (
  <section id="how-it-works" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <SectionHead
        eyebrow="How it works"
        title={
          <>
            From “hello” to a live site in <Accent>four easy steps.</Accent>
          </>
        }
        sub="No tech skills needed. You tell us about your business, and we handle the rest."
      />

      <div role="list" className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08} className="h-full">
            <div role="listitem" className="relative h-full rounded-3xl border border-white/10 bg-surface p-7 transition-colors duration-300 hover:border-accent/30">
              <span className="font-display text-6xl italic leading-none text-accent/90" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold leading-snug text-white">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-400">{s.description}</p>
              <span className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-300">
                {s.tag}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 text-center">
        <Button size="lg" arrow onClick={onGetMockup}>
          Start With My Free Mockup
        </Button>
      </Reveal>
    </div>
  </section>
);
