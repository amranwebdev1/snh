import React from "react";
import { Clock, X } from "lucide-react";

export default function OpeningHoursModal({ hours, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl animate-in zoom-in-95 duration-150 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-emerald-600" />
            <h3 className="font-extrabold text-slate-800 text-sm">
              দোকানের সময়সূচী
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          {hours.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between py-1.5 border-b border-slate-100 last:border-none"
            >
              <span className="font-semibold text-slate-600">{item.day}</span>
              <span className="font-bold text-slate-800">{item.hours}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
