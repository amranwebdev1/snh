import React, { useState } from "react";
import { Check, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-8 bg-white md:rounded-3xl p-4 md:p-6 border-b md:border border-slate-200">
      {/* Tab Buttons */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab("description")}
          className={`pb-3 text-sm font-bold transition-all border-b-2 ${
            activeTab === "description"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          পণ্যের বিবরণ (Description)
        </button>
        <button
          onClick={() => setActiveTab("specifications")}
          className={`pb-3 text-sm font-bold transition-all border-b-2 ${
            activeTab === "specifications"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          স্পেসিফিকেশন
        </button>
      </div>

      {/* Tab Contents */}
      <div className="pt-4 text-sm text-slate-600 leading-relaxed">
        {activeTab === "description" && (
          <div className="space-y-3">
            <p>
              আমাদের এই প্রিমিয়াম ক্যাজুয়াল কটন শার্টটি তৈরি করা হয়েছে ১০০% পিওর কটন ফেব্রিক দিয়ে, যা অত্যন্ত আরামদায়ক এবং দীর্ঘস্থায়ী। যেকোনো ক্যাজুয়াল বা সেমি-ফরমাল ইভেন্টে পরার জন্য এটি একদম পারফেক্ট।
            </p>
            <ul className="space-y-1.5 list-none">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>প্রিমিয়াম কোয়ালিটি ১০০% কটন ফেব্রিক</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>সহজে রং উঠবে না ও কালার গ্যারান্টি</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>পারফেক্ট ফিটিং ও চমৎকার স্টিচিং</span>
              </li>
            </ul>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">ফেব্রিক:</span>
              <span className="font-semibold text-slate-800">১০০% পিওর কটন</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">স্লিভ:</span>
              <span className="font-semibold text-slate-800">ফুল স্লিভ (Full Sleeve)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">ফিট:</span>
              <span className="font-semibold text-slate-800">রেগুলার ফিট</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">উৎপাদন দেশ:</span>
              <span className="font-semibold text-slate-800">বাংলাদেশ</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
