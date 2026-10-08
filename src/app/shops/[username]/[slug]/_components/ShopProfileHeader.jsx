"use client";
import {useState} from "react"
import Image from "next/image";
import {
  CheckCircle,
  UserCheck,
  UserPlus,
  MessageCircle,
  MapPin,
  Store,
} from "lucide-react";

export default function ShopProfileHeader({
  shop,
  isFollowing,
  onToggleFollow,
}) {
  const[disabled,setDisabled] = useState(true)
  
  const isVerified = shop?.verification_status === "approved";
  
  
  const handleCall = () => {
  const phoneNumber = shop?.phone;
  window.location.href = `tel:+88${phoneNumber}`;
};


  return (
    <section className="overflow-hidden rounded-b-3xl bg-white shadow-sm">
      {/* Cover */}
      <div className="relative h-44 w-full bg-slate-200 sm:h-60 md:h-72">
        {shop?.cover ? (
          <Image
            src={shop.cover}
            alt={shop.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-300">
            <Store className="h-14 w-14 text-slate-500" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="relative px-4 pb-5">
        {/* Logo + Buttons */}
        <div className="-mt-14 mb-4 flex flex-col gap-3 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
          <div className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg sm:h-32 sm:w-32">
            {shop?.logo ? (
              <Image
                src={shop.logo}
                alt={shop.name}
                width={250}
                height={250}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-slate-100">
                <Store className="h-10 w-10 text-slate-400" />
              </div>
            )}
          </div>

          <div className="flex w-full gap-2 sm:w-auto">
            <button
  disabled={disabled} // dynamically disabled control
  onClick={onToggleFollow}
  className={`flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl px-5 text-sm font-bold transition
    ${
      disabled
        ? "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none" // Disabled state
        : isFollowing
        ? "border border-slate-300 bg-slate-100 text-slate-700 active:scale-95" // Following state
        : "bg-emerald-600 text-white shadow-md shadow-emerald-200 active:scale-95" // Default (Follow) state
    }`}
>
  {isFollowing ? (
    <>
      <UserCheck className="h-4 w-4" />
      Following
    </>
  ) : (
    <>
      <UserPlus className="h-4 w-4" />
      Follow
    </>
  )}
</button>


            <button
              onClick={handleCall}
              className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-5 text-sm font-bold text-white transition active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              Chat
            </button>
          </div>
        </div>

        {/* Shop Info */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">
              {shop?.name}
            </h1>

            {isVerified && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                <CheckCircle className="h-3.5 w-3.5 fill-emerald-100" />
                Verified
              </span>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}