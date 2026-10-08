import React from "react";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

export function FeaturesGrid() {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 px-4 md:px-0">
      <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
          <Truck className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-800">দ্রুত ডেলিভারি</h4>
          <p className="text-[11px] text-slate-500">২–৪ দিনের মধ্যে ক্যাশ অন ডেলিভারি</p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
          <RotateCcw className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-800">৭ দিনের রিটার্ন পলিসি</h4>
          <p className="text-[11px] text-slate-500">পছন্দ না হলে সহজেই রিটার্ন করুন</p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm sm:col-span-2 lg:col-span-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 shrink-0">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-800">১০০% আসল প্রোডাক্ট</h4>
          <p className="text-[11px] text-slate-500">গুণগত মান শতভাগ নিশ্চিত</p>
        </div>
      </div>
    </div>
  );
}
