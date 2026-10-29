import React, { useState } from 'react';
import { Heart, MessageCircle, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '../ui/SocialIcons';
import { INSTAGRAM_POSTS } from '../../data/products';
import { useShop } from '../../context/ShopContext';

export default function InstagramSection() {
  const { products, setProductDetailModal } = useShop();

  const handleShopLook = (post) => {
    // Match product or default to flagship
    const matched = products.find(p => p.name.includes('Apex') || p.name.includes('Flux') || p.name.includes('Velocity')) || products[0];
    setProductDetailModal(matched);
  };

  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-zinc-900 relative">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#B7FF00] uppercase mb-1">
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>TAG #RUNYOURSTORY // @NOVASNEAKERS.IN</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-heading tracking-tight">
              STREET GALLERY
            </h2>
          </div>

          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-[#B7FF00] transition-colors"
          >
            <span>Follow Community on Instagram</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Masonry / Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative h-96 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer shadow-lg"
              onClick={() => handleShopLook(post)}
            >
              <img 
                src={post.image} 
                alt={post.caption} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

              {/* Top Handle & Location Tag */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white z-10">
                <span className="font-bold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  {post.handle}
                </span>
                <span className="text-[11px] text-zinc-300 bg-black/50 px-2 py-0.5 rounded-full">
                  {post.location}
                </span>
              </div>

              {/* Hover Overlay Details */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 space-y-3 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <p className="text-xs text-zinc-200 line-clamp-2">
                  {post.caption}
                </p>

                {/* Likes, Comments & Tagged Product */}
                <div className="flex items-center justify-between text-xs text-white border-t border-zinc-700/60 pt-3">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 font-semibold">
                      <Heart className="w-3.5 h-3.5 fill-[#B7FF00] text-[#B7FF00]" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-zinc-300">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{post.comments}</span>
                    </span>
                  </div>

                  {/* Shop Look Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShopLook(post);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#B7FF00] text-black text-xs font-black hover:bg-[#a6eb00] transition-colors"
                  >
                    <ShoppingBag className="w-3 h-3 fill-black" />
                    <span>Shop Look</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
