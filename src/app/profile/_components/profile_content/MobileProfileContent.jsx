"use client"
import {useRouter} from "next/navigation"
import { Button } from "@/components/ui/button"
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
  CircleHelp,
  Shield,
  FileText,
  LogOut,
  LoaderCircle,
} from "lucide-react"

import TopSection from "./TopSection"
import Container from "@/components/common/Container"
import { useState } from "react"

const quickActions = [
  {
    id: "my_orders",
    href: "my_orders",
    name: "Orders",
    icon: Package,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    badge: 3,
  },
  {
    id: "wishlist",
    href: "wishlist",
    name: "Wishlist",
    icon: Heart,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    disabled:true
  },
  {
    id: "my_reviews",
    href: "my_reviews",
    name: "Reviews",
    icon: Star,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    disabled:true
  },
  {
    id: "following_shops",
    href: "following_shops",
    name: "Following",
    icon: Store,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    disabled:true
  },
]

const accountMenus = [
  {
    href: "my_orders",
    title: "My Orders",
    sub: "Track your orders",
    icon: Package,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    href: "wishlist",
    title: "Wishlist",
    sub: "Saved products",
    icon: Heart,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    disabled:true
  },
  {
    href: "my_reviews",
    title: "My Reviews",
    sub: "Ratings & reviews",
    icon: Star,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    disabled:true
  },
  {
    href: "addresses",
    title: "Addresses",
    sub: "Manage addresses",
    icon: MapPin,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    href:"payment_methods",
    title: "Payment Methods",
    sub: "Cards & payments",
    icon: CreditCard,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    disabled:true
  },
  {
    href:"following_shops",
    title: "Following Shops",
    sub: "Favorite shops",
    icon: Store,
    color: "text-green-500",
    bg: "bg-green-500/10",
    disabled:true
  },
  {
    href:"notifications",
    title: "Notifications",
    sub: "Updates & offers",
    icon: Bell,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    badge: 0,
    disabled:true
  },
]

const supportMenus = [
  {
    href:"help_center",
    title: "Help Center",
    sub: "Support & FAQs",
    icon: CircleHelp,
    color: "text-sky-500",
    bg: "bg-sky-500/10",
  },
  {
    href:"privacy_policy",
    title: "Privacy Policy",
    sub: "Your privacy",
    icon: Shield,
    color: "text-slate-500",
    bg: "bg-slate-500/10",
  },
  {
    href:"terms_conditions",
    title: "Terms & Conditions",
    sub: "Platform rules",
    icon: FileText,
    color: "text-slate-500",
    bg: "bg-slate-500/10",
  },
  {
    href:"settings",
    title: "Settings",
    sub: "App preferences",
    icon: Settings,
    color: "text-slate-500",
    bg: "bg-slate-500/10",
  },
  {
    title: "Logout",
    sub: "Sign out safely",
    icon: LogOut,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
]

export default function MobileProfileContent({currentUser}) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  
  const handleLogout = async () => {
  try {
    setIsLoggingOut(true)

    await fetch("/auth/logout", {
      method: "POST",
    })

    router.push("/auth/login")
    router.refresh()
  } catch (error) {
    console.error(error)
    setIsLoggingOut(false)
  }
}

  return (
    <div className="lg:hidden">
      {/*TopSection*/} 
      <TopSection currentUser={currentUser} />
      
      <Container className="pt-36 pb-20 md:pt-8">
        {/* Quick Actions */}
        <section>
          <h3 className="mb-4 text-lg font-bold">Quick Actions</h3>
  
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((item) => {
              const Icon = item.icon
  
              return (
                <button
                  key={item.id}
                  disabled={item?.disabled && item?.disabled}
                  onClick={()=> router.push(`/profile/${item?.href}`)}
                  className={`flex flex-col items-center gap-2 ${!item?.disabled && "active:scale-95 transition-transform"}`}
                >
                  <div
                    className={`relative rounded-2xl border p-3 shadow-sm ${item?.disabled ? "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none" : item.bg} ${item?.disabled ? "border-slate-200" : item.border}`}
                  >
                    <Icon className={`h-5 w-5 ${item?.disabled ? "text-gray" :item.color}`} />
  
                    {item.badge && (
                      <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                        {item.badge}
                      </span>
                    )}
                  </div>
  
                  <p className={`text-center text-[11px] font-semibold ${item?.disabled && "text-gray-400"}`}>
                    {item.name}
                  </p>
                </button>
              )
            })}
          </div>
        </section>
  
        {/* My Account */}
        <section className="space-y-2">
          <h3 className="text-lg font-bold">My Account</h3>
  
          {accountMenus.map((item) => (
            <ProfileMenuItem
              key={item.title}
              title={
                item.title}
              sub={item.sub}
              icon={
                item.icon }
              color={item?.disabled ? "text-gray" : item.color}
              bg={item?.disabled ? "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none" : item.bg}
              badge={item?.badge}
              disabled={item?.disabled}
              onClick={() => router.push(`/profile/${item?.href}`)}
/>
          ))}
        </section>
  
        {/* Support */}
        <section className="space-y-2">
          <h3 className="text-lg font-bold">Support & Settings</h3>
  
          {supportMenus.map((item) => (
            <ProfileMenuItem
              key={item.title}
              title={
                item.title === "Logout" && isLoggingOut
                  ? "Logging out..."
                  : item.title
              }
              sub={item.sub}
              icon={
                item.icon === "Logout" && isLoggingOut
                  ? LoaderCircle
                  : item.icon
              }
              color={item.color}
              bg={item.bg}
              badge={item.badge}
              onClick={() =>
                item.title === "Logout"
                  ? handleLogout()
                  : router.push(`/profile/${item.href}`)
              }
/>
          ))}
        </section>
  
        {/* Become a Seller */}
      {!currentUser?.shop && (
        <section className="rounded-3xl bg-gradient-to-r from-indigo-600 to-cyan-500 p-5 text-white">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/20 p-3">
              <Store className="h-6 w-6" />
            </div>
  
            <div>
              <h3 className="text-lg font-bold">Become a Seller</h3>
              <p className="text-sm text-white/90">
                Start selling and grow your business.
              </p>
            </div>
          </div>
  
          <Button onClick={()=> router.push("/profile/open-shop")} className="mt-5 w-full bg-white text-indigo-600 hover:bg-slate-100">
            Open a Shop
          </Button>
        </section>
        )}
      </Container>
    </div>
  )
}