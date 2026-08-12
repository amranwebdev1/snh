import { Button } from "@/components/ui/button"
import { ChartBarStacked, Bell, User, ShoppingCart, Home } from "lucide-react"
import { Search } from "./Search"
import { SelectLocation } from "./SelectLocation"

const Header = () => {
  return (
    <>
      {/* ==================== TOP HEADER ==================== */}
      <header className="w-full bg-white border-b sticky top-0 z-40">
        <div className="w-full px-4 py-2 md:py-4 lg:py-5">
          <div className="flex gap-3 md:gap-4 items-center justify-between">
            
            {/* Logo */}
            <div className="shrink-0">
              <h1 className="font-bold text-green-500 text-xl md:text-2xl cursor-pointer">
                Sunam<span className="text-yellow-500">Hat</span>
              </h1>
            </div>
            
            {/* Middle: Desktop Search & Location */}
            <div className="flex flex-1 items-center gap-2 md:gap-4 mx-1 md:mx-4 max-w-3xl">
              <div className="shrink-0 flex">
                <SelectLocation />
              </div>
              <div className="hidden lg:flex flex-1 w-full">
                <Search />
              </div>
              <Button className="shrink-0 hidden lg:flex gap-2">
                <ChartBarStacked className="w-4 h-4" /> Category
              </Button>
            </div>

            {/* Right Icons (Desktop & Tablet) */}
            <div className="flex gap-2 md:gap-3 items-center shrink-0">
              {/* Notifications */}
              <div className="relative p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                <span className="absolute bg-red-600 w-4 h-4 md:w-5 md:h-5 -top-1 -right-1 flex items-center justify-center rounded-full text-[10px] md:text-xs text-white">
                  3
                </span>
              </div>

              {/* Cart (Hidden on Mobile, handled in Bottom Nav) */}
              <div className="hidden md:inline-block relative p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                <span className="absolute bg-green-500 w-5 h-5 -top-1 -right-1 flex items-center justify-center rounded-full text-xs text-white">
                  4
                </span>
              </div>

              {/* User Profile (Hidden on Mobile, handled in Bottom Nav) */}
              <div className="hidden md:flex relative p-2 rounded-full border-2 cursor-pointer hover:bg-gray-100 transition-colors">
                <User className="w-6 h-6 text-gray-700" />
              </div>
            </div>

          </div>
        </div>
        
        {/* Search for Mobile (< lg) */} 
        <div className="w-full flex items-center justify-center gap-3 border-t py-2 px-4 lg:hidden">
          <div className="flex-1 w-full">
            <Search />
          </div>
          <Button className="shrink-0 hidden md:flex gap-2">
            <ChartBarStacked className="w-4 h-4" /> Category
          </Button>
        </div>
      </header>
    </>
  )
}

export default Header;
