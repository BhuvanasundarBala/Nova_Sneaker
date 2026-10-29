import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  Sparkles, 
  ChevronDown, 
  ArrowUpDown,
  Filter,
  Check
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import ProductCard from '../product/ProductCard';

const CATEGORY_TABS = [
  "All",
  "Everyday Lifestyle",
  "Performance Running",
  "Streetwear Classic",
  "Outdoor & Trail",
  "Ultra Comfort",
  "Limited Edition"
];

export default function ProductGrid() {
  const { products, selectedCategory, setSelectedCategory } = useShop();

  const [sortBy, setSortBy] = useState("featured"); // featured, price-low, price-high, rating
  const [selectedGender, setSelectedGender] = useState("All"); // All, Men, Women, Unisex
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(5000);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }
      // Gender filter
      if (selectedGender !== "All") {
        if (product.gender !== selectedGender && product.gender !== "Unisex") {
          return false;
        }
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured
    });
  }, [products, selectedCategory, selectedGender, maxPrice, sortBy]);

  return (
    <section id="shop" className="py-20 bg-[#0A0A0A] relative noise-overlay">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-zinc-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#B7FF00] uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-[#B7FF00]" />
              <span>THE 2026 LINEUP</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white font-heading tracking-tight">
              FEATURED PRODUCTS
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>Showing <strong className="text-white font-bold">{filteredProducts.length}</strong> silhouettes</span>
          </div>
        </div>

        {/* Filter & Category Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedCategory(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === tab
                    ? 'bg-[#B7FF00] text-black shadow-[0_0_15px_rgba(183,255,0,0.3)]'
                    : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right Action: Filters Toggle & Sort Dropdown */}
          <div className="flex items-center gap-3 self-end lg:self-auto">
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                showFilters
                  ? 'bg-zinc-800 text-[#B7FF00] border-[#B7FF00]'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-zinc-900 text-zinc-200 text-xs font-bold px-3 py-2 pr-8 rounded-xl border border-zinc-800 focus:outline-none focus:border-[#B7FF00] appearance-none cursor-pointer"
              >
                <option value="featured">Sort: Featured Drops</option>
                <option value="rating">Sort: Top Rated (4.9★+)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

          </div>

        </div>

        {/* Expandable Filter Drawer Panel */}
        {showFilters && (
          <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 mb-8 animate-fadeIn grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            
            {/* Gender filter */}
            <div className="space-y-2">
              <span className="font-bold text-zinc-300 uppercase tracking-wider block">GENDER:</span>
              <div className="flex gap-2">
                {["All", "Men", "Women", "Unisex"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`px-3 py-1.5 rounded-lg border font-semibold ${
                      selectedGender === g 
                        ? 'bg-[#B7FF00] text-black border-[#B7FF00]' 
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-zinc-300">
                <span>MAX PRICE:</span>
                <span className="text-[#B7FF00]">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range" 
                min={2500} 
                max={5000} 
                step={250}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#B7FF00] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>₹2,500</span>
                <span>₹5,000</span>
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex items-end justify-end">
              <button
                onClick={() => {
                  setSelectedGender("All");
                  setMaxPrice(5000);
                  setSelectedCategory("All");
                }}
                className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>

          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-zinc-900/30 rounded-2xl border border-zinc-800">
            <p className="text-zinc-400 text-sm">No sneakers match your exact filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setMaxPrice(10000);
                setSelectedGender("All");
              }}
              className="mt-3 px-4 py-2 bg-[#B7FF00] text-black rounded-lg text-xs font-bold"
            >
              Show All Products
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
