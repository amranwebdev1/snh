"use client"
import {Card,CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import ProfileMenuItem from "../profile_menu/ProfileMenuItem"
import {
  Package,
  Heart,
  Star,
  MapPin,
  CreditCard,
  Store,
  Bell,
  Settings,
  User
} from "lucide-react"

const menus = [
  { title: "My Orders", icon: Package, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Wishlist", icon: Heart, color: "text-pink-500", bg: "bg-pink-500/10" },
  { title: "My Reviews", icon: Star, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { title: "Addresses", icon: MapPin, color: "text-red-500", bg: "bg-red-500/10" },
  { title: "Payment", icon: CreditCard, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { title: "Following", icon: Store, color: "text-green-500", bg: "bg-green-500/10" },
  { title: "Notifications", icon: Bell, color: "text-orange-500", bg: "bg-orange-500/10" },
  { title: "Settings", icon: Settings, color: "text-slate-500", bg: "bg-slate-500/10" },
]

export default function DesktopProfileSidebar() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-3xl border bg-white p-4 shadow-sm">
        {/*user info card*/}
      <Card>
        <CardContent>
          <div>
            <div className="flex items-center gap-3">
              <div className="overflow-hidden w-20 h-20 rounded-full border ">
                <img alt="user" src="https://i.pravatar.cc/100?img=33" className="w-full h-full object-cover" />
              </div>
              
              <div>
                <h2 className="text-lg font-bold">Md Amran Hossen</h2>
                <p>@amran123 <Badge>Seller</Badge></p>
                <p className="text-xs">Sunamgonj,Bangladash</p>
              </div>
            </div>
            
            {/*action*/}
            <div className="flex items-center justify-center gap-4 pt-5">
              <Button><User /> My profile</Button>
              <Button><Store /> My Store</Button>
            </div>
          </div>
        </CardContent>
      </Card>
        <h2 className="mb-4 text-lg font-bold">My Account</h2>

        <div className="space-y-2">
          {menus.map((item) => (
            <ProfileMenuItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              color={item.color}
              bg={item.bg}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}