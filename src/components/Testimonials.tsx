import React, { useState } from 'react';
import { motion } from 'motion/react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 'marcus',
      name: 'Marcus Chen',
      role: 'Chief Marketing Officer',
      company: 'GrowthVentures',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      quote:
        'I had to remove our SDRs from Slack notifications, otherwise they got excited every 5 minutes when a new qualified lead booked. The ROI within the first 60 days was unprecedented.',
    },
    {
      id: 'joakim',
      name: 'Joakim Bertilsson',
      role: 'Revenue Operations Manager',
      company: 'NordicScale',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      quote:
        'Our previous agency took four months and delivered nothing measurable. Nearsite and the team had us operational with a high-converting digital machine in under two weeks.',
    },
    {
      id: 'maria',
      name: 'Maria S.',
      role: 'Owner',
      company: 'Bloom Hair Studio',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      quote:
        'Our bookings doubled in the first month after the new site went live. Clients constantly tell us how easy it is to book on their phones. Best investment we made this year.',
    },
    {
      id: 'carlos',
      name: 'Carlos M.',
      role: 'Owner',
      company: "Joe's Plumbing",
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      quote:
        'I was skeptical about spending money on a website. But we got 14 new emergency calls in our first two weeks live. The site literally paid for itself before the month was out.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="testimonials-section" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#060e0e] overflow-hidden">
      {/* Decorative crosshairs */}
      <div className="absolute top-12 left-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>
      <div className="absolute top-12 right-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>

      <div className="max-w-5xl mx-auto">
        {/* Section Header with Trust count on right matching screenshot */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Trusted by the world's <br className="hidden sm:inline" />
              leading teams
            </h2>
          </motion.div>

          {/* Right: Avatar stack & 20+ Companies trust us */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 bg-[#0b1919] border border-white/10 px-4 py-2 rounded-full w-fit shadow-sm"
          >
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                alt="Reviewer"
                className="h-6 w-6 rounded-full ring-2 ring-[#0b1919] object-cover"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                alt="Reviewer"
                className="h-6 w-6 rounded-full ring-2 ring-[#0b1919] object-cover"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80"
                alt="Reviewer"
                className="h-6 w-6 rounded-full ring-2 ring-[#0b1919] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center gap-1 text-emerald-400 text-xs">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <span className="text-xs text-slate-300 font-medium">
              <strong className="text-white">20+ Companies</strong> trust us
            </span>
          </motion.div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {testimonials.slice(0, 3).map((item, idx) => {
            const isFeatured = idx === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`bg-[#0b1919] border ${
                  isFeatured ? 'border-emerald-500/40 ring-1 ring-emerald-500/20 shadow-lg shadow-emerald-500/5' : 'border-white/10'
                } rounded-2xl p-7 flex flex-col justify-between transition-colors duration-300 relative group cursor-default`}
              >
                <div>
                  {/* User info */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-11 h-11 rounded-full object-cover border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-400 font-normal">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-emerald-400 text-xs mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                    <span className="text-xs text-slate-400 ml-1">5.0</span>
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    "{item.quote}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom review carousel controls */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex ? 'w-8 bg-emerald-400' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
