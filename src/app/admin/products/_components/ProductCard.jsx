import Link from "next/link";
import {
  Eye,
  Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  getSellingPrice,
  getApprovalLabel,
  getApprovalClass,
  getProductStatusClass,
} from "./productHelpers";

export default function ProductCard({
  product,
}) {
  const sellingPrice =
    getSellingPrice(product);

  const shop = product?.shops;

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex gap-3">

        {/* Image */}
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-slate-100">
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Package className="h-6 w-6 text-slate-400" />
            </div>
          )}
        </div>

        {/* Main */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-slate-900">
            {product.name}
          </h3>

          <p className="mt-1 truncate text-xs text-slate-500">
            {shop?.name || "Unknown Shop"}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="font-bold text-slate-900">
              ৳
              {sellingPrice.toLocaleString(
                "en-BD"
              )}
            </span>

            {Number(product.price) >
              sellingPrice && (
              <span className="text-xs text-slate-400 line-through">
                ৳
                {Number(
                  product.price
                ).toLocaleString("en-BD")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${getApprovalClass(
            product.approval_status
          )}`}
        >
          {getApprovalLabel(
            product.approval_status
          )}
        </span>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${getProductStatusClass(
            product.status
          )}`}
        >
          {product.status || "Unknown"}
        </span>

        <span
          className="
            rounded-full
            bg-slate-100
            px-2.5
            py-1
            text-xs
            font-medium
            text-slate-700
          "
        >
          Stock: {product.stock ?? 0}
        </span>
      </div>

      {/* Action */}
      <div className="mt-4">
        <Button
          asChild
          variant="outline"
          className="w-full"
        >
          <Link
            href={`/admin/products/${product.id}`}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Product
          </Link>
        </Button>
      </div>
    </div>
  );
}