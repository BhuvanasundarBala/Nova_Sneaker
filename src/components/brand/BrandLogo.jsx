import React from 'react';

/**
 * NOVA Star Mark SVG - Dynamic Ascending Star/Arrow
 */
export function StarMarkIcon({ className = "w-6 h-6", color = "#B7FF00" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dynamic angled star arrow */}
      <polygon 
        points="15,85 45,55 35,45 85,15 55,65 45,55 15,85" 
        fill={color}
      />
      <polygon 
        points="85,15 95,30 75,35 95,50 85,15" 
        fill={color}
        opacity="0.9"
      />
      <path 
        d="M20 90 L50 60 L60 70 Z" 
        fill={color} 
        opacity="0.7"
      />
    </svg>
  );
}

/**
 * Speed Trail Accent Element
 */
export function SpeedTrail({ className = "w-24 h-4", color = "#B7FF00" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 160 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M2 20 C 40 18, 90 8, 158 2 C 110 8, 50 16, 2 20 Z" 
        fill={color}
      />
    </svg>
  );
}

/**
 * Complete Brand Logo with typography and tag
 */
export default function BrandLogo({ 
  size = "md", 
  variant = "white", // white, lime, full
  showTagline = true,
  onClick = null 
}) {
  const isLarge = size === "lg";
  const isSmall = size === "sm";

  return (
    <div 
      onClick={onClick}
      className={`inline-flex flex-col cursor-pointer select-none group transition-transform duration-200 active:scale-95`}
    >
      <div className="flex items-center gap-1.5">
        {/* NOVA Typography with Neon Star Mark */}
        <div className="flex items-baseline tracking-tighter">
          <span className={`font-black uppercase tracking-tight ${isLarge ? 'text-4xl' : isSmall ? 'text-xl' : 'text-2xl md:text-3xl'} font-heading text-white`}>
            NOV
          </span>
          <span className={`font-black uppercase tracking-tight relative ${isLarge ? 'text-4xl' : isSmall ? 'text-xl' : 'text-2xl md:text-3xl'} font-heading text-white`}>
            A
            {/* Glowing neon star rising from the 'A' */}
            <span className="absolute -top-1 -right-3 md:-right-4 text-[#B7FF00] drop-shadow-[0_0_8px_rgba(183,255,0,0.8)] animate-pulse">
              ✦
            </span>
          </span>
        </div>

        {/* Dynamic Star Arrow Vector Mark */}
        <div className="ml-1 relative">
          <div className="w-5 h-5 md:w-6 md:h-6 text-[#B7FF00] transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
            <svg viewBox="0 0 32 32" fill="currentColor">
              <path d="M4 28 L16 16 L20 20 L28 4 L12 12 L16 16 Z" />
              <path d="M22 6 L30 4 L28 12 Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* SNEAKERS subtitle spaced */}
      <div className="flex items-center justify-between text-[8px] md:text-[9px] uppercase tracking-[0.35em] text-[#C7C7C7] font-semibold pl-0.5">
        <span>SNEAKERS</span>
      </div>

      {showTagline && (
        <div className="mt-0.5 text-[9px] md:text-[10px] tracking-wide font-medium italic flex items-center gap-1">
          <span className="text-[#F7F7F7]">RUN</span>
          <span className="text-[#B7FF00] font-bold underline decoration-[#B7FF00]/60 decoration-2 underline-offset-2">
            YOUR
          </span>
          <span className="text-[#F7F7F7]">STORY</span>
        </div>
      )}
    </div>
  );
}
