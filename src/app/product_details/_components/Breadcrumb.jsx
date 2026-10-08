import React from "react";
import { ChevronRight } from "lucide-react";

export function Breadcrumb() {
  return (
    <nav className="mb-4 hidden items-center gap-2 text-xs text-slate-500 md:flex">
      <a href="#" className="hover:text-emerald-600">হোম</a>
      <ChevronRight className="h-3 w-3" />
      <a href="#" className="hover:text-emerald-600">ফ্যাশন</a>
      <ChevronRight className="h-3 w-3" />
      <a href="#" className="hover:text-emerald-600">পুরুষদের পোশাক</a>
      <ChevronRight className="h-3 w-3" />
      <span className="text-slate-900 font-medium">প্রিমিয়াম কটন শার্ট</span>
    </nav>
  );
}
