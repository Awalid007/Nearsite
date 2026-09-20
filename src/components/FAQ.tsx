import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQProps {
  onAskQuestion?: () => void;
}

export const FAQ: React.FC<FAQProps> = () => {
  const faqs = [
    {
      id: 'faq-1',
      question: 'How quickly will we see results?',
      answer:
        "You'll start noticing positive changes within a few weeks as our solution takes effect. Clear, measurable results typically appear within a few months, depending on your project goals.",
    },
    {
      id: 'faq-2',
      question: 'Do you work with our existing tools?',
      answer:
        'Yes. We integrate directly with your existing CRM, booking platforms, POS, email marketing tools, and Google Business profile without interrupting your day-to-day workflow.',
    },
    {
      id: 'faq-3',
      question: "What if we're not satisfied?",
      answer:
        'We work in iterative milestones with design review rounds before writing code. You review and approve everything before we go live. We do not stop until you are completely confident in the outcome.',
    },
    {
      id: 'faq-4',
      question: 'Can we change services mid-contract?',
      answer:
        'Yes. As your business needs scale, you can pivot focus, add advanced features (like online dispatch or eCommerce), or adjust your ongoing growth tier at any time.',
    },
    {
      id: 'faq-5',
      question: 'How is this different from other agencies?',
      answer:
        'Most agencies take months, bury you in jargon, and charge $10,000+ retainers. We provide transparent pricing, live sites in as little as 2 weeks, and speak simple, straightforward language.',
    },
    {
      id: 'faq-6',
      question: 'Do you work in our industry?',
      answer:
        'We have designed and launched successful websites for restaurants, salons, plumbers, HVAC, gyms, real estate agents, dentists, lawyers, and specialized contractors across the country.',
    },
  ];

  const [openId, setOpenId] = useState<string>('faq-1');

  const toggle = (id: string) => {
    setOpenId((curr) => (curr === id ? '' : id));
  };

  return (
    <section id="faq-section" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#060e0e] overflow-hidden">
      {/* Decorative crosshairs */}
      <div className="absolute top-12 left-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>
      <div className="absolute top-12 right-8 text-white/10 font-mono text-xs select-none pointer-events-none hidden lg:block">+</div>

      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            FAQ QUESTION
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            We've got the answers
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="bg-[#0b1919] border border-white/10 hover:border-white/20 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className={isOpen ? 'text-emerald-400' : 'text-slate-400'}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-400 leading-relaxed pt-1 border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
