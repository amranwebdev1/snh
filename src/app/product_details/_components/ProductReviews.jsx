import React from "react";
import { Star, ThumbsUp, CheckCircle } from "lucide-react";

export function ProductReviews({ reviews }) {
  return (
    <div className="mt-6 bg-white md:rounded-3xl p-4 md:p-6 border-b md:border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">কাস্টমার রিভিউ ({reviews.length})</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-slate-800">৪.৮ / ৫</span>
          </div>
        </div>
        <button className="bg-emerald-50 text-emerald-700 font-bold text-xs px-4 py-2 rounded-xl hover:bg-emerald-100 transition">
          রিভিউ দিন
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={rev.avatar} alt={rev.user} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    {rev.user}
                    {rev.verified && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />}
                  </h4>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
              </div>
              <div className="flex text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>

            <div className="flex items-center gap-1 text-[11px] text-slate-400 pt-1">
              <button className="flex items-center gap-1 hover:text-emerald-600">
                <ThumbsUp className="w-3 h-3" />
                <span>উপকারী ({rev.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
