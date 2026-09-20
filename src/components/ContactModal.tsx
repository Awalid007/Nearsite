import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { submitContactToApp } from '../services/api';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContactToApp({
      name: form.name,
      email: form.email,
      message: form.message,
      createdAt: new Date().toISOString(),
    });
    setSent(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="contact-modal-overlay"
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
            className="relative w-full max-w-xl bg-[#0b1919] rounded-2xl sm:rounded-3xl shadow-2xl border border-white/15 overflow-hidden my-8 text-slate-200"
          >
        <div className="bg-[#0d1e1e] p-6 sm:p-8 flex items-start justify-between border-b border-white/10">
          <div>
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-emerald-400">
              Get in Touch
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Contact Nearsite
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              We're here to answer questions and jumpstart your local digital presence.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {sent ? (
          <div className="p-8 sm:p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-white">Message Received!</h4>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">
              Thanks for reaching out, {form.name || 'friend'}. We typically respond in less than 2 hours during business hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                onClose();
              }}
              className="bg-white hover:bg-slate-200 text-black font-semibold px-6 py-2.5 rounded-full text-sm"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Jane Smith"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#060e0e] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="jane@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#060e0e] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Your Message
              </label>
              <textarea
                rows={3}
                required
                placeholder="Tell us what you need help with..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#060e0e] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Response time: &lt; 2 hours</span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-white hover:bg-slate-200 text-black font-semibold text-xs px-5 py-2 rounded-full flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </form>
        )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
