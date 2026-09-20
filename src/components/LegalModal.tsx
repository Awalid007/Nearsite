import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  const isPrivacy = type === 'privacy';

  return (
    <AnimatePresence>
      {isOpen && type && (
        <motion.div
          id="legal-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#0b1919] rounded-2xl sm:rounded-3xl shadow-2xl border border-white/15 overflow-hidden my-8 text-slate-200"
          >
        <div className="bg-[#0d1e1e] p-6 sm:p-8 flex items-start justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
              </h3>
              <p className="text-xs text-slate-400">Effective as of 2026 • Aurivus / Nearsite</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto">
          {isPrivacy ? (
            <>
              <p>
                At Nearsite &amp; Aurivus, your privacy is our top priority. This document outlines the types of personal information collected and how it is protected.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">Information We Collect</h4>
              <p>
                When you request a quote or contact us, we collect basic contact details (name, email address, phone number, and business details). We never sell, rent, or trade your contact information to third parties.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">How We Use Your Information</h4>
              <p>
                We use the information solely to generate your custom website proposal, conduct local competitive analysis, and communicate directly with you regarding your web design sprint.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">Client Data Ownership</h4>
              <p>
                You retain 100% ownership of your business domain, design files, code assets, and media. We do not hold your website hostage.
              </p>
            </>
          ) : (
            <>
              <p>
                By engaging our web design and digital growth services, you agree to these transparent terms designed to protect both parties and ensure rapid project completion.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">Project Timelines &amp; 2-Week Guarantee</h4>
              <p>
                The 2-week launch timeline begins once the initial kickoff questionnaire and existing brand assets are provided. We work in rapid iterations with clear milestone approvals.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">Payment Terms &amp; Fixed Pricing</h4>
              <p>
                All pricing is flat and transparent. No surprise hidden hosting fees or maintenance charges without prior written consent.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">Revisions &amp; Approvals</h4>
              <p>
                Each project includes dedicated revision rounds before code deployment. We ensure you are 100% satisfied before taking the website live.
              </p>
            </>
          )}
        </div>

        <div className="p-4 bg-[#060e0e] border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-white hover:bg-slate-200 text-black font-semibold text-xs px-5 py-2 rounded-full cursor-pointer"
          >
            Close
          </button>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
