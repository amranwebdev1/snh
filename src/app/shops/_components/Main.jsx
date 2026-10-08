"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Grid2X2, List, Search, Store } from "lucide-react";

import PageHeader from "@/components/common/PageHeader";
import StoreCard from "@/components/common/SmartStoreCard";

export default function Main({ shops = [] }) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="min-h-screen bg-slate-100 pb-12">
      <PageHeader
        title={`দোকানের তালিকা (${shops.length})`}
        rightAction={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/search?type=shops")}
              className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">দোকান খুঁজুন</span>
            </button>

            <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`rounded-md p-1.5 transition ${
                  viewMode === "grid"
                    ? "bg-white text-emerald-600 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                aria-label="Grid view"
              >
                <Grid2X2 className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`rounded-md p-1.5 transition ${
                  viewMode === "list"
                    ? "bg-white text-emerald-600 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        }
      />

      <main className="mx-auto mt-3 max-w-6xl px-2.5 sm:px-4">
        {shops.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <Store className="mx-auto mb-2 h-10 w-10 text-slate-300" />

            <p className="text-sm font-medium text-slate-500">
              কোনো দোকান পাওয়া যায়নি।
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3.5 md:grid-cols-4 lg:grid-cols-5"
                : "space-y-2"
            }
          >
            {shops.map((shop) => (
              <StoreCard
                key={shop.id}
                shop={shop}
                viewMode={viewMode}
                showRating={false}
                showBookmark={false}
                showOpenStatus={false}
                onClick={() =>
  router.push(
    `/shops/${shop.profiles?.username}/${shop.slug}`
  )
}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}