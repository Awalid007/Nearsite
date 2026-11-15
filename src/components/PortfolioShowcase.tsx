import React, { useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import { Accent, Reveal, SectionHead } from './ui';
import { WORK, WorkExample } from '../data/homeData';

/** Illustrative site sketches shown until you add real screenshots. */
const SiteSketch: React.FC<{ variant: 'old' | 'new' }> = ({ variant }) => {
  if (variant === 'old') {
    return (
      <div className="h-full w-full bg-[#d9d6cf] p-4 text-[#555] sm:p-6" aria-hidden="true">
        <div className="mb-3 h-5 w-2/3 bg-[#a9a59b]" />
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-3 w-12 bg-[#bbb7ac]" />
          ))}
        </div>
        <div className="mt-4 h-28 w-full bg-[#b9b5a9] sm:h-40" />
        <div className="mt-4 space-y-2">
          <div className="h-2 w-full bg-[#bbb7ac]" />
          <div className="h-2 w-11/12 bg-[#bbb7ac]" />
          <div className="h-2 w-4/5 bg-[#bbb7ac]" />
          <div className="h-2 w-full bg-[#bbb7ac]" />
          <div className="h-2 w-2/3 bg-[#bbb7ac]" />
        </div>
      </div>
    );
  }
  return (
    <div className="h-full w-full bg-[#0b1919] p-4 sm:p-6" aria-hidden="true">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-lg bg-accent" />
          <span className="h-2.5 w-20 rounded-full bg-white/80" />
        </div>
        <span className="h-7 w-20 rounded-full bg-accent" />
      </div>
      <div className="mt-6 sm:mt-10">
        <div className="h-5 w-3/4 rounded-full bg-white sm:h-7" />
        <div className="mt-2.5 h-5 w-1/2 rounded-full bg-white sm:h-7" />
        <div className="mt-4 h-2.5 w-2/3 rounded-full bg-white/25" />
        <div className="mt-5 flex gap-2">
          <span className="h-9 w-28 rounded-full bg-accent" />
          <span className="h-9 w-24 rounded-full border border-white/25" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-16 rounded-xl bg-white/[0.06] sm:h-24" />
        ))}
      </div>
    </div>
  );
};

const BeforeAfter: React.FC<{ item: WorkExample }> = ({ item }) => {
  const [pos, setPos] = useState(50);

  return (
    <div
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl border border-white/10 focus-within:ring-2 focus-within:ring-accent sm:aspect-[16/10]"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Before (bottom layer) */}
      <div className="absolute inset-0">
        {item.beforeSrc ? (
          <img src={item.beforeSrc} alt={`${item.client} website before`} loading="lazy" className="h-full w-full object-cover object-top" />
        ) : (
          <SiteSketch variant="old" />
        )}
      </div>
      {/* After (revealed from the left) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {item.afterSrc ? (
          <img src={item.afterSrc} alt={`${item.client} website after`} loading="lazy" className="h-full w-full object-cover object-top" />
        ) : (
          <SiteSketch variant="new" />
        )}
      </div>

      {/* Labels */}
      <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#060e0e]">
        After
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
        Before
      </span>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-accent"
        style={{ left: `${pos}%` }}
        aria-hidden="true"
      >
        <span className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-[#060e0e] shadow-lg">
          <ChevronsLeftRight className="h-5 w-5" />
        </span>
      </div>

      {/* Accessible, keyboard-friendly control */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Drag to compare the old website with the new website"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
};

export const PortfolioShowcase: React.FC = () => {
  const [active, setActive] = useState(WORK[0].id);
  const item = WORK.find((w) => w.id === active) ?? WORK[0];

  return (
    <section id="work" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHead
          eyebrow="Our work"
          title={
            <>
              See the <Accent>difference</Accent> a better site makes.
            </>
          }
          sub="Drag the slider to compare a typical outdated local-business site with a Nearsite rebuild."
        />

        <Reveal className="mt-12">
          {/* Tabs */}
          <div role="tablist" aria-label="Example industries" className="no-scrollbar mb-5 flex justify-center gap-2 overflow-x-auto">
            {WORK.map((w) => (
              <button
                key={w.id}
                role="tab"
                aria-selected={active === w.id}
                aria-controls="work-panel"
                id={`tab-${w.id}`}
                onClick={() => setActive(w.id)}
                className={`shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                  active === w.id
                    ? 'border-accent bg-accent text-[#060e0e]'
                    : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:text-white'
                }`}
              >
                {w.trade}
              </button>
            ))}
          </div>

          <div
            id="work-panel"
            role="tabpanel"
            aria-labelledby={`tab-${item.id}`}
            className="rounded-[2rem] border border-white/10 bg-surface p-3 sm:p-5"
          >
            <BeforeAfter key={item.id} item={item} />
            <div className="flex flex-col gap-3 px-2 pb-2 pt-5 sm:flex-row sm:items-center sm:justify-between sm:px-3">
              <div>
                <p className="text-lg font-semibold text-white">{item.client}</p>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-slate-400">{item.summary}</p>
              </div>
              <p className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                {item.result}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
