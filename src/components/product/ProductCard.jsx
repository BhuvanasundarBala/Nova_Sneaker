import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Eye, 
  Star, 
  Check, 
  Sparkles,
  Zap,
  RotateCw
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { playClickSound, playHoverSound, playSwooshSound } from '../../utils/audio';

export default function ProductCard({ product }) {
  const { 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    setProductDetailModal,
    openTryOn 
  } = useShop();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);

  const isFavorited = wishlist.includes(product.id);
  const currentColor = product.colors[selectedColorIdx] || product.colors[0];
  
  // Image swap logic: if hovered and secondary image exists, show angle 2
  const primaryImg = currentColor.heroImage;
  const secondaryImg = currentColor.gallery?.[1] || currentColor.gallery?.[0] || primaryImg;
  const displayImg = isHovered ? secondaryImg : primaryImg;

  const handleQuickAdd = (e, sizeObj) => {
    e.stopPropagation();
    if (!sizeObj.inStock) return;
    setSelectedSize(sizeObj.uk);
    addToCart(product, `UK ${sizeObj.uk}`, currentColor.name, 1);
    setShowSizePicker(false);
  };

  return (
    <article 
      className="group relative bg-zinc-950/70 border border-zinc-800/80 hover:border-[#B7FF00]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_15px_35px_-10px_rgba(183,255,0,0.18)] flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizePicker(false);
      }}
    >
      {/* Top Badges & Action Buttons */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        {/* Badge */}
        {product.badge && (
          <span 
            className={`pointer-events-auto px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase backdrop-blur-md shadow-md ${
              product.badgeType === 'limited' 
                ? 'bg-purple-900/90 text-purple-200 border border-purple-500/50' 
                : 'bg-[#B7FF00] text-black font-extrabold'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Favorite & Quick View Buttons */}
        <div className="pointer-events-auto flex items-center gap-1.5 ml-auto">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              playClickSound();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isFavorited 
                ? 'bg-red-500/20 text-red-500 border border-red-500/40' 
                : 'bg-black/60 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-700/60'
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              playSwooshSound();
              setProductDetailModal(product);
            }}
            className="w-8 h-8 rounded-full bg-black/60 hover:bg-zinc-800 text-zinc-300 hover:text-[#B7FF00] border border-zinc-700/60 flex items-center justify-center transition-colors"
            title="Quick View & 360°"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Image Container with 3D Hover & Image Swap */}
      <div 
        onClick={() => setProductDetailModal(product)}
        className="relative w-full aspect-[4/3] bg-gradient-to-b from-zinc-900/40 to-zinc-950/90 p-6 flex items-center justify-center cursor-pointer overflow-hidden"
      >
        {/* Glow backdrop on hover */}
        <div className="absolute inset-0 bg-radial from-[#B7FF00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <img 
          src={displayImg} 
          alt={product.name}
          className={`relative z-10 w-full h-full ${isHovered ? 'object-contain scale-108 -rotate-3' : 'object-cover rounded-xl'} transform transition-all duration-500 drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]`}
          loading="lazy"
        />

        {/* Quick View Pill on Hover */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#B7FF00]/60 text-[#B7FF00] text-[11px] font-bold">
            <RotateCw className="w-3 h-3 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Interactive 360°</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
        
        {/* Category & Rating Row */}
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-zinc-400">
              {product.category} • {product.gender}
            </span>
            <div className="flex items-center gap-1 text-[#B7FF00] font-bold">
              <Star className="w-3.5 h-3.5 fill-[#B7FF00]" />
              <span>{product.rating}</span>
              <span className="text-zinc-500 font-normal text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h2 
            onClick={() => setProductDetailModal(product)}
            className="text-base font-bold text-white hover:text-[#B7FF00] cursor-pointer transition-colors mt-1 font-heading tracking-wide truncate"
          >
            {product.name}
          </h2>

          <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Dynamic Color Swatches Row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  playClickSound();
                  setSelectedColorIdx(idx);
                }}
                className={`w-5 h-5 rounded-full border-2 transition-transform ${
                  selectedColorIdx === idx 
                    ? 'border-[#B7FF00] scale-110 shadow-[0_0_8px_rgba(183,255,0,0.6)]' 
                    : 'border-zinc-700 hover:border-zinc-400'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>

          <span className="text-[11px] text-zinc-400 font-medium">
            {currentColor.name}
          </span>
        </div>

        {/* Price & Add to Bag Row */}
        <div className="pt-2 border-t border-zinc-800/80">
          <div className="flex items-baseline justify-between mb-2.5">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-white font-heading">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-zinc-500 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <span className="text-[10px] font-bold text-[#B7FF00] bg-[#B7FF00]/10 border border-[#B7FF00]/30 px-1.5 py-0.5 rounded">
              {product.discount}
            </span>
          </div>

          {/* Interactive Size Quick-Picker / Add Button */}
          {showSizePicker ? (
            <div className="animate-fadeIn space-y-2">
              <div className="flex items-center justify-between text-[10px] font-semibold text-zinc-400">
                <span>SELECT UK SIZE:</span>
                <button 
                  onClick={() => setShowSizePicker(false)}
                  className="text-zinc-500 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-6 gap-1">
                {product.sizes.map((s) => (
                  <button
                    key={s.uk}
                    disabled={!s.inStock}
                    onClick={(e) => handleQuickAdd(e, s)}
                    className={`py-1 text-xs font-bold rounded transition-all ${
                      s.inStock 
                        ? 'bg-zinc-800 hover:bg-[#B7FF00] hover:text-black text-white cursor-pointer active:scale-95' 
                        : 'bg-zinc-900 text-zinc-600 line-through cursor-not-allowed opacity-50'
                    }`}
                    title={s.inStock ? `${s.stockLeft} pairs left` : 'Sold out'}
                  >
                    {s.uk}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSizePicker(true);
              }}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-[#B7FF00] text-white hover:text-black font-extrabold text-xs tracking-wider uppercase border border-zinc-700/60 hover:border-[#B7FF00] flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer shadow-sm group/btn"
            >
              <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
              <span>Select Size & Add</span>
            </button>
          )}

        </div>

      </div>
    </article>
  );
}
