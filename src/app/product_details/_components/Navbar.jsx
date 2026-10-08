import React from "react";
import { ArrowLeft, Share2, Heart, ShoppingCart } from "lucide-react";

export function Navbar({ liked, setLiked, totalItemsCount, onShare, onOpenCart }) {
  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="md:hidden flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 active:scale-95 transition">
            <ArrowLeft className="h-5 w-5 text-slate-700" />
          </button>
          <a href="#" className="font-extrabold text-lg md:text-xl text-emerald-600 tracking-tight">
            রহমান<span className="text-slate-900">ফ্যাশন</span>
          </a>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="পণ্য খুঁজুন..."
            className="w-full bg-slate-100 border-0 rounded-full px-4 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onShare}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 transition text-slate-700"
            title="শেয়ার করুন"
          >
            <Share2 className="h-5 w-5" />
          </button>

          <button
            onClick={() => setLiked(!liked)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 transition text-slate-700 relative"
            title="উইশলিস্ট"
          >
            <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-full font-bold text-xs hover:bg-emerald-100 transition active:scale-95 border border-emerald-200"
          >
            <ShoppingCart className="h-5 w-5 text-emerald-600" />
            <span className="hidden md:inline">কার্ট</span>
            {totalItemsCount > 0 && (
              <span className="bg-emerald-600 text-white text-[11px] font-extrabold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
