import React, { useState } from 'react';
import { 
  Zap, 
  Wind, 
  Compass, 
  ShieldCheck, 
  Activity, 
  Check, 
  Sparkles,
  Droplets,
  Layers,
  Thermometer,
  RotateCw
} from 'lucide-react';
import { StarMarkIcon } from '../brand/BrandLogo';

const TECH_HOTSPOTS = [
  {
    id: "airflex",
    title: "AirFlex™ Polyurethane Core",
    subtitle: "78% Kinetic Energy Rebound",
    description: "A dual-chamber impact dampener engineered to absorb harsh concrete micro-shocks and immediately rebound energy into your next stride, delaying calf and achilles fatigue.",
    icon: Zap,
    metric: "78%",
    metricLabel: "Energy Return",
    color: "#B7FF00",
    pos: { top: "68%", left: "75%" }, // Heel region
    stats: [
      { label: "Shock Absorption", value: "94%" },
      { label: "Chamber Longevity", value: "1,200 km" },
      { label: "Weight Impact", value: "+28g only" }
    ]
  },
  {
    id: "gripx",
    title: "GripX™ Dual-Tread Rubber Sole",
    subtitle: "Calibrated for Indian Monsoon Asphalt",
    description: "Formulated with silica-infused natural vulcanized rubber. Deep directional sipes channel standing water outward in under 12 milliseconds to eliminate hydroplaning on wet granite and polished tiles.",
    icon: Compass,
    metric: "0.88μ",
    metricLabel: "Wet Tile Friction Coeff",
    color: "#B7FF00",
    pos: { top: "82%", left: "45%" }, // Outsole region
    stats: [
      { label: "Dry Grip Rating", value: "9.8 / 10" },
      { label: "Wet Tile Adhesion", value: "9.5 / 10" },
      { label: "Lug Depth", value: "4.2mm" }
    ]
  },
  {
    id: "flexmesh",
    title: "FlexMesh™ 3.0 Aerodynamic Upper",
    subtitle: "360° Thermo-Regulating Knit",
    description: "Engineered diamond weave breathes actively as your foot flexes. Tested in peak 42°C Indian summer weather to maintain an interior temperature up to 3.2°C cooler than conventional leather shoes.",
    icon: Wind,
    metric: "-3.2°C",
    metricLabel: "Cooler Foot Temp",
    color: "#B7FF00",
    pos: { top: "35%", left: "30%" }, // Forefoot upper
    stats: [
      { label: "Airflow CFM", value: "48 CFM" },
      { label: "Tensile Strength", value: "850 N" },
      { label: "Recycled Yarn", value: "65%" }
    ]
  },
  {
    id: "torsionshank",
    title: "Bio-TPU Torsion Shank",
    subtitle: "Anti-Twist Midfoot Bridge",
    description: "An injection-molded rigid shank connects the heel and forefoot, preventing hyper-torsion during rapid cutting maneuvers on street surfaces while keeping arch fatigue at zero.",
    icon: ShieldCheck,
    metric: "100%",
    metricLabel: "Torsional Stability",
    color: "#B7FF00",
    pos: { top: "60%", left: "55%" }, // Midfoot shank
    stats: [
      { label: "Arch Support", value: "Anatomical" },
      { label: "Bio-Source", value: "Castor Bean" },
      { label: "Flex Modulus", value: "1,850 MPa" }
    ]
  },
  {
    id: "silverlining",
    title: "Silver-Infused Antimicrobial Lining",
    subtitle: "Permanent Zero-Odour Shield",
    description: "Pure silver micro-threads embedded into the bamboo sockliner neutralize 99.8% of bacteria on contact, ensuring fresh wear even after 12-hour high-heat wear.",
    icon: Droplets,
    metric: "99.8%",
    metricLabel: "Bacteria Inhibition",
    color: "#B7FF00",
    pos: { top: "25%", left: "65%" }, // Collar interior
    stats: [
      { label: "Wash Durability", value: "100+ Washes" },
      { label: "Moisture Wicking", value: "Instant" },
      { label: "Skin Safe", value: "Hypoallergenic" }
    ]
  }
];

export default function TechLabSection() {
  const [activeTechId, setActiveTechId] = useState("airflex");
  const activeTech = TECH_HOTSPOTS.find(t => t.id === activeTechId) || TECH_HOTSPOTS[0];

  return (
    <section id="technology" className="py-24 bg-gradient-to-b from-[#0A0A0A] via-zinc-950 to-[#0A0A0A] relative overflow-hidden">
      
      {/* Background Grid & Radial Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#B7FF00]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-[#B7FF00]/40 text-xs font-bold tracking-widest text-[#B7FF00] uppercase">
            <Zap className="w-3.5 h-3.5" />
            <span>NOVA BIOMECHANICS LAB</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white font-heading tracking-tight">
            ENGINEERED FOR MOVEMENT
          </h2>

          <p className="text-sm md:text-base text-zinc-400">
            Click on any interactive hotspot below to explore how aerospace engineering, recycled biopolymers, and Indian street testing converge into every single pair.
          </p>
        </div>

        {/* Interactive Lab Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sneaker Visual with Interactive Hotspot Pins */}
          <div className="lg:col-span-7 relative bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 md:p-12 flex items-center justify-center min-h-[420px] overflow-hidden">
            
            {/* Background Halo */}
            <div className="absolute inset-0 bg-radial from-[#B7FF00]/10 via-transparent to-transparent pointer-events-none" />

            {/* Sneaker Blueprint Visual */}
            <div className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center">
              <img 
                src="./brand/nova_hero_studio.jpg" 
                alt="Authentic NOVA Sneaker Exploded Blueprint" 
                className="w-full h-auto object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)] contrast-110 rounded-2xl"
              />

              {/* Interactive Clickable Pins */}
              {TECH_HOTSPOTS.map((hotspot) => {
                const isActive = activeTechId === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    onClick={() => setActiveTechId(hotspot.id)}
                    className="absolute z-20 group transform -translate-x-1/2 -translate-y-1/2 transition-all cursor-pointer"
                    style={{ top: hotspot.pos.top, left: hotspot.pos.left }}
                    aria-label={`Inspect ${hotspot.title}`}
                  >
                    {/* Ring ping */}
                    <span 
                      className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                        isActive ? 'bg-[#B7FF00]' : 'bg-white/40'
                      }`} 
                    />
                    
                    {/* Button circle */}
                    <div 
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                        isActive 
                          ? 'bg-[#B7FF00] text-black scale-125 shadow-[0_0_20px_#B7FF00]' 
                          : 'bg-black/90 text-white border border-white/60 hover:scale-110 hover:border-[#B7FF00]'
                      }`}
                    >
                      <hotspot.icon className="w-4 h-4" />
                    </div>

                    {/* Hover label tooltip */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 text-[11px] font-bold px-2.5 py-1 rounded-md border border-zinc-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      {hotspot.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Status bar */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span>EXPLODED SCHEMATIC // MODEL: APEX-01</span>
              <span className="text-[#B7FF00] font-bold">5 ACTIVE SENSORS</span>
            </div>

          </div>

          {/* Right Column: Dynamic Deep-Dive Feature Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Hotspot Category Buttons Strip */}
            <div className="flex flex-wrap gap-2">
              {TECH_HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setActiveTechId(h.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTechId === h.id
                      ? 'bg-[#B7FF00] text-black shadow-[0_0_15px_rgba(183,255,0,0.3)]'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {h.title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Active Tech Detail Card */}
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-zinc-800 space-y-6 animate-fadeIn">
              
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#B7FF00] uppercase tracking-wider mb-1">
                    <activeTech.icon className="w-4 h-4" />
                    <span>{activeTech.subtitle}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white font-heading">
                    {activeTech.title}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-black text-[#B7FF00] font-heading font-mono">
                    {activeTech.metric}
                  </div>
                  <div className="text-[10px] text-zinc-400 uppercase font-semibold">
                    {activeTech.metricLabel}
                  </div>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {activeTech.description}
              </p>

              {/* Lab Stats Grid */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-800">
                {activeTech.stats.map((s, idx) => (
                  <div key={idx} className="bg-zinc-900/70 p-3 rounded-xl border border-zinc-800/80">
                    <div className="text-xs text-zinc-400">{s.label}</div>
                    <div className="text-sm font-bold text-white mt-0.5">{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Lab Certification Stamp */}
              <div className="flex items-center gap-2 text-xs text-zinc-400 bg-black/40 p-3 rounded-xl border border-zinc-800/60">
                <ShieldCheck className="w-4 h-4 text-[#B7FF00]" />
                <span>Certified by Indian Institute of Footwear Tech // ISO 9001:2026</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
