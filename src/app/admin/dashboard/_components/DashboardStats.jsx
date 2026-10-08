import {
  ShoppingBag,
  PackageCheck,
  Truck,
  CircleCheckBig,
  AlertTriangle,
  Store,
  Package,
} from "lucide-react";

import Link from "next/link";

const cards = [
  {
    key: "todayOrders",
    title: "আজকের অর্ডার",
    icon: ShoppingBag,
    href: "/admin/orders",
    iconClass: "bg-blue-100 text-blue-600",
  },

  {
    key: "pickupRequests",
    title: "Pickup Request",
    icon: Truck,
    href: "/admin/pickup-requests",
    iconClass: "bg-orange-100 text-orange-600",
  },

  {
    key: "processing",
    title: "Processing",
    icon: PackageCheck,
    href: "/admin/processing",
    iconClass: "bg-indigo-100 text-indigo-600",
  },

  {
    key: "deliveredToday",
    title: "আজ Delivered",
    icon: CircleCheckBig,
    href: "/admin/delivered-today",
    iconClass: "bg-emerald-100 text-emerald-600",
  },
  {
  key: "sellerDelays",
  title: "Seller Delay",
  icon: AlertTriangle,
  href: "/admin/seller-delays",
  iconClass: "bg-red-100 text-red-600",
},
{
  key: "shops",
  title: "Shops",
  icon: Store,
  href: "/admin/shops",
  iconClass:
    "bg-purple-100 text-purple-600",
},
{
  key: "products",
  title: "Products",
  icon: Package,
  href: "/admin/products",
  iconClass: "bg-cyan-100 text-cyan-600",
},
];

export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        const content = (
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-slate-500">
                {card.title}
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {stats?.[card.key] ?? 0}
              </p>
            </div>

            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.iconClass}`}
            >
              <Icon className="h-5 w-5" />
            </div>
          </div>
        );

        if (!card.href) {
          return (
            <div
              key={card.key}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              {content}
            </div>
          );
        }

        return (
          <Link
            key={card.key}
            href={card.href}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}