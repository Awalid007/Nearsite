import React from 'react';
import { Reveal } from './ui';
import { TRUST_STATS, TRUST_LOGOS, TRADES } from '../data/homeData';

/** Trust bar: stats + client logos (placeholders until you add real ones). */
export const LogoBar: React.FC = () => {
  const logos = [...TRUST_LOGOS, ...TRUST_LOGOS]; // duplicated for a seamless loop

  return (
    <section aria-label="Trusted by local businesses" className="border-y border-white/10 bg-[#081414] py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <dl className="grid grid-cols-3 gap-4 text-center sm:gap-8">
            {TRUST_STATS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1.5 text-xs text-slate-400 sm:text-sm">{s.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <p className="mt-12 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Trusted by local businesses
        </p>

        {/* Logo marquee */}
        <div
          className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
          aria-hidden="true"
        >
          <div className="flex w-max animate-marquee items-center gap-12 hover:[animation-play-state:paused]">
            {logos.map((l, i) =>
              l.src ? (
                <img
                  key={`${l.name}-${i}`}
                  src={l.src}
                  alt=""
                  loading="lazy"
                  className="h-8 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <span
                  key={`${l.name}-${i}`}
                  className="flex h-10 items-center gap-2 whitespace-nowrap text-lg font-semibold text-slate-400"
                >
                  <span className="h-6 w-6 rounded-md border border-dashed border-slate-600" />
                  {l.name}
                </span>
              )
            )}
          </div>
        </div>
        {/* Real list for screen readers */}
        <ul className="sr-only">
          {TRUST_LOGOS.map((l) => (
            <li key={l.name}>{l.name}</li>
          ))}
        </ul>

        {/* Trades served */}
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {TRADES.map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-slate-300 sm:text-sm"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
