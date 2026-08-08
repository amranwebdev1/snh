import {Button} from "@/components/ui/button"
import {ChartBarStacked,Bell,User,ShoppingCart } from "lucide-react"
import  {Search} from './Search'
import {SelectLocation} from "./SelectLocation" 
const Header = () => {
  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="flex gap-4 items-center justify-between">
          
          {/* Logo */}
          <div className="shrink-0">
            <h1 className="font-bold text-green-500 text-lg md:text-xl">
              Sunam<span className="text-yellow-500">Hat</span>
            </h1>
          </div>
          
          {/* Middle: Search Section */}
          <div className="flex flex-1 items-center gap-2 md:gap-4 mx-4 max-w-3xl">
            <div className="shrink-0">
              <SelectLocation />
            </div>
            <div className="hidden md:flex flex-1 w-full">
              <Search />
            </div>
            <Button className="shrink-0"><ChartBarStacked /> Category</Button>
          </div>

          {/* Right Icons */}
          <div className="flex gap-3 items-center shrink-0">
            <div className="relative p-2 rounded-full inline-block">
              <Bell className="w-6 h-6" />
              <span className="absolute bg-red-600 w-5 h-5 -top-1 -right-1 flex items-center justify-center rounded-full text-xs text-white">3</span>
            </div>
            <div className="relative p-2 rounded-full inline-block">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute bg-green-500 w-5 h-5 -top-1 -right-1 flex items-center justify-center rounded-full text-xs text-white">4</span>
            </div>
            <div className="relative p-2 rounded-full inline-block border-2 pointer-coarse:">
              <User className="w-6 h-6" />
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}
export default Header;