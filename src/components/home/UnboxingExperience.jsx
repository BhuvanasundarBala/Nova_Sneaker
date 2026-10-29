import React, { useState } from 'react';
import { Package, Sparkles, Check, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { StarMarkIcon } from '../brand/BrandLogo';
import { playClickSound, playSwooshSound } from '../../utils/audio';
import { useShop } from '../../context/ShopContext';

export default function UnboxingExperience() {
  const { products, setProductDetailModal } = useShop();
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      title: "Matte Black Keepsake Shoebox",
      desc: "Engineered from 100% FSC-certified unbleached rigid cardboard with UV spot-varnished neon lime Star Mark and 'RUN YOUR STORY' script.",
      image: "./brand/nova_box_unboxing.jpg",
      pill: "STAGE 01 // UNBOXING"
    },
    {
      title: "Tactile Black Hangtag & On-Foot Presence",
      desc: "Every pair arrives with a debossed textured black hangtag, braided neon green lanyard, and unique QR code linking to your shoe's batch verification.",
      image: "./brand/nova_street_onfoot.jpg",
      pill: "STAGE 02 // AUTHENTICITY"
    },
    {
      title: "The NOVA Apex One Sneakers",
      desc: "Resting inside custom acid-free star tissue wrap with pre-installed ergonomic bio-foam footbeds and an extra set of neon lime 3M reflective laces.",
      image: "./brand/nova_hero_studio.jpg",
      pill: "STAGE 03 // THE SNEAKER"
    }
  ];

  const currentStage = stages[activeStage];

  return (
    <section className="py-24 bg-[#080808] border-t border-zinc-900 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#B7FF00]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#B7FF00] uppercase mb-1">
              <Package className="w-3.5 h-3.5" />
              <span>THE UNBOXING RITUAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-heading tracking-tight">
              MORE THAN JUST A SNEAKER
            </h2>
          </div>

          <p className="text-sm text-zinc-400 max-w-md">
            From the matte black shoebox to the neon braided lanyard, every detail is crafted to rival multi-million dollar luxury sneaker houses.
          </p>
        </div>

        {/* Interactive 3-Stage Stage Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left 7 Columns: Visual Stage Display */}
          <div className="lg:col-span-7 bg-zinc-950 p-6 md:p-10 rounded-3xl border border-zinc-800/80 relative overflow-hidden flex flex-col items-center justify-center min-h-[420px] shadow-2xl">
            
            {/* Visual with fade animation */}
            <div className="relative w-full aspect-[16/10] flex items-center justify-center overflow-hidden rounded-2xl group">
              <img 
                key={activeStage}
                src={currentStage.image} 
                alt={currentStage.title}
                className="w-full h-full object-cover rounded-2xl filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] animate-fadeIn group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-bold bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-700">
                  {currentStage.pill}
                </span>
                <span className="text-zinc-400 font-mono text-[11px]">
                  STEP {activeStage + 1} OF 3
                </span>
              </div>
            </div>

            {/* Quick Stage Indicator Dots */}
            <div className="flex items-center gap-2 mt-6">
              {stages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { playClickSound(); setActiveStage(idx); }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeStage === idx 
                      ? 'w-8 bg-[#B7FF00]' 
                      : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                  aria-label={`Go to stage ${idx + 1}`}
                />
              ))}
            </div>

          </div>

          {/* Right 5 Columns: Stage Selector & Content */}
          <div className="lg:col-span-5 space-y-4">
            {stages.map((stg, idx) => {
              const isActive = activeStage === idx;
              return (
                <div
                  key={idx}
                  onClick={() => { playClickSound(); setActiveStage(idx); }}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-zinc-900/90 border-[#B7FF00] shadow-[0_0_25px_rgba(183,255,0,0.15)]' 
                      : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${isActive ? 'text-[#B7FF00]' : 'text-zinc-500'}`}>
                      {stg.pill}
                    </span>
                    {isActive && <StarMarkIcon className="w-4 h-4 text-[#B7FF00]" />}
                  </div>

                  <h3 className={`text-lg font-bold font-heading mt-1 ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                    {stg.title}
                  </h3>

                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {stg.desc}
                  </p>
                </div>
              );
            })}

            <div className="pt-2">
              <button
                onClick={() => { playSwooshSound(); setProductDetailModal(products[0]); }}
                className="w-full py-4 rounded-xl bg-[#B7FF00] hover:bg-[#a6eb00] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(183,255,0,0.35)] transition-all active:scale-95"
              >
                <span>Explore 2026 Lineup (360° Studio)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
