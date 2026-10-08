"use client";

import { useMemo, useState } from "react";

import ProductHeader from "./ProductHeader";
import ProductSearch from "./ProductSearch";
import ProductGrid from "./ProductGrid";
import EmptyProducts from "./EmptyProducts";

const FILTERS = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "approved",
    label: "Approved",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
];

export default function Main({ products }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const counts = useMemo(() => {
    return {
      all: products.length,

      pending: products.filter(
        (item) =>
          item.approval_status === "pending"
      ).length,

      approved: products.filter(
        (item) =>
          item.approval_status === "approved"
      ).length,

      rejected: products.filter(
        (item) =>
          item.approval_status === "rejected"
      ).length,
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return products.filter((item) => {
      const matchesSearch =
        !searchValue ||
        item.name
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        item.approval_status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [products, search, statusFilter]);

  return (
    <div className="space-y-5 pb-24 lg:pb-5">
      <ProductHeader
        total={products.length}
        counts={counts}
      />

      <ProductSearch
        search={search}
        setSearch={setSearch}
      />

      {/* Status Filter */}
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-2">
          {FILTERS.map((filter) => {
            const active =
              statusFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() =>
                  setStatusFilter(
                    filter.value
                  )
                }
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {filter.label}

                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {counts[filter.value]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filteredProducts.length ? (
        <ProductGrid
          products={filteredProducts}
        />
      ) : (
        <EmptyProducts
          search={search}
          status={statusFilter}
        />
      )}
    </div>
  );
}