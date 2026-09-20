import React, { useState } from 'react';
import { X, BookOpen, Clock, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_POSTS } from '../data/siteData';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ isOpen, onClose, onOpenQuote }) => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const selectedPost = BLOG_POSTS.find((p) => p.id === selectedPostId);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="blog-modal-overlay"
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
            className="relative w-full max-w-3xl bg-[#0b1919] rounded-2xl sm:rounded-3xl shadow-2xl border border-white/15 overflow-hidden my-8 text-slate-200"
          >
        <div className="bg-[#0d1e1e] p-6 sm:p-8 flex items-start justify-between border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">
              <BookOpen className="w-3 h-3" />
              <span>Nearsite Insights</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Local Business Growth Playbook
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Practical guides on ranking on Google, speeding up websites, and turning browsers into loyal regulars.
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

        <div className="p-6 sm:p-8">
          {selectedPost ? (
            <div className="space-y-6">
              <button
                type="button"
                onClick={() => setSelectedPostId(null)}
                className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
              >
                ← Back to all articles
              </button>

              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full uppercase">
                  {selectedPost.category}
                </span>
                <h4 className="text-2xl font-extrabold text-white">
                  {selectedPost.title}
                </h4>
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {selectedPost.readTime}
                  </span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
                <p className="text-base text-slate-200 font-medium bg-[#060e0e] p-3 rounded-lg border-l-4 border-emerald-400">
                  {selectedPost.excerpt}
                </p>
                {selectedPost.content && selectedPost.content.map((p, idx) => (
                  <p key={idx} className="text-slate-300">
                    {p}
                  </p>
                ))}
                {selectedPost.takeaways && selectedPost.takeaways.length > 0 && (
                  <div className="pt-2">
                    <h5 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <span className="text-emerald-400">✓</span> Key Action Items:
                    </h5>
                    <ul className="space-y-2">
                      {selectedPost.takeaways.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-300">
                  Want us to audit and build this for your business?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenQuote();
                  }}
                  className="bg-white hover:bg-slate-200 text-black font-semibold text-xs px-4 py-2 rounded-full whitespace-nowrap"
                >
                  Get a Free Quote
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {BLOG_POSTS.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPostId(post.id)}
                  className="p-5 rounded-xl border border-white/10 hover:border-emerald-500/40 bg-[#060e0e] hover:bg-[#081515] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-0.5 rounded-full uppercase">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-500">{post.readTime}</span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-400">
                    <span>Read guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
