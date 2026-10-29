import React, { useState } from 'react';
import { X, Check, Ruler, Info, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const SIZE_TABLE = [
  { uk: 6, usMen: 7, usWomen: 8.5, eu: 40, cm: 25.0, fit: "Snug" },
  { uk: 7, usMen: 8, usWomen: 9.5, eu: 41, cm: 26.0, fit: "True to Size" },
  { uk: 8, usMen: 9, usWomen: 10.5, eu: 42, cm: 27.0, fit: "True to Size" },
  { uk: 9, usMen: 10, usWomen: 11.5, eu: 43, cm: 28.0, fit: "Popular Size" },
  { uk: 10, usMen: 11, usWomen: 12.5, eu: 44, cm: 29.0, fit: "True to Size" },
  { uk: 11, usMen: 12, usWomen: 13.5, eu: 45, cm: 30.0, fit: "Relaxed" }
];

export default function SizeGuideModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();

  const [comparedBrand, setComparedBrand] = useState("Nike");
  const [comparedSize, setComparedSize] = useState("US 10");

  if (!isSizeGuideOpen) return null;

  const calculateNovaFit = () => {
    if (comparedSize.includes("10")) return "UK 9 (EU 43)";
    if (comparedSize.includes("9")) return "UK 8 (EU 42)";
    if (comparedSize.includes("8")) return "UK 7 (EU 41)";
    if (comparedSize.includes("11")) return "UK 10 (EU 44)";
    return "UK 8 (EU 42)";
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 max-h-[88vh] overflow-y-auto space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#B7FF00] uppercase tracking-wider mb-1">
            <Ruler className="w-3.5 h-3.5" />
            <span>PRECISION FIT ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
            SNEAKER SIZE GUIDE
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            NOVA sneakers are calibrated slightly wider for Indian foot geometry to avoid toe-pinch.
          </p>
        </div>

        {/* Brand Comparative Size Converter */}
        <div className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-white block">
            CONVERT FROM YOUR CURRENT SNEAKER:
          </span>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">Your Brand:</label>
              <select
                value={comparedBrand}
                onChange={(e) => setComparedBrand(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 text-xs text-white p-2.5 rounded-xl focus:border-[#B7FF00] focus:outline-none"
              >
                <option value="Nike">Nike / Jordan</option>
                <option value="Adidas">Adidas Originals</option>
                <option value="Puma">Puma</option>
                <option value="New Balance">New Balance</option>
                <option value="On Running">On Running</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">Your US Size:</label>
              <select
                value={comparedSize}
                onChange={(e) => setComparedSize(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 text-xs text-white p-2.5 rounded-xl focus:border-[#B7FF00] focus:outline-none"
              >
                <option value="US 7">US 7</option>
                <option value="US 8">US 8</option>
                <option value="US 9">US 9</option>
                <option value="US 10">US 10</option>
                <option value="US 11">US 11</option>
                <option value="US 12">US 12</option>
              </select>
            </div>
          </div>

          <div className="bg-black/60 p-3 rounded-xl border border-[#B7FF00]/40 flex items-center justify-between">
            <span className="text-xs text-zinc-300">
              Recommended NOVA Fit:
            </span>
            <span className="text-sm font-black text-[#B7FF00] font-mono">
              {calculateNovaFit()} (True to Size)
            </span>
          </div>
        </div>

        {/* Size Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 text-[#B7FF00]">UK</th>
                <th className="py-2.5">US MEN</th>
                <th className="py-2.5">US WOMEN</th>
                <th className="py-2.5">EU</th>
                <th className="py-2.5">FOOT LENGTH (CM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-zinc-300 font-mono">
              {SIZE_TABLE.map((row) => (
                <tr key={row.uk} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="py-3 font-bold text-white font-sans">UK {row.uk}</td>
                  <td className="py-3">{row.usMen}</td>
                  <td className="py-3">{row.usWomen}</td>
                  <td className="py-3">{row.eu}</td>
                  <td className="py-3 text-zinc-400">{row.cm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Free Exchange Promise */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900/40 p-3 rounded-xl border border-zinc-800">
          <Check className="w-4 h-4 text-[#B7FF00]" />
          <span>Fit Guarantee: Free doorstep size swaps within 7 days across India.</span>
        </div>

        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-[#B7FF00] text-zinc-300 hover:text-black font-bold text-xs uppercase tracking-wider transition-colors"
        >
          Got it, Close
        </button>

      </div>
    </div>
  );
}
