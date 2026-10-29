import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Check, 
  Star, 
  Zap, 
  ShoppingBag,
  Activity,
  Flame,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../../context/ShopContext';

const QUESTIONS = [
  {
    id: 1,
    title: "Where will you move most in these?",
    subtitle: "Select your primary terrain and activity",
    options: [
      { label: "Urban Streetwear & Daily Flex", desc: "College, commutes, coffee, gigs", matchCat: "Streetwear", icon: "🏙️" },
      { label: "Long Distance Road Running", desc: "Marathons, morning miles, speed splits", matchCat: "Running", icon: "⚡" },
      { label: "HIIT, CrossFit & Heavy Lifting", desc: "Squats, box jumps, gym conditioning", matchCat: "Training", icon: "🏋️" },
      { label: "Collector Drops & Gallery Openings", desc: "Limited numbered silhouetts, art drops", matchCat: "Limited Edition", icon: "🎨" }
    ]
  },
  {
    id: 2,
    title: "What underfoot sensation do you crave?",
    subtitle: "Our cushioning is calibrated for specific rebound profiles",
    options: [
      { label: "High-Rebound Spring Propulsion", desc: "AirFlex™ dual-chamber kinetic snap", icon: "🚀" },
      { label: "Ultra-Soft Cloud Dampening", desc: "Deep impact absorption on concrete", icon: "☁️" },
      { label: "Featherlight 240g Barefoot Flex", desc: "Minimal weight for maximum agility", icon: "🪶" },
      { label: "Oversized Flared Platform Lift", desc: "+4.5cm commanding stance & stability", icon: "📐" }
    ]
  },
  {
    id: 3,
    title: "What colorway matches your vibe?",
    subtitle: "How loud do you want your footwear to speak?",
    options: [
      { label: "High-Voltage Neon Lime Shock", desc: "Bold, energetic, signature NOVA DNA", hex: "#B7FF00" },
      { label: "Stealth Triple Obsidian Black", desc: "Monochrome, utilitarian, low-key flex", hex: "#111111" },
      { label: "Nimbus White & Silver Reflective", desc: "Clean, architectural, crisp contrast", hex: "#EAEAEA" }
    ]
  }
];

export default function AISneakerFinderModal() {
  const { isQuizOpen, setIsQuizOpen, products, addToCart, setProductDetailModal } = useShop();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [recommendedProduct, setRecommendedProduct] = useState(null);

  if (!isQuizOpen) return null;

  const handleSelectOption = (qId, option) => {
    const updated = { ...answers, [qId]: option };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finished all questions -> Run simulated AI matcher
      setIsCalculating(true);
      setTimeout(() => {
        // Find best matching product
        const selectedCat = updated[1]?.matchCat;
        let matched = products.find(p => p.category === selectedCat);
        if (!matched) matched = products[0]; // Flagship Apex One default

        setRecommendedProduct(matched);
        setIsCalculating(false);

        try {
          confetti({
            particleCount: 50,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#B7FF00', '#FFFFFF', '#0A0A0A']
          });
        } catch (e) {}
      }, 1200);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendedProduct(null);
    setIsCalculating(false);
  };

  const currentQ = QUESTIONS[currentStep];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsQuizOpen(false)}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 hover:border-white text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isCalculating ? (
          /* Calculating Animation */
          <div className="py-16 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full border-4 border-zinc-800 border-t-[#B7FF00] animate-spin mx-auto" />
            <h3 className="text-xl font-bold text-white font-heading">
              NOVA Biomechanical Matcher Calculating...
            </h3>
            <p className="text-xs text-zinc-400">
              Correlating 24 foam density variables, terrain physics, and lifestyle ergonomics...
            </p>
          </div>
        ) : recommendedProduct ? (
          /* Match Recommendation Result Screen */
          <div className="space-y-6 animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B7FF00] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>AI MATCH COMPLETE // 98% COMPATIBILITY</span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 bg-gradient-to-b from-zinc-900 to-black p-4 rounded-2xl border border-zinc-800 flex items-center justify-center">
                <img 
                  src={recommendedProduct.colors[0].heroImage} 
                  alt={recommendedProduct.name} 
                  className="max-h-48 object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.9)] transform -rotate-6"
                />
              </div>

              <div className="md:col-span-7 space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#B7FF00] bg-[#B7FF00]/10 px-2 py-0.5 rounded inline-block">
                  PERFECT SILHOUETTE
                </div>

                <h3 className="text-2xl font-black text-white font-heading">
                  {recommendedProduct.name}
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {recommendedProduct.tagline}. Calibrated precisely for your movement frequency with AirFlex™ rebound dampening.
                </p>

                <div className="text-2xl font-black text-white font-heading pt-1">
                  ₹{recommendedProduct.price.toLocaleString('en-IN')}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      addToCart(recommendedProduct, "UK 9", recommendedProduct.colors[0].name, 1);
                      setIsQuizOpen(false);
                    }}
                    className="flex-1 py-3 bg-[#B7FF00] hover:bg-[#a6eb00] text-black font-extrabold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 fill-black" />
                    <span>Add My Match to Bag</span>
                  </button>

                  <button
                    onClick={() => {
                      setProductDetailModal(recommendedProduct);
                      setIsQuizOpen(false);
                    }}
                    className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl border border-zinc-700"
                  >
                    View 360°
                  </button>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* Multi-Step Question Card */
          <div className="space-y-6">
            
            {/* Header with step progress */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-zinc-400 mb-2">
                <span className="text-[#B7FF00] uppercase tracking-wider">
                  QUESTION {currentStep + 1} OF {QUESTIONS.length}
                </span>
                <span className="font-mono">
                  {Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% COMPLETE
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#B7FF00] transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white font-heading mt-4">
                {currentQ.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {currentQ.subtitle}
              </p>
            </div>

            {/* Selectable Options */}
            <div className="grid grid-cols-1 gap-3">
              {currentQ.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(currentQ.id, option)}
                  className="p-4 rounded-2xl bg-zinc-900/70 hover:bg-zinc-900 border border-zinc-800 hover:border-[#B7FF00]/60 text-left transition-all duration-200 flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    {option.icon ? (
                      <span className="text-2xl">{option.icon}</span>
                    ) : option.hex ? (
                      <span 
                        className="w-6 h-6 rounded-full border-2 border-white/40 shadow-sm"
                        style={{ backgroundColor: option.hex }}
                      />
                    ) : null}

                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-[#B7FF00] transition-colors">
                        {option.label}
                      </div>
                      <div className="text-xs text-zinc-400 mt-0.5">
                        {option.desc}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#B7FF00] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
