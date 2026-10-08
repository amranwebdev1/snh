"use client";

import PageHeader from "@/components/common/PageHeader";
import OrderTabs from "./OrderTabs";
import OrderCard from "./OrderCard";

const Main = ({ orders = [], activeStatus = "all" }) => {
  return (
    <div className="space-y-5">
      <PageHeader title="My Orders" />

      <OrderTabs activeStatus={activeStatus} />

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed bg-white p-10 text-center">
          <p className="font-semibold text-slate-900">
            কোনো অর্ডার পাওয়া যায়নি
          </p>

          <p className="mt-1 text-sm text-slate-500">
            আপনার অর্ডার এখানে দেখা যাবে।
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;