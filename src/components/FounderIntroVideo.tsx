import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Sparkles, ExternalLink, ArrowRight, Laptop, Smartphone, Search, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FounderIntroVideoProps {
  onOpenQuote: () => void;
}

export const FounderIntroVideo: React.FC<FounderIntroVideoProps> = ({ onOpenQuote }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const TOTAL_DURATION = 29; // 29 seconds matching the user's video

  // Scene timing thresholds
  // Scene 1: 0 - 4s (Hi, I'm Ahmad / Founder of Nearsite)
  // Scene 2: 4 - 11s (Figma project screen with cursor click and cards)
  // Scene 3: 11 - 17s (What We Deliver - 3 green cards)
  // Scene 4: 17 - 23s (Before & After - Joe's Plumbing vs Professional Plumbing)
  // Scene 5: 23 - 29s (Serving Stafford, VA & surrounding areas / Nearsite.co / Get Free Quote)

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= TOTAL_DURATION) {
            return 0; // loop back seamlessly
          }
          return Math.min(TOTAL_DURATION, +(prev + 0.1).toFixed(1));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleUserActivity = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2800);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTime(+(percentage * TOTAL_DURATION).toFixed(1));
  };

  const jumpToScene = (time: number) => {
    setCurrentTime(time);
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Determine current active scene
  const currentScene =
    currentTime < 4.5
      ? 1
      : currentTime < 11.5
      ? 2
      : currentTime < 17.5
      ? 3
      : currentTime < 23.5
      ? 4
      : 5;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleUserActivity}
      onMouseEnter={() => setShowControls(true)}
      className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-emerald-500/20 bg-[#050b0b] shadow-2xl shadow-emerald-950/40 select-none group"
      style={{ aspectRatio: '16/9' }}
    >
      {/* ─────────────────────────────────────────────────────────────
          THUMBNAIL POSTER VIEW (Before video starts / when returned to cover)
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            key="video-thumbnail-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setHasStarted(true);
              setIsPlaying(true);
              setCurrentTime(0);
            }}
            className="absolute inset-0 z-30 cursor-pointer group/thumb bg-black flex items-center justify-center overflow-hidden"
          >
            {/* Thumbnail Graphic */}
            <img
              src="/video_thumbnail.jpg"
              alt="We Build Websites For Local Businesses"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/thumb:scale-[1.03]"
            />

            {/* Subtle Vignette & Dark Contrast Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

            {/* Centered Glowing Play Action Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="flex flex-col items-center gap-3.5"
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-emerald-500/40 blur-xl animate-pulse" />
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-2xl shadow-emerald-500/60 group-hover/thumb:bg-emerald-400 transition-all border-2 border-white/20">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-black ml-1" />
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 border border-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md group-hover/thumb:border-emerald-500/60 transition-colors shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Watch 30s Video Overview</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Badges */}
            <div className="absolute bottom-4 left-4 hidden sm:flex items-center gap-2 text-[11px] text-slate-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
              <span>Stafford, VA</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">$699 All-Inclusive</span>
            </div>

            <div className="absolute bottom-4 right-4 text-[11px] text-slate-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 font-mono">
              0:29
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          SCENE 1 (00:00 - 00:04):
          "Hi, I'm Ahmad" / "Founder of Nearsite"
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {currentScene === 1 && (
          <motion.div
            key="scene-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#060807] flex flex-col items-center justify-center text-center p-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
            >
              Hi, I'm Ahmad
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 text-base sm:text-xl md:text-2xl font-semibold text-emerald-400 tracking-tight"
            >
              Founder of Nearsite
            </motion.p>
          </motion.div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SCENE 2 (00:05 - 00:11):
            Figma / Browser Design Workspace
        ────────────────────────────────────────────────────────────── */}
        {currentScene === 2 && (
          <motion.div
            key="scene-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#070908] flex items-center justify-center p-2 sm:p-6"
          >
            {/* Browser window container */}
            <div className="w-full h-full max-w-4xl bg-[#0b100e] rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl relative">
              {/* Top Window Bar */}
              <div className="h-7 sm:h-9 bg-[#0e1411] border-b border-white/5 flex items-center px-3 gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex-1 text-center text-[10px] sm:text-xs text-slate-400 font-mono">
                  figma.com / NearSite Project
                </div>
              </div>

              {/* Workspace Body */}
              <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-24 sm:w-36 bg-[#090d0b] border-r border-white/5 p-2 sm:p-3 text-[9px] sm:text-xs space-y-1.5 text-slate-400 hidden xs:block">
                  <div className="text-[8px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                    Frame
                  </div>
                  <div className="px-2 py-1 rounded text-slate-400">Header</div>
                  <div className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Hero Section</span>
                  </div>
                  <div className="px-2 py-1 rounded text-slate-400">Features</div>
                  <div className="px-2 py-1 rounded text-slate-400">CTA Button</div>
                  <div className="px-2 py-1 rounded text-slate-400">Footer</div>
                </div>

                {/* Canvas Canvas Area */}
                <div className="flex-1 bg-[#090e0c] p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden">
                  {/* Canvas Navigation */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-xs sm:text-sm font-bold text-emerald-400 tracking-wider">
                      NEARSITE
                    </span>
                    <div className="flex items-center gap-2 sm:gap-4 text-[9px] sm:text-xs text-slate-400">
                      <span>Home</span>
                      <span>Services</span>
                      <span>Work</span>
                      <span>Contact</span>
                    </div>
                  </div>

                  {/* Canvas Center Preview */}
                  <div className="my-auto text-left max-w-md">
                    <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
                      Modern Web Design
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
                      For Local Businesses in Stafford, VA
                    </p>

                    <div className="mt-3">
                      <div
                        className={`inline-block px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all duration-300 ${
                          currentTime >= 7
                            ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-400/30 scale-105'
                            : 'bg-emerald-500 text-black'
                        }`}
                      >
                        Get Started
                      </div>
                    </div>

                    {/* Features cards entering after cursor click (approx 7.5s - 11s) */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: currentTime >= 7.5 ? 1 : 0, y: currentTime >= 7.5 ? 0 : 10 }}
                        transition={{ duration: 0.3 }}
                        className="p-1.5 sm:p-2 rounded-lg bg-[#0d1512] border border-white/10"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mb-1" />
                        <div className="text-[8px] sm:text-[10px] font-bold text-white">Custom Design</div>
                        <div className="text-[7px] sm:text-[9px] text-slate-400">Professional &amp; Fast</div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: currentTime >= 8.5 ? 1 : 0, y: currentTime >= 8.5 ? 0 : 10 }}
                        transition={{ duration: 0.3 }}
                        className="p-1.5 sm:p-2 rounded-lg bg-[#0d1512] border border-white/10"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mb-1" />
                        <div className="text-[8px] sm:text-[10px] font-bold text-white">Mobile First</div>
                        <div className="text-[7px] sm:text-[9px] text-slate-400">Professional &amp; Fast</div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: currentTime >= 9.5 ? 1 : 0, y: currentTime >= 9.5 ? 0 : 10 }}
                        transition={{ duration: 0.3 }}
                        className="p-1.5 sm:p-2 rounded-lg bg-[#0d1512] border border-white/10"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mb-1" />
                        <div className="text-[8px] sm:text-[10px] font-bold text-white">Local SEO</div>
                        <div className="text-[7px] sm:text-[9px] text-slate-400">Professional &amp; Fast</div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Animated Simulated Cursor */}
                  <motion.div
                    animate={{
                      x: currentTime < 7 ? [180, 70] : [70, 70],
                      y: currentTime < 7 ? [140, 75] : [75, 75],
                      scale: currentTime >= 6.8 && currentTime <= 7.4 ? [1, 0.85, 1] : 1,
                    }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="absolute z-20 pointer-events-none hidden sm:block"
                    style={{ left: '30%', top: '40%' }}
                  >
                    <svg className="w-5 h-5 text-white drop-shadow-md" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1.5">
                      <path d="M3 3l7 18 3.5-7.5L21 10z" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SCENE 3 (00:12 - 00:17):
            "What We Deliver" with 3 green-bordered cards
        ────────────────────────────────────────────────────────────── */}
        {currentScene === 3 && (
          <motion.div
            key="scene-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#060807] flex flex-col items-center justify-center p-4 sm:p-8 text-center"
          >
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                What We Deliver
              </h3>
              <div className="w-12 sm:w-16 h-1 bg-emerald-400 mx-auto mt-2 rounded-full" />
            </div>

            {/* 3 Green Outline Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 w-full max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="p-4 sm:p-5 rounded-2xl bg-[#090d0b] border border-emerald-500/40 shadow-lg shadow-emerald-950/50 flex flex-col items-center text-center"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-3">
                  <Laptop className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="text-xs sm:text-sm md:text-base font-bold text-white mb-1.5">
                  Custom Web Design
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed">
                  Unique, conversion-focused designs tailored to your brand
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="p-4 sm:p-5 rounded-2xl bg-[#090d0b] border border-emerald-500/40 shadow-lg shadow-emerald-950/50 flex flex-col items-center text-center"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-3">
                  <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="text-xs sm:text-sm md:text-base font-bold text-white mb-1.5">
                  Mobile-First Development
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed">
                  Lightning-fast sites that look perfect on every device
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="p-4 sm:p-5 rounded-2xl bg-[#090d0b] border border-emerald-500/40 shadow-lg shadow-emerald-950/50 flex flex-col items-center text-center"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-3">
                  <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="text-xs sm:text-sm md:text-base font-bold text-white mb-1.5">
                  Local SEO Setup
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed">
                  Rank higher in Stafford &amp; nearby so customers find you first
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SCENE 4 (00:18 - 00:23):
            "We transform local businesses online" (Before & After)
        ────────────────────────────────────────────────────────────── */}
        {currentScene === 4 && (
          <motion.div
            key="scene-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#060807] flex flex-col items-center justify-center p-3 sm:p-6 text-center"
          >
            <h3 className="text-sm sm:text-xl md:text-2xl font-extrabold text-white tracking-tight mb-3 sm:mb-4">
              We transform local businesses online
            </h3>

            {/* Split Comparison */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full max-w-3xl h-[65%] items-stretch">
              {/* BEFORE */}
              <div className="bg-[#fefee9] text-black rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-red-400/40 flex flex-col justify-between text-left overflow-hidden relative shadow-md">
                <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] sm:text-[10px] font-black uppercase px-3 py-1 rounded-bl-lg">
                  BEFORE
                </div>

                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-orange-700 uppercase tracking-tight">
                    🚰 JOE'S PLUMBING 🚰
                  </div>
                  <div className="mt-1 bg-yellow-300 text-[8px] sm:text-[10px] font-black text-center py-0.5 uppercase tracking-wide border border-black/20">
                    !!! BEST PRICES IN TOWN CLICK HERE !!!
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-red-600 font-bold mt-1 leading-tight">
                    Welcome to our website! We do plumbing. Call us now at 555-1234 for FREE estimate!!!!!
                  </div>

                  <div className="mt-2 border border-black/40 text-[7px] sm:text-[9px]">
                    <div className="bg-slate-200 font-bold px-1 py-0.5 border-b border-black/40">Service / Price</div>
                    <div className="px-1 py-0.5 flex justify-between">
                      <span>Fix leak</span>
                      <span>$50</span>
                    </div>
                  </div>
                </div>

                <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto rounded-full bg-blue-400 border border-black flex items-center justify-center text-[7px] sm:text-[9px] font-bold text-black uppercase">
                  PLUMBER
                </div>
              </div>

              {/* AFTER */}
              <div className="bg-[#09110e] text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-emerald-500 flex flex-col justify-between text-left overflow-hidden relative shadow-xl shadow-emerald-950/60">
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-black text-[9px] sm:text-[10px] font-black uppercase px-3 py-1 rounded-bl-lg">
                  AFTER
                </div>

                <div>
                  <div className="flex items-center justify-between text-[9px] sm:text-[11px] text-slate-400 border-b border-white/10 pb-1">
                    <span className="font-bold text-emerald-400">NEARSITE</span>
                    <div className="flex gap-2 text-[8px] sm:text-[9px]">
                      <span>Services</span>
                      <span>Work</span>
                      <span>About</span>
                    </div>
                  </div>

                  <h4 className="text-xs sm:text-base md:text-lg font-bold text-white mt-1.5">
                    Professional Plumbing
                  </h4>
                  <p className="text-[8px] sm:text-[10px] text-slate-400">
                    Trusted by Stafford homeowners
                  </p>

                  <div className="mt-2 inline-block px-2.5 py-1 rounded bg-emerald-500 text-black font-bold text-[8px] sm:text-[10px]">
                    Get Free Quote
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/10 text-[7px] sm:text-[9px]">
                  <div className="bg-white/5 p-1 rounded">
                    <div className="font-bold text-emerald-300">24/7 Service</div>
                    <div className="text-slate-500 text-[6px] sm:text-[7px]">Guaranteed quality</div>
                  </div>
                  <div className="bg-white/5 p-1 rounded">
                    <div className="font-bold text-emerald-300">Licensed</div>
                    <div className="text-slate-500 text-[6px] sm:text-[7px]">Guaranteed quality</div>
                  </div>
                  <div className="bg-white/5 p-1 rounded">
                    <div className="font-bold text-emerald-300">5-Star Rated</div>
                    <div className="text-slate-500 text-[6px] sm:text-[7px]">Guaranteed quality</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SCENE 5 (00:24 - 00:29):
            "Serving Stafford, VA & surrounding areas" / Get your free quote
        ────────────────────────────────────────────────────────────── */}
        {currentScene === 5 && (
          <motion.div
            key="scene-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#060807] flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
            >
              Serving Stafford, VA
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs sm:text-base text-slate-400 mt-1"
            >
              &amp; surrounding areas
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-5 space-y-3"
            >
              <div className="text-[11px] sm:text-xs text-slate-400">
                Get your free quote at
              </div>
              <div className="text-lg sm:text-2xl font-bold text-emerald-400 tracking-wider">
                Nearsite.co
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenQuote}
                className="mt-2 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg shadow-emerald-500/30 cursor-pointer"
              >
                <span>Get Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            <div className="absolute bottom-3 text-[9px] sm:text-[11px] text-slate-500 font-mono">
              Professional Web Design • Stafford, VA
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          PLAYER CONTROLS & TIMELINE BAR
          (Appears on hover, sleek, no giant button in frame center!)
      ────────────────────────────────────────────────────────────── */}
      <motion.div
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-4 flex flex-col gap-2"
      >
        {/* Scrubber Bar */}
        <div
          onClick={handleSeek}
          className="w-full h-1.5 sm:h-2 bg-white/20 hover:h-2.5 rounded-full cursor-pointer relative overflow-hidden transition-all"
        >
          <div
            className="h-full bg-emerald-400 rounded-full relative"
            style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
          />
        </div>

        {/* Lower Controls Row */}
        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            {/* Replay */}
            <button
              type="button"
              onClick={() => {
                setCurrentTime(0);
                setIsPlaying(true);
              }}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
              title="Replay from start"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Return to Thumbnail Cover */}
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setHasStarted(false);
                setCurrentTime(0);
              }}
              className="px-2 py-0.5 rounded text-[10px] font-semibold text-slate-400 hover:text-white hover:bg-white/10 transition-colors hidden sm:block"
              title="Return to Thumbnail Cover"
            >
              Cover
            </button>

            {/* Time Stamp */}
            <span className="text-[11px] font-mono text-slate-300">
              0:{currentTime < 10 ? `0${Math.floor(currentTime)}` : Math.floor(currentTime)} / 0:29
            </span>

            {/* Scene Selection Pills */}
            <div className="hidden md:flex items-center gap-1.5 ml-2">
              <button
                onClick={() => jumpToScene(0)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  currentScene === 1 ? 'bg-emerald-500/30 text-emerald-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Intro
              </button>
              <button
                onClick={() => jumpToScene(5)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  currentScene === 2 ? 'bg-emerald-500/30 text-emerald-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Figma Demo
              </button>
              <button
                onClick={() => jumpToScene(12)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  currentScene === 3 ? 'bg-emerald-500/30 text-emerald-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                3. Deliverables
              </button>
              <button
                onClick={() => jumpToScene(18)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  currentScene === 4 ? 'bg-emerald-500/30 text-emerald-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                4. Before &amp; After
              </button>
              <button
                onClick={() => jumpToScene(24)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  currentScene === 5 ? 'bg-emerald-500/30 text-emerald-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                5. Free Quote
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* CTA directly from player */}
            <button
              type="button"
              onClick={onOpenQuote}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[11px] px-3 py-1 rounded-full flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            {/* Fullscreen */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
