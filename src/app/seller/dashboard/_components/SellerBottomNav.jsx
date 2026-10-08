"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image"
import { setAppMode } from "@/app/actions/setAppMode";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
} from "lucide-react";

export default function SellerBottomNav({
  pendingCount = 0,
  profile,
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href) => {
    if (href === "/seller/dashboard") {
      return pathname === "/seller/dashboard";
    }

    return pathname.startsWith(href);
  };

  const items = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/seller/dashboard",
    },
    {
      label: "Orders",
      icon: ShoppingBag,
      href: "/seller/dashboard/orders",
      badge: pendingCount,
    },
    {
      label: "Products",
      icon: Package,
      href: "/seller/dashboard/products",
    },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <button
              key={item.href}
              type="button"
              onClick={async () => {
      await setAppMode("seller");
      router.push(item.href);
      }}
              className={`relative flex flex-col items-center gap-1 py-3 text-xs transition ${
                active
                  ? "text-emerald-600"
                  : "text-slate-500"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />

                {item.badge > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </div>

              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Profile */}
        <button
  type="button"
  onClick={async () => {
    await setAppMode("user");
    router.replace("/");
  }}
  className="flex flex-col items-center gap-1 py-3 text-xs text-slate-500 transition"
>
  <div className="rounded-full p-[2px]">
    {profile?.avatar_url ? (
      <Image
      width={40}
      height={40}
        src={profile?.avatar_url}
        alt="Profile"
        className="h-7 w-7 rounded-full object-cover"
      />
    ) : (
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
        {profile?.name?.charAt(0)?.toUpperCase() || "U"}
      </div>
    )}
  </div>

  <span>Profile</span>
</button>
      </div>
    </nav>
  );
}