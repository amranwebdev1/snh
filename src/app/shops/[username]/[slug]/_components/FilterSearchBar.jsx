import React from "react";
import { Search, X } from "lucide-react";

export default function FilterSearchBar({
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-y border-slate-200 py-3 px-4 shadow-sm space-y-2.5">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="এই দোকানের পণ্য খুঁজুন..."
          className="w-full bg-slate-100 border-0 rounded-xl pl-10 pr-8 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-none pt-1">
        {categories?.map((cat) => (
  <button
    key={cat?.id}
    onClick={() => setSelectedCategory(cat?.id)}
    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition active:scale-95 border ${
      selectedCategory === cat?.id
        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
    }`}
  >
    <span>{cat?.label}</span>
  </button>
))}
      </div>
    </div>
  );
}
