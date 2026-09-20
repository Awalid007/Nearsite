import React from 'react';
import { Sparkles, ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const packageItems = [
    { emoji: '🌐', name: 'Professional custom website', value: '$300 value' },
    { emoji: '📱', name: 'Mobile + desktop optimization', value: '$75 value' },
    { emoji: '🔎', name: 'Basic SEO setup', value: '$75 value' },
    { emoji: '📅', name: 'Online booking system', value: '$75 value' },
    { emoji: '💰', name: 'Quote / request-a-quote form', value: '$50 value' },
    { emoji: '📩', name: 'Contact + lead capture form', value: '$40 value' },
    { emoji: '🔗', name: 'Custom domain — 1 year', value: '$20 value' },
    { emoji: '☁️', name: 'Hosting — 1 year', value: '$40 value' },
    { emoji: '🎙️', name: 'AI voice chat', value: '$99 value' },
  ];

  return (
    <section
      id="pricing-section"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#060e0e] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative crosshairs */}
      <div className="absolute top-12 left-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>
      <div className="absolute top-12 right-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>One Package. Everything Included.</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Your complete website, ready to launch — for $699
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto">
            No hidden fees. No monthly surprises. Everything your local business needs online, bundled into one affordable package.
          </p>
        </motion.div>

        {/* 📦 PACKAGE CARD */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#0b1919] border border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-emerald-950/60 ring-1 ring-emerald-500/20"
          >
            {/* Top Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-emerald-500/25 flex items-center gap-1.5 whitespace-nowrap">
              <span>★</span>
              <span>Most Popular · Best Value</span>
            </div>

            {/* Header: Title, Price, Subtitle */}
            <div className="text-center pt-2 pb-6 border-b border-white/10">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                Complete Website Package
              </h3>

              <div className="flex items-baseline justify-center gap-2 my-2">
                <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                  $699
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium text-slate-400">
                One-time payment · No monthly fees
              </p>
            </div>

            {/* What's included Section */}
            <div className="py-6">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>What's included:</span>
                <span className="text-[11px] text-emerald-400/90 font-normal">All-in-one bundle</span>
              </h4>

              <div className="space-y-3">
                {packageItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className="flex items-center justify-between py-1.5 px-2.5 rounded-xl hover:bg-white/[0.03] transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <span className="text-lg shrink-0" role="img" aria-label={item.name}>
                        {item.emoji}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-200 font-medium truncate">
                        {item.name}
                      </span>
                    </div>

                    {/* Dotted Leader Line for desktop */}
                    <div className="hidden sm:block flex-grow mx-3 border-b border-dotted border-white/15" />

                    <div className="shrink-0 text-right">
                      <span className="inline-block text-xs font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                        {item.value}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Calculation / Savings Summary Box */}
            <div className="my-6 p-4 sm:p-5 rounded-2xl bg-[#060e0e] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center justify-around sm:justify-start gap-4 sm:gap-6 w-full sm:w-auto text-center sm:text-left">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
                    Total value
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-400 line-through">
                    $774
                  </div>
                </div>

                <div className="h-8 w-px bg-white/10 hidden sm:block" />

                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                    You pay
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white">
                    $699
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-auto flex justify-center">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs sm:text-sm font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>You save: $75</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 text-center">
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => onSelectPlan('Complete Website Package ($699)')}
                className="w-full py-4 px-6 rounded-full bg-white hover:bg-slate-100 text-black font-extrabold text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-xl shadow-white/10 flex items-center justify-center gap-2 group"
              >
                <span>Get Started for $699</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <div className="mt-3.5 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>Free discovery call included</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
