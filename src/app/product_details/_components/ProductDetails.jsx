import React from "react";
import { Store, Star, Tag, ShoppingCart, Zap } from "lucide-react";
import { ProductOptions } from "./ProductOptions";

export function ProductDetails({
  colors,
  selectedColor,
  setSelectedColor,
  sizes,
  selectedSize,
  setSelectedSize,
  quantity,
  increaseQuantity,
  decreaseQuantity,
  addToCart,
  onBuyNow,
}) {
  return (
    <div className="lg:col-span-7 px-4 md:px-0 flex flex-col justify-between space-y-5">
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
            পুরুষদের ক্লাসিক কালেকশন
          </span>
          <span className="flex items-center gap-1 text-slate-600">
            <Store className="w-3.5 h-3.5 text-slate-400" />
            ইন স্টক (স্টকে আছে)
          </span>
        </div>

        <h1 className="text-xl md:text-3xl font-bold text-slate-900 tracking-tight leading-snug mt-1">
          প্রিমিয়াম ক্যাজুয়াল কটন ফুল স্লিভ শার্ট
        </h1>

        <div className="mt-2 flex items-center gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-amber-900">৪.৮</span>
          </div>
          <span className="text-slate-500 underline cursor-pointer">১২৪টি রিভিউ</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">৩২০+ বিক্রি হয়েছে</span>
        </div>

        <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-baseline gap-3">
          <span className="text-3xl font-extrabold text-emerald-600">৳৮৫০</span>
          <span className="text-base text-slate-400 line-through">৳১,২০০</span>
          <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-100">
            সেভ ৳৩৫০
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs bg-emerald-50/60 border border-emerald-100 text-emerald-800 p-2.5 rounded-xl">
          <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>প্রথম অর্ডারে কুপন কোড <b>FIRST10</b> ব্যবহার করে পান অতিরিক্ত ১০% ছাড়!</span>
        </div>

        <ProductOptions
          colors={colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          sizes={sizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          quantity={quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      </div>

      <div className="hidden md:grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
        <button
          onClick={addToCart}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-emerald-600 text-emerald-600 font-bold hover:bg-emerald-50 active:scale-98 transition"
        >
          <ShoppingCart className="h-5 w-5" />
          কার্টে রাখুন
        </button>
        <button
          onClick={onBuyNow}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 active:scale-98 transition"
        >
          <Zap className="h-5 w-5 fill-white" />
          সরাসরি অর্ডার করুন
        </button>
      </div>
    </div>
  );
}
