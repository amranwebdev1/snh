"use client"

import {
  MapPin,
  ShoppingBag,
  Store,
  Sparkles,
} from "lucide-react"

export default function ShoppingGraphics() {
  return (
    <div className="relative mx-auto h-56 w-56">

      {/* Background circle */}

      <div className="absolute inset-5 rounded-full bg-gradient-to-br from-indigo-100 via-cyan-50 to-amber-100" />

      {/* Decorative circles */}

      <div className="absolute left-2 top-10 h-7 w-7 animate-[float_4s_ease-in-out_infinite] rounded-full bg-amber-400 shadow-lg shadow-amber-200" />

      <div
        className="absolute right-2 top-16 h-6 w-6 animate-[float_5s_ease-in-out_infinite] rounded-full bg-cyan-400 shadow-lg shadow-cyan-200"
        style={{ animationDelay: "1s" }}
      />

      <div
        className="absolute bottom-8 left-12 h-5 w-5 animate-[float_4.5s_ease-in-out_infinite] rounded-full bg-violet-500 shadow-lg shadow-violet-200"
        style={{ animationDelay: "0.5s" }}
      />

      <div
        className="absolute bottom-12 right-10 h-4 w-4 animate-[float_3.5s_ease-in-out_infinite] rounded-full bg-green-400 shadow-lg shadow-green-200"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Main shop */}

      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[32px] bg-indigo-600 text-white shadow-2xl shadow-indigo-300">

        <Store className="h-12 w-12" />

        {/* Location */}

        <div className="absolute -right-4 -top-4 flex h-11 w-11 animate-bounce items-center justify-center rounded-full border-4 border-slate-50 bg-rose-500 text-white shadow-lg [animation-duration:2.5s]">

          <MapPin className="h-4 w-4" />

        </div>

      </div>

      {/* Shopping bag */}

      <div className="absolute bottom-2 left-2 flex h-12 w-12 rotate-[-8deg] items-center justify-center rounded-2xl bg-cyan-400 text-white shadow-lg shadow-cyan-200">

        <ShoppingBag className="h-5 w-5" />

      </div>

      {/* Sparkle */}

      <div className="absolute right-4 top-3 flex h-10 w-10 rotate-12 items-center justify-center rounded-xl bg-amber-400 text-white shadow-lg shadow-amber-200">

        <Sparkles className="h-4 w-4" />

      </div>

    </div>
  )
}