"use client";

import { Megaphone, Sparkles, ArrowRight } from "lucide-react";

export default function PromotionCard() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 p-5 text-white shadow-lg">
      {/* Background Decoration */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-xl" />
      <div className="absolute -bottom-8 left-8 h-20 rounded-full bg-white/10 blur-xl" />

      <div className="relative">
        {/* Top */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <Megaphone className="h-6 w-6" />
          </div>

          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            Coming Soon
          </span>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold">
          Boost Your Sales
        </h3>

        <p className="mt-2 text-sm leading-6 text-white/85">
          ভবিষ্যতে Promotion Campaign চালিয়ে আরও বেশি Customer-এর কাছে আপনার Product পৌঁছাতে পারবেন।
        </p>

        {/* Future Features */}
        <div className="mt-5 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Boost Product
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Shop Campaign
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Featured Placement
          </div>
        </div>

        {/* Button */}
        <button
          type="button"
          disabled
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/15 px-4 py-3 text-sm font-semibold backdrop-blur transition disabled:cursor-not-allowed disabled:opacity-90"
        >
          Available Soon
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}