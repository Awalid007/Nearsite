import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ProcessProps {
  onStartProcess?: () => void;
}

export const Process: React.FC<ProcessProps> = () => {
  const steps = [
    {
      badge: 'Week 1',
      title: 'We find what others miss',
      description:
        'Deep analysis of your current marketing and sales performance to identify gaps and untapped opportunities that could double your revenue.',
      bullets: [
        'Lead generation ROI analysis',
        'Sales funnel conversion rates',
        'Competitor positioning gaps',
      ],
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Laptop with analytics dashboard',
    },
    {
      badge: 'Week 2',
      title: 'Your custom growth roadmap',
      description:
        'Design integrated inbound + outbound strategy tailored specifically to your market, customers, and growth objectives.',
      bullets: [
        'Custom messaging framework',
        'Channel selection & prioritization',
        'Authority-building content calendar',
      ],
      image:
        'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Sticky notes growth roadmap',
    },
    {
      badge: 'Week 3–4',
      title: 'Execution with precision',
      description:
        'Launch modular campaigns across chosen inbound and outbound channels with military precision and constant optimization.',
      bullets: [
        'Multi-channel content deployment',
        'Personalized outbound sequences',
        'Optimized paid campaigns',
      ],
      image:
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Team executing campaigns collaboratively',
    },
    {
      badge: 'Week 5+',
      title: 'Double down on what works',
      description:
        'Monitor performance, refine successful campaigns, and systematically scale what drives results while eliminating what doesn’t.',
      bullets: [
        'A/B testing & refinement',
        'Budget reallocation to winners',
        'Weekly performance reporting',
      ],
      image:
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Holding tablet with live business analytics',
    },
  ];

  return (
    <section id="process-section" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#060e0e] overflow-hidden">
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
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Scalable growth
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Proven 4-step process
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            From revenue audit to systematic growth - see exactly how we transform businesses in 90 days
          </p>
        </motion.div>

        {/* 4 Process Cards Stack */}
        <div className="space-y-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.badge}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="bg-[#0b1919] border border-white/10 hover:border-emerald-500/30 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 transition-colors duration-300 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              {/* Left Column: Copy & Checklist */}
              <div>
                <div className="inline-block bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {step.badge}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-normal">
                  {step.description}
                </p>

                <div className="space-y-2.5">
                  {step.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Visual Photo */}
              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0b1919] aspect-[16/10] sm:aspect-[16/9] relative group">
                <img
                  src={step.image}
                  alt={step.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
