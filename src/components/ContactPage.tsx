import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
  Calendar,
  Zap,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { submitContactToApp } from '../services/api';

interface ContactPageProps {
  onBackToHome: () => void;
  onOpenQuote: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBackToHome, onOpenQuote }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    existingWebsite: '',
    serviceInterest: 'Complete Website ($699)',
    timeline: 'Within 2 weeks',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const servicesList = [
    'Complete Website ($699)',
    'Custom Web Design',
    'Mobile-First Redesign',
    'Local SEO & Google Setup',
    'Online Booking System',
  ];

  const timelineList = [
    'ASAP (Within 2 weeks)',
    'Within 1 month',
    'Planning ahead / Inquiring',
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    submitContactToApp({
      name: formData.name,
      email: formData.email,
      businessName: formData.businessName,
      existingWebsite: formData.existingWebsite,
      serviceInterest: formData.serviceInterest,
      timeline: formData.timeline,
      message: formData.message,
      createdAt: new Date().toISOString(),
    });
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#050c0c] text-[#f6f9f7] pt-28 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-emerald-400 selection:text-black relative overflow-hidden">
      {/* Refined subtle ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/[0.03] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="mb-8">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Direct Access • Fast Turnaround</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Let's Talk About Your Next Website
          </h1>

          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Reach out directly to <span className="text-white font-semibold">Ahmad</span>, Founder &amp; Lead Builder at Nearsite. No sales reps, no delay—just straight answers and custom-built websites.
          </p>
        </div>

        {/* Main Grid: Info Cards (Left) & Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Direct Founder Card & Highlights (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Founder Direct Card */}
            <div className="bg-[#081414] border border-white/10 rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-xl">
              <div className="flex items-center gap-4 mb-5">
                {/* Clean Professional Avatar with Emerald Accent */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-extrabold text-xl shadow-inner">
                    A
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#081414] rounded-full shadow-sm" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">Ahmad</h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Founder &amp; Builder
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Stafford, Virginia • Nearsite</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                “When you hire Nearsite, you collaborate with me directly from day one through launch. Every site is custom-crafted to deliver high conversion, quick load times, and top search ranking.”
              </p>

              {/* Direct Channels */}
              <div className="space-y-3 pt-2">
                {/* Email Direct */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-colors group">
                  <a
                    href="mailto:Nearsiteahmad@gmail.com"
                    className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Email Ahmad</div>
                      <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-400">Nearsiteahmad@gmail.com</div>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy('Nearsiteahmad@gmail.com')}
                    className="text-slate-500 hover:text-emerald-400 p-1.5 rounded-md hover:bg-white/5 transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Response Guarantee */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Response Window</div>
                    <div className="text-xs sm:text-sm font-semibold text-white">Under 2 hours (Mon–Sat, 8am–8pm EST)</div>
                  </div>
                </div>

                {/* Instant Booking CTA Button */}
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="w-full mt-2 py-2.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Book Free 30-Min Discovery Call Online →</span>
                </button>
              </div>
            </div>

            {/* Quick Guarantees Card */}
            <div className="bg-[#081414] border border-white/10 rounded-2xl p-5 shadow-lg space-y-3 text-xs text-slate-300">
              <div className="font-bold text-white flex items-center gap-2 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>The Nearsite Commitment</span>
              </div>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span><strong>$699 Fixed Package</strong> — No hidden fees or unexpected surcharges.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span><strong>14-Day Delivery</strong> — Rapid turnaround to get your site live fast.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span><strong>Stafford, VA &amp; Surrounding</strong> — Plus clients nationwide across the US.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Clean, Polished Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#081414] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                        Inquiry Received!
                      </h3>
                      <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                        Thank you, <strong className="text-white">{formData.name}</strong>. Ahmad has received your details for <strong className="text-emerald-400">{formData.businessName || 'your business'}</strong> and will follow up within 2 hours.
                      </p>
                    </div>

                    {/* Step-by-step next steps */}
                    <div className="max-w-md mx-auto bg-white/[0.02] border border-white/5 rounded-xl p-4 text-left space-y-2.5 text-xs text-slate-300">
                      <div className="font-semibold text-white text-[11px] uppercase tracking-wider text-slate-400">What happens next:</div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">1.</span>
                        <span>Direct review of your requirements and current online footprint.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">2.</span>
                        <span>A concise custom proposal &amp; timeline sent straight to your email.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">3.</span>
                        <span>Optional 15-minute intro video call to kick off.</span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            businessName: '',
                            existingWebsite: '',
                            serviceInterest: 'Complete Website ($699)',
                            timeline: 'Within 2 weeks',
                            message: '',
                          });
                        }}
                        className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Send Another Note
                      </button>

                      <button
                        type="button"
                        onClick={onBackToHome}
                        className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                      >
                        Back to Homepage
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        Send a Direct Message
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        Fill out the details below. We'll reply with a clear plan and free consultation.
                      </p>
                    </div>

                    {/* Service Selection Pills */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Service of Interest
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {servicesList.map((srv) => (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => setFormData({ ...formData, serviceInterest: srv })}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                              formData.serviceInterest === srv
                                ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20'
                                : 'bg-[#050c0c] border border-white/10 text-slate-300 hover:border-emerald-500/40'
                            }`}
                          >
                            {srv}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2-Column: Name & Business */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          Your Name <span className="text-emerald-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Michael Smith"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#050c0c] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          Business Name <span className="text-emerald-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          placeholder="e.g. Smith Home Services"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#050c0c] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="michael@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050c0c] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40 transition-all"
                      />
                    </div>

                    {/* Existing Website */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Current Website <span className="text-slate-500 normal-case font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.existingWebsite}
                        onChange={(e) => setFormData({ ...formData, existingWebsite: e.target.value })}
                        placeholder="https://currentsite.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050c0c] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40 transition-all"
                      />
                    </div>

                    {/* Timeline Selection */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Target Launch Timeline
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {timelineList.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setFormData({ ...formData, timeline: t })}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                              formData.timeline === t
                                ? 'bg-white text-black font-bold shadow-sm'
                                : 'bg-[#050c0c] border border-white/10 text-slate-300 hover:border-white/30'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Project Note */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Project Details &amp; Goals
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what you'd like your website to achieve (e.g. online booking, local SEO ranking, modern look)..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050c0c] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40 transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-black font-extrabold text-sm py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Sending to Ahmad...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message &amp; Get Free Consultation</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Zero spam. Direct reply from Ahmad within 2 hours.</span>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 3 Reassurance Value Pillars at Bottom */}
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-[#081414] border border-white/5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Under 2-Hour Response</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Direct email contact with Ahmad. No ticket queues or automated bots.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#081414] border border-white/5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Flat $699 Pricing</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Full custom design, mobile responsiveness, and SEO setup with 0 hidden retainers.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#081414] border border-white/5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">14-Day Delivery</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Fast execution from onboarding to domain launch so you start winning leads immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
