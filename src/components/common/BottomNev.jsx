import React from 'react'
import {Home,ChartBarStacked,ShoppingCart,User} from "lucide-react"
const BottomNev = () => {
  return (
    <div>
        {/* ==================== MOBILE BOTTOM NAVIGATION ==================== */}
      {/* শুধুমাত্র মোবাইল ও ট্যাবলেট স্ক্রিনে (md এর নিচে) দেখা যাবে */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg px-2 py-2">
        <div className="flex items-center justify-around">
          
          {/* Home */}
          <button className="flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-green-600 transition-colors w-16">
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Home</span>
          </button>

          {/* Category */}
          <button className="flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-green-600 transition-colors w-16">
            <ChartBarStacked className="w-5 h-5" />
            <span className="text-[10px] font-medium">Category</span>
          </button>

          {/* Cart with Badge */}
          <button className="flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-green-600 transition-colors relative w-16">
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute bg-green-500 w-4 h-4 -top-1.5 -right-2 flex items-center justify-center rounded-full text-[9px] text-white font-bold">
                4
              </span>
            </div>
            <span className="text-[10px] font-medium">Cart</span>
          </button>

          {/* Profile */}
          <button className="flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-green-600 transition-colors w-16">
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium">Profile</span>
          </button>

        </div>
      </div>
    </div>
  )
}

export default BottomNev