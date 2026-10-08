"use client";

import { Search } from "lucide-react";

export default function OrderSearch({
  search,
  setSearch,
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Order Number বা Customer..."
        className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
    </div>
  );
}