"use client" 
import {useRouter} from "next/navigation"
import { setAppMode } from "@/app/actions/setAppMode";
import Image from "next/image"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Card,CardContent} from "@/components/ui/card"
import {
  User,
  MessageCircle,
  Store,
  Bell,
} from "lucide-react"
const TopSection = ({currentUser}) => {
  
  const router = useRouter();
  
  const profile = currentUser?.profile;
  const shop = currentUser?.shop;

const shopStatus = shop?.verification_status ?? null;
  
  return (
    <div className="relative bg-gradient-to-br from-indigo-600 to-cyan-500 lg:bg-gradient-to-b lg:from-white lg:to-white">
      {/*small device*/}
      <div className="relative lg:hidden pt-15 pb-20">
        <h1 className="text-2xl text-white font-bold flex-1 text-center">My Account</h1>
        <div className="absolute top-4 right-2.5 flex items-center gap-5 pr-4 hidden">
          <div className="relative p-1 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                <span className="absolute bg-red-600 w-4 h-4 md:w-5 md:h-5 -top-1 -right-1 flex items-center justify-center rounded-full text-[10px] md:text-xs text-white">
                  3
                </span>
              </div>
          <div className="relative p-1 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 md:w-6 md:h-6 text-white" />
                <span className="absolute bg-red-600 w-4 h-4 md:w-5 md:h-5 -top-1 -right-1 flex items-center justify-center rounded-full text-[10px] md:text-xs text-white">
                  3
                </span>
              </div>
        </div>
      </div>
      {/*user info card*/}
      <Card className="absolute top-26 left-1/2 -translate-x-1/2 lg:hidden w-full">
        <CardContent>
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="overflow-hidden w-20 h-20 rounded-full border ">
                <Image 
                width={150}
                height={150}
                alt={profile?.name } 
                src={profile?.avatar_url} className="w-full h-full object-cover" />
              </div>
              
              <div>
                <h2 className="text-lg font-bold">{profile?.name}</h2>
                <p className="flex items-center gap-2">
  @{profile?.username}

  <Badge variant={shopStatus === "approved" ? "default" : "secondary"}>
  {!shopStatus
    ? "Customer"
    : shopStatus === "approved"
    ? "Seller"
    : shopStatus === "pending_review"
    ? "Pending"
    : "Rejected"}
</Badge>
</p>
                <p className="text-xs">Sunamgonj,Bangladash</p>
              </div>
            </div>
            
            {/*action*/}
            <div className="flex items-center justify-center gap-4 pt-5 sm:pt-0">
              {!shopStatus ? (
  <Button onClick={() => router.push("/profile/open-shop")}>
    Open a Shop
  </Button>
) : shopStatus === "pending_review" ? (
  <Button disabled>Application Pending</Button>
) : shopStatus === "approved" ? (
  <Button onClick={async () => {
  await setAppMode("seller");
  router.replace("/seller/dashboard");
}}>
    My Store
  </Button>
) : (
  <Button onClick={() => router.push("/profile/open-shop")}>
    Resubmit
  </Button>
)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TopSection