import React from 'react';
import { CheckCircle, Info, AlertCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function ToastNotification() {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className="fixed top-20 right-4 md:right-8 z-50 animate-fadeIn pointer-events-none">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-zinc-950/95 border border-[#B7FF00]/50 shadow-[0_10px_30px_rgba(183,255,0,0.25)] backdrop-blur-md text-xs font-bold text-white">
        {toast.type === 'error' ? (
          <AlertCircle className="w-4 h-4 text-red-500" />
        ) : toast.type === 'info' ? (
          <Info className="w-4 h-4 text-blue-400" />
        ) : (
          <CheckCircle className="w-4 h-4 text-[#B7FF00]" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
