import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X, User } from 'lucide-react';
import { JOURNAL_POSTS } from '../../data/products';

export default function JournalSection() {
  const [readingArticle, setReadingArticle] = useState(null);

  return (
    <section id="journal" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#B7FF00] uppercase mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>CULTURE, DESIGN & SCM INSIGHTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-heading tracking-tight">
              THE NOVA JOURNAL
            </h2>
          </div>

          <p className="text-zinc-400 text-sm max-w-sm">
            Deep-dives into biopolymer chemistry, urban running culture, and the economics of direct-to-consumer footwear.
          </p>
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOURNAL_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setReadingArticle(post)}
              className="group glass-card rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between hover:border-[#B7FF00]/50 transition-all duration-300"
            >
              <div>
                {/* Article Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#B7FF00] border border-[#B7FF00]/30">
                    {post.category}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-2.5">
                  <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-mono">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#B7FF00] transition-colors font-heading leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Author & Read Link */}
              <div className="p-6 pt-0 border-t border-zinc-800/80 mt-4 flex items-center justify-between text-xs">
                <span className="text-zinc-400 text-[11px]">
                  By {post.author.split('(')[0]}
                </span>
                <span className="font-bold text-[#B7FF00] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {readingArticle && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setReadingArticle(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 max-h-[85vh] overflow-y-auto space-y-6 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setReadingArticle(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#B7FF00] uppercase tracking-wider">
                {readingArticle.category} • {readingArticle.date}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white font-heading">
                {readingArticle.title}
              </h2>
              <div className="text-xs text-zinc-400">
                Author: <strong className="text-white">{readingArticle.author}</strong>
              </div>
            </div>

            <img 
              src={readingArticle.image} 
              alt={readingArticle.title} 
              className="w-full h-64 object-cover rounded-xl"
            />

            <div className="text-sm text-zinc-300 space-y-4 leading-relaxed">
              <p className="text-base text-white font-medium">
                {readingArticle.summary}
              </p>
              <p>
                At NOVA, our design philosophy begins where conventional legacy brands compromise. Most running shoes designed in Oregon or Herzogenaurach are built for pristine rubberized tracks and indoor stadiums. They rapidly degrade when subjected to 40°C heat, uneven stone pavements, and torrential monsoon deluges.
              </p>
              <p>
                By engineering our proprietary AirFlex™ polyurethane cushioning alongside Michelin-grade vulcanized sipes, we achieved a 78% kinetic energy rebound with zero hydroplaning on wet surfaces.
              </p>
              <p className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-[#B7FF00] italic">
                "We asked a fundamental question: Why pay an extra ₹11,000 for retail showroom rent when that capital could be poured directly into carbon propulsion plates and bio-based PEBA foam?"
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setReadingArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-[#B7FF00] text-black font-bold text-xs"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
