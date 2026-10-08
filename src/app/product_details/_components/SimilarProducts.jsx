import React from "react";
import { Star } from "lucide-react";

export function SimilarProducts({ products }) {
  return (
    <div className="mt-6 px-4 md:px-0">
      <h3 className="text-base md:text-lg font-bold text-slate-900 mb-3">আরও দেখতে পারেন</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 mb-2">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{p.name}</h4>
            <div className="flex items-center gap-1 my-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-[11px] font-bold text-slate-600">{p.rating}</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs font-bold text-emerald-600">৳{p.price}</span>
              <span className="text-[10px] text-slate-400 line-through">৳{p.originalPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
