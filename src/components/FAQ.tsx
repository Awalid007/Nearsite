import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Accent, Reveal, SectionHead } from './ui';
import { FAQS } from '../data/homeData';

interface FAQProps {
  onAskQuestion: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onAskQuestion }) => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <SectionHead
          eyebrow="FAQ"
          title={
            <>
              Questions? <Accent>Answered.</Accent>
            </>
          }
          sub="Everything local business owners ask us before getting started."
        />

        <Reveal className="mt-12">
          <div className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-surface">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-btn-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-white/[0.03] sm:px-7 sm:py-6"
                    >
                      <span className="text-base font-semibold text-white sm:text-lg">{f.q}</span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? 'rotate-45 border-accent bg-accent text-[#060e0e]'
                            : 'border-white/15 text-slate-300'
                        }`}
                        aria-hidden="true"
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-btn-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-6 text-[15px] leading-relaxed text-slate-400 sm:px-7 sm:text-base">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>

        <p className="mt-8 text-center text-sm text-slate-400">
          Still have a question?{' '}
          <button
            type="button"
            onClick={onAskQuestion}
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            Ask us directly
          </button>
        </p>
      </div>
    </section>
  );
};
