import React from 'react';
import { ArrowUpRight, Flame, Sparkles, Zap, Award } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const CATEGORIES = [
  {
    name: "Everyday Lifestyle",
    tag: "ORBIT SERIES",
    count: "₹3,299",
    image: "/brand/model_orbit.jpg",
    gradient: "from-zinc-950 via-zinc-900/60 to-transparent",
    accent: "#B7FF00"
  },
  {
    name: "Performance Running",
    tag: "VELOCITY SPEED",
    count: "₹3,799",
    image: "/brand/model_velocity.jpg",
    gradient: "from-zinc-950 via-zinc-900/60 to-transparent",
    accent: "#B7FF00"
  },
  {
    name: "Streetwear Classic",
    tag: "VOLT HIGH-TOP",
    count: "₹3,599",
    image: "/brand/model_volt.jpg",
    gradient: "from-zinc-950 via-zinc-900/60 to-transparent",
    accent: "#B7FF00"
  },
  {
    name: "Outdoor & Trail",
    tag: "TERRAIN TOUGH",
    count: "₹4,299",
    image: "/brand/model_terrain.jpg",
    gradient: "from-zinc-950 via-zinc-900/60 to-transparent",
    accent: "#B7FF00"
  },
  {
    name: "Ultra Comfort",
    tag: "CLOUD 210G",
    count: "₹2,999",
    image: "/brand/model_cloud.jpg",
    gradient: "from-zinc-950 via-zinc-900/60 to-transparent",
    accent: "#B7FF00"
  },
  {
    name: "Limited Edition",
    tag: "ECHO AURORA",
    count: "₹4,499",
    image: "/brand/model_echo.jpg",
    gradient: "from-purple-950/80 via-zinc-900/60 to-transparent",
    accent: "#c084fc"
  }
];

export default function CategorySection() {
  const { setSelectedCategory } = useShop();

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-[#0A0A0A] border-t border-zinc-900">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#B7FF00] uppercase mb-1">
              <span>EXPLORE SILHOUETTES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white font-heading tracking-tight">
              FEATURED CATEGORIES
            </h2>
          </div>

          <p className="text-zinc-400 text-sm max-w-md">
            Every category represents a specialized discipline — from carbon-plated marathon propulsion to limited numbered drops.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategorySelect(cat.name)}
              className="group relative h-72 md:h-84 rounded-2xl overflow-hidden bg-zinc-900 cursor-pointer border border-zinc-800 hover:border-[#B7FF00]/60 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(183,255,0,0.15)] flex flex-col justify-end p-4"
            >
              {/* Background Image with Zoom & Dark Gradient */}
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-90 contrast-105"
                loading="lazy"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-90 group-hover:opacity-80 transition-opacity`} />
              
              {/* Top pill badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-widest uppercase bg-black/60 backdrop-blur-md text-[#B7FF00] border border-[#B7FF00]/40">
                  {cat.tag}
                </span>
              </div>

              {/* Arrow Icon in corner */}
              <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/60 group-hover:bg-[#B7FF00] text-white group-hover:text-black flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 space-y-1">
                <div className="text-[11px] font-medium text-zinc-400 font-mono">
                  {cat.count}
                </div>
                <h3 className="text-lg md:text-xl font-black text-white font-heading tracking-wide group-hover:text-[#B7FF00] transition-colors">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
