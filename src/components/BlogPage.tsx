import React, { useState, useMemo } from 'react';
import { ArrowLeft, BookOpen, Search, Calendar, Clock, ArrowRight, CheckCircle2, User, Sparkles, Tag, ChevronRight, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_POSTS, BlogPost } from '../data/siteData';

interface BlogPageProps {
  onBackToHome: () => void;
  onOpenQuote: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onBackToHome, onOpenQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const categories = ['All', 'Local SEO', 'Web Performance', 'Process', 'Case Studies'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activePost = BLOG_POSTS.find((p) => p.id === selectedPostId);
  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-[#060e0e] text-[#f6f9f7] pt-24 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-emerald-400 selection:text-black">
      {/* Ambient background glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Back to Home Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors mb-8 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </motion.button>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Nearsite Insights &amp; Strategy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The Local Business Digital Playbook
          </h1>
          <p className="mt-4 text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed">
            Practical strategies on ranking higher on Google, speeding up mobile sites, and winning more customers in your local area.
          </p>
        </div>

        {/* If user is reading a post */}
        {activePost ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-[#0b1919] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8"
          >
            <button
              type="button"
              onClick={() => setSelectedPostId(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all articles</span>
            </button>

            {/* Article Meta */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  {activePost.category}
                </span>
                <span className="text-slate-500 text-xs">•</span>
                <span className="text-slate-400 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activePost.readTime}
                </span>
                <span className="text-slate-500 text-xs">•</span>
                <span className="text-slate-400 text-xs flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {activePost.date}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                {activePost.title}
              </h2>

              {/* Author Header */}
              <div className="flex items-center gap-3 mt-5 pt-5 border-t border-white/10">
                <img
                  src={activePost.author.avatar}
                  alt={activePost.author.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/50"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">{activePost.author.name}</div>
                  <div className="text-[11px] text-emerald-400">{activePost.author.role}</div>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p className="text-base sm:text-lg font-medium text-slate-100 bg-[#060e0e] p-4 rounded-xl border-l-4 border-emerald-400">
                {activePost.excerpt}
              </p>

              {activePost.content.map((paragraph, index) => (
                <p key={index} className="text-slate-300">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Actionable Takeaways */}
            {activePost.takeaways && activePost.takeaways.length > 0 && (
              <div className="bg-[#0e2424] border border-emerald-500/30 rounded-2xl p-6 space-y-3">
                <h4 className="text-sm sm:text-base font-bold text-emerald-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Key Action Items for Your Business:</span>
                </h4>
                <ul className="space-y-2.5">
                  {activePost.takeaways.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bottom Package CTA Box */}
            <div className="bg-gradient-to-br from-[#0e2121] to-[#071313] border border-emerald-500/40 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Need Help Executing This?
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Get Your Complete Website for Just $699
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                We handle the custom mobile-first design, lightning performance, and local SEO setup so you can focus on running your business.
              </p>
              <button
                type="button"
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <span>Get Started for $699</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Article Directory Grid */
          <div className="space-y-10">
            {/* Search & Category Filter Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0b1919] p-3 sm:p-4 rounded-2xl border border-white/10">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                        : 'bg-[#060e0e] text-slate-300 hover:text-white border border-white/10 hover:border-emerald-500/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#060e0e] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>
            </div>

            {/* Featured Article Card (if no search and viewing all) */}
            {selectedCategory === 'All' && !searchQuery && featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedPostId(featuredPost.id)}
                className="bg-[#0b1919] hover:bg-[#0e2121] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 md:p-10 cursor-pointer group transition-all duration-300 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-3 max-w-2xl">
                    <div className="inline-flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-extrabold uppercase">
                        ★ Featured Spotlight
                      </span>
                      <span className="text-xs text-emerald-400 font-semibold">{featuredPost.category}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                      {featuredPost.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          className="w-5 h-5 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-slate-300">{featuredPost.author.name}</span>
                      </div>
                      <span>•</span>
                      <span>{featuredPost.date}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-2 bg-emerald-500 group-hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all shadow-md">
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedPostId(post.id)}
                  className="bg-[#0b1919] hover:bg-[#0e2121] border border-white/10 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between cursor-pointer group transition-all duration-300 shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-emerald-400 font-semibold text-[11px]">
                        {post.category}
                      </span>
                      <span className="text-slate-500 text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-400">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-5 h-5 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[11px]">{post.author.name} • {post.date}</span>
                    </div>

                    <span className="text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16 bg-[#0b1919] rounded-2xl border border-white/10">
                <p className="text-slate-400 text-sm">No articles match your search.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="mt-3 text-xs text-emerald-400 font-bold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
