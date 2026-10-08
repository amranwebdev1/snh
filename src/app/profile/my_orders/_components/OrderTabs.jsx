"use client";

import { useRouter } from "next/navigation";

const tabs = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const OrderTabs = ({ activeStatus = "all" }) => {
  const router = useRouter();

  const handleTab = (value) => {
    if (value === "all") {
      router.push("/profile/my_orders");
    } else {
      router.push(`/profile/my_orders?status=${value}`);
    }
  };

  return (
    <div className="sticky top-15 z-20 -mx-4 border-b border-slate-200 bg-slate-50 px-4 py-2">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const active = activeStatus === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => handleTab(tab.value)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTabs;