import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, PhoneIncoming, MessageSquareReply, Star, CalendarCheck } from 'lucide-react';
import { Accent, Button, Eyebrow } from './ui';

interface HeroProps {
  onGetMockup: () => void;
  onSeePricing: () => void;
}

/** A small illustrative "site on a phone" built from divs. No stock photos needed. */
const PhoneMock: React.FC = () => (
  <div
    className="relative mx-auto w-[260px] rounded-[2.4rem] border border-white/15 bg-[#0a1515] p-2.5 shadow-[0_30px_80px_-20px_rgba(200,255,62,0.25)] sm:w-[290px]"
    role="img"
    aria-label="Illustration of a local business website on a phone, with a call button and booking card"
  >
    <div className="overflow-hidden rounded-[1.9rem] bg-[#0f2020]">
      {/* status bar */}
      <div className="flex items-center justify-between px-5 pt-3 text-[10px] font-semibold text-slate-400">
        <span>9:41</span>
        <span className="h-1.5 w-12 rounded-full bg-white/15" />
        <span>5G</span>
      </div>
      {/* site header */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-lg bg-accent" />
          <span className="h-2 w-16 rounded-full bg-white/70" />
        </div>
        <span className="flex h-6 w-6 flex-col items-center justify-center gap-[3px]">
          <span className="h-[2px] w-4 rounded bg-white/60" />
          <span className="h-[2px] w-4 rounded bg-white/60" />
        </span>
      </div>
      {/* hero text */}
      <div className="px-4 pb-4 pt-6">
        <span className="block h-3 w-4/5 rounded-full bg-white" />
        <span className="mt-2 block h-3 w-3/5 rounded-full bg-white" />
        <span className="mt-4 block h-2 w-full rounded-full bg-white/20" />
        <span className="mt-1.5 block h-2 w-5/6 rounded-full bg-white/20" />
        <div className="mt-5 flex gap-2">
          <span className="flex h-9 flex-1 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-[#060e0e]">
            Call Now
          </span>
          <span className="flex h-9 flex-1 items-center justify-center rounded-full border border-white/20 text-[11px] font-semibold text-white">
            Book Online
          </span>
        </div>
      </div>
      {/* image block */}
      <div className="mx-4 h-24 rounded-2xl bg-gradient-to-br from-emerald-900 via-[#12302b] to-[#0b1919]" />
      {/* service rows */}
      <div className="space-y-2 px-4 pb-6 pt-4">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl bg-white/[0.05] p-2.5">
            <span className="h-8 w-8 rounded-lg bg-accent/20" />
            <div className="flex-1">
              <span className="block h-2 w-2/3 rounded-full bg-white/60" />
              <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-white/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FloatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  text: string;
  className: string;
  delay: number;
}> = ({ icon, title, text, className, delay }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.9, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute z-10 hidden w-56 items-start gap-3 rounded-2xl border border-white/10 bg-[#0b1919]/90 p-3.5 shadow-2xl backdrop-blur-md sm:flex ${className}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
        {icon}
      </span>
      <span>
        <span className="block text-sm font-semibold text-white">{title}</span>
        <span className="mt-0.5 block text-xs leading-snug text-slate-400">{text}</span>
      </span>
    </motion.div>
  );
};

export const Hero: React.FC<HeroProps> = ({ onGetMockup, onSeePricing }) => {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  return (
    <section id="home" className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pt-36 lg:px-8 lg:pb-28">
      {/* backdrop */}
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <div className="text-center lg:text-left">
          <motion.div {...fade(0)}>
            <Eyebrow>Websites + automation for local businesses</Eyebrow>
          </motion.div>

          <motion.h1
            {...fade(0.08)}
            className="mt-6 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.4rem]"
          >
            A website that gets your phone <Accent>ringing.</Accent>
          </motion.h1>

          <motion.p
            {...fade(0.16)}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0"
          >
            We build fast, great-looking websites for roofers, HVAC pros, plumbers, landscapers, salons
            and more. Then we add booking, instant lead follow-up and review requests so more visitors
            become paying customers.
          </motion.p>

          <motion.div {...fade(0.24)} className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <Button size="lg" arrow onClick={onGetMockup}>
              Get My Free Mockup
            </Button>
            <Button size="lg" variant="ghost" onClick={onSeePricing}>
              See Pricing
            </Button>
          </motion.div>

          <motion.ul
            {...fade(0.32)}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-300 lg:justify-start"
          >
            {['Free mockup, no obligation', 'Built phone-first', 'Live in as little as 2 weeks'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Visual */}
        <motion.div {...fade(0.2)} className="relative mx-auto w-full max-w-md">
          <div className="animate-float">
            <PhoneMock />
          </div>
          <FloatCard
            icon={<PhoneIncoming className="h-4 w-4" />}
            title="New call"
            text="Roof repair estimate request"
            className="-left-6 top-10 lg:-left-16"
            delay={0.7}
          />
          <FloatCard
            icon={<MessageSquareReply className="h-4 w-4" />}
            title="Missed call → text sent"
            text="“Thanks for calling! How can we help?”"
            className="-right-4 top-[42%] lg:-right-14"
            delay={0.9}
          />
          <FloatCard
            icon={<Star className="h-4 w-4" />}
            title="New 5★ Google review"
            text="Requested automatically after the job"
            className="-left-2 bottom-12 lg:-left-12"
            delay={1.1}
          />
          <FloatCard
            icon={<CalendarCheck className="h-4 w-4" />}
            title="Booked online"
            text="Tomorrow, 10:30 AM"
            className="-right-2 -top-2 lg:-right-10"
            delay={1.3}
          />
        </motion.div>
      </div>
    </section>
  );
};
