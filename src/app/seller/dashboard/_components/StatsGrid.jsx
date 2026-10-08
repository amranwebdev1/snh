import { Package, ShoppingCart, Clock, Wallet } from "lucide-react";

export default function StatsGrid({ productCount = 0 }) {
  const stats = [
    {
      title: "Products",
      value: productCount,
      icon: Package,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Orders",
      value: 0,
      icon: ShoppingCart,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Pending",
      value: 0,
      icon: Clock,
      color: "bg-orange-500/10 text-orange-500",
    },
    {
      title: "Revenue",
      value: "৳0",
      icon: Wallet,
      color: "bg-purple-500/10 text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border bg-white p-4"
          >
            <div
              className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}
            >
              <Icon className="h-5 w-5" />
            </div>

            <p className="text-2xl font-bold">{item.value}</p>
            <p className="text-sm text-slate-500">{item.title}</p>
          </div>
        );
      })}
    </div>
  );
}