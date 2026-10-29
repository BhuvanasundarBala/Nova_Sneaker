import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Leaf, 
  Zap, 
  Check, 
  Compass, 
  Sparkles,
  Info,
  ChevronRight,
  Eye,
  Plus
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import Product360Viewer from './Product360Viewer';
import { ACCESSORIES } from '../../data/products';

export default function ProductDetailModal() {
  const { 
    productDetailModal: product, 
    setProductDetailModal, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    openTryOn,
    setIsSizeGuideOpen 
  } = useShop();

  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState("UK 9");
  const [activeTab, setActiveTab] = useState("gallery"); // gallery, 360, tech, sustainability
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [addBundle, setAddBundle] = useState(true);

  if (!product) return null;

  const isFavorited = wishlist.includes(product.id);
  const activeColor = product.colors?.[activeColorIdx] || product.colors?.[0] || { name: 'Default', heroImage: './brand/nova_hero_studio.jpg' };
  const galleryImages = activeColor.gallery || [activeColor.heroImage];
  const activeMainImage = galleryImages[activeImageIdx] || galleryImages[0];
  const bundleItem = ACCESSORIES[0]; // HydroShield spray

  const handleAddMainAndBundle = () => {
    // Add sneaker
    addToCart(product, selectedSize, activeColor.name, 1);
    // Add bundle item if checked
    if (addBundle && bundleItem) {
      addToCart({
        id: bundleItem.id,
        name: bundleItem.name,
        price: bundleItem.price,
        originalPrice: bundleItem.originalPrice,
        colors: [{ name: "Standard", heroImage: bundleItem.image }]
      }, "Standard", "Standard", 1);
    }
    setProductDetailModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 md:p-6 animate-fadeIn">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-6xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Modal Button */}
        <button
          onClick={() => setProductDetailModal(null)}
          className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-zinc-900/90 border border-zinc-700 hover:border-white text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close product preview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[88vh] overflow-y-auto">
          
          {/* Left Column: Media Gallery / 360 Viewer */}
          <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-zinc-800/80 bg-zinc-950 flex flex-col justify-between space-y-4">
            
            {/* View Mode Switcher Pills */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeTab === 'gallery'
                      ? 'bg-white text-black'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  Gallery Views
                </button>
                <button
                  onClick={() => setActiveTab('360')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeTab === '360'
                      ? 'bg-[#B7FF00] text-black shadow-[0_0_15px_rgba(183,255,0,0.4)]'
                      : 'bg-zinc-900 text-zinc-400 hover:text-[#B7FF00]'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>360° Studio Spin</span>
                </button>
                <button
                  onClick={() => openTryOn(product)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-zinc-900 text-[#B7FF00] border border-[#B7FF00]/40 hover:border-[#B7FF00] flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>AR Try-On</span>
                </button>
              </div>

              {product.badge && (
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#B7FF00] text-black">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Display View: Gallery or 360 */}
            {activeTab === '360' ? (
              <Product360Viewer 
                images={galleryImages} 
                spinFrames={product.spin360Frames}
                productName={product.name}
                colorName={activeColor.name} 
              />
            ) : (
              <div className="space-y-4">
                {/* Main Image with Zoom Preview */}
                <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-zinc-900 to-black rounded-2xl flex items-center justify-center p-8 overflow-hidden group">
                  <div className="absolute inset-0 bg-radial from-[#B7FF00]/10 to-transparent pointer-events-none" />
                  <img 
                    src={activeMainImage} 
                    alt={product.name} 
                    className="max-h-80 w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] transform group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle water-repel / AirFlex badge */}
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-700 text-xs text-zinc-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#B7FF00]" />
                    <span>AirFlex™ Dual-Density Technology</span>
                  </div>
                </div>

                {/* Thumbnails Strip */}
                <div className="grid grid-cols-5 gap-2">
                  {galleryImages.map((imgUrl, i) => {
                    const isDescriptionCard = imgUrl.includes('model_') || i === galleryImages.length - 1;
                    return (
                      <button
                        key={i}
                        onClick={() => setActiveImageIdx(i)}
                        className={`relative aspect-square rounded-xl bg-zinc-900/90 p-1.5 border overflow-hidden transition-all ${
                          activeImageIdx === i 
                            ? 'border-[#B7FF00] scale-105 shadow-[0_0_10px_rgba(183,255,0,0.3)]' 
                            : 'border-zinc-800 hover:border-zinc-600 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={imgUrl} 
                          alt="Thumbnail" 
                          className="w-full h-full object-contain rounded-lg" 
                        />
                        {isDescriptionCard && (
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-[#B7FF00] text-black shadow">
                            SPECS
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Live Shipping Assurance Bar */}
            <div className="bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B7FF00]" />
                <div>
                  <span className="font-bold text-white">Express 48H Delivery</span>
                  <span className="text-zinc-400 block text-[11px]">Free delivery across Mumbai, Delhi, BLR, HYD</span>
                </div>
              </div>
              <button 
                onClick={() => setIsSizeGuideOpen(true)}
                className="flex items-center gap-1 text-zinc-400 hover:text-white text-[11px] cursor-pointer transition-colors"
                title="View Size & Fit Guarantee"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#B7FF00]" />
                <span>7-Day Doorstep Exchange</span>
              </button>
            </div>

          </div>

          {/* Right Column: Specifications, Selectors, Bundles, Add to Bag */}
          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span className="uppercase tracking-widest font-bold text-[#B7FF00]">
                  {product.category} • {product.gender}
                </span>
                <span className="font-mono text-zinc-500">SKU: {product.sku}</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-white font-heading tracking-tight">
                {product.name}
              </h1>

              <p className="text-sm text-zinc-400 mt-1">
                {product.tagline}
              </p>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 text-[#B7FF00] font-bold text-sm">
                  <Star className="w-4 h-4 fill-[#B7FF00]" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-zinc-600">•</span>
                <button 
                  onClick={() => {
                    setProductDetailModal(null);
                    setTimeout(() => {
                      const el = document.getElementById('reviews');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="text-xs text-zinc-400 underline cursor-pointer hover:text-white transition-colors text-left"
                >
                  {product.reviewCount} Verified Athlete Reviews
                </button>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-black text-white font-heading">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-zinc-500 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-bold text-black bg-[#B7FF00] px-2 py-0.5 rounded">
                  {product.discount}
                </span>
                <span className="text-xs text-zinc-400 ml-auto">
                  Taxes Included
                </span>
              </div>
            </div>

            {/* Colour Selector */}
            <div className="space-y-2 pt-2 border-t border-zinc-800/80">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-300">COLORWAY:</span>
                <span className="text-[#B7FF00]">{activeColor.name}</span>
              </div>

              <div className="flex items-center gap-2">
                {product.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setActiveColorIdx(idx);
                      setActiveImageIdx(0);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      activeColorIdx === idx
                        ? 'border-[#B7FF00] bg-zinc-900 text-white'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-black/40" 
                      style={{ backgroundColor: c.hex }} 
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector & Size Guide Link */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-300">SELECT UK SIZE:</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[#B7FF00] hover:underline flex items-center gap-1 text-[11px]"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Size Recommendation & Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.uk}
                    disabled={!s.inStock}
                    onClick={() => setSelectedSize(`UK ${s.uk}`)}
                    className={`py-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all ${
                      selectedSize === `UK ${s.uk}`
                        ? 'bg-[#B7FF00] text-black shadow-[0_0_15px_rgba(183,255,0,0.4)]'
                        : s.inStock
                        ? 'bg-zinc-900 border border-zinc-800 text-white hover:border-[#B7FF00]/60'
                        : 'bg-zinc-900/40 text-zinc-600 line-through border border-transparent cursor-not-allowed'
                    }`}
                  >
                    <span>UK {s.uk}</span>
                    <span className="text-[9px] font-normal opacity-80">
                      {s.inStock ? `${s.stockLeft} left` : 'Sold'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Frequently Bought Together Bundle */}
            <div className="bg-zinc-900/70 p-3.5 rounded-2xl border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B7FF00]" />
                  <span>FREQUENTLY BOUGHT TOGETHER</span>
                </span>
                <span className="text-[#B7FF00] text-[11px] font-mono">+ ₹{bundleItem.price}</span>
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={addBundle} 
                  onChange={(e) => setAddBundle(e.target.checked)}
                  className="w-4 h-4 accent-[#B7FF00] rounded cursor-pointer"
                />
                <img 
                  src={bundleItem.image} 
                  alt={bundleItem.name} 
                  className="w-10 h-10 object-cover rounded-lg border border-zinc-700" 
                />
                <div className="text-xs">
                  <div className="font-semibold text-zinc-200 group-hover:text-white">{bundleItem.name}</div>
                  <div className="text-[11px] text-zinc-400">Protects from monsoon rain, mud & stains</div>
                </div>
              </label>
            </div>

            {/* Description Paragraph */}
            <p className="text-xs text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            {/* Main CTA: Add to Bag & Wishlist Button */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleAddMainAndBundle}
                className="flex-1 py-4 rounded-xl bg-[#B7FF00] hover:bg-[#a6eb00] text-black font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(183,255,0,0.5)] transition-all cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 fill-black" />
                <span>
                  {addBundle ? `Add Sneaker + Bundle (₹${(product.price + bundleItem.price).toLocaleString('en-IN')})` : `Add to Bag (${selectedSize})`}
                </span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-xl border transition-colors flex items-center justify-center ${
                  isFavorited 
                    ? 'bg-red-500/20 border-red-500 text-red-500' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-500' : ''}`} />
              </button>
            </div>

            {/* Sustainability Highlights */}
            {product.sustainabilityScore && (
              <div className="flex items-center gap-2 text-[11px] text-zinc-400 border-t border-zinc-800/80 pt-3">
                <Leaf className="w-4 h-4 text-[#B7FF00]" />
                <span>
                  <strong className="text-white">{product.sustainabilityScore.score}% Eco-Index</strong>: {product.sustainabilityScore.facts[0]}
                </span>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
