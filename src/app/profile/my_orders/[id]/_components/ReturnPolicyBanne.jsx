import React from 'react';
import { RotateCcw } from 'lucide-react';

export default function ReturnPolicyBanner() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-3xl border border-gray-800/60 shadow-2xl mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Left Side: Icon, Title & Description */}
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <RotateCcw className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500 flex-shrink-0 stroke-[2.5]" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-500 tracking-wide">
              পণ্য রিটার্ন বা পরিবর্তন করতে চান?
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
            ডেলিভারির পর ৭ দিনের মধ্যে যেকোনো ত্রুটিযুক্ত পণ্য বিনামূল্যে রিটার্ন করতে পারবেন।
          </p>
        </div>

        {/* Right Side: Action Button */}
        <div className="w-full sm:w-auto flex-shrink-0">
          <button
            type="button"
            className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm sm:text-base rounded-2xl transition-all duration-200 shadow-lg shadow-amber-500/10 active:scale-95"
          >
            রিটার্ন রিকুয়েস্ট জমা দিন
          </button>
        </div>
      </div>
    </div>
  );
}
