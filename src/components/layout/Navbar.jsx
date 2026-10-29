import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  Sparkles, 
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Volume2,
  VolumeX
} from 'lucide-react';
import BrandLogo, { StarMarkIcon } from '../brand/BrandLogo';
import { useShop } from '../../context/ShopContext';
import { playClickSound, playHoverSound, playSwooshSound, isSoundEnabled, setSoundEnabled } from '../../utils/audio';

export default function Navbar({ onNavigateSection }) {
  const { 
    totalItemsCount, 
    wishlist, 
    setIsCartOpen, 
    setIsSearchOpen, 
    setIsQuizOpen,
    isAdminView,
    setIsAdminView,
    setSelectedCategory 
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(true);

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundEnabled(next);
    if (next) playClickSound();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId, category = null) => {
    playClickSound();
    setMobileMenuOpen(false);
    if (category) {
      setSelectedCategory(category);
    }
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <aside 
        aria-label="Announcement"
        className="bg-black border-b border-[#222222] text-[11px] md:text-xs py-1.5 px-4 text-[#C7C7C7] flex items-center justify-between z-50 relative"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#B7FF00] animate-ping" />
            <span className="font-semibold text-white tracking-wide">
              ⚡ FREE EXPRESS 48H AIR DELIVERY ACROSS INDIA
            </span>
            <span className="hidden md:inline text-zinc-500">|</span>
            <span className="hidden md:inline text-zinc-400">
              USE CODE: <strong className="text-[#B7FF00] tracking-wider">RUNNOVA</strong> FOR 15% OFF
            </span>
          </div>

          <div className="flex items-center gap-3 md:gap-4 text-[11px]">
            <button 
              onClick={toggleSound}
              className="flex items-center gap-1 text-zinc-400 hover:text-[#B7FF00] transition-colors cursor-pointer"
              title="Toggle Luxury UI Sound Effects"
            >
              {soundActive ? <Volume2 className="w-3.5 h-3.5 text-[#B7FF00]" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-500" />}
              <span className="hidden sm:inline font-mono">{soundActive ? 'SOUND: ON' : 'SOUND: OFF'}</span>
            </button>

            <button 
              onClick={() => setIsAdminView(!isAdminView)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider flex items-center gap-1 transition-colors ${
                isAdminView 
                  ? 'bg-[#B7FF00] text-black font-extrabold' 
                  : 'bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700'
              }`}
              title="Toggle Academic SCM & Operations Command Center"
            >
              <Zap className="w-3 h-3 text-current" />
              {isAdminView ? 'SCM LIVE DASHBOARD' : 'SCM DASHBOARD'}
            </button>
            <div className="hidden lg:flex items-center gap-1 text-zinc-400">
              <Globe className="w-3 h-3 text-[#B7FF00]" />
              <span>India • ₹ INR</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Sticky Navbar */}
      <nav 
        aria-label="Main Navigation"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl py-3' 
            : 'bg-gradient-to-b from-[#0A0A0A]/90 to-transparent py-4 md:py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden text-white p-1 hover:text-[#B7FF00]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <BrandLogo onClick={() => handleNavClick('hero')} />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium tracking-wide">
            <button 
              onClick={() => handleNavClick('hero')} 
              className="text-zinc-300 hover:text-[#B7FF00] transition-colors font-semibold cursor-pointer"
            >
              Home
            </button>
            
            <button 
              onClick={() => handleNavClick('shop', 'All')} 
              className="text-zinc-300 hover:text-[#B7FF00] transition-colors cursor-pointer"
            >
              Shop All
            </button>

            <button 
              onClick={() => handleNavClick('shop', 'Performance Running')} 
              className="text-zinc-300 hover:text-[#B7FF00] transition-colors flex items-center gap-1 group cursor-pointer"
            >
              <span>Performance</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button 
              onClick={() => handleNavClick('shop', 'Streetwear Classic')} 
              className="text-zinc-300 hover:text-[#B7FF00] transition-colors cursor-pointer"
            >
              Streetwear
            </button>

            <button 
              onClick={() => handleNavClick('shop', 'Outdoor & Trail')} 
              className="text-zinc-300 hover:text-[#B7FF00] transition-colors cursor-pointer"
            >
              Trail
            </button>

            <button 
              onClick={() => handleNavClick('technology')} 
              className="text-zinc-300 hover:text-[#B7FF00] transition-colors cursor-pointer"
            >
              Tech Lab
            </button>

            <button 
              onClick={() => handleNavClick('whynova')} 
              className="text-zinc-300 hover:text-[#B7FF00] transition-colors cursor-pointer"
            >
              Why NOVA
            </button>

            <button 
              onClick={() => handleNavClick('journal')} 
              className="text-zinc-300 hover:text-[#B7FF00] transition-colors cursor-pointer"
            >
              Journal
            </button>
          </div>

          {/* Right Action Icons & AI Stylist Trigger */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* AI Sneaker Stylist pill button */}
            <button 
              onClick={() => setIsQuizOpen(true)}
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-zinc-800 to-zinc-900 border border-[#B7FF00]/40 text-[#B7FF00] px-3 py-1.5 rounded-full hover:border-[#B7FF00] hover:shadow-[0_0_15px_rgba(183,255,0,0.3)] transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span>AI Fit Quiz</span>
            </button>

            {/* Search Trigger */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-zinc-300 hover:text-[#B7FF00] hover:bg-zinc-800/60 rounded-full transition-colors"
              aria-label="Search sneakers"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button 
              onClick={() => handleNavClick('shop')}
              className="p-2 text-zinc-300 hover:text-[#B7FF00] hover:bg-zinc-800/60 rounded-full transition-colors relative"
              aria-label="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B7FF00] text-black text-[10px] font-black rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#B7FF00] text-black px-3.5 py-2 rounded-full font-bold text-xs md:text-sm tracking-wide hover:bg-[#a5e600] hover:shadow-[0_0_20px_rgba(183,255,0,0.4)] transition-all active:scale-95"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4 fill-black" />
              <span className="hidden sm:inline">BAG</span>
              <span className="bg-black text-[#B7FF00] text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A0A0A] border-b border-zinc-800 px-6 py-6 animate-fadeIn">
            <div className="flex flex-col gap-4 text-base font-semibold">
              <button 
                onClick={() => handleNavClick('hero')} 
                className="text-left text-zinc-200 hover:text-[#B7FF00] py-1 border-b border-zinc-900"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick('shop', 'All')} 
                className="text-left text-zinc-200 hover:text-[#B7FF00] py-1 border-b border-zinc-900"
              >
                Shop All Collection
              </button>
              <button 
                onClick={() => handleNavClick('shop', 'Performance Running')} 
                className="text-left text-zinc-200 hover:text-[#B7FF00] py-1 border-b border-zinc-900"
              >
                Performance Running
              </button>
              <button 
                onClick={() => handleNavClick('shop', 'Streetwear Classic')} 
                className="text-left text-zinc-200 hover:text-[#B7FF00] py-1 border-b border-zinc-900"
              >
                Streetwear Classic
              </button>
              <button 
                onClick={() => handleNavClick('shop', 'Outdoor & Trail')} 
                className="text-left text-zinc-200 hover:text-[#B7FF00] py-1 border-b border-zinc-900"
              >
                Outdoor & Trail
              </button>
              <button 
                onClick={() => handleNavClick('technology')} 
                className="text-left text-zinc-200 hover:text-[#B7FF00] py-1 border-b border-zinc-900"
              >
                Footwear Tech Lab
              </button>
              <button 
                onClick={() => handleNavClick('whynova')} 
                className="text-left text-zinc-200 hover:text-[#B7FF00] py-1 border-b border-zinc-900"
              >
                Why NOVA (D2C Supply Chain)
              </button>
              <button 
                onClick={() => handleNavClick('journal')} 
                className="text-left text-zinc-200 hover:text-[#B7FF00] py-1 border-b border-zinc-900"
              >
                NOVA Journal
              </button>

              <div className="pt-2 flex flex-col gap-3">
                <button 
                  onClick={() => { setMobileMenuOpen(false); setIsQuizOpen(true); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-zinc-900 border border-[#B7FF00] text-[#B7FF00] font-bold text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Launch AI Sneaker Finder
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); setIsAdminView(!isAdminView); }}
                  className="w-full py-2.5 rounded-lg bg-zinc-800 text-zinc-300 font-bold text-xs"
                >
                  {isAdminView ? 'Switch to Customer Store' : 'Switch to SCM Dashboard'}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
