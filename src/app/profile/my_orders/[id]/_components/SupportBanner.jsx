import React from 'react';
import { Headphones, Phone, ArrowRight } from 'lucide-react';

export default function SupportBanner() {
  return (
    <div className="w-full max-w-4xl mx-auto p-5 sm:p-6 bg-[#161920] text-white rounded-3xl border border-gray-800/80 font-sans shadow-xl mb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* Left Side: Title & Description */}
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2.5">
            <Headphones className="w-6 h-6 text-indigo-400 flex-shrink-0 stroke-[2]" />
            <h2 className="text-lg sm:text-xl font-bold text-indigo-400 tracking-wide">
              যেকোনো সমস্যায় কল করুন
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
            অর্ডার পরিবর্তন বা যেকোনো অনুসন্ধানের জন্য আমাদের ২৪/৭ সাপোর্ট সেন্টারে যোগাযোগ করতে পারেন।
          </p>
        </div>

        {/* Action Buttons Area */}
        <div className="flex items-center justify-between md:justify-end gap-4 pt-2 md:pt-0">
          {/* Phone Number Pill Button */}
          <a
            href="tel:16247"
            className="flex items-center gap-2.5 px-4 py-2.5 bg-[#101217] hover:bg-[#1b1f27] text-indigo-400 font-semibold text-sm sm:text-base rounded-2xl border border-gray-800 transition-colors"
          >
            <Phone className="w-4 h-4 fill-indigo-400/20 stroke-[2]" />
            <span>১৬২৪৭</span>
          </a>

          {/* Live Chat Link */}
          <button
            type="button"
            className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium text-sm sm:text-base transition-colors group"
          >
            <span>লাইভ চ্যাট</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
