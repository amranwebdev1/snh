"use client";

import React from "react";
import { Store, Search, Grid, List, X } from "lucide-react";

export default function FilterHeader({
  totalStores,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  onlyOpen,
  setOnlyOpen,
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-3 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 text-white p-1.5 rounded-lg">
            <Store className="w-4 h-4" />
          </div>
          <h1 className="font-black text-sm sm:text-base text-slate-900 leading-none">
            দোকানের তালিকা ({totalStores})
          </h1>
        </div>

        {/* ভিউ সুইচ করার বোতাম */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-md transition ${
              viewMode === "grid"
                ? "bg-white text-emerald-600 shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-800"
            }`}
            title="গ্রিড ভিউ"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-md transition ${
              viewMode === "list"
                ? "bg-white text-emerald-600 shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-800"
            }`}
            title="লিস্ট ভিউ"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* সার্চ ও ফিল্টার বার */}
      <div className="bg-slate-50 border-t border-slate-200/80 px-3 py-2">
        <div className="max-w-6xl mx-auto space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="দোকানের নাম বা এলাকা খুঁজুন..."
                className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-7 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg text-xs font-semibold px-2 py-1.5 text-slate-700 focus:outline-none cursor-pointer shrink-0"
            >
              <option value="all">সকল শহর</option>
              <option value="sunamganj">সুনামগঞ্জ</option>
              <option value="sylhet">সিলেট</option>
            </select>

            <button
              onClick={() => setOnlyOpen(!onlyOpen)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition border ${
                onlyOpen
                  ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                  : "bg-white text-slate-600 border-slate-200"
              }`}
            >
              {onlyOpen ? "🟢 খোলা" : "সব"}
            </button>
          </div>

          {/* ক্যাটাগরি তালিকা */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none pt-0.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
