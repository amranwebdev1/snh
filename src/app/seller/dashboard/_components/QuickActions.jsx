"use client";

import { useRouter } from "next/navigation";
import {
  Plus,
  ShoppingBag,
  Package,
  BarChart3,
} from "lucide-react";

const actions = [
  {
    title: "নতুন পণ্য",
    desc: "নতুন Product যোগ করুন",
    icon: Plus,
    href: "/seller/dashboard/products/new",
    color: "bg-emerald-500",
  },
  {
    title: "অর্ডার",
    desc: "সব অর্ডার দেখুন",
    icon: ShoppingBag,
    href: "/seller/dashboard/orders",
    color: "bg-blue-500",
  },
  {
    title: "পণ্যসমূহ",
    desc: "সব Product দেখুন",
    icon: Package,
    href: "/seller/dashboard/products",
    color: "bg-violet-500",
  },
  {
    title: "Analytics",
    desc: "পরে আসছে",
    icon: BarChart3,
    href: "#",
    color: "bg-amber-500",
    disabled: true,
  },
];

export default function QuickActions() {
  const router = useRouter();

  return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-bold">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              disabled={item.disabled}
              onClick={() =>
                !item.disabled && router.push(item.href)
              }
              className="rounded-2xl border p-4 text-left transition hover:shadow-md disabled:opacity-50"
            >
              <div
                className={`mb-3 inline-flex rounded-xl p-2 text-white ${item.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <h4 className="font-semibold">
                {item.title}
              </h4>

              <p className="mt-1 text-xs text-slate-500">
                {item.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}