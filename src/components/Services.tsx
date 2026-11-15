import React from 'react';
import { Layout, CalendarCheck, MessageSquareReply, Star, Bot } from 'lucide-react';
import { Accent, Reveal, SectionHead, SpotlightCard } from './ui';
import { SERVICES } from '../data/homeData';

const ICONS = { Layout, CalendarCheck, MessageSquareReply, Star, Bot };

export const Services: React.FC = () => (
  <section id="services" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <SectionHead
        eyebrow="What you get"
        title={
          <>
            Everything you need to turn searches into <Accent>customers.</Accent>
          </>
        }
        sub="A great website is just the start. We connect the tools that answer, book and follow up for you, so no lead slips away."
      />

      <div className="mt-14 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-6">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon];
          // Bento layout: the wide card spans 4 of 6 columns on large screens
          const span = s.wide ? 'md:col-span-2 lg:col-span-4' : 'lg:col-span-2';
          return (
            <Reveal key={s.id} delay={(i % 3) * 0.08} className={span}>
              <SpotlightCard className="group h-full">
                <article className="flex h-full flex-col p-6 sm:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-accent">{s.outcome}</p>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-400">{s.description}</p>
                  <span className="mt-6 inline-flex w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-300">
                    {s.plan}
                  </span>
                </article>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
