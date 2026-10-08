"use client";

import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmptyCart() {
  const router = useRouter();

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        {/* Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
          <ShoppingCart className="h-12 w-12 text-slate-400" />
        </div>

        {/* Title */}
        <h2 className="mt-6 text-2xl font-bold text-slate-900">
          Your Cart is Empty
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Looks like you haven't added any products yet. Start shopping and
          find something you'll love.
        </p>

        {/* Button */}
        <button
          onClick={() => router.push("/")}
          className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 font-semibold text-white transition hover:bg-emerald-700 active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
          Continue Shopping
        </button>
      </div>
    </div>
  );
}