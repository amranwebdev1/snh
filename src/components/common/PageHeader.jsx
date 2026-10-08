"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const PageHeader = ({
  title,
  rightAction,
  onBack,
  hideOnScroll = true,
}) => {
  const router = useRouter()
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (!hideOnScroll) return

    let lastY = window.scrollY

    const onScroll = () => {
      const currentY = window.scrollY

      if (currentY < 10) {
        setShow(true)
      } else if (currentY > lastY + 5) {
        // নিচে স্ক্রল
        setShow(false)
      } else if (currentY < lastY - 5) {
        // উপরে সামান্য স্ক্রল
        setShow(true)
      }

      lastY = currentY
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [hideOnScroll])

  const handleBack = () => {
    if (onBack) return onBack()
    router.back()
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-transform duration-300 ${
        hideOnScroll && !show ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:h-16 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100 active:scale-95"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700" />
          </button>

          <h1 className="text-lg font-bold text-slate-900 md:text-xl line-clamp-1">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {rightAction}
        </div>
      </div>
    </header>
  )
}

export default PageHeader