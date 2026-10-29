import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, Play, Pause, ZoomIn, ZoomOut, Compass, Sparkles, Shield, Zap } from 'lucide-react';

export default function Product360Viewer({ 
  images = [], 
  spinFrames = null,
  productName = "NOVA Terrain",
  colorName = "Olive & Amber Earth" 
}) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Determine active frame source
  const hasDedicated360 = spinFrames && spinFrames.length > 0;
  const framesList = hasDedicated360 
    ? spinFrames 
    : (images && images.length > 0 ? images : ['/brand/shoe_terrain_hero.png']);

  const frameCount = framesList.length;
  const timerRef = useRef(null);

  // Preload all frames on mount for butter-smooth 60fps rotation
  useEffect(() => {
    framesList.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [framesList]);

  // Auto rotation loop
  useEffect(() => {
    if (isAutoRotating) {
      // Rotate at ~75ms per frame for a continuous 360 spin
      timerRef.current = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % frameCount);
      }, hasDedicated360 ? 80 : 160);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isAutoRotating, frameCount, hasDedicated360]);

  // Mouse / Touch drag to spin
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || (e.touches && e.touches[0].clientX));
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const deltaX = clientX - startX;
    
    // Smooth drag threshold: 8px for 36 frames
    const threshold = frameCount >= 24 ? 8 : 18;
    if (Math.abs(deltaX) >= threshold) {
      const steps = Math.trunc(deltaX / threshold);
      setCurrentFrame((prev) => {
        const next = (prev - steps) % frameCount;
        return next < 0 ? next + frameCount : next;
      });
      setStartX(clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Angle calculations (0° to 350° for 36 frames)
  const angleDegrees = Math.round((currentFrame / frameCount) * 360) % 360;
  
  // Angle descriptions for true sneaker tech depth
  const getAngleDescription = (deg) => {
    if (deg >= 340 || deg <= 20) return "Front Toe Box & HydroShield™ TPU Bumper";
    if (deg > 20 && deg <= 70) return "3/4 Forward Quarter & Dynamic Lacing Web";
    if (deg > 70 && deg <= 110) return "Lateral Profile • Star Mark & GripX™ Lug System";
    if (deg > 110 && deg <= 160) return "3/4 Rear Quarter & Chunky Sculpted Midsole";
    if (deg > 160 && deg <= 200) return "Rear Heel Counter • Embossed NOVA & Pull Loop";
    if (deg > 200 && deg <= 250) return "3/4 Medial Rear Quarter & Ankle Collar Padding";
    if (deg > 250 && deg <= 290) return "Medial Arch Stability & Bio-PEBA Midsole Core";
    return "3/4 Medial Forward & Breathable Ripstop Weave";
  };

  const activeImage = framesList[currentFrame % frameCount] || framesList[0];

  return (
    <div className="relative w-full flex flex-col items-center select-none bg-radial from-zinc-900 to-black rounded-2xl p-6 border border-zinc-800/80 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
      
      {/* Top Controls Header */}
      <div className="w-full flex items-center justify-between z-20 mb-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B7FF00]/10 border border-[#B7FF00]/30 text-[#B7FF00] text-xs font-bold tracking-wide">
            <Compass className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            <span>360° PRECISION STUDIO</span>
          </span>
          <span className="text-xs text-zinc-400 font-mono bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
            {angleDegrees}°
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isAutoRotating 
                ? 'bg-[#B7FF00] text-black shadow-[0_0_15px_rgba(183,255,0,0.5)]' 
                : 'bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700'
            }`}
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoRotating ? 'Pause' : 'Auto Spin'}</span>
          </button>

          <button
            onClick={() => setZoomLevel(zoomLevel === 1 ? 1.4 : 1)}
            className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Toggle Magnification"
          >
            {zoomLevel === 1 ? <ZoomIn className="w-4 h-4" /> : <ZoomOut className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main 360 Stage Area */}
      <div 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        className="relative w-full h-72 sm:h-96 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden group"
      >
        {/* Cinematic dark studio stage lighting */}
        <div className="absolute bottom-6 w-3/4 h-12 bg-black/90 rounded-full blur-xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#B7FF00]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Dynamic Rotated Visual (Real 360 photo, no white background) */}
        <div 
          className="relative transition-transform duration-100 ease-out flex items-center justify-center"
          style={{
            transform: `scale(${zoomLevel}) ${hasDedicated360 ? '' : `perspective(900px) rotateY(${Math.sin((currentFrame / frameCount) * Math.PI * 2) * 15}deg)`}`
          }}
        >
          <img 
            src={activeImage} 
            alt={`${productName} at ${angleDegrees}°`}
            className="max-h-64 sm:max-h-80 w-auto object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)] pointer-events-none transition-all duration-75 select-none"
            draggable="false"
          />

          {/* Active Hotspot Callouts synchronized with real rotation angles */}
          {(angleDegrees >= 70 && angleDegrees <= 110) && (
            <div className="absolute bottom-6 right-6 bg-black/90 border border-[#B7FF00] px-3 py-1.5 rounded-full text-[11px] text-[#B7FF00] font-bold shadow-2xl flex items-center gap-1.5 animate-bounce">
              <Sparkles className="w-3.5 h-3.5 text-[#B7FF00]" />
              <span>{productName.includes('Terrain') ? 'GripX™ 4.5mm Multi-Directional Lugs' : 'AirFlex™ Kinetic Pods & Star Mark'}</span>
            </div>
          )}

          {(angleDegrees >= 160 && angleDegrees <= 200) && (
            <div className="absolute top-8 right-8 bg-black/90 border border-amber-400 px-3 py-1.5 rounded-full text-[11px] text-amber-300 font-bold shadow-2xl flex items-center gap-1.5 animate-pulse">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>{productName.includes('Terrain') ? 'Reinforced TPU Heel Counter Armor' : 'Sculpted Heel Counter & Achilles Foam'}</span>
            </div>
          )}

          {(angleDegrees >= 340 || angleDegrees <= 20) && (
            <div className="absolute bottom-6 left-6 bg-black/90 border border-[#B7FF00] px-3 py-1.5 rounded-full text-[11px] text-[#B7FF00] font-bold shadow-2xl flex items-center gap-1.5 animate-pulse">
              <Zap className="w-3.5 h-3.5 text-[#B7FF00]" />
              <span>{productName.includes('Terrain') ? 'HydroShield™ Water-Resistant Ripstop' : 'Diamond Aerodynamic FlexMesh™ 3.0'}</span>
            </div>
          )}
        </div>

        {/* Drag Hint Overlay */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity">
          <span className="text-[11px] font-semibold text-zinc-400 bg-black/80 px-3.5 py-1 rounded-full border border-zinc-700/60 flex items-center gap-1.5 backdrop-blur-md">
            <RotateCw className="w-3 h-3 text-[#B7FF00]" />
            <span>DRAG HORIZONTALLY TO SPIN 360°</span>
          </span>
        </div>
      </div>

      {/* Scrub Bar & Angle Indicator */}
      <div className="w-full mt-4 space-y-2.5">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="font-semibold text-white">
            {getAngleDescription(angleDegrees)}
          </span>
          <span className="text-zinc-500 font-mono text-[11px]">
            {currentFrame + 1} / {frameCount} FRAMES
          </span>
        </div>

        {/* Interactive Scrub Range Input */}
        <div className="relative w-full flex items-center">
          <input
            type="range"
            min="0"
            max={frameCount - 1}
            value={currentFrame}
            onChange={(e) => {
              setIsAutoRotating(false);
              setCurrentFrame(parseInt(e.target.value, 10));
            }}
            className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-[#B7FF00] focus:outline-none"
            aria-label="360 rotation scrubber"
          />
        </div>

        {/* Quick Angle Jump Buttons */}
        <div className="grid grid-cols-4 gap-2 pt-1 text-[10px] font-bold">
          <button 
            onClick={() => {
              setIsAutoRotating(false);
              setCurrentFrame(0);
            }}
            className={`py-1.5 rounded-lg border transition-all cursor-pointer ${
              angleDegrees >= 340 || angleDegrees <= 20
                ? 'bg-[#B7FF00] text-black border-[#B7FF00] shadow-[0_0_10px_rgba(183,255,0,0.4)]' 
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
          >
            FRONT (0°)
          </button>
          <button 
            onClick={() => {
              setIsAutoRotating(false);
              setCurrentFrame(Math.round(frameCount * 0.25) % frameCount);
            }}
            className={`py-1.5 rounded-lg border transition-all cursor-pointer ${
              angleDegrees >= 70 && angleDegrees <= 110 
                ? 'bg-[#B7FF00] text-black border-[#B7FF00] shadow-[0_0_10px_rgba(183,255,0,0.4)]' 
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
          >
            PROFILE (90°)
          </button>
          <button 
            onClick={() => {
              setIsAutoRotating(false);
              setCurrentFrame(Math.round(frameCount * 0.5) % frameCount);
            }}
            className={`py-1.5 rounded-lg border transition-all cursor-pointer ${
              angleDegrees >= 160 && angleDegrees <= 200 
                ? 'bg-[#B7FF00] text-black border-[#B7FF00] shadow-[0_0_10px_rgba(183,255,0,0.4)]' 
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
          >
            HEEL (180°)
          </button>
          <button 
            onClick={() => {
              setIsAutoRotating(false);
              setCurrentFrame(Math.round(frameCount * 0.75) % frameCount);
            }}
            className={`py-1.5 rounded-lg border transition-all cursor-pointer ${
              angleDegrees >= 250 && angleDegrees <= 290 
                ? 'bg-[#B7FF00] text-black border-[#B7FF00] shadow-[0_0_10px_rgba(183,255,0,0.4)]' 
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
          >
            MEDIAL (270°)
          </button>
        </div>
      </div>

    </div>
  );
}