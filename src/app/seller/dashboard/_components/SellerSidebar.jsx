"use client";

import { usePathname, useRouter } from "next/navigation";
import { setAppMode } from "@/app/actions/setAppMode";

import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Store,
  LogOut,
} from "lucide-react";

export default function SellerSidebar({
  pendingCount = 0,
  profile,
}) {
  const pathname = usePathname();
  const router = useRouter();

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

  const isActive = (href) => {
    if (href === "/seller/dashboard") {
      return pathname === "/seller/dashboard";
    }

    return pathname.startsWith(href);
  };

  const handleNavigation = async (href) => {
    await setAppMode("seller");
    router.push(href);
  };

  const handleSwitchToUser = async () => {
    await setAppMode("user");
    router.replace("/");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      {/* Header */}
      <div className="flex h-20 items-center border-b border-slate-200 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
            <Store className="h-5 w-5 text-emerald-600" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Seller Center
            </h2>

            <p className="text-xs text-slate-500">
              Manage your shop
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <button
              key={item.href}
              type="button"
              onClick={() => handleNavigation(item.href)}
              className={`relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />

              <span className="flex-1 text-left">
                {item.label}
              </span>

              {item.badge > 0 && (
                <span className="flex min-w-6 items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-[11px] font-bold text-white">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom profile section */}
      <div className="border-t border-slate-200 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="shrink-0">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.name || "Profile"}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-700">
                {profile?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {profile?.name || "User"}
            </p>

            {profile?.username && (
              <p className="truncate text-xs text-slate-500">
                @{profile.username}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSwitchToUser}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
        >
          <LogOut className="h-5 w-5" />

          <span>Switch to User</span>
        </button>
      </div>
    </aside>
  );
}