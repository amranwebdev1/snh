"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ProductHeader({
  total,
  counts,
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          My Products
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          {total}টি Product
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {counts.pending > 0 && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
              {counts.pending} Pending
            </span>
          )}

          {counts.approved > 0 && (
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
              {counts.approved} Approved
            </span>
          )}

          {counts.rejected > 0 && (
            <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
              {counts.rejected} Rejected
            </span>
          )}
        </div>
      </div>

      <Link href="/seller/dashboard/products/new">
        <Button className="gap-2">
          <Plus className="h-4 w-4" />

          <span className="hidden sm:inline">
            Add Product
          </span>
        </Button>
      </Link>
    </div>
  );
}