import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { FounderIntroVideo } from './FounderIntroVideo';

interface HeroProps {
  onOpenQuote: () => void;
  onScrollToPortfolio?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  return (
    <section id="hero-section" className="relative pt-32 sm:pt-36 md:pt-44 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient radial glow with subtle pulse */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500 rounded-full blur-3xl pointer-events-none -z-10"
      />

      {/* Decorative subtle grid crosshairs */}
      <div className="absolute top-24 left-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>
      <div className="absolute top-24 right-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>

      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* 20+ Local Businesses Trust Us Badge */}
        <motion.div
          id="hero-trust-badge"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 bg-[#0b1919] border border-white/10 hover:border-emerald-500/30 px-3.5 py-1.5 rounded-full transition-all duration-300 mb-8 cursor-default shadow-sm hover:shadow-emerald-500/10"
        >
          {/* Avatar stack */}
          <div className="flex -space-x-2 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
              alt="Client"
              className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0b1919] object-cover"
              referrerPolicy="no-referrer"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
              alt="Client"
              className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0b1919] object-cover"
              referrerPolicy="no-referrer"
            />
            <img
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=80&q=80"
              alt="Client"
              className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0b1919] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Stars */}
          <div className="flex items-center gap-0.5 text-emerald-400 text-xs">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>

          <span className="text-xs font-medium text-slate-300 tracking-tight pr-1">
            <strong className="text-white font-semibold">20+ Local Businesses</strong> Trust Us
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-main-headline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-white tracking-tight leading-[1.12] max-w-4xl"
        >
          Turn your local business <br className="hidden sm:inline" />
          <span className="text-white">into a digital powerhouse</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          id="hero-subheadline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Nearsite builds fast, beautiful websites for local businesses that want to get found online, win more customers, and look more professional than the competition.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            id="hero-get-quote-cta"
            type="button"
            whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.15)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenQuote}
            className="w-full sm:w-auto bg-white hover:bg-slate-100 text-black font-semibold text-sm sm:text-base px-8 py-3 rounded-full shadow-lg shadow-white/5 transition-colors duration-200"
          >
            Get a Free Quote
          </motion.button>
        </motion.div>

        {/* Trust checks */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-slate-300"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Local business specialists</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Mobile-first design</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Live in 2 weeks</span>
          </div>
        </motion.div>

        {/* Hero Video / Founder Video Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 w-full max-w-4xl relative"
        >
          <FounderIntroVideo onOpenQuote={onOpenQuote} />
        </motion.div>
      </div>
    </section>
  );
};
