"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Pencil,
  Trash2,
  Package,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import DeleteProductDialog from "./DeleteProductDialog";

export default function ProductCard({
  product,
}) {
  const router = useRouter();
  const [openDelete, setOpenDelete] =
    useState(false);

  const outOfStock =
    Number(product.stock) <= 0;

  const lowStock =
    Number(product.stock) > 0 &&
    Number(product.stock) <= 10;

  const approvalStatus =
    product.approval_status || "pending";

  const approvalConfig = {
    pending: {
      label: "Pending Review",
      icon: Clock3,
      className:
        "bg-amber-100 text-amber-700 border-amber-200",
    },

    approved: {
      label: "Approved",
      icon: CheckCircle2,
      className:
        "bg-emerald-100 text-emerald-700 border-emerald-200",
    },

    rejected: {
      label: "Rejected",
      icon: XCircle,
      className:
        "bg-red-100 text-red-700 border-red-200",
    },
  };

  const approval =
    approvalConfig[approvalStatus] ||
    approvalConfig.pending;

  const ApprovalIcon = approval.icon;

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
        {/* Image */}
        <div className="relative aspect-square bg-slate-100">
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-10 w-10 text-slate-300" />
            </div>
          )}

          {/* Approval Status */}
          <div className="absolute left-3 top-3">
            <Badge
              className={`gap-1 border ${approval.className}`}
            >
              <ApprovalIcon className="h-3.5 w-3.5" />
              {approval.label}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 p-4">
          <div>
            <h3 className="line-clamp-2 font-semibold text-slate-900">
              {product.name}
            </h3>

            <Badge
              variant="outline"
              className="mt-2"
            >
              {product.category ||
                "Category"}
            </Badge>
          </div>

          {/* Price + Stock */}
          <div className="flex items-center justify-between gap-3">
            <p className="text-xl font-bold text-emerald-600">
              ৳
              {Number(
                product.price || 0
              ).toLocaleString()}
            </p>

            <Badge
              className={
                outOfStock
                  ? "bg-red-100 text-red-700"
                  : lowStock
                  ? "bg-amber-100 text-amber-700"
                  : "bg-emerald-100 text-emerald-700"
              }
            >
              {outOfStock
                ? "Out of Stock"
                : lowStock
                ? `Low (${product.stock})`
                : `${product.stock} in stock`}
            </Badge>
          </div>

          {/* Rejected message */}
          {approvalStatus ===
            "rejected" && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-700">
              এই Productটি Admin
              Approval পায়নি। Productটি
              Edit করে আবার Review-এর জন্য
              Submit করতে পারবেন।
            </div>
          )}

          {/* Pending message */}
          {approvalStatus ===
            "pending" && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-700">
              Productটি বর্তমানে Admin
              Review-এর অপেক্ষায় আছে।
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() =>
                router.push(
                  `/seller/dashboard/products/${product.id}`
                )
              }
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>

            <Button
              variant="destructive"
              size="icon"
              onClick={() =>
                setOpenDelete(true)
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <DeleteProductDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        product={product}
      />
    </>
  );
}