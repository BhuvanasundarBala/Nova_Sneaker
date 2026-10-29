import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  Sparkles, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ACCESSORIES } from '../../data/products';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity,
    cartSubtotal,
    cartOriginalTotal,
    discountAmount,
    shippingFee,
    isFreeShipping,
    cartTotal,
    promoCode,
    promoApplied,
    applyPromo,
    addToCart,
    setIsCheckoutOpen 
  } = useShop();

  const [inputCode, setInputCode] = useState('');
  const freeShippingThreshold = 2999;
  const progressRatio = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - cartSubtotal);

  if (!isCartOpen) return null;

  const handleApply = (e) => {
    e.preventDefault();
    if (inputCode) {
      applyPromo(inputCode);
      setInputCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end animate-fadeIn">
      
      {/* Click outside to close */}
      <div className="flex-1" onClick={() => setIsCartOpen(false)} />

      {/* Drawer Panel */}
      <div 
        className="w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full flex flex-col justify-between shadow-2xl relative animate-slideLeft z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B7FF00]" />
            <h2 className="text-lg font-black text-white font-heading tracking-tight">
              YOUR BAG ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-zinc-900/80 px-5 py-3 border-b border-zinc-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Truck className="w-3.5 h-3.5 text-[#B7FF00]" />
              {isFreeShipping ? (
                <span className="text-[#B7FF00] font-bold">You qualify for FREE 48H Air Express!</span>
              ) : (
                <span>Add ₹{remainingForFree.toLocaleString('en-IN')} more for Free Air Express!</span>
              )}
            </span>
            <span className="text-zinc-500 font-mono text-[11px]">{Math.round(progressRatio)}%</span>
          </div>

          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#B7FF00] rounded-full transition-all duration-300"
              style={{ width: `${progressRatio}%` }}
            />
          </div>
        </div>

        {/* Scrollable Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-zinc-700 mx-auto" />
              <h3 className="text-base font-bold text-zinc-300">Your bag is empty</h3>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Discover our high-rebound street runners and experience pure movement.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-[#B7FF00] text-black font-bold text-xs rounded-xl"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            <>
              {cart.map((item, index) => (
                <div 
                  key={`${item.id}-${item.size}-${index}`}
                  className="bg-zinc-900/60 p-3.5 rounded-2xl border border-zinc-800/80 flex gap-3.5 items-center"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-18 h-18 object-contain bg-zinc-950 rounded-xl p-1 border border-zinc-800"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-white truncate font-heading">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-zinc-500 hover:text-red-400 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      {item.color} • <strong className="text-white">{item.size}</strong>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-zinc-700 rounded-lg bg-zinc-950">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-black text-white font-mono">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Cross-Sell Accessories Strip */}
              <div className="pt-4 border-t border-zinc-800/80">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  PAIR WITH SNEAKER ESSENTIALS:
                </span>
                <div className="space-y-2">
                  {ACCESSORIES.slice(0, 2).map((acc) => (
                    <div key={acc.id} className="bg-zinc-900/40 p-2.5 rounded-xl border border-zinc-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={acc.image} alt={acc.name} className="w-9 h-9 object-cover rounded-lg" />
                        <div>
                          <div className="text-xs font-semibold text-white">{acc.name}</div>
                          <div className="text-[10px] text-[#B7FF00] font-mono">₹{acc.price}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart({
                          id: acc.id,
                          name: acc.name,
                          price: acc.price,
                          originalPrice: acc.originalPrice,
                          colors: [{ name: "Standard", heroImage: acc.image }]
                        }, "Standard", "Standard", 1)}
                        className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-[#B7FF00] hover:text-black text-xs font-bold transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-zinc-800 bg-zinc-950 space-y-4">
            
            {/* Promo code form */}
            <form onSubmit={handleApply} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={inputCode} 
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  placeholder="Promo Code (RUNNOVA)"
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#B7FF00] pl-9 pr-3 py-2 text-xs text-white uppercase placeholder-zinc-500 rounded-xl focus:outline-none font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white rounded-xl transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {promoApplied && (
              <div className="flex items-center justify-between text-xs text-[#B7FF00] bg-[#B7FF00]/10 px-3 py-1.5 rounded-lg border border-[#B7FF00]/20">
                <span className="flex items-center gap-1 font-bold">
                  <Check className="w-3.5 h-3.5" />
                  Code '{promoCode}' active (-15%)
                </span>
                <span className="font-mono font-bold">-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-mono">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-[#B7FF00]">
                  <span>Discount</span>
                  <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>48H Air Logistics</span>
                <span className="font-mono text-white">
                  {shippingFee === 0 ? <strong className="text-[#B7FF00]">FREE</strong> : `₹${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-zinc-800">
                <span className="font-heading">Estimated Total</span>
                <span className="text-[#B7FF00] font-mono text-base">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full py-4 bg-[#B7FF00] hover:bg-[#a6eb00] text-black font-black text-sm tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(183,255,0,0.4)] transition-all cursor-pointer active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] text-zinc-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#B7FF00]" />
                256-Bit SSL Encrypted
              </span>
              <span>•</span>
              <span>UPI, Cards & COD Supported</span>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
