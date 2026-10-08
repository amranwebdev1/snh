"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const statuses = [
  {
    value: "all",
    label: "সব",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "confirmed",
    label: "Confirmed",
  },
  {
    value: "processing",
    label: "Processing",
  },
  {
    value: "pickup_requested",
    label: "Pickup Request",
  },
  {
    value: "shipped",
    label: "Picked Up",
  },
  {
    value: "out_for_delivery",
    label: "Delivery চলছে",
  },
  {
    value: "delivered",
    label: "Delivered",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
];

export default function OrdersToolbar({
  status,
  search,
}) {
  const router = useRouter();

  const [searchValue, setSearchValue] =
    useState(search || "");

  const handleSearch = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (status && status !== "all") {
      params.set("status", status);
    }

    if (searchValue.trim()) {
      params.set(
        "search",
        searchValue.trim()
      );
    }

    const query = params.toString();

    router.push(
      query
        ? `/admin/orders?${query}`
        : "/admin/orders"
    );
  };

  const handleStatusChange = (value) => {
    const params = new URLSearchParams();

    if (value !== "all") {
      params.set("status", value);
    }

    if (searchValue.trim()) {
      params.set(
        "search",
        searchValue.trim()
      );
    }

    const query = params.toString();

    router.push(
      query
        ? `/admin/orders?${query}`
        : "/admin/orders"
    );
  };

  return (
    <div className="space-y-3">
      <form
        onSubmit={handleSearch}
        className="flex gap-2"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            value={searchValue}
            onChange={(event) =>
              setSearchValue(event.target.value)
            }
            placeholder="Order number দিয়ে search করুন..."
            className="h-11 rounded-xl bg-white pl-9"
          />
        </div>

        <Button
          type="submit"
          className="h-11 rounded-xl"
        >
          Search
        </Button>
      </form>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {statuses.map((item) => {
          const active =
            status === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                handleStatusChange(
                  item.value
                )
              }
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}