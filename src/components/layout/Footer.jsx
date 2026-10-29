import React from 'react';
import { 
  Globe, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Heart,
  ArrowUpRight,
  Mail,
  Phone,
  Ruler,
  Package
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon, LinkedinIcon } from '../ui/SocialIcons';
import BrandLogo, { StarMarkIcon } from '../brand/BrandLogo';
import { useShop } from '../../context/ShopContext';

export default function Footer({ onNavigateSection }) {
  const { setIsAdminView, setSelectedCategory, setIsSizeGuideOpen, showToast } = useShop();

  const handleLinkClick = (id, category = null) => {
    if (category) {
      setSelectedCategory(category);
    }
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTrackOrder = () => {
    showToast("Opening Live SCM 48H Order Tracking...", "info");
    setIsAdminView(true);
  };

  const handleDoorstepExchange = () => {
    showToast("7-Day Doorstep Exchange Active: Free courier pickup within 24 hours.", "success");
    setIsSizeGuideOpen(true);
  };

  const handleCareers = () => {
    showToast("Careers at NOVA: Send your portfolio to careers@novasneakers.in", "info");
  };

  return (
    <footer className="bg-black border-t border-zinc-900 text-zinc-400 text-xs">
      
      {/* Upper Perks Strip */}
      <div className="border-b border-zinc-900 py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div 
              onClick={handleTrackOrder}
              className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-850 hover:border-[#B7FF00]/40 transition-colors cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00] group-hover:scale-105 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-heading group-hover:text-[#B7FF00] transition-colors">Free 48H Air Logistics</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Click to view Mumbai, BLR & NCR fulfillment status</p>
              </div>
            </div>

            <div 
              onClick={handleDoorstepExchange}
              className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-850 hover:border-[#B7FF00]/40 transition-colors cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00] group-hover:scale-105 transition-transform">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-heading group-hover:text-[#B7FF00] transition-colors">7-Day Doorstep Exchange</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Zero questions asked size & model swaps</p>
              </div>
            </div>

            <div 
              onClick={() => handleLinkClick('whynova')}
              className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-850 hover:border-[#B7FF00]/40 transition-colors cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00] group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-heading group-hover:text-[#B7FF00] transition-colors">Direct-to-Consumer Warranty</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">6-month structural warranty on all soles</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Vision */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" />
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm pt-2">
              NOVA is an Indian direct-to-consumer footwear laboratory. We merge brutalist architectural aesthetics with responsive AirFlex™ cushioning for creators who move without permission.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#B7FF00] hover:text-[#B7FF00] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#B7FF00] hover:text-[#B7FF00] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#B7FF00] hover:text-[#B7FF00] flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-3">
              <button
                onClick={() => setIsAdminView(true)}
                className="text-[11px] font-bold text-[#B7FF00] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Academic SCM & Operations Portal</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white font-heading">
              Shop Collections
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleLinkClick('shop', 'All')} className="hover:text-white transition-colors cursor-pointer text-left">
                  All Silhouettes
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('shop', 'Performance Running')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Running & Performance
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('shop', 'Streetwear Classic')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Streetwear Chunky Soles
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('shop', 'Outdoor & Trail')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Outdoor & Trail
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('shop', 'Limited Edition')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Numbered Limited Drops
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('shop', 'Ultra Comfort')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Ultra Comfort (Cloud)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Innovation & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white font-heading">
              Technology & Brand
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleLinkClick('technology')} className="hover:text-white transition-colors cursor-pointer text-left">
                  AirFlex™ Lab Testing
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('whynova')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Why NOVA (D2C Transparency)
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('journal')} className="hover:text-white transition-colors cursor-pointer text-left">
                  NOVA Journal & Culture
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('whynova')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Sustainability Scorecard (91%)
                </button>
              </li>
              <li>
                <button onClick={handleCareers} className="hover:text-white transition-colors cursor-pointer text-left">
                  Careers at NOVA Labs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white font-heading">
              Athlete Support
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={handleTrackOrder} className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5">
                  <Package className="w-3 h-3 text-[#B7FF00]" />
                  <span>Track 48H Order Status</span>
                </button>
              </li>
              <li>
                <button onClick={handleDoorstepExchange} className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5">
                  <RotateCcw className="w-3 h-3 text-[#B7FF00]" />
                  <span>Doorstep Exchange Portal</span>
                </button>
              </li>
              <li>
                <button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5">
                  <Ruler className="w-3 h-3 text-[#B7FF00]" />
                  <span>Size & Measurement Guide</span>
                </button>
              </li>
              <li>
                <a href="mailto:support@novasneakers.in" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-[#B7FF00]" />
                  <span>support@novasneakers.in</span>
                </a>
              </li>
              <li>
                <a href="tel:18006682786" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#B7FF00]" />
                  <span>+91 1800-NOVA-RUN (Mon-Sat)</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © 2026 NOVA SNEAKERS INDIA PVT LTD. ALL RIGHTS RESERVED. RUN YOUR STORY.
          </div>

          {/* Payment Trust Icons */}
          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span className="bg-zinc-900 px-2 py-1 rounded text-zinc-300 font-bold">UPI</span>
            <span className="bg-zinc-900 px-2 py-1 rounded text-zinc-300 font-bold">RuPay</span>
            <span className="bg-zinc-900 px-2 py-1 rounded text-zinc-300 font-bold">VISA</span>
            <span className="bg-zinc-900 px-2 py-1 rounded text-zinc-300 font-bold">Mastercard</span>
            <span className="bg-zinc-900 px-2 py-1 rounded text-[#B7FF00] font-bold">Cash On Delivery</span>
          </div>
        </div>

      </div>

    </footer>
  );
}
