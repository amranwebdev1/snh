"use client";

import { useMemo, useState } from "react";

import OrderTabs from "./OrderTabs";
import OrderSearch from "./OrderSearch";
import OrderList from "./OrderList";
import EmptyOrders from "./EmptyOrders";

export default function Main({ orders }) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchStatus =
        activeTab === "all" || order.status === activeTab;

      const matchSearch =
        order.order_number
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.addresses?.full_name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      return matchStatus && matchSearch;
    });
  }, [orders, search, activeTab]);

  return (
    <div className="space-y-5 pb-24 lg:pb-5">
      <div>
        <h1 className="text-2xl font-bold">
          Shop Orders
        </h1>

        <p className="text-sm text-slate-500">
          মোট {orders.length}টি অর্ডার
        </p>
      </div>

      <OrderSearch
        search={search}
        setSearch={setSearch}
      />

      <OrderTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {filteredOrders.length ? (
        <OrderList orders={filteredOrders} />
      ) : (
        <EmptyOrders />
      )}
    </div>
  );
}