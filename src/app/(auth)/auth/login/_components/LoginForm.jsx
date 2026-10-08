"use client"

import { useState } from "react"
import { ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export default function LoginForm() {
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)

      const supabase = createClient()

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error(error)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <div className="rounded-3xl border border-white bg-white/80 p-5 shadow-xl shadow-slate-200/70 backdrop-blur-xl sm:p-6">

      <Button
        onClick={handleGoogleLogin}
        disabled={loading}
        variant="outline"
        className="
          h-13
          w-full
          rounded-2xl
          border-slate-200
          bg-white
          text-sm
          font-semibold
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:border-indigo-200
          hover:bg-indigo-50/40
          hover:shadow-lg
        "
      >

        {loading ? (
          <span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
        ) : (
          <GoogleIcon />
        )}

        {loading
          ? "Connecting..."
          : "Continue with Google"}

      </Button>

      {/* Security */}

      <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">

        <ShieldCheck className="h-3.5 w-3.5 text-green-500" />

        Secure & simple login

      </div>

    </div>
  )
}


/* ================= GOOGLE ICON ================= */

function GoogleIcon() {
  return (
    <svg
      className="mr-3 h-5 w-5"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >

      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.79-.07-1.55-.2-2.28H12v4.31h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
      />

      <path
        fill="#34A853"
        d="M12 21.65c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.53A9.74 9.74 0 0 0 12 21.65Z"
      />

      <path
        fill="#FBBC05"
        d="M6.53 13.73A5.84 5.84 0 0 1 6.22 12c0-.6.1-1.18.31-1.73V7.74H3.28A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.06 1.03 4.26l3.25-2.53Z"
      />

      <path
        fill="#EA4335"
        d="M12 6.24c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.83 3.3 14.63 2.35 12 2.35a9.74 9.74 0 0 0-8.72 5.39l3.25 2.53C7.3 7.96 9.46 6.24 12 6.24Z"
      />

    </svg>
  )
}