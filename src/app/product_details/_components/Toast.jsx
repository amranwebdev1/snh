import React from "react";
import { Check } from "lucide-react";

export function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-full shadow-lg text-xs md:text-sm flex items-center gap-2 animate-bounce">
      <Check className="w-4 h-4 text-emerald-400" />
      {message}
    </div>
  );
}
