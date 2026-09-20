import React from 'react';
import { Globe, TrendingUp, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

export const WhyWorksBetter: React.FC = () => {
  return (
    <section id="why-aurivus-section" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#060e0e] overflow-hidden">
      {/* Decorative crosshairs */}
      <div className="absolute top-12 left-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>
      <div className="absolute top-12 right-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            What benefits
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Why Aurivus works better
          </h2>
        </motion.div>

        {/* Vertical Timeline with Emerald Line & Nodes matching screenshot */}
        <div className="relative py-8">
          {/* Central Vertical Green Line with growth animation */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent hidden md:block"
          />

          {/* Node 1: Left aligned */}
          <div className="relative md:grid md:grid-cols-2 md:gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="md:text-right pr-0 md:pr-4"
            >
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="inline-block bg-[#0b1919] border border-white/10 hover:border-emerald-500/30 rounded-2xl p-6 sm:p-8 transition-colors max-w-md ml-auto text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                  Lower CAC
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  Build magnetic content and optimize your digital presence to attract high intent prospects actively searching for solutions like yours.
                </p>
              </motion.div>
            </motion.div>

            {/* Glowing marker dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.2, type: 'spring' }}
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-emerald-950 shadow-lg shadow-emerald-400/50 hidden md:block"
            />

            <div className="hidden md:block" />
          </div>

          {/* Node 2: Right aligned */}
          <div className="relative md:grid md:grid-cols-2 md:gap-16 items-center mb-20">
            <div className="hidden md:block" />

            {/* Glowing marker dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.2, type: 'spring' }}
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-emerald-950 shadow-lg shadow-emerald-400/50 hidden md:block"
            />

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="pl-0 md:pl-4"
            >
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="inline-block bg-[#0b1919] border border-white/10 hover:border-emerald-500/30 rounded-2xl p-6 sm:p-8 transition-colors max-w-md text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                  Faster sales cycles
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  Build magnetic content and optimize your digital presence to attract high intent prospects actively searching for solutions like yours.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Node 3: Bottom Center / market validation */}
          <div className="relative md:grid md:grid-cols-2 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="md:text-right pr-0 md:pr-4"
            >
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="inline-block bg-[#0b1919] border border-white/10 hover:border-emerald-500/30 rounded-2xl p-6 sm:p-8 transition-colors max-w-md ml-auto text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                  Predictable pipeline &amp; validation
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  Market validation &amp; reliable revenue forecasting and sustainable scaling across every customer touchpoint.
                </p>
              </motion.div>
            </motion.div>

            {/* Glowing marker dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.2, type: 'spring' }}
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-emerald-950 shadow-lg shadow-emerald-400/50 hidden md:block"
            />

            <div className="hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
};
