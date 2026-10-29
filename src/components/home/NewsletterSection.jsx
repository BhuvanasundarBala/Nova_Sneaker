import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { StarMarkIcon } from '../brand/BrandLogo';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubscribed(true);
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#B7FF00', '#FFFFFF', '#0A0A0A']
      });
    } catch (err) {}
  };

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#B7FF00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="max-w-4xl mx-auto glass-panel p-8 md:p-16 rounded-3xl border border-zinc-800 text-center relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-[#B7FF00]/40 text-xs font-bold text-[#B7FF00] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EARLY ACCESS COMMUNITY</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white font-heading tracking-tight">
            JOIN THE MOVEMENT.
          </h2>

          <p className="text-sm md:text-base text-zinc-300 max-w-xl mx-auto mt-3 leading-relaxed">
            Get confidential access to numbered drops, secret sample sales, and receive an instant <strong className="text-[#B7FF00]">₹500 voucher</strong> on your first pair.
          </p>

          {subscribed ? (
            <div className="mt-8 p-6 bg-zinc-900/90 rounded-2xl border border-[#B7FF00] max-w-md mx-auto animate-fadeIn space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#B7FF00] text-black flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Welcome to NOVA Movement.</h3>
              <p className="text-xs text-zinc-300">
                Your ₹500 welcome credit voucher code is:
              </p>
              <div className="text-xl font-mono font-black text-[#B7FF00] tracking-widest bg-black/60 py-2 rounded-lg border border-zinc-800">
                RUNNOVA500
              </div>
              <span className="text-[10px] text-zinc-500 block">Applied automatically at checkout.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="flex-1 bg-zinc-900/90 border border-zinc-700 focus:border-[#B7FF00] px-4 py-3.5 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-[#B7FF00] hover:bg-[#a6eb00] text-black font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B7FF00]" />
              No spam. Unsubscribe anytime with 1-click.
            </span>
            <span>•</span>
            <span>Exclusive athlete drops</span>
            <span>•</span>
            <span>100K+ members across India</span>
          </div>

        </div>

      </div>
    </section>
  );
}
