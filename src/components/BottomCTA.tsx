import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomCTAProps {
  onOpenQuote: () => void;
  onOpenContact: () => void;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({ onOpenQuote }) => {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#060e0e] overflow-hidden">
      {/* Decorative crosshairs */}
      <div className="absolute top-8 left-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>
      <div className="absolute top-8 right-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>

      <div className="max-w-5xl mx-auto">
        {/* Large Rounded Emerald Card matching screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.01, transition: { duration: 0.25 } }}
          onClick={onOpenQuote}
          className="relative rounded-2xl sm:rounded-3xl p-10 sm:p-16 md:p-24 overflow-hidden cursor-pointer group bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 shadow-2xl border border-emerald-400/30 transition-all duration-300 hover:shadow-emerald-500/25 text-center flex flex-col items-center justify-center min-h-[300px] sm:min-h-[360px]"
        >
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

          {/* Center watermark logo icon with hover spin/scale */}
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white mb-6 transition-all duration-300 border border-white/20 shadow-md"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4v16L20 4v16" />
            </svg>
          </motion.div>

          {/* Headline matching screenshot */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-2xl mx-auto">
            Transform scattered marketing <br className="hidden sm:inline" />
            into predictable growth
          </h2>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="mt-8 inline-flex items-center gap-2 bg-white text-black text-xs sm:text-sm font-bold px-6 py-3 rounded-full group-hover:bg-slate-100 transition-colors shadow-lg"
          >
            <span>Get a Free Quote</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
