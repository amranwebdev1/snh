import { Store } from "lucide-react"

import ShoppingGraphics from "./_components/ShoppingGraphics"
import LoginForm from "./_components/LoginForm"

import { redirect } from "next/navigation"
import {getCurrentUser} from "@/lib/auth/getCurrentUser"

export default async function LoginPage() {
  const currentUser = await getCurrentUser();
  if(currentUser){
    redirect("/")
  }
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-5 py-8">

      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/10 blur-3xl" />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

      </div>

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}

        <div className="mb-8 flex justify-center">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">

              <Store className="h-5 w-5" />

            </div>

            <div>

              <h1 className="text-lg font-bold tracking-tight">
                LocalMarket
              </h1>

              <p className="text-[11px] text-slate-400">
                Your local marketplace
              </p>

            </div>

          </div>

        </div>

        {/* ================= GRAPHIC ================= */}

        <div className="mb-8">
          <ShoppingGraphics />
        </div>

        {/* ================= TEXT ================= */}

        <div className="text-center">

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">

            Your local

            <span className="text-indigo-600">
              {" "}marketplace.
            </span>

          </h2>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">

            Discover local shops, explore products and
            connect with businesses around you.

          </p>

        </div>

        {/* ================= LOGIN ================= */}

        <div className="mt-7">

          <LoginForm />

        </div>

        {/* ================= FEATURES ================= */}

        <div className="mt-6 flex items-center justify-center gap-5 text-[11px] text-slate-400">

          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            Discover
          </span>

          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-500" />
            Shop
          </span>

          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Sell
          </span>

        </div>

        {/* ================= FOOTER ================= */}

        <p className="mt-7 text-center text-[11px] text-slate-400">

          By continuing, you agree to our{" "}

          <span className="text-slate-600 underline underline-offset-2">
            Terms
          </span>

          {" "}and{" "}

          <span className="text-slate-600 underline underline-offset-2">
            Privacy Policy
          </span>

        </p>

      </div>

    </main>
  )
}