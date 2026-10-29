import React, { useState } from 'react';
import { Search, X, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const TRENDING_TAGS = [
  "Orbit",
  "Velocity",
  "Volt",
  "Terrain",
  "Cloud",
  "Echo",
  "AirFlex™",
  "48H Delivery"
];

export default function SearchModal() {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    products, 
    setProductDetailModal,
    setSelectedCategory 
  } = useShop();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const results = query.trim() === '' ? [] : products.filter(p => {
    const q = query.toLowerCase();
    return p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.colors.some(c => c.name.toLowerCase().includes(q));
  });

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    setProductDetailModal(product);
  };

  const handleSelectTag = (tag) => {
    setQuery(tag);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-fadeIn">
      
      <div 
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-zinc-800 pb-4">
          <Search className="w-5 h-5 text-[#B7FF00] absolute left-3" />
          <input 
            type="text" 
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by silhouette, technology (AirFlex), or colorway..."
            className="w-full bg-transparent pl-11 pr-10 text-base text-white placeholder-zinc-500 focus:outline-none"
          />
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Trending Searches Strip */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-[#B7FF00]" />
            <span>TRENDING SEARCHES:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {TRENDING_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleSelectTag(tag)}
                className="px-3 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#B7FF00]/50 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search Results */}
        {query.trim() !== '' && (
          <div className="space-y-3 pt-2">
            <span className="text-xs text-zinc-400 font-mono">
              FOUND {results.length} MATCHING SILHOUETTES:
            </span>

            {results.length > 0 ? (
              <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-[#B7FF00]/60 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.colors[0].heroImage} 
                        alt={product.name} 
                        className="w-14 h-14 object-contain bg-zinc-950 rounded-xl p-1 border border-zinc-800 group-hover:scale-105 transition-transform" 
                      />
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-[#B7FF00] transition-colors">
                          {product.name}
                        </div>
                        <div className="text-xs text-zinc-400">
                          {product.category} • {product.tagline}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-mono font-bold text-white">
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[10px] text-[#B7FF00] font-semibold">
                        View 360° →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-zinc-400">
                No sneakers found matching "{query}". Try "Apex One" or "Running".
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
