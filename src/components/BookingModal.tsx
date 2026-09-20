import React, { useState, useEffect } from 'react';
import { X, Check, ArrowLeft, ArrowRight, Calendar, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { submitBookingToApp } from '../services/api';

interface PackageItem {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  price: number;
}

export const PKG_ITEMS: PackageItem[] = [
  { id: 'website', emoji: '🌐', name: 'Professional Custom Website', desc: 'Fully custom design built for your brand', price: 300 },
  { id: 'mobile', emoji: '📱', name: 'Mobile + Desktop Optimization', desc: 'Looks perfect on every screen size', price: 75 },
  { id: 'seo', emoji: '🔎', name: 'Basic SEO Setup', desc: 'Get found on Google by local customers', price: 75 },
  { id: 'booking', emoji: '📅', name: 'Online Booking System', desc: 'Let clients book appointments 24/7', price: 75 },
  { id: 'quote', emoji: '💰', name: 'Quote / Request-a-Quote Form', desc: 'Capture leads with instant quote requests', price: 50 },
  { id: 'contact', emoji: '📩', name: 'Contact + Lead Capture Form', desc: 'Never miss an inquiry again', price: 40 },
  { id: 'domain', emoji: '🔗', name: 'Custom Domain — 1 Year', desc: 'Your own .com included free for 1 year', price: 20 },
  { id: 'hosting', emoji: '☁️', name: 'Hosting — 1 Year', desc: 'Fast, reliable hosting included', price: 40 },
  { id: 'ai', emoji: '🎙️', name: 'AI Voice Chat', desc: 'AI assistant answers questions on your site', price: 99 },
];

export const BUNDLE_PRICE = 699;
export const BUNDLE_VALUE = 774;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPlan?: string;
  prefilledBusiness?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedPlan,
  prefilledBusiness,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selected features: start cleared so user can pick their own custom items or choose bundle
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(
    new Set<string>()
  );

  // Calendar state
  const [calDate, setCalDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Form details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [bizName, setBizName] = useState(prefilledBusiness || '');
  const [bizType, setBizType] = useState('');
  const [budget, setBudget] = useState('Under $800');
  const [notes, setNotes] = useState('');

  // When props change
  useEffect(() => {
    if (prefilledBusiness) {
      setBizName(prefilledBusiness);
    }
    // Only pre-select all if explicitly triggered with a bundle request
    if (preselectedPlan && preselectedPlan.toLowerCase().includes('bundle')) {
      setSelectedFeatures(new Set(PKG_ITEMS.map((item) => item.id)));
    }
  }, [prefilledBusiness, preselectedPlan]);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      // Find the next available business day for convenience
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      while (tomorrow.getDay() === 0 || tomorrow.getDay() === 6) {
        tomorrow.setDate(tomorrow.getDate() + 1);
      }
      setSelectedDate(tomorrow);
      setSelectedTime('10:00 AM');
    }
  }, [isOpen]);

  const toggleFeature = (id: string) => {
    const next = new Set(selectedFeatures);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedFeatures(next);
  };

  const selectAllFeatures = () => {
    setSelectedFeatures(new Set(PKG_ITEMS.map((item) => item.id)));
  };

  const clearAllFeatures = () => {
    setSelectedFeatures(new Set());
  };

  // Pricing calculations
  const count = selectedFeatures.size;
  const allSelected = count === PKG_ITEMS.length;
  const indivValue = PKG_ITEMS.filter((i) => selectedFeatures.has(i.id)).reduce((s, i) => s + i.price, 0);
  const price = allSelected ? BUNDLE_PRICE : indivValue;
  const servicePriceString = allSelected ? `$${BUNDLE_PRICE} (Bundle Deal)` : `$${indivValue}`;
  const serviceNames = PKG_ITEMS.filter((i) => selectedFeatures.has(i.id)).map((i) => i.name).join(', ');

  // Calendar navigation
  const handlePrevMonth = () => {
    setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const calYear = calDate.getFullYear();
  const calMonth = calDate.getMonth();

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'
  ];
  const unavailableSlots = [2, 5, 9]; // realistic demo slots

  const budgetOptions = [
    'Under $800',
    '$800–$1,500',
    '$1,500–$2,500',
    '$2,500+',
    'Not sure',
    'Flexible',
  ];

  const formatDate = (d: Date | null) => {
    if (!d) return '';
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Step 1 -> Step 2
  const handleStep1Continue = () => {
    if (selectedFeatures.size === 0) {
      alert('Please select at least one feature for your website.');
      return;
    }
    setCurrentStep(2);
  };

  // Step 2 -> Step 3
  const handleStep2Continue = () => {
    if (!selectedDate) {
      alert('Please pick a date for your discovery call.');
      return;
    }
    if (!selectedTime) {
      alert('Please pick a time slot for your call.');
      return;
    }
    setCurrentStep(3);
  };

  // Step 3 -> Step 4
  const handleStep3Continue = () => {
    if (!firstName.trim() || !email.trim() || !bizName.trim()) {
      alert('Please fill in your first name, email, and business name.');
      return;
    }
    setCurrentStep(4);
  };

  // Confirm booking -> Step 5
  const handleConfirmBooking = () => {
    submitBookingToApp({
      selectedFeatures: Array.from(selectedFeatures),
      date: selectedDate ? selectedDate.toISOString() : undefined,
      timeSlot: selectedTime,
      firstName,
      lastName,
      email,
      bizName,
      bizType,
      budget,
      notes,
      createdAt: new Date().toISOString(),
    });
    setCurrentStep(5);
  };

  const handleResetAndClose = () => {
    onClose();
    setTimeout(() => {
      setCurrentStep(1);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="booking-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleResetAndClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[800px] bg-[#0c1212] rounded-2xl sm:rounded-3xl shadow-2xl border border-white/15 overflow-hidden my-6 text-slate-100 selection:bg-emerald-400 selection:text-black"
          >
            {/* Modal Header Bar */}
            <div className="bg-[#0e1717] px-6 py-5 sm:px-8 sm:py-6 border-b border-white/10 flex items-start justify-between relative">
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Free 30-min discovery call</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Book a <span className="text-emerald-400">Free Discovery Call</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Tell us about your business and we'll show you exactly what your new website can do for you.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer shrink-0 ml-4"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Indicator (1 to 4) */}
            {currentStep < 5 && (
              <div className="bg-[#090f0f] border-b border-white/5 px-4 sm:px-8 py-3.5 flex items-center justify-center gap-2 sm:gap-4 text-xs font-medium">
                {[
                  { num: 1, label: 'Service' },
                  { num: 2, label: 'Schedule' },
                  { num: 3, label: 'Details' },
                  { num: 4, label: 'Confirm' },
                ].map((step, idx, arr) => {
                  const isActive = currentStep === step.num;
                  const isDone = currentStep > step.num;
                  return (
                    <React.Fragment key={step.num}>
                      <div
                        onClick={() => {
                          if (step.num < currentStep) setCurrentStep(step.num);
                        }}
                        className={`flex items-center gap-1.5 sm:gap-2 select-none ${
                          isDone ? 'cursor-pointer text-emerald-400' : isActive ? 'text-white font-bold' : 'text-slate-500'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                              : isDone
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-white/5 border border-white/10 text-slate-400'
                          }`}
                        >
                          {isDone ? '✓' : step.num}
                        </div>
                        <span className="hidden xs:inline text-xs">{step.label}</span>
                      </div>
                      {idx < arr.length - 1 && (
                        <div
                          className={`w-6 sm:w-10 h-0.5 transition-colors ${
                            currentStep > step.num ? 'bg-emerald-500/60' : 'bg-white/10'
                          }`}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            {/* Modal Body Container */}
            <div className="p-5 sm:p-8 max-h-[75vh] overflow-y-auto">
              {/* PANEL 1: Package Builder */}
              {currentStep === 1 && (
                <motion.div
                  key="panel1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">Build your package</h3>
                      <p className="text-xs text-slate-400">
                        Select the features you want — your total updates instantly.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start">
                      {selectedFeatures.size > 0 && (
                        <button
                          type="button"
                          onClick={clearAllFeatures}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                        >
                          <span>Clear all</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={selectAllFeatures}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all"
                      >
                        <span>Select all 9 ($699 Bundle)</span>
                      </button>
                    </div>
                  </div>

                  {/* Bundle Highlight Banner */}
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-300">
                    <span className="font-semibold flex items-center gap-1.5">
                      <span>🚀</span> Get all 9 features for $699 — save $75 off individual prices!
                    </span>
                    {allSelected && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500 text-black font-extrabold text-[10px] uppercase">
                        Bundle Applied
                      </span>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2">
                    {PKG_ITEMS.map((item) => {
                      const isSelected = selectedFeatures.has(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleFeature(item.id)}
                          className={`flex items-center gap-3.5 p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                            isSelected
                              ? 'bg-emerald-500/[0.07] border-emerald-500/60 shadow-sm'
                              : 'bg-[#101818] border-white/5 hover:border-white/20'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                              isSelected
                                ? 'bg-emerald-500 text-black'
                                : 'border border-white/20 bg-black/20'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          <div className="text-xl shrink-0">{item.emoji}</div>

                          <div className="flex-1 min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-white tracking-tight">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate">
                              {item.desc}
                            </div>
                          </div>

                          <div className="text-xs sm:text-sm font-bold text-emerald-400 shrink-0">
                            ${item.price}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dynamic Summary Box */}
                  <div className="bg-[#101818] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-2 mt-4">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Features selected</span>
                      <span className="font-semibold text-white">{count} of {PKG_ITEMS.length}</span>
                    </div>
                    {count > 0 && (
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Individual value</span>
                        <span className="line-through text-slate-500">${indivValue}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm sm:text-base font-extrabold text-white pt-2 border-t border-white/10">
                      <span>Your price</span>
                      <span className="text-emerald-400 text-lg">${price}</span>
                    </div>
                    <div className="text-right text-xs text-emerald-400 font-semibold">
                      {allSelected
                        ? `🎉 You're getting the full bundle — saving $${BUNDLE_VALUE - BUNDLE_PRICE}!`
                        : count > 0
                        ? `💡 Select all 9 features to get the bundle deal for $${BUNDLE_PRICE} and save $${BUNDLE_VALUE - BUNDLE_PRICE}`
                        : '💡 Select any features above to customize your package, or click bundle deal.'}
                    </div>
                  </div>

                  {/* Button Row */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleStep1Continue}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      <span>Continue to Schedule</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* PANEL 2: Schedule (Calendar & Time Slots) */}
              {currentStep === 2 && (
                <motion.div
                  key="panel2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">Pick a date &amp; time</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      All times are Eastern Time (ET) — Stafford, VA.
                    </p>
                  </div>

                  {/* Calendar Widget */}
                  <div className="bg-[#101818] border border-white/10 rounded-2xl p-4 sm:p-5">
                    {/* Month Nav */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        ‹
                      </button>
                      <div className="text-sm sm:text-base font-bold text-white">
                        {monthNames[calMonth]} {calYear}
                      </div>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        ›
                      </button>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-500 mb-2">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                        <div key={d} className="py-1">{d}</div>
                      ))}
                    </div>

                    {/* Day Cells */}
                    <div className="grid grid-cols-7 gap-1.5">
                      {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square" />
                      ))}

                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dayNum = i + 1;
                        const thisDate = new Date(calYear, calMonth, dayNum);
                        const dow = thisDate.getDay();
                        const isPast = thisDate < today;
                        const isWeekend = dow === 0 || dow === 6;
                        const isToday = thisDate.toDateString() === today.toDateString();
                        const isSelected = selectedDate && thisDate.toDateString() === selectedDate.toDateString();

                        const isDisabled = isPast || isWeekend;

                        return (
                          <button
                            key={dayNum}
                            type="button"
                            disabled={isDisabled}
                            onClick={() => setSelectedDate(thisDate)}
                            className={`aspect-square rounded-xl flex items-center justify-center text-xs font-semibold transition-all ${
                              isDisabled
                                ? 'text-slate-700 cursor-not-allowed'
                                : isSelected
                                ? 'bg-emerald-500 text-black font-extrabold shadow-md shadow-emerald-500/30'
                                : isToday
                                ? 'border border-emerald-500/60 text-emerald-400 hover:bg-emerald-500/10'
                                : 'text-slate-300 hover:bg-white/10 hover:border-white/20'
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Available times for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} (ET)</span>
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map((t, idx) => {
                          const isUnavailable = unavailableSlots.includes(idx);
                          const isSelected = selectedTime === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              disabled={isUnavailable}
                              onClick={() => setSelectedTime(t)}
                              className={`py-2 px-2 text-xs rounded-lg text-center transition-all cursor-pointer font-medium ${
                                isUnavailable
                                  ? 'opacity-30 bg-[#0e1616] text-slate-600 cursor-not-allowed line-through'
                                  : isSelected
                                  ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20'
                                  : 'bg-[#101818] border border-white/10 text-slate-300 hover:border-emerald-500/40 hover:text-white'
                              }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleStep2Continue}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* PANEL 3: Details */}
              {currentStep === 3 && (
                <motion.div
                  key="panel3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">Tell us about yourself</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      We'll use this information to prepare for your discovery call.
                    </p>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        First name <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="e.g. Ahmad"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f0f] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Last name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="e.g. Miller"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f0f] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 transition-all"
                      />
                    </div>
                  </div>

                  {/* Contact Fields: Email */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Email address <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@yourbusiness.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f0f] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 transition-all"
                    />
                  </div>

                  {/* Business Name & Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Business name <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={bizName}
                        onChange={(e) => setBizName(e.target.value)}
                        placeholder="e.g. Miller Plumbing & HVAC"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f0f] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Industry / Business type
                      </label>
                      <select
                        value={bizType}
                        onChange={(e) => setBizType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f0f] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400 transition-all"
                      >
                        <option value="">Select your industry</option>
                        <option value="Restaurant / Food">Restaurant / Food</option>
                        <option value="Health & Beauty">Health &amp; Beauty</option>
                        <option value="Home Services / Trades">Home Services / Trades</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Fitness / Wellness">Fitness / Wellness</option>
                        <option value="Retail / Shop">Retail / Shop</option>
                        <option value="Professional Services">Professional Services</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Estimated Budget Range
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          className={`py-2 px-2 text-xs rounded-xl font-medium transition-all cursor-pointer ${
                            budget === b
                              ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-bold'
                              : 'bg-[#090f0f] border border-white/10 text-slate-300 hover:border-white/25'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Anything you'd like us to know?
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Tell us about your current website, your goals, or any specific features you need..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#090f0f] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 transition-all resize-none"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleStep3Continue}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Review Booking</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* PANEL 4: Confirm */}
              {currentStep === 4 && (
                <motion.div
                  key="panel4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">Review your booking</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Everything look right? Hit confirm and we'll send you a calendar invite.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#101818] border border-white/10 rounded-2xl p-5 space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between items-start pb-2 border-b border-white/10">
                      <span className="text-slate-400">Features ({selectedFeatures.size})</span>
                      <span className="text-right text-white font-medium max-w-[280px]">
                        {PKG_ITEMS.filter((i) => selectedFeatures.has(i.id))
                          .map((i) => `${i.emoji} ${i.name}`)
                          .join(', ')}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-slate-400">Total Price</span>
                      <span className="text-emerald-400 font-extrabold text-base">{servicePriceString}</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-slate-400">Date</span>
                      <span className="text-white font-semibold">{formatDate(selectedDate)}</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-slate-400">Time</span>
                      <span className="text-emerald-400 font-semibold">{selectedTime} Eastern Time (ET)</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-slate-400">Name</span>
                      <span className="text-white font-semibold">{firstName} {lastName}</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-slate-400">Email</span>
                      <span className="text-white">{email}</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-slate-400">Business</span>
                      <span className="text-white font-semibold">{bizName} {bizType && `(${bizType})`}</span>
                    </div>

                    {budget && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Budget Range</span>
                        <span className="text-slate-200">{budget}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      ← Edit
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmBooking}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Confirm Booking</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* PANEL 5: Success */}
              {currentStep === 5 && (
                <motion.div
                  key="panel5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      You're booked, {firstName}!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                      We've received your booking and will send a confirmation to <span className="text-white font-medium">{email}</span> shortly. Ahmad will connect with you at the scheduled time.
                    </p>
                  </div>

                  {/* Confirmation Ticket Card */}
                  <div className="bg-[#101818] border border-white/10 rounded-2xl p-5 text-left max-w-md mx-auto space-y-3 text-xs sm:text-sm">
                    <div className="flex items-start gap-3 pb-2.5 border-b border-white/10">
                      <div className="text-base shrink-0">📅</div>
                      <div>
                        <div className="text-[10px] uppercase text-slate-500 font-bold">Date &amp; Time</div>
                        <div className="font-semibold text-white">{formatDate(selectedDate)} at {selectedTime} ET</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pb-2.5 border-b border-white/10">
                      <div className="text-base shrink-0">🌐</div>
                      <div>
                        <div className="text-[10px] uppercase text-slate-500 font-bold">Selected Package</div>
                        <div className="font-semibold text-white">{servicePriceString}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[280px]">{serviceNames}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pb-2.5 border-b border-white/10">
                      <div className="text-base shrink-0">📧</div>
                      <div>
                        <div className="text-[10px] uppercase text-slate-500 font-bold">Confirmation Sent To</div>
                        <div className="font-semibold text-white">{email}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="text-base shrink-0">📍</div>
                      <div>
                        <div className="text-[10px] uppercase text-slate-500 font-bold">Meeting Location</div>
                        <div className="font-semibold text-white">Google Meet Video Call (details in email)</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={handleResetAndClose}
                      className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                    >
                      Done &amp; Return to Site
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
