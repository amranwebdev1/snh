"use client";

const tabs = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
];

export default function OrderTabs({
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
            activeTab === tab.key
              ? "bg-emerald-600 text-white"
              : "bg-white border border-slate-200 text-slate-600"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}