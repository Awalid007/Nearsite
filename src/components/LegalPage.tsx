import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  FileText,
  ArrowLeft,
  Printer,
  Copy,
  Check,
  Mail,
  ExternalLink,
  MapPin,
  Calendar,
  Lock,
  Scale,
  Clock,
  Sparkles,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LegalPageProps {
  initialType?: 'privacy' | 'terms';
  onBackToHome: () => void;
  onOpenContact?: () => void;
  onOpenQuote?: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  initialType = 'privacy',
  onBackToHome,
  onOpenContact,
  onOpenQuote,
}) => {
  const [activeDoc, setActiveDoc] = useState<'privacy' | 'terms'>(initialType);
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setActiveDoc(initialType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialType]);

  // Update hash when switching tab
  const handleSwitchDoc = (doc: 'privacy' | 'terms') => {
    setActiveDoc(doc);
    window.history.replaceState(null, '', `#${doc}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    const url = window.location.origin + window.location.pathname + `#${activeDoc}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const privacySections = [
    { id: 'privacy-1', title: '1. Introduction' },
    { id: 'privacy-2', title: '2. Information We Collect' },
    { id: 'privacy-3', title: '3. How We Use Your Information' },
    { id: 'privacy-4', title: '4. Cookies & Analytics' },
    { id: 'privacy-5', title: '5. Data Storage & Security' },
    { id: 'privacy-6', title: '6. Third-Party Services' },
    { id: 'privacy-7', title: '7. Your Rights' },
    { id: 'privacy-8', title: '8. Children\'s Privacy' },
    { id: 'privacy-9', title: '9. Changes to This Policy' },
    { id: 'privacy-10', title: '10. Contact Us' },
  ];

  const termsSections = [
    { id: 'terms-1', title: '1. Services' },
    { id: 'terms-2', title: '2. Payment' },
    { id: 'terms-3', title: '3. Revisions' },
    { id: 'terms-4', title: '4. Timeline' },
    { id: 'terms-5', title: '5. Client Responsibilities' },
    { id: 'terms-6', title: '6. Ownership' },
    { id: 'terms-7', title: '7. Refunds' },
    { id: 'terms-8', title: '8. Satisfaction Guarantee' },
    { id: 'terms-9', title: '9. Limitation of Liability' },
    { id: 'terms-10', title: '10. Governing Law' },
  ];

  return (
    <div className="min-h-screen bg-[#050c0c] text-[#f6f9f7] pt-28 pb-28 px-4 sm:px-6 lg:px-8 selection:bg-emerald-400 selection:text-black relative overflow-hidden">
      {/* Background glow ambiance */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/[0.03] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button
            type="button"
            id="legal-back-to-home-btn"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          {/* Quick utility tools */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="legal-copy-link-btn"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Copy shareable link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              type="button"
              id="legal-print-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Print document or save to PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 mb-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Scale className="w-3.5 h-3.5" />
              <span>Official Legal Documentation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {activeDoc === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h1>

            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              {activeDoc === 'privacy'
                ? 'How Nearsite collects, uses, and safeguards client and visitor data in accordance with Virginia law and fair business practices.'
                : 'The operational terms, delivery timelines, payment schedules, and client protections governing web design projects with Nearsite.'}
            </p>

            {/* Document Metadata Bar */}
            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Last Updated: <strong className="text-slate-200">September 21, 2026</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Jurisdiction: <strong className="text-slate-200">Stafford, Virginia, USA</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct Contact: <a href="mailto:Nearsiteahmad@gmail.com" className="text-emerald-400 hover:underline">Nearsiteahmad@gmail.com</a></span>
              </div>
            </div>
          </div>

          {/* Document Switcher Tabs */}
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              id="switch-to-privacy-tab"
              onClick={() => handleSwitchDoc('privacy')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeDoc === 'privacy'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Privacy Policy</span>
            </button>

            <button
              type="button"
              id="switch-to-terms-tab"
              onClick={() => handleSwitchDoc('terms')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeDoc === 'terms'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Terms of Service</span>
            </button>
          </div>
        </div>

        {/* 2-Column Main Layout: Sticky Sidebar (Left) + Document Content (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sticky Left Sidebar (Table of Contents + Founder Card) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Table of Contents Card */}
            <div className="bg-[#081515] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>Contents</span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  ({activeDoc === 'privacy' ? privacySections.length : termsSections.length} Sections)
                </span>
              </h3>

              <nav className="space-y-1">
                {(activeDoc === 'privacy' ? privacySections : termsSections).map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between group cursor-pointer ${
                      activeSectionId === sec.id
                        ? 'bg-emerald-500/15 text-emerald-300 font-semibold border-l-2 border-emerald-400'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate">{sec.title}</span>
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0" />
                  </button>
                ))}
              </nav>
            </div>

            {/* Direct Contact Card for Legal Questions */}
            <div className="bg-[#081515] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-base">
                  A
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Questions about our terms?</h4>
                  <p className="text-xs text-slate-400">Direct Founder Contact</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                We believe in straightforward, plain-English contracts with zero hidden clauses. Feel free to contact Ahmad directly.
              </p>

              <a
                href="mailto:Nearsiteahmad@gmail.com"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold text-xs transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Nearsiteahmad@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right Column: Full Document Text Canvas */}
          <div className="lg:col-span-8 space-y-8 text-slate-200">
            {activeDoc === 'privacy' ? (
              <div className="space-y-6">
                {/* 1. INTRODUCTION */}
                <article
                  id="privacy-1"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      1
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      INTRODUCTION
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Welcome to Nearsite (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are a web design and development agency based in Stafford, Virginia. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website at <strong className="text-white">near&shy;site.co</strong> or contact us about our services.
                  </p>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    By using our website, you agree to the terms of this Privacy Policy.
                  </p>
                </article>

                {/* 2. INFORMATION WE COLLECT */}
                <article
                  id="privacy-2"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      2
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      INFORMATION WE COLLECT
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    We may collect the following information when you:
                  </p>
                  <ul className="space-y-2 text-sm sm:text-base text-slate-300 pl-2">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>Fill out a contact or quote form</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>Book a discovery call</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>Send us an email</span>
                    </li>
                  </ul>

                  <p className="text-slate-300 font-semibold pt-2 text-sm sm:text-base">
                    Information collected includes:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {['Full name', 'Email address', 'Phone number', 'Business name', 'Website URL (if applicable)', 'Any messages or notes you submit'].map((item) => (
                      <div key={item} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs sm:text-sm text-slate-300 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Payment Protection Callout */}
                  <div className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
                    <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-slate-300">
                      <strong className="text-emerald-300 font-semibold block mb-0.5">Secure Third-Party Payments:</strong>
                      We do NOT collect payment information directly. All payments are processed through secure third-party platforms (Zelle, Venmo, PayPal).
                    </div>
                  </div>
                </article>

                {/* 3. HOW WE USE YOUR INFORMATION */}
                <article
                  id="privacy-3"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      3
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      HOW WE USE YOUR INFORMATION
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    We use the information you provide solely to:
                  </p>
                  <ul className="space-y-2 text-sm sm:text-base text-slate-300 pl-2">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>Respond to your inquiries and requests</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>Schedule and conduct discovery calls</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>Deliver the services you have purchased</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>Send project updates and invoices</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>Improve our website and services</span>
                    </li>
                  </ul>

                  <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-white font-semibold">
                    🛡️ We will NEVER sell, rent, or share your personal information with third parties for marketing purposes.
                  </div>
                </article>

                {/* 4. COOKIES & ANALYTICS */}
                <article
                  id="privacy-4"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      4
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      COOKIES &amp; ANALYTICS
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Our website may use cookies and Google Analytics to understand how visitors use our site. This data is anonymous and does not identify you personally.
                  </p>
                  <p className="text-slate-300 font-semibold pt-1 text-sm sm:text-base">
                    Information collected through analytics includes:
                  </p>
                  <ul className="space-y-2 text-sm sm:text-base text-slate-300 pl-2">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>Pages visited</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>Time spent on site</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>General location (city/country level)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>Device and browser type</span>
                    </li>
                  </ul>
                  <p className="text-slate-400 text-xs sm:text-sm pt-2">
                    You can disable cookies at any time through your browser settings.
                  </p>
                </article>

                {/* 5. DATA STORAGE & SECURITY */}
                <article
                  id="privacy-5"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      5
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      DATA STORAGE &amp; SECURITY
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Your information is stored securely and only accessible by Nearsite team members who need it to deliver your services.
                  </p>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    We take reasonable steps to protect your data from unauthorized access, loss, or misuse. However, no method of transmission over the internet is 100% secure.
                  </p>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    We retain your data for as long as necessary to deliver our services and comply with legal obligations.
                  </p>
                </article>

                {/* 6. THIRD-PARTY SERVICES */}
                <article
                  id="privacy-6"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      6
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      THIRD-PARTY SERVICES
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    We may use the following third-party tools to operate our business:
                  </p>
                  <div className="space-y-2.5 pt-1">
                    {[
                      { name: 'Google Analytics', purpose: 'website traffic analysis' },
                      { name: 'Google Calendar', purpose: 'scheduling discovery calls' },
                      { name: 'PayPal / Venmo / Zelle', purpose: 'payment processing' },
                      { name: 'Framer', purpose: 'website hosting' },
                      { name: 'Email providers', purpose: 'client communication' },
                    ].map((tool) => (
                      <div key={tool.name} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-semibold text-white">{tool.name}</span>
                        <span className="text-slate-400">{tool.purpose}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm pt-2">
                    Each of these services has its own privacy policy and data practices. We are not responsible for their data handling.
                  </p>
                </article>

                {/* 7. YOUR RIGHTS */}
                <article
                  id="privacy-7"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      7
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      YOUR RIGHTS
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    You have the right to:
                  </p>
                  <ul className="space-y-2 text-sm sm:text-base text-slate-300 pl-2">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>Request a copy of the information we hold about you</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>Ask us to correct any inaccurate information</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>Ask us to delete your personal information</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>Opt out of any future communications from us</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-slate-200">
                    To exercise any of these rights, email us at:{' '}
                    <a
                      href="mailto:Nearsiteahmad@gmail.com"
                      className="text-emerald-400 font-bold hover:underline"
                    >
                      Nearsiteahmad@gmail.com
                    </a>
                    . We will respond within <strong>5 business days</strong>.
                  </div>
                </article>

                {/* 8. CHILDREN'S PRIVACY */}
                <article
                  id="privacy-8"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      8
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      CHILDREN&rsquo;S PRIVACY
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Our website is not directed at children under the age of 13. We do not knowingly collect personal information from children.
                  </p>
                </article>

                {/* 9. CHANGES TO THIS POLICY */}
                <article
                  id="privacy-9"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      9
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      CHANGES TO THIS POLICY
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    We may update this Privacy Policy from time to time. When we do, we will update the &ldquo;Last updated&rdquo; date at the top of this page.
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    We encourage you to review this policy periodically.
                  </p>
                </article>

                {/* 10. CONTACT US */}
                <article
                  id="privacy-10"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      10
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      CONTACT US
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    If you have any questions about this Privacy Policy or how we handle your data, please contact us:
                  </p>
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs sm:text-sm">
                    <p className="font-bold text-white text-base">Nearsite</p>
                    <p className="text-slate-300 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Stafford, Virginia, USA</span>
                    </p>
                    <p className="text-slate-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Email: </span>
                      <a href="mailto:Nearsiteahmad@gmail.com" className="text-emerald-400 font-medium hover:underline">
                        Nearsiteahmad@gmail.com
                      </a>
                    </p>
                    <p className="text-slate-300 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Website: </span>
                      <a href="https://nearsite-iota.vercel.app/" target="_blank" rel="noreferrer" className="text-emerald-400 font-medium hover:underline">
                        https://nearsite-iota.vercel.app/
                      </a>
                    </p>
                  </div>
                  <p className="text-slate-500 text-xs pt-2">
                    &copy; 2026 Nearsite. All rights reserved.
                  </p>
                </article>
              </div>
            ) : (
              <div className="space-y-6">
                {/* 1. SERVICES */}
                <article
                  id="terms-1"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      1
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      SERVICES
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Nearsite provides web design and development services for local businesses. All project scopes, timelines, and pricing are agreed upon before work begins.
                  </p>
                </article>

                {/* 2. PAYMENT */}
                <article
                  id="terms-2"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      2
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      PAYMENT
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    A <strong className="text-white font-semibold">50% deposit</strong> is required before any work starts. The remaining <strong className="text-white font-semibold">50%</strong> is due upon project completion and before the website goes live.
                  </p>
                  <div className="mt-2 p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs sm:text-sm text-emerald-200">
                    Transparent milestones: Zero surprise fees. Final payment is only requested after website review and approval prior to public deployment.
                  </div>
                </article>

                {/* 3. REVISIONS */}
                <article
                  id="terms-3"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      3
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      REVISIONS
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Each package includes a set number of revision rounds as outlined in your package details. Additional revisions beyond the included rounds may incur extra charges.
                  </p>
                </article>

                {/* 4. TIMELINE */}
                <article
                  id="terms-4"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      4
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      TIMELINE
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Standard delivery is <strong className="text-white font-semibold">1&ndash;2 weeks</strong> from deposit receipt and receipt of all required content (logo, photos, copy). Delays caused by the client may extend the timeline.
                  </p>
                </article>

                {/* 5. CLIENT RESPONSIBILITIES */}
                <article
                  id="terms-5"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      5
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      CLIENT RESPONSIBILITIES
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    The client agrees to provide necessary content, feedback, and approvals in a timely manner. Nearsite is not responsible for delays caused by late client responses.
                  </p>
                </article>

                {/* 6. OWNERSHIP */}
                <article
                  id="terms-6"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      6
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      OWNERSHIP
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Upon final payment, the client owns the completed website. Nearsite retains the right to display the work in its portfolio unless the client requests otherwise in writing.
                  </p>
                </article>

                {/* 7. REFUNDS */}
                <article
                  id="terms-7"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      7
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      REFUNDS
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Deposits are non-refundable once work has begun. If Nearsite is unable to complete the project, a full refund will be issued.
                  </p>
                </article>

                {/* 8. SATISFACTION GUARANTEE */}
                <article
                  id="terms-8"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      8
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      SATISFACTION GUARANTEE
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    We work with you until you are happy with the result, within the agreed revision rounds.
                  </p>
                </article>

                {/* 9. LIMITATION OF LIABILITY */}
                <article
                  id="terms-9"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      9
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      LIMITATION OF LIABILITY
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Nearsite is not liable for any indirect or consequential damages arising from the use of the delivered website.
                  </p>
                </article>

                {/* 10. GOVERNING LAW */}
                <article
                  id="terms-10"
                  className="bg-[#081515] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      10
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      GOVERNING LAW
                    </h2>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    These terms are governed by the laws of the <strong className="text-white">State of Virginia, USA</strong>.
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
                    <p>
                      Questions? Contact us at{' '}
                      <a href="mailto:Nearsiteahmad@gmail.com" className="text-emerald-400 font-semibold hover:underline">
                        Nearsiteahmad@gmail.com
                      </a>
                    </p>
                    <p>&copy; 2026 Nearsite. All rights reserved.</p>
                  </div>
                </article>
              </div>
            )}

            {/* Bottom Navigation between Documents */}
            <div className="p-6 rounded-2xl bg-[#081515] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => handleSwitchDoc(activeDoc === 'privacy' ? 'terms' : 'privacy')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                {activeDoc === 'privacy' ? (
                  <>
                    <span>Switch to Terms of Service</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </>
                ) : (
                  <>
                    <ArrowLeft className="w-4 h-4" />
                    <span>Switch to Privacy Policy</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onBackToHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                <span>Return to Homepage</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
