import React from "react";
import { Star } from "lucide-react";

export default function ShopReviewsList({ reviews }) {
  return (
    <section className="mt-10 px-4 mb-6">
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-2">
          গ্রাহকদের কিছু সাম্প্রতিক রিভিউ
        </h3>
        <div className="space-y-3">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={rev.avatar}
                    alt={rev.user}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    {rev.user}
                  </span>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-600">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
