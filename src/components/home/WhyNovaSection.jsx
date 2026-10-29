import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Leaf, 
  Truck, 
  RotateCcw, 
  Scale, 
  Check, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  Percent,
  Layers,
  Award
} from 'lucide-react';
import { D2C_COMPARISON } from '../../data/products';
import { useShop } from '../../context/ShopContext';

export default function WhyNovaSection() {
  const { setIsAdminView } = useShop();
  const [activeTab, setActiveTab] = useState("transparency"); // transparency vs features

  return (
    <section id="whynova" className="py-24 bg-[#0A0A0A] border-t border-zinc-900 relative">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#B7FF00] uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-[#B7FF00]" />
              <span>THE DIRECT-TO-CONSUMER ADVANTAGE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-heading tracking-tight">
              WHY NOVA SNEAKERS
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("transparency")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "transparency" 
                  ? 'bg-[#B7FF00] text-black shadow-[0_0_15px_rgba(183,255,0,0.3)]' 
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              D2C Price Transparency
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "features" 
                  ? 'bg-[#B7FF00] text-black shadow-[0_0_15px_rgba(183,255,0,0.3)]' 
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              Brand Pillars
            </button>
          </div>
        </div>

        {activeTab === "transparency" ? (
          /* Transparent Supply Chain & Price Comparison Matrix */
          <div className="glass-panel p-6 md:p-10 rounded-3xl border border-zinc-800 space-y-8 animate-fadeIn">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-zinc-800 pb-8">
              <div>
                <span className="text-xs font-bold text-[#B7FF00] uppercase tracking-wider">
                  SCM Disruption Model
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white font-heading mt-1">
                  We Cut the Middlemen. Not the Materials.
                </h3>
                <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                  Traditional sneaker retail routes pairs through 4 layers of distributors and luxury mall landlords, inflating prices by over 300%. By shipping direct from our 3 Indian regional fulfillment hubs to your doorstep, we invest 3x more in aerospace cushioning while charging you less.
                </p>
              </div>

              {/* High-level comparison summary cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900/90 p-5 rounded-2xl border-2 border-[#B7FF00] relative">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#B7FF00]">
                    NOVA D2C
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-heading mt-1">
                    ₹6,999
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Zero retail middleman cuts. 100% focused on product engineering.
                  </p>
                </div>

                <div className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-800">
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    TRADITIONAL MALL BRAND
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-zinc-400 font-heading mt-1 line-through">
                    ₹18,999
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Over ₹11,000 paid for luxury mall rent and distributor margins.
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Row-by-Row Cost Breakdown Table */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
                Cost Breakdown per Pair (INR ₹)
              </h4>

              <div className="space-y-3">
                {D2C_COMPARISON.breakdown.map((row, idx) => {
                  const novaRatio = (row.nova / D2C_COMPARISON.novaCost) * 100;
                  const tradRatio = (row.traditional / D2C_COMPARISON.traditionalCost) * 100;

                  return (
                    <div key={idx} className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                        <span className="font-semibold text-white">{row.label}</span>
                        <div className="flex items-center gap-6 font-mono">
                          <span className="text-[#B7FF00] font-bold">
                            NOVA: ₹{row.nova.toLocaleString('en-IN')}
                          </span>
                          <span className="text-zinc-500">
                            Traditional: ₹{row.traditional.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Visual Comparison Bars */}
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        {/* NOVA Bar */}
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#B7FF00] rounded-full transition-all duration-500" 
                            style={{ width: `${Math.max(2, (row.nova / 3000) * 100)}%` }} 
                          />
                        </div>
                        {/* Traditional Bar */}
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${row.traditional > 2500 ? 'bg-red-500/70' : 'bg-zinc-600'}`} 
                            style={{ width: `${Math.max(2, (row.traditional / 7000) * 100)}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* SCM Admin Link Pill */}
              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  Data sourced from audited FY26 direct-to-consumer manufacturing metrics.
                </span>
                <button
                  onClick={() => setIsAdminView(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B7FF00] hover:underline cursor-pointer"
                >
                  <span>Explore Academic SCM Command Center</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        ) : (
          /* Brand Pillars / Value Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            
            <div className="glass-card p-6 md:p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00]">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                48-Hour Air Express Across India
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Operating 3 centralized automated fulfillment hubs in Bhiwandi (Mumbai), Doddaballapur (Bengaluru), and Gurugram (NCR) guaranteeing express air logistics with 97.4% on-time SLA.
              </p>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00]">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                91% Bio-Based Eco-Index
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Algae-derived bloom foam insoles, 65% recycled ocean plastic FlexMesh upper, water-based non-toxic adhesives, and zero single-use plastic in packaging.
              </p>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00]">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                7-Day Hassle-Free Doorstep Exchange
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Need a half-size up or different color? Our delivery partner brings the new pair directly to your doorstep and swaps it in one smooth handover.
              </p>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                Calibrated for Indian Feet & Climate
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Slightly wider anatomical forefoot toe box tailored for Indian foot geometry, hydrophobic monsoon coatings, and breathable meshes for 40°C heat.
              </p>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00]">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                Direct-to-Consumer Fair Pricing
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                World-class materials from the same tier-1 Italian and German manufacturers as global icons, delivered directly without artificial luxury markups.
              </p>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                Individually Inspected & Numbered
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Every single pair undergoes a 24-point quality inspection before being boxed with our signature matte shoebox and branded hangtag.
              </p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
