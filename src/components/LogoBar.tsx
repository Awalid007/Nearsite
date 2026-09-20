import React from 'react';
import { Flame, UtensilsCrossed, Dumbbell, Scissors, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

interface LogoBarProps {
  onSelectClient?: (name: string) => void;
}

export const LogoBar: React.FC<LogoBarProps> = ({ onSelectClient }) => {
  const clients = [
    {
      name: "Joe's Plumbing",
      icon: Flame,
      industry: 'Plumbing & HVAC',
    },
    {
      name: 'Verde Kitchen',
      icon: UtensilsCrossed,
      industry: 'Farm Bistro',
    },
    {
      name: 'FitLocal Gym',
      icon: Dumbbell,
      industry: 'Fitness Studio',
    },
    {
      name: 'Bloom Hair Studio',
      icon: Scissors,
      industry: 'Salon & Spa',
    },
    {
      name: 'PrimeRealty',
      icon: Building2,
      industry: 'Real Estate',
    },
  ];

  return (
    <section className="relative border-y border-white/5 py-12 px-4 sm:px-6 lg:px-8 bg-[#060e0e] overflow-hidden">
      {/* Decorative crosshair marks */}
      <div className="absolute -top-[7px] left-6 text-white/10 font-mono text-xs select-none pointer-events-none">+</div>
      <div className="absolute -top-[7px] right-6 text-white/10 font-mono text-xs select-none pointer-events-none">+</div>
      <div className="absolute -bottom-[7px] left-6 text-white/10 font-mono text-xs select-none pointer-events-none">+</div>
      <div className="absolute -bottom-[7px] right-6 text-white/10 font-mono text-xs select-none pointer-events-none">+</div>

      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-normal text-slate-400 tracking-wide mb-8"
        >
          Trusted by local businesses across industries
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16"
        >
          {clients.map((client) => {
            const Icon = client.icon;
            return (
              <motion.button
                key={client.name}
                type="button"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onSelectClient?.(client.name)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 group focus:outline-none cursor-pointer"
              >
                <div className="w-5 h-5 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base font-semibold tracking-tight">
                  {client.name}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
