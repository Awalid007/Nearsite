import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, Mail, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
  onSelectType?: (type: 'privacy' | 'terms') => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  type,
  onClose,
  onSelectType,
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  useEffect(() => {
    if (type) {
      setActiveTab(type);
    }
  }, [type]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleTabChange = (newTab: 'privacy' | 'terms') => {
    setActiveTab(newTab);
    if (onSelectType) onSelectType(newTab);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="legal-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            id="legal-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-[#091515] rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 overflow-hidden my-6 text-slate-200 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-[#0c1c1c] p-5 sm:p-7 border-b border-white/10 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    {activeTab === 'privacy' ? (
                      <ShieldCheck className="w-5 h-5" />
                    ) : (
                      <FileText className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Last updated: September 21, 2026 • Nearsite (Stafford, Virginia)
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  id="legal-modal-close-button"
                  onClick={onClose}
                  className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Document Switcher Tabs */}
              <div className="flex items-center gap-2 bg-[#060e0e] p-1.5 rounded-xl border border-white/5 self-start">
                <button
                  type="button"
                  id="legal-tab-privacy"
                  onClick={() => handleTabChange('privacy')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'privacy'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  id="legal-tab-terms"
                  onClick={() => handleTabChange('terms')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'terms'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Terms of Service
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed overflow-y-auto pr-4 select-text">
              {activeTab === 'privacy' ? (
                <div className="space-y-6">
                  {/* 1. INTRODUCTION */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">1</span>
                      <h4>INTRODUCTION</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      Welcome to Nearsite (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are a web design and development agency based in Stafford, Virginia. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website at <span className="text-emerald-400 font-medium">nearsite.co</span> or contact us about our services.
                    </p>
                    <p className="text-slate-300 pl-8">
                      By using our website, you agree to the terms of this Privacy Policy.
                    </p>
                  </section>

                  {/* 2. INFORMATION WE COLLECT */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">2</span>
                      <h4>INFORMATION WE COLLECT</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      We may collect the following information when you:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-10 text-slate-300">
                      <li>Fill out a contact or quote form</li>
                      <li>Book a discovery call</li>
                      <li>Send us an email</li>
                    </ul>
                    <p className="text-slate-300 pl-8 pt-1">
                      Information collected includes:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-10 text-slate-300">
                      <li>Full name</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Business name</li>
                      <li>Website URL (if applicable)</li>
                      <li>Any messages or notes you submit</li>
                    </ul>
                    <div className="pl-8 pt-2">
                      <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200/90 text-xs">
                        <strong>Payment Notice:</strong> We do NOT collect payment information directly. All payments are processed through secure third-party platforms (Zelle, Venmo, PayPal).
                      </div>
                    </div>
                  </section>

                  {/* 3. HOW WE USE YOUR INFORMATION */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">3</span>
                      <h4>HOW WE USE YOUR INFORMATION</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      We use the information you provide solely to:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-10 text-slate-300">
                      <li>Respond to your inquiries and requests</li>
                      <li>Schedule and conduct discovery calls</li>
                      <li>Deliver the services you have purchased</li>
                      <li>Send project updates and invoices</li>
                      <li>Improve our website and services</li>
                    </ul>
                    <p className="text-slate-200 font-semibold pl-8 pt-1">
                      We will NEVER sell, rent, or share your personal information with third parties for marketing purposes.
                    </p>
                  </section>

                  {/* 4. COOKIES & ANALYTICS */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">4</span>
                      <h4>COOKIES &amp; ANALYTICS</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      Our website may use cookies and Google Analytics to understand how visitors use our site. This data is anonymous and does not identify you personally.
                    </p>
                    <p className="text-slate-300 pl-8">
                      Information collected through analytics includes:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-10 text-slate-300">
                      <li>Pages visited</li>
                      <li>Time spent on site</li>
                      <li>General location (city/country level)</li>
                      <li>Device and browser type</li>
                    </ul>
                    <p className="text-slate-400 pl-8 text-xs pt-1">
                      You can disable cookies at any time through your browser settings.
                    </p>
                  </section>

                  {/* 5. DATA STORAGE & SECURITY */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">5</span>
                      <h4>DATA STORAGE &amp; SECURITY</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      Your information is stored securely and only accessible by Nearsite team members who need it to deliver your services.
                    </p>
                    <p className="text-slate-300 pl-8">
                      We take reasonable steps to protect your data from unauthorized access, loss, or misuse. However, no method of transmission over the internet is 100% secure.
                    </p>
                    <p className="text-slate-300 pl-8">
                      We retain your data for as long as necessary to deliver our services and comply with legal obligations.
                    </p>
                  </section>

                  {/* 6. THIRD-PARTY SERVICES */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">6</span>
                      <h4>THIRD-PARTY SERVICES</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      We may use the following third-party tools to operate our business:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-10 text-slate-300">
                      <li><strong className="text-slate-200">Google Analytics</strong> — website traffic analysis</li>
                      <li><strong className="text-slate-200">Google Calendar</strong> — scheduling discovery calls</li>
                      <li><strong className="text-slate-200">PayPal / Venmo / Zelle</strong> — payment processing</li>
                      <li><strong className="text-slate-200">Framer</strong> — website hosting</li>
                      <li><strong className="text-slate-200">Email providers</strong> — client communication</li>
                    </ul>
                    <p className="text-slate-400 pl-8 text-xs pt-1">
                      Each of these services has its own privacy policy and data practices. We are not responsible for their data handling.
                    </p>
                  </section>

                  {/* 7. YOUR RIGHTS */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">7</span>
                      <h4>YOUR RIGHTS</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      You have the right to:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-10 text-slate-300">
                      <li>Request a copy of the information we hold about you</li>
                      <li>Ask us to correct any inaccurate information</li>
                      <li>Ask us to delete your personal information</li>
                      <li>Opt out of any future communications from us</li>
                    </ul>
                    <p className="text-slate-300 pl-8 pt-2">
                      To exercise any of these rights, email us at:{' '}
                      <a
                        href="mailto:Nearsiteahmad@gmail.com"
                        className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2"
                      >
                        Nearsiteahmad@gmail.com
                      </a>
                    </p>
                    <p className="text-slate-400 pl-8 text-xs">
                      We will respond within 5 business days.
                    </p>
                  </section>

                  {/* 8. CHILDREN'S PRIVACY */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">8</span>
                      <h4>CHILDREN&rsquo;S PRIVACY</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      Our website is not directed at children under the age of 13. We do not knowingly collect personal information from children.
                    </p>
                  </section>

                  {/* 9. CHANGES TO THIS POLICY */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">9</span>
                      <h4>CHANGES TO THIS POLICY</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      We may update this Privacy Policy from time to time. When we do, we will update the &ldquo;Last updated&rdquo; date at the top of this page.
                    </p>
                    <p className="text-slate-400 pl-8 text-xs">
                      We encourage you to review this policy periodically.
                    </p>
                  </section>

                  {/* 10. CONTACT US */}
                  <section className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">10</span>
                      <h4>CONTACT US</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      If you have any questions about this Privacy Policy or how we handle your data, please contact us:
                    </p>
                    <div className="pl-8 text-slate-300 space-y-1 text-xs sm:text-sm">
                      <p className="font-semibold text-white">Nearsite</p>
                      <p className="text-slate-400">Stafford, Virginia</p>
                      <p>
                        Email:{' '}
                        <a
                          href="mailto:Nearsiteahmad@gmail.com"
                          className="text-emerald-400 hover:text-emerald-300 font-medium"
                        >
                          Nearsiteahmad@gmail.com
                        </a>
                      </p>
                      <p>
                        Website:{' '}
                        <a
                          href="https://nearsite-iota.vercel.app/"
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1"
                        >
                          https://nearsite-iota.vercel.app/
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </p>
                    </div>
                    <p className="text-slate-500 text-xs pl-8 pt-3">
                      &copy; 2026 Nearsite. All rights reserved.
                    </p>
                  </section>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* 1. SERVICES */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">1</span>
                      <h4>SERVICES</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      Nearsite provides web design and development services for local businesses. All project scopes, timelines, and pricing are agreed upon before work begins.
                    </p>
                  </section>

                  {/* 2. PAYMENT */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">2</span>
                      <h4>PAYMENT</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      A 50% deposit is required before any work starts. The remaining 50% is due upon project completion and before the website goes live.
                    </p>
                  </section>

                  {/* 3. REVISIONS */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">3</span>
                      <h4>REVISIONS</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      Each package includes a set number of revision rounds as outlined in your package details. Additional revisions beyond the included rounds may incur extra charges.
                    </p>
                  </section>

                  {/* 4. TIMELINE */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">4</span>
                      <h4>TIMELINE</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      Standard delivery is 1&ndash;2 weeks from deposit receipt and receipt of all required content (logo, photos, copy). Delays caused by the client may extend the timeline.
                    </p>
                  </section>

                  {/* 5. CLIENT RESPONSIBILITIES */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">5</span>
                      <h4>CLIENT RESPONSIBILITIES</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      The client agrees to provide necessary content, feedback, and approvals in a timely manner. Nearsite is not responsible for delays caused by late client responses.
                    </p>
                  </section>

                  {/* 6. OWNERSHIP */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">6</span>
                      <h4>OWNERSHIP</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      Upon final payment, the client owns the completed website. Nearsite retains the right to display the work in its portfolio unless the client requests otherwise in writing.
                    </p>
                  </section>

                  {/* 7. REFUNDS */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">7</span>
                      <h4>REFUNDS</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      Deposits are non-refundable once work has begun. If Nearsite is unable to complete the project, a full refund will be issued.
                    </p>
                  </section>

                  {/* 8. SATISFACTION GUARANTEE */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">8</span>
                      <h4>SATISFACTION GUARANTEE</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      We work with you until you are happy with the result, within the agreed revision rounds.
                    </p>
                  </section>

                  {/* 9. LIMITATION OF LIABILITY */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">9</span>
                      <h4>LIMITATION OF LIABILITY</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      Nearsite is not liable for any indirect or consequential damages arising from the use of the delivered website.
                    </p>
                  </section>

                  {/* 10. GOVERNING LAW */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">10</span>
                      <h4>GOVERNING LAW</h4>
                    </div>
                    <p className="text-slate-300 pl-8">
                      These terms are governed by the laws of the State of Virginia, USA.
                    </p>
                  </section>

                  {/* Contact / Footer */}
                  <section className="space-y-2 pt-4 border-t border-white/5">
                    <p className="text-slate-300 pl-8">
                      Questions? Contact us at{' '}
                      <a
                        href="mailto:Nearsiteahmad@gmail.com"
                        className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2"
                      >
                        Nearsiteahmad@gmail.com
                      </a>
                    </p>
                    <p className="text-slate-500 text-xs pl-8 pt-1">
                      &copy; 2026 Nearsite. All rights reserved.
                    </p>
                  </section>
                </div>
              )}
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="p-4 bg-[#060e0e] border-t border-white/10 flex items-center justify-between gap-3">
              <a
                href="mailto:Nearsiteahmad@gmail.com"
                className="text-xs text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nearsiteahmad@gmail.com</span>
              </a>

              <button
                type="button"
                id="legal-modal-footer-close"
                onClick={onClose}
                className="bg-white hover:bg-slate-200 text-black font-semibold text-xs px-6 py-2 rounded-full transition-colors cursor-pointer"
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
