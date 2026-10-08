import React from "react";
import { ShoppingCart, Zap } from "lucide-react";

export function MobileActionBar({ addToCart, onBuyNow }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 md:hidden flex gap-2">
      <button
        onClick={addToCart}
        className="flex-1 flex h-11 items-center justify-center gap-1.5 rounded-xl border-2 border-emerald-600 text-emerald-600 font-bold text-xs active:scale-95 transition"
      >
        <ShoppingCart className="h-4 w-4" />
        কার্টে রাখুন
      </button>
      <button
        onClick={onBuyNow}
        className="flex-1 flex h-11 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-200 active:scale-95 transition"
      >
        <Zap className="h-4 w-4 fill-white" />
        অর্ডার করুন
      </button>
    </div>
  );
}
