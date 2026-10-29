import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Camera, 
  RotateCw, 
  Sliders, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  RefreshCw,
  Video,
  Download
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function VirtualTryOnModal() {
  const { isTryOnOpen, setIsTryOnOpen, tryOnProduct: product, addToCart } = useShop();

  const [mode, setMode] = useState("simulator"); // simulator or live-camera
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(-10);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(40);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [hasCameraError, setHasCameraError] = useState(false);
  const [captured, setCaptured] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (mode === "live-camera" && isTryOnOpen) {
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setHasCameraError(false);
        })
        .catch(() => {
          setHasCameraError(true);
          setMode("simulator");
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [mode, isTryOnOpen]);

  if (!isTryOnOpen || !product) return null;

  const currentColor = product.colors[selectedColorIdx] || product.colors[0];

  const handleCapture = () => {
    setCaptured(true);
    setTimeout(() => setCaptured(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-fadeIn">
      
      <div 
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
            setIsTryOnOpen(false);
          }}
          className="absolute top-4 right-4 z-40 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: AR Viewport */}
        <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden min-h-[380px] md:min-h-[500px]">
          
          {/* Mode View: Live Camera or Studio Street Simulator */}
          {mode === "live-camera" && !hasCameraError ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0">
              {/* Studio Runway Street Footwear Background */}
              <img 
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80" 
                alt="Runway street surface"
                className="w-full h-full object-cover filter brightness-40 blur-xs"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
            </div>
          )}

          {/* AR Target Alignment Grid Reticle */}
          <div className="absolute inset-8 border border-dashed border-[#B7FF00]/30 rounded-2xl pointer-events-none flex items-center justify-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#B7FF00]/60 bg-black/60 px-3 py-1 rounded-full">
              ALIGN FEET IN RETICLE // AR TRACKING ACTIVE
            </span>
          </div>

          {/* AR Floating Sneaker Overlay */}
          <div 
            className="absolute z-20 pointer-events-none transition-transform duration-75 select-none"
            style={{
              transform: `translate(${posX}px, ${posY}px) scale(${scale}) rotate(${rotation}deg)`
            }}
          >
            <img 
              src={currentColor.heroImage} 
              alt="AR Model" 
              className="w-64 md:w-80 h-auto object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.95)] contrast-110"
            />
            {/* Ground shadow beneath sneaker */}
            <div className="w-full h-6 bg-black/80 rounded-full blur-md -mt-3" />
          </div>

          {/* Capture Toast Overlay */}
          {captured && (
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-30 flex items-center justify-center animate-fadeIn">
              <div className="bg-black/90 border border-[#B7FF00] px-4 py-2 rounded-xl text-xs font-bold text-[#B7FF00] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Look Saved to Gallery!</span>
              </div>
            </div>
          )}

          {/* Mode Switcher Pills */}
          <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
            <button
              onClick={() => setMode("simulator")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                mode === "simulator" ? 'bg-[#B7FF00] text-black' : 'bg-black/70 text-zinc-300 border border-zinc-700'
              }`}
            >
              Street Simulator
            </button>
            <button
              onClick={() => setMode("live-camera")}
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                mode === "live-camera" ? 'bg-[#B7FF00] text-black' : 'bg-black/70 text-zinc-300 border border-zinc-700'
              }`}
            >
              <Camera className="w-3 h-3" />
              <span>Camera Stream</span>
            </button>
          </div>

          {/* Snapshot Button */}
          <div className="absolute bottom-4 z-30">
            <button
              onClick={handleCapture}
              className="px-4 py-2 rounded-full bg-white/90 text-black font-bold text-xs flex items-center gap-2 hover:bg-white transition-transform active:scale-95 shadow-xl"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Snapshot Fit</span>
            </button>
          </div>

        </div>

        {/* Right Side: AR Fit Controls */}
        <div className="w-full md:w-80 p-6 bg-zinc-950 flex flex-col justify-between space-y-4 border-t md:border-t-0 md:border-l border-zinc-800">
          
          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-bold text-[#B7FF00] uppercase tracking-wider">
                VIRTUAL TRY-ON LAB
              </div>
              <h3 className="text-xl font-black text-white font-heading">
                {product.name}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Adjust sizing and rotation to preview fit on your feet.
              </p>
            </div>

            {/* Color Selector */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-zinc-300">COLOR:</span>
              <div className="flex gap-2">
                {product.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`w-6 h-6 rounded-full border-2 ${
                      selectedColorIdx === idx ? 'border-[#B7FF00] scale-110' : 'border-zinc-700'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Interactive Sliders: Scale, Rotation, Vertical Align */}
            <div className="space-y-3 pt-2 border-t border-zinc-800 text-xs">
              
              <div className="space-y-1">
                <div className="flex justify-between text-zinc-400">
                  <span>SCALE:</span>
                  <span className="font-mono text-white">{Math.round(scale * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.7" 
                  max="1.4" 
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-[#B7FF00]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-zinc-400">
                  <span>ANGLE TILT:</span>
                  <span className="font-mono text-white">{rotation}°</span>
                </div>
                <input 
                  type="range" 
                  min="-45" 
                  max="45" 
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-full accent-[#B7FF00]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-zinc-400">
                  <span>POSITION Y:</span>
                  <span className="font-mono text-white">{posY}px</span>
                </div>
                <input 
                  type="range" 
                  min="-50" 
                  max="100" 
                  value={posY}
                  onChange={(e) => setPosY(parseInt(e.target.value))}
                  className="w-full accent-[#B7FF00]"
                />
              </div>

            </div>
          </div>

          {/* Action Row: Price & Add to Bag */}
          <div className="pt-4 border-t border-zinc-800 space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-black text-white font-heading">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#B7FF00] font-bold">
                In Stock • 48H Delivery
              </span>
            </div>

            <button
              onClick={() => {
                addToCart(product, "UK 9", currentColor.name, 1);
                setIsTryOnOpen(false);
              }}
              className="w-full py-3 bg-[#B7FF00] hover:bg-[#a6eb00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5 fill-black" />
              <span>Add This Look to Bag</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
