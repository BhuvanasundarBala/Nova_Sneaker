import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  QrCode, 
  CreditCard, 
  Building2, 
  Banknote, 
  Truck, 
  ShieldCheck, 
  Lock, 
  ArrowRight,
  Package,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../../context/ShopContext';

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartTotal, 
    cartSubtotal,
    discountAmount,
    shippingFee,
    promoCode 
  } = useShop();

  const [paymentMethod, setPaymentMethod] = useState("upi"); // upi, card, netbanking, cod
  const [formData, setFormData] = useState({
    name: "Aarav Sharma",
    phone: "9820123456",
    email: "aarav.sharma@example.com",
    address: "Flat 402, Sea Green Apts, Linking Road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050"
  });

  const [cardData, setCardData] = useState({
    number: "4532 •••• •••• 8821",
    expiry: "08/29",
    cvv: "•••",
    name: "AARAV SHARMA"
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState(null);

  if (!isCheckoutOpen) return null;

  const handlePincodeChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, pincode: val }));
    // Auto-fill Indian city by pin
    if (val.startsWith("400")) {
      setFormData(prev => ({ ...prev, city: "Mumbai", state: "Maharashtra" }));
    } else if (val.startsWith("560")) {
      setFormData(prev => ({ ...prev, city: "Bengaluru", state: "Karnataka" }));
    } else if (val.startsWith("110")) {
      setFormData(prev => ({ ...prev, city: "New Delhi", state: "Delhi NCR" }));
    } else if (val.startsWith("500")) {
      setFormData(prev => ({ ...prev, city: "Hyderabad", state: "Telangana" }));
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedId = "NOV-" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setIsProcessing(false);
      setOrderConfirmed(true);

      try {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#B7FF00', '#FFFFFF', '#0A0A0A']
        });
      } catch (err) {}
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-3 md:p-6 overflow-y-auto animate-fadeIn">
      
      <div 
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {orderConfirmed ? (
          /* Order Confirmation & Real-Time Tracking Screen */
          <div className="p-8 md:p-12 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#B7FF00] text-black flex items-center justify-center mx-auto shadow-[0_0_30px_#B7FF00]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#B7FF00] uppercase tracking-widest">
                ORDER SUCCESSFUL // 48H SLA CONFIRMED
              </span>
              <h2 className="text-3xl font-black text-white font-heading">
                You're in the Movement.
              </h2>
              <p className="text-sm text-zinc-400">
                Order Reference: <strong className="text-white font-mono">{orderId}</strong>
              </p>
            </div>

            {/* Live Tracking Journey Bar */}
            <div className="max-w-xl mx-auto bg-zinc-900/80 p-6 rounded-2xl border border-zinc-800 text-left space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-white border-b border-zinc-800 pb-3">
                <span className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#B7FF00]" />
                  <span>Real-Time Logistics Status</span>
                </span>
                <span className="text-[#B7FF00] font-mono">Bhiwandi Hub, Mumbai</span>
              </div>

              {/* Progress Milestones */}
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                <div className="text-[#B7FF00]">
                  <div className="w-3 h-3 rounded-full bg-[#B7FF00] mx-auto mb-1" />
                  <span>Order Placed</span>
                </div>
                <div className="text-[#B7FF00]">
                  <div className="w-3 h-3 rounded-full bg-[#B7FF00] mx-auto mb-1 animate-pulse" />
                  <span>24-Pt QC Passed</span>
                </div>
                <div className="text-zinc-500">
                  <div className="w-3 h-3 rounded-full bg-zinc-700 mx-auto mb-1" />
                  <span>Blue Dart Air</span>
                </div>
                <div className="text-zinc-500">
                  <div className="w-3 h-3 rounded-full bg-zinc-700 mx-auto mb-1" />
                  <span>Delivered</span>
                </div>
              </div>

              <div className="p-3 bg-black/60 rounded-xl border border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B7FF00]" />
                  <span>Estimated Doorstep Arrival:</span>
                </div>
                <span className="font-bold text-white">Within 48 Hours</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="px-8 py-3.5 bg-[#B7FF00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
              >
                Back to NOVA Store
              </button>
            </div>
          </div>
        ) : (
          /* One Page Apple-Inspired Form */
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
            
            {/* Left 7 Columns: Delivery & Payment Details */}
            <div className="lg:col-span-7 p-6 md:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-zinc-800">
              
              <div>
                <span className="text-xs font-bold text-[#B7FF00] uppercase tracking-wider">
                  FAST 1-PAGE EXPRESS CHECKOUT
                </span>
                <h2 className="text-2xl font-black text-white font-heading mt-0.5">
                  Delivery & Payment
                </h2>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required 
                    className="bg-zinc-900 border border-zinc-700 focus:border-[#B7FF00] p-3 rounded-xl text-white outline-none"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone (10 digits)" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required 
                    className="bg-zinc-900 border border-zinc-700 focus:border-[#B7FF00] p-3 rounded-xl text-white outline-none"
                  />
                  <input 
                    type="email" 
                    placeholder="Email for Tracking Receipt" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required 
                    className="bg-zinc-900 border border-zinc-700 focus:border-[#B7FF00] p-3 rounded-xl text-white outline-none sm:col-span-2"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  2. Shipping Address in India
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <input 
                    type="text" 
                    placeholder="Street Address, Apt / Floor" 
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required 
                    className="bg-zinc-900 border border-zinc-700 focus:border-[#B7FF00] p-3 rounded-xl text-white outline-none sm:col-span-3"
                  />
                  <input 
                    type="text" 
                    placeholder="PIN Code (e.g. 400050)" 
                    value={formData.pincode}
                    onChange={handlePincodeChange}
                    required 
                    className="bg-zinc-900 border border-zinc-700 focus:border-[#B7FF00] p-3 rounded-xl text-white outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="City" 
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required 
                    className="bg-zinc-900 border border-zinc-700 focus:border-[#B7FF00] p-3 rounded-xl text-white outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="State" 
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required 
                    className="bg-zinc-900 border border-zinc-700 focus:border-[#B7FF00] p-3 rounded-xl text-white outline-none"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  3. Select Payment Method
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                      paymentMethod === "upi" ? 'bg-zinc-900 border-[#B7FF00] text-[#B7FF00]' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <QrCode className="w-5 h-5" />
                    <span>UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                      paymentMethod === "card" ? 'bg-zinc-900 border-[#B7FF00] text-[#B7FF00]' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                      paymentMethod === "netbanking" ? 'bg-zinc-900 border-[#B7FF00] text-[#B7FF00]' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                    <span>Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                      paymentMethod === "cod" ? 'bg-zinc-900 border-[#B7FF00] text-[#B7FF00]' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <Banknote className="w-5 h-5" />
                    <span>COD</span>
                  </button>
                </div>

                {/* Sub-interface for Selected Payment */}
                {paymentMethod === "upi" && (
                  <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 flex items-center justify-between gap-4 animate-fadeIn">
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-white block">Instant Scan & Pay</span>
                      <p className="text-zinc-400 text-[11px]">
                        Scan with Google Pay, PhonePe, Paytm, or CRED to complete in 5 seconds.
                      </p>
                      <div className="text-[10px] text-[#B7FF00] font-mono">
                        VPA: novasneakers@icici
                      </div>
                    </div>
                    {/* Simulated Dynamic UPI QR */}
                    <div className="w-20 h-20 bg-white p-1 rounded-xl flex items-center justify-center shadow-lg">
                      <div className="w-full h-full bg-black rounded-lg flex items-center justify-center text-white text-[9px] font-mono text-center p-1">
                        SCAN TO PAY ₹{cartTotal}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 p-4 rounded-2xl border border-zinc-800 space-y-3 animate-fadeIn text-xs">
                    <div className="flex justify-between items-center text-[10px] text-zinc-400">
                      <span>DEBIT / CREDIT CARD</span>
                      <span className="font-bold text-[#B7FF00]">256-BIT ENCRYPTION</span>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Card Number (4532 ...)" 
                      defaultValue="4532 •••• •••• 8821"
                      className="w-full bg-black/60 border border-zinc-700 p-2.5 rounded-lg text-white font-mono"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        placeholder="MM / YY" 
                        defaultValue="08/29" 
                        className="bg-black/60 border border-zinc-700 p-2.5 rounded-lg text-white font-mono"
                      />
                      <input 
                        type="password" 
                        placeholder="CVV" 
                        defaultValue="•••" 
                        className="bg-black/60 border border-zinc-700 p-2.5 rounded-lg text-white font-mono"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 text-xs text-zinc-300">
                    Pay with Cash or UPI directly to our delivery courier upon doorstep inspection.
                  </div>
                )}
              </div>

            </div>

            {/* Right 5 Columns: Order Summary & Place Order */}
            <div className="lg:col-span-5 p-6 md:p-8 bg-zinc-950 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Order Summary
                </h3>

                {/* Items preview */}
                <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-zinc-900/40 p-2 rounded-xl border border-zinc-800/80">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-black rounded-lg" />
                      <div className="flex-1 min-w-0 text-xs">
                        <div className="font-bold text-white truncate">{item.name}</div>
                        <div className="text-[10px] text-zinc-400">{item.color} • {item.size} × {item.quantity}</div>
                      </div>
                      <div className="font-mono text-xs font-bold text-white">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Line Item Breakdown */}
                <div className="space-y-1.5 text-xs text-zinc-400 border-t border-zinc-800 pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-mono">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#B7FF00]">
                      <span>Ambassador Discount (RUNNOVA)</span>
                      <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Air Express Logistics</span>
                    <span className="font-mono text-[#B7FF00]">FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
                    <span className="font-heading">Total Payable</span>
                    <span className="text-[#B7FF00] font-mono text-lg">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

              </div>

              {/* Submit CTA */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#B7FF00] hover:bg-[#a6eb00] text-black font-black text-sm tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(183,255,0,0.4)] active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing Secure Payment...</span>
                    </div>
                  ) : (
                    <>
                      <span>Pay ₹{cartTotal.toLocaleString('en-IN')} & Confirm</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center text-[10px] text-zinc-500">
                  By clicking Pay, you agree to NOVA's Terms & 7-Day Exchange Policy.
                </div>
              </div>

            </div>

          </form>
        )}

      </div>

    </div>
  );
}
