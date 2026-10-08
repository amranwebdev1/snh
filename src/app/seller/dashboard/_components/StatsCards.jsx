import {
  ShoppingBag,
  Clock3,
  Package,
  Wallet,
} from "lucide-react";

const cards = [
  {
    key: "totalOrders",
    label: "মোট অর্ডার",
    icon: ShoppingBag,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    key: "pendingOrders",
    label: "পেন্ডিং অর্ডার",
    icon: Clock3,
    color: "bg-amber-100 text-amber-700",
    alert: true,
  },
  {
    key: "totalProducts",
    label: "মোট পণ্য",
    icon: Package,
    color: "bg-blue-100 text-blue-700",
  },
  {
    key: "todayRevenue",
    label: "আজকের বিক্রি",
    icon: Wallet,
    color: "bg-purple-100 text-purple-700",
    money: true,
  },
];

export default function StatsCards({ stats }) {
  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const value = Number(stats?.[card.key] || 0);

        return (
          <div
            key={card.key}
            className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* Top */}
            <div className="flex items-center justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              {card.alert && value > 0 && (
                <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
              )}
            </div>

            {/* Text */}
            <p className="mt-4 text-xs font-medium text-slate-500">
              {card.label}
            </p>

            <h3 className="mt-1 text-xl font-bold text-slate-900 tabular-nums sm:text-2xl">
              {card.money
                ? `৳${value.toLocaleString()}`
                : value.toLocaleString()}
            </h3>

            {/* Small helper text */}
            {card.key === "pendingOrders" && value > 0 && (
              <p className="mt-1 text-[11px] text-amber-600">
                দ্রুত দেখুন
              </p>
            )}

            {card.key === "todayRevenue" && (
              <p className="mt-1 text-[11px] text-slate-400">
                আজকের সম্পন্ন বিক্রি
              </p>
            )}
          </div>
        );
      })}
    </section>
  );
}