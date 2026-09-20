import React from 'react';
import { MessageSquare, Clock, Wallet, SearchCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const WhyUs: React.FC = () => {
  return (
    <section id="about-why-us" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#060e0e] overflow-hidden">
      {/* Decorative crosshairs */}
      <div className="absolute top-12 left-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>
      <div className="absolute top-12 right-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            WHY US
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Why Nearsite
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Why local businesses choose us over big agencies
          </p>
        </motion.div>

        {/* 3-Column Bento Grid matching exact screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Left Column: 2 Cards */}
          <div className="flex flex-col gap-6">
            {/* Benefit 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-[#0b1919] border border-white/10 hover:border-emerald-500/30 rounded-2xl p-6 sm:p-7 flex-1 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                We speak your language
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                No tech jargon. No confusing reports. We explain everything clearly and keep you in the loop from day one.
              </p>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-[#0b1919] border border-white/10 hover:border-emerald-500/30 rounded-2xl p-6 sm:p-7 flex-1 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                Fast turnaround
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                Most agencies take months. We deliver professional websites in as little as 2 weeks, so you can start winning customers sooner.
              </p>
            </motion.div>
          </div>

          {/* Center Column: Tall Photo of team collaborating with sticky notes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl overflow-hidden border border-white/10 bg-[#0b1919] shadow-xl relative min-h-[320px] md:min-h-full group"
          >
            <img
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
              alt="Two colleagues collaborating at a whiteboard with sticky notes"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Right Column: 2 Cards */}
          <div className="flex flex-col gap-6">
            {/* Benefit 3 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-[#0b1919] border border-white/10 hover:border-emerald-500/30 rounded-2xl p-6 sm:p-7 flex-1 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                Affordable pricing
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                Premium design without the premium agency price tag. We work with local business budgets and offer flexible payment options.
              </p>
            </motion.div>

            {/* Benefit 4 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-[#0b1919] border border-white/10 hover:border-emerald-500/30 rounded-2xl p-6 sm:p-7 flex-1 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
                <SearchCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                Built to get you found
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                Every site we build is SEO-ready from day one, so local customers can find you on Google without extra cost.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
