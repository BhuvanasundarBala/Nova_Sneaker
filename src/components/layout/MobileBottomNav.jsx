import React from 'react';
import { Home, Compass, ShoppingBag, Heart, Sparkles, Search } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function MobileBottomNav({ onNavigateSection }) {
  const { 
    totalItemsCount, 
    wishlist, 
    setIsCartOpen, 
    setIsSearchOpen, 
    setIsQuizOpen,
    setSelectedCategory 
  } = useShop();

  const handleNav = (sectionId, category = null) => {
    if (category) setSelectedCategory(category);
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-zinc-800/80 px-4 py-2 flex items-center justify-around text-[10px] font-bold text-zinc-400"
    >
      <button 
        onClick={() => handleNav('hero')}
        className="flex flex-col items-center gap-1 hover:text-[#B7FF00] active:scale-95 transition-all"
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      <button 
        onClick={() => handleNav('shop', 'All')}
        className="flex flex-col items-center gap-1 hover:text-[#B7FF00] active:scale-95 transition-all"
      >
        <Compass className="w-5 h-5" />
        <span>Shop</span>
      </button>

      {/* Center AI Fit Quiz Floating Pill */}
      <button 
        onClick={() => setIsQuizOpen(true)}
        className="flex flex-col items-center -mt-5"
      >
        <div className="w-12 h-12 rounded-full bg-[#B7FF00] text-black flex items-center justify-center shadow-[0_0_15px_rgba(183,255,0,0.5)] active:scale-95 transition-transform">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <span className="text-[9px] text-[#B7FF00] font-black mt-1">AI QUIZ</span>
      </button>

      <button 
        onClick={() => setIsSearchOpen(true)}
        className="flex flex-col items-center gap-1 hover:text-[#B7FF00] active:scale-95 transition-all"
      >
        <Search className="w-5 h-5" />
        <span>Search</span>
      </button>

      <button 
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center gap-1 text-white relative active:scale-95 transition-all"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          {totalItemsCount > 0 && (
            <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#B7FF00] text-black text-[9px] font-black flex items-center justify-center">
              {totalItemsCount}
            </span>
          )}
        </div>
        <span>Bag</span>
      </button>
    </nav>
  );
}
