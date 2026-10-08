import React from "react";
import { Check, Info, Minus, Plus } from "lucide-react";

export function ProductOptions({
  colors,
  selectedColor,
  setSelectedColor,
  sizes,
  selectedSize,
  setSelectedSize,
  quantity,
  increaseQuantity,
  decreaseQuantity,
}) {
  return (
    <>
      {/* Colors */}
      <div className="mt-5">
        <div className="flex justify-between text-xs font-medium mb-2">
          <span className="text-slate-700">কালার নির্বাচন করুন: <b className="text-slate-900">{selectedColor}</b></span>
        </div>
        <div className="flex gap-2.5">
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedColor(c.name)}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                selectedColor === c.name
                  ? "border-emerald-600 ring-2 ring-emerald-100 scale-105"
                  : "border-transparent opacity-80"
              }`}
            >
              <span className={`h-8 w-8 rounded-full ${c.class} shadow-inner`} />
              {selectedColor === c.name && (
                <Check className={`w-4 h-4 absolute ${c.name === 'White' ? 'text-black' : 'text-white'}`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mt-5">
        <div className="flex justify-between items-center text-xs font-medium mb-2">
          <span className="text-slate-700">সাইজ নির্বাচন করুন: <b className="text-slate-900">{selectedSize}</b></span>
          <button className="text-emerald-600 hover:underline flex items-center gap-0.5">
            <Info className="w-3.5 h-3.5" /> সাইজ গাইড
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSize(sz)}
              className={`h-10 min-w-12 rounded-xl border text-xs md:text-sm font-semibold transition active:scale-95 ${
                selectedSize === sz
                  ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-200"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mt-5">
        <span className="text-xs font-medium text-slate-700 block mb-2">পরিমাণ:</span>
        <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white p-1">
          <button
            onClick={decreaseQuantity}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 active:scale-90 transition text-slate-600"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-10 text-center text-sm font-bold text-slate-800">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 active:scale-90 transition text-slate-600"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </>
  );
}
