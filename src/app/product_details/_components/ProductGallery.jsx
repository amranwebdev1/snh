import React from "react";
import { Zap } from "lucide-react";

export function ProductGallery({ images, selectedImage, setSelectedImage }) {
  return (
    <div className="lg:col-span-5 flex flex-col-reverse md:flex-row gap-3">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-x-auto px-4 md:px-0 scrollbar-none">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl border-2 transition ${
              selectedImage === idx
                ? "border-emerald-600 ring-2 ring-emerald-100"
                : "border-slate-200 opacity-70 hover:opacity-100"
            }`}
          >
            <img src={img} alt={`Product ${idx}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100 md:rounded-2xl">
        <img
          src={images[selectedImage]}
          alt="Main Product"
          className="h-full w-full object-cover transition-all duration-300"
        />
        <div className="absolute left-3 top-3 bg-red-600 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
          <Zap className="w-3 h-3 fill-white" />
          ২৯% ছাড়
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 rounded-full bg-black/40 backdrop-blur px-2.5 py-1 md:hidden">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                selectedImage === idx ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
