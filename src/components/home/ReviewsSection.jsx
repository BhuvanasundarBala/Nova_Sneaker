import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle, 
  ThumbsUp, 
  ChevronLeft, 
  ChevronRight, 
  Quote,
  Sparkles,
  MapPin,
  Eye
} from 'lucide-react';
import { REVIEWS } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { playClickSound, playSwooshSound } from '../../utils/audio';

export default function ReviewsSection() {
  const { products, setProductDetailModal } = useShop();
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = (reviewId) => {
    playClickSound();
    setReviewsList(prev => prev.map(rev => {
      if (rev.id === reviewId) {
        return { ...rev, likes: rev.likes + 1, hasLiked: true };
      }
      return rev;
    }));
  };

  const nextSlide = () => {
    playClickSound();
    setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
  };

  const prevSlide = () => {
    playClickSound();
    setCurrentIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  };

  const handleOpenProduct = (productName) => {
    playSwooshSound();
    const matched = products.find(p => productName.toLowerCase().includes(p.name.toLowerCase())) 
      || products[0];
    setProductDetailModal(matched);
  };

  // Cyclically display 4 cards based on currentIndex
  const visibleReviews = Array.from({ length: Math.min(4, reviewsList.length) }, (_, i) => {
    return reviewsList[(currentIndex + i) % reviewsList.length];
  });

  return (
    <section id="reviews" className="py-24 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#B7FF00]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#B7FF00] uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-[#B7FF00]" />
              <span>TESTED ON INDIAN CONCRETE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-heading tracking-tight">
              ATHLETE COMMUNITY REVIEWS
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-zinc-300">
              <span className="text-[#B7FF00] font-black text-xl">4.92 / 5.0</span>
              <div className="flex text-[#B7FF00]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-zinc-500 font-medium">(1,840+ verified pairs)</span>
            </div>

            {/* Carousel navigation buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#B7FF00] text-zinc-300 hover:text-[#B7FF00] flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                aria-label="Previous reviews"
                title="Previous Reviews"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#B7FF00] text-zinc-300 hover:text-[#B7FF00] flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                aria-label="Next reviews"
                title="Next Reviews"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Cards Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-[#B7FF00]/40 transition-all duration-300 group animate-fadeIn"
            >
              <div className="space-y-3">
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#B7FF00]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
                    <CheckCircle className="w-3 h-3 text-[#B7FF00]" />
                    <span>VERIFIED BUYER</span>
                  </span>
                </div>

                {/* Headline */}
                <h4 className="text-sm font-bold text-white font-heading leading-snug">
                  "{review.headline}"
                </h4>

                {/* Comment Body */}
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {/* Reviewer Meta & Helpful Upvote */}
              <div className="pt-4 border-t border-zinc-800/80 space-y-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-10 h-10 rounded-full object-cover border border-zinc-700" 
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{review.name}</div>
                    <div className="text-[10px] text-zinc-400 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-[#B7FF00]" />
                      <span>{review.city}</span>
                    </div>
                  </div>
                </div>

                {/* Product Purchased Tag & Like Button */}
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <button
                    onClick={() => handleOpenProduct(review.productName)}
                    className="text-zinc-400 hover:text-[#B7FF00] hover:underline truncate max-w-[150px] text-left cursor-pointer transition-colors"
                    title={`View ${review.productName}`}
                  >
                    {review.productName} ({review.purchasedSize})
                  </button>

                  <button
                    onClick={() => handleLike(review.id)}
                    className={`flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer ${
                      review.hasLiked 
                        ? 'text-[#B7FF00]' 
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{review.likes}</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
