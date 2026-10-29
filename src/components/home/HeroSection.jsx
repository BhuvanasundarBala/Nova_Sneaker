import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Play, 
  ShieldCheck, 
  Clock, 
  Star,
  Eye,
  Activity,
  MapPin,
  Check,
  RotateCw,
  Volume2,
  VolumeX
} from 'lucide-react';
import { StarMarkIcon, SpeedTrail } from '../brand/BrandLogo';
import { useShop } from '../../context/ShopContext';
import { playClickSound, playHoverSound, playSwooshSound } from '../../utils/audio';

export default function HeroSection({ onExploreClick, onShopClick }) {
  const { openTryOn, setIsQuizOpen, products, setProductDetailModal } = useShop();

  // Mouse tilt interaction state with damping
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [activeColorIdx, setActiveColorIdx] = useState(0);

  // Pin code delivery checker state
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  const flagshipProduct = products[0];
  const activeColor = flagshipProduct.colors[activeColorIdx] || flagshipProduct.colors[0];

  // Mouse move handler for 3D perspective
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 28; // -14 to +14 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -28;
    setTargetPos({ x, y });
  };

  // Smooth lerp damping for 3D tilt
  useEffect(() => {
    let animId;
    const lerp = () => {
      setMousePos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * 0.1,
        y: prev.y + (targetPos.y - prev.y) * 0.1
      }));
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [targetPos]);

  // Interactive Particle Sparks Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5 - 0.3,
        alpha: Math.random() * 0.7 + 0.2
      });
    }

    let pAnimId;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(183, 255, 0, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#B7FF00';
        ctx.fill();
      });

      pAnimId = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(pAnimId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Pincode SLA Checker
  const handleCheckPincode = (e) => {
    e.preventDefault();
    playClickSound();
    if (pincode.length !== 6) {
      setPincodeStatus({ text: "Please enter a valid 6-digit Indian PIN code", success: false });
      return;
    }
    if (pincode.startsWith("400")) {
      setPincodeStatus({ text: "⚡ Bhiwandi Hub: Delivery in 24-36 Hours to Mumbai", success: true });
    } else if (pincode.startsWith("560")) {
      setPincodeStatus({ text: "⚡ Doddaballapur Hub: Delivery in 24-48 Hours to Bengaluru", success: true });
    } else if (pincode.startsWith("110")) {
      setPincodeStatus({ text: "⚡ Gurugram Hub: Delivery in 24-48 Hours to Delhi NCR", success: true });
    } else {
      setPincodeStatus({ text: "⚡ Express Blue Dart Air: Delivery in 48 Hours Across India", success: true });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A] pt-6 pb-20 noise-overlay"
    >
      {/* Background Interactive Particle Sparks Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      />

      {/* Dynamic Ambient Neon Green Radial Lighting & Aura */}
      <div 
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#B7FF00]/12 rounded-full blur-[150px] pointer-events-none transition-transform duration-300" 
        style={{ transform: `translate3d(${mousePos.x * 2}px, ${mousePos.y * 2}px, 0)` }}
      />
      <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-zinc-800/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Graphic Background Words */}
      <div className="absolute inset-0 pointer-events-none select-none flex flex-col justify-around opacity-4 overflow-hidden font-black text-6xl md:text-9xl uppercase tracking-tighter text-white">
        <span className="translate-x-10">MOVE • CREATE • EXPLORE</span>
        <span className="-translate-x-20">BELONG • BE YOU • NOVA</span>
        <span className="translate-x-32">RUN YOUR STORY</span>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Hero Brand Manifesto & Interactive CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Live Drop Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-[#B7FF00]/40 backdrop-blur-md text-xs font-semibold tracking-wider text-zinc-300 shadow-[0_0_15px_rgba(183,255,0,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#B7FF00] animate-ping" />
              <span className="uppercase tracking-widest text-[#B7FF00] font-black">DROP 01 LIVE</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300">SHIPS FROM MUMBAI & BANGALORE</span>
            </div>

            {/* Giant Cinematic Headline */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white font-heading leading-[0.92]">
                RUN
                <br />
                <span className="text-gradient-lime drop-shadow-[0_0_35px_rgba(183,255,0,0.5)]">
                  YOUR
                </span>
                <br />
                <span className="relative inline-block">
                  STORY
                  {/* Subtle speed trail vector underline */}
                  <div className="absolute -bottom-2 left-0 w-full text-[#B7FF00]">
                    <SpeedTrail className="w-full h-3 md:h-4" />
                  </div>
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-zinc-300 font-light max-w-xl leading-relaxed pt-2">
              Engineered for movement. Designed for ambition.
              <span className="block text-zinc-400 text-sm md:text-base mt-1.5">
                India's homegrown D2C footwear revolution. Featuring our signature chunky sole with <strong className="text-white font-semibold">AirFlex™ 78% energy rebound pods</strong> and zero luxury mall markups.
              </span>
            </p>

            {/* Interactive Indian Pincode Delivery SLA Bar */}
            <form onSubmit={handleCheckPincode} className="w-full max-w-md bg-zinc-900/80 p-2 rounded-2xl border border-zinc-800 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B7FF00] ml-2 shrink-0" />
              <input 
                type="text" 
                maxLength={6}
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value.replace(/\D/g, ''));
                  setPincodeStatus(null);
                }}
                placeholder="Check 48H Delivery (e.g. 400050)"
                className="bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none flex-1 font-mono"
              />
              <button 
                type="submit"
                onMouseEnter={playHoverSound}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-[#B7FF00] text-zinc-300 hover:text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Check
              </button>
            </form>

            {pincodeStatus && (
              <div className={`text-xs flex items-center gap-1.5 font-medium -mt-2 animate-fadeIn ${pincodeStatus.success ? 'text-[#B7FF00]' : 'text-red-400'}`}>
                <Check className="w-3.5 h-3.5" />
                <span>{pincodeStatus.text}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <button 
                onClick={() => { playClickSound(); onShopClick(); }}
                onMouseEnter={playHoverSound}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#B7FF00] text-black font-black text-sm tracking-wider uppercase hover:bg-[#a6eb00] hover:shadow-[0_0_35px_rgba(183,255,0,0.6)] transition-all duration-300 transform active:scale-95 group cursor-pointer"
              >
                <span>Shop 2026 Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button 
                onClick={() => { playClickSound(); onExploreClick(); }}
                onMouseEnter={playHoverSound}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-white font-bold text-sm tracking-wider border border-zinc-700/80 hover:border-zinc-500 transition-all duration-300 backdrop-blur-md cursor-pointer"
              >
                <span>Explore Drops</span>
              </button>

              <button 
                onClick={() => { playSwooshSound(); openTryOn(flagshipProduct); }}
                onMouseEnter={playHoverSound}
                className="inline-flex items-center gap-2 px-4 py-4 rounded-xl text-xs font-bold text-zinc-300 hover:text-[#B7FF00] hover:bg-zinc-900/60 transition-colors cursor-pointer"
                title="Virtual AR Try-On"
              >
                <div className="w-8 h-8 rounded-full border border-[#B7FF00]/50 flex items-center justify-center text-[#B7FF00]">
                  <Eye className="w-4 h-4 animate-pulse" />
                </div>
                <span className="tracking-wide">AR Try-On</span>
              </button>
            </div>

            {/* Live Statistics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 pt-6 w-full border-t border-zinc-800/80">
              <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/50">
                <div className="text-xl md:text-2xl font-black text-white font-heading">
                  100K+
                </div>
                <div className="text-[11px] text-zinc-400 font-medium">Rebels in Motion</div>
              </div>

              <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/50">
                <div className="text-xl md:text-2xl font-black text-[#B7FF00] font-heading flex items-center gap-1">
                  <span>4.95</span>
                  <Star className="w-4 h-4 fill-[#B7FF00]" />
                </div>
                <div className="text-[11px] text-zinc-400 font-medium">Community Rating</div>
              </div>

              <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/50">
                <div className="text-xl md:text-2xl font-black text-white font-heading">
                  48H
                </div>
                <div className="text-[11px] text-zinc-400 font-medium">Air Express India</div>
              </div>

              <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/50">
                <div className="text-xl md:text-2xl font-black text-white font-heading">
                  92%
                </div>
                <div className="text-[11px] text-zinc-400 font-medium">Eco Index Score</div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Perspective Floating NOVA Sneaker */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Halo Ring & Stage */}
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              
              <div className="absolute inset-0 rounded-full border border-dashed border-[#B7FF00]/25 animate-spin" style={{ animationDuration: '40s' }} />
              <div className="absolute inset-6 rounded-full border border-zinc-800/80" />
              <div className="absolute inset-16 rounded-full bg-gradient-to-tr from-black via-zinc-900 to-zinc-950 shadow-2xl border border-zinc-800" />

              {/* Main 3D Floating NOVA Sneaker */}
              <div 
                className="relative z-20 w-full p-4 transition-transform duration-100 ease-out flex flex-col items-center justify-center"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg) translateZ(30px)`
                }}
              >
                {/* Authentic NOVA Sneaker Image */}
                <div 
                  className="relative group cursor-pointer" 
                  onClick={() => { playSwooshSound(); setProductDetailModal(flagshipProduct); }}
                  onMouseEnter={playHoverSound}
                >
                  <img 
                    src={activeColor.heroImage} 
                    alt="Authentic NOVA Apex One Sneaker with Neon Lime Pods" 
                    className="w-full max-w-md h-auto object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.95)] transform transition-all duration-300 group-hover:scale-105 filter contrast-110 rounded-2xl"
                  />

                  {/* Dynamic Floor Shadow */}
                  <div className="w-3/4 h-8 bg-black/90 rounded-full blur-xl mx-auto -mt-4 pointer-events-none" />

                  {/* Hotspot Pulse Pin on Sneaker Heel */}
                  <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-black/85 backdrop-blur-md border border-[#B7FF00] px-3 py-1.5 rounded-full text-xs text-white shadow-xl">
                    <span className="w-2 h-2 rounded-full bg-[#B7FF00] animate-ping" />
                    <span className="font-bold text-[#B7FF00]">AirFlex™ 78% Rebound</span>
                  </div>

                  {/* Floating Star Mark badge */}
                  <div className="absolute -top-3 -left-3 bg-zinc-900/90 border border-zinc-700/80 p-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-2 animate-float">
                    <StarMarkIcon className="w-6 h-6" />
                    <div className="text-left">
                      <div className="text-[10px] text-zinc-400 uppercase font-semibold">OFFICIAL LINEUP</div>
                      <div className="text-xs font-bold text-white">NOVA Orbit • ₹3,299</div>
                    </div>
                  </div>
                </div>

                {/* Colorway Switcher Buttons directly on Hero */}
                <div className="flex items-center justify-center gap-2 mt-4 bg-zinc-900/70 p-1.5 rounded-full border border-zinc-800">
                  {flagshipProduct.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      onClick={() => { playClickSound(); setActiveColorIdx(idx); }}
                      onMouseEnter={playHoverSound}
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeColorIdx === idx
                          ? 'bg-[#B7FF00] text-black shadow-[0_0_12px_rgba(183,255,0,0.5)]'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span 
                        className="w-2.5 h-2.5 rounded-full border border-black/40" 
                        style={{ backgroundColor: c.hex }} 
                      />
                      <span className="text-[11px]">{c.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>

                {/* Sub-cards row: Official 3 Models */}
                <div className="grid grid-cols-3 gap-2.5 w-full mt-4">
                  <div 
                    onClick={() => { playSwooshSound(); setProductDetailModal(products[0]); }}
                    className="glass-card p-2 rounded-xl text-center cursor-pointer hover:border-[#B7FF00]/60 transition-all group bg-zinc-950/60"
                  >
                    <img 
                      src="/brand/model_orbit.jpg" 
                      alt="NOVA Orbit" 
                      className="w-full h-16 object-cover rounded-lg group-hover:scale-105 transition-transform" 
                    />
                    <div className="text-[10px] font-semibold text-zinc-300 mt-1.5 truncate">Orbit (₹3,299)</div>
                  </div>

                  <div 
                    onClick={() => { playSwooshSound(); setProductDetailModal(products[1]); }}
                    className="glass-card p-2 rounded-xl text-center cursor-pointer hover:border-[#B7FF00]/60 transition-all group bg-zinc-950/60"
                  >
                    <img 
                      src="/brand/model_velocity.jpg" 
                      alt="NOVA Velocity" 
                      className="w-full h-16 object-cover rounded-lg group-hover:scale-105 transition-transform" 
                    />
                    <div className="text-[10px] font-semibold text-zinc-300 mt-1.5 truncate">Velocity (₹3,799)</div>
                  </div>

                  <div 
                    onClick={() => { playSwooshSound(); setProductDetailModal(products[5]); }}
                    className="glass-card p-2 rounded-xl text-center cursor-pointer hover:border-[#B7FF00]/60 transition-all group bg-zinc-950/60"
                  >
                    <img 
                      src="/brand/model_echo.jpg" 
                      alt="NOVA Echo" 
                      className="w-full h-16 object-cover rounded-lg group-hover:scale-105 transition-transform" 
                    />
                    <div className="text-[10px] font-semibold text-zinc-300 mt-1.5 truncate">Echo (₹4,499)</div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Infinite Kinetic Ticker Ribbon */}
      <div className="absolute bottom-0 left-0 right-0 py-2.5 bg-black border-y border-zinc-900 overflow-hidden select-none pointer-events-none">
        <div className="animate-marquee whitespace-nowrap text-[11px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-6">
          <span className="text-[#B7FF00]">NOVA SNEAKERS</span>
          <span>•</span>
          <span>RUN YOUR STORY</span>
          <span>•</span>
          <span className="text-[#B7FF00]">AIRFLEX™ 78% REBOUND</span>
          <span>•</span>
          <span>NO MIDDlemen</span>
          <span>•</span>
          <span className="text-[#B7FF00]">48H EXPRESS DELIVERY INDIA</span>
          <span>•</span>
          <span>7-DAY DOORSTEP EXCHANGE</span>
          <span>•</span>
          <span className="text-[#B7FF00]">CALIBRATED FOR INDIAN FEET</span>
          <span>•</span>
          <span>DROP 01 LIVE</span>
          <span>•</span>
          <span className="text-[#B7FF00]">NOVA SNEAKERS</span>
          <span>•</span>
          <span>RUN YOUR STORY</span>
          <span>•</span>
          <span className="text-[#B7FF00]">AIRFLEX™ 78% REBOUND</span>
          <span>•</span>
          <span>NO MIDDLEMEN</span>
          <span>•</span>
          <span className="text-[#B7FF00]">48H EXPRESS DELIVERY INDIA</span>
          <span>•</span>
        </div>
      </div>
    </section>
  );
}
