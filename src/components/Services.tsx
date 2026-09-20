import React from 'react';
import { Palette, Code2, Search, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesProps {
  onSelectService?: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const services = [
    {
      id: 'custom-design',
      icon: Palette,
      title: 'Custom Website Design',
      description:
        'We design modern, mobile-friendly websites that reflect your brand and convert visitors into customers. No templates. No cookie-cutter layouts.',
      features: ['Custom design', 'Mobile-first', 'Fast load times'],
    },
    {
      id: 'web-development',
      icon: Code2,
      title: 'Web Development',
      description:
        "Clean, reliable code built to last. Your site will be fast, secure, and easy to update — whether it's a simple brochure site or a full booking system.",
      features: ['Fast & secure', 'Easy to manage', 'Built to scale'],
    },
    {
      id: 'local-seo',
      icon: Search,
      title: 'Local SEO Setup',
      description:
        'Get found by customers searching in your area. We set up Google Business, optimize keywords, and submit your site to local directories.',
      features: ['Google Business Profile', 'Keyword optimization', 'Local directory listings'],
    },
  ];

  return (
    <section id="services-section" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#060e0e] overflow-hidden">
      {/* Decorative crosshairs */}
      <div className="absolute top-12 left-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>
      <div className="absolute top-12 right-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            SERVICES
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            What We Do
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Everything your local business needs online
          </p>
        </motion.div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, index) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                onClick={() => onSelectService?.(srv.title)}
                className="group relative bg-[#0b1919] border border-white/10 hover:border-emerald-500/40 rounded-2xl p-7 transition-colors duration-300 flex flex-col justify-between cursor-pointer hover:shadow-xl hover:shadow-emerald-500/5"
              >
                <div>
                  {/* Icon box */}
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 tracking-tight group-hover:text-emerald-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-normal">
                    {srv.description}
                  </p>
                </div>

                {/* Features checkmarks */}
                <div className="pt-4 border-t border-white/5 space-y-2.5">
                  {srv.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
