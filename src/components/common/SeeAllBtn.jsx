"use client"
import { useRouter } from 'next/navigation'
import { ChevronRight } from "lucide-react"

const SeeAllBtn = ({ href, onClick }) => {
  const router = useRouter();

  const handleClick = (e) => {
    // ১. যদি বাইরে থেকে কোনো onClick ফাংশন পাঠানো হয়ে থাকে, তা কল হবে
    if (onClick) {
      onClick(e);
    }
    
    // ২. যদি href পাঠানো হয়ে থাকে, তবে নেভিগেট করবে
    if (href) {
      router.push(href);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex items-center gap-0.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
    >
      সব দেখুন
      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  )
}

export default SeeAllBtn
