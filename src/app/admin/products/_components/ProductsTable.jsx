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

export default function ProductsTable({
  products = [],
}) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-sm">
          <thead className="border-b bg-slate-50">
            <tr className="text-left">
              <th className="px-4 py-3 font-semibold text-slate-700">
                Product
              </th>

              <th className="px-4 py-3 font-semibold text-slate-700">
                Shop
              </th>

              <th className="px-4 py-3 font-semibold text-slate-700">
                Price
              </th>

              <th className="px-4 py-3 font-semibold text-slate-700">
                Stock
              </th>

              <th className="px-4 py-3 font-semibold text-slate-700">
                Status
              </th>

              <th className="px-4 py-3 font-semibold text-slate-700">
                Approval
              </th>

              <th className="px-4 py-3 font-semibold text-slate-700">
                Created
              </th>

              <th className="px-4 py-3 text-right font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((product) => {
              const sellingPrice =
                getSellingPrice(product);

              const shop =
                product?.shops;

              return (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50"
                >
                  {/* Product */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border bg-slate-100">
                        {product.thumbnail ? (
                          <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Package className="h-5 w-5 text-slate-400" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-[220px] truncate font-medium text-slate-900">
                          {product.name}
                        </p>

                        <p className="max-w-[220px] truncate text-xs text-slate-500">
                          /{product.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Shop */}
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-slate-900">
                        {shop?.name || "Unknown Shop"}
                      </p>

                      <p className="text-xs text-slate-500">
                        @{shop?.profiles?.username || "unknown"}
                      </p>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-4">
                    <div className="font-semibold text-slate-900">
                      ৳{sellingPrice.toLocaleString("en-BD")}
                    </div>

                    {Number(product.price) >
                      sellingPrice && (
                      <div className="text-xs text-slate-400 line-through">
                        ৳
                        {Number(
                          product.price
                        ).toLocaleString("en-BD")}
                      </div>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="px-4 py-4">
                    <span
                      className={
                        Number(product.stock) > 0
                          ? "text-slate-700"
                          : "font-medium text-red-600"
                      }
                    >
                      {product.stock ?? 0}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${getProductStatusClass(
                        product.status
                      )}`}
                    >
                      {product.status || "Unknown"}
                    </span>
                  </td>

                  {/* Approval */}
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${getApprovalClass(
                        product.approval_status
                      )}`}
                    >
                      {getApprovalLabel(
                        product.approval_status
                      )}
                    </span>
                  </td>

                  {/* Created */}
                  <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                    {product.created_at
                      ? new Date(
                          product.created_at
                        ).toLocaleDateString(
                          "en-BD"
                        )
                      : "-"}
                  </td>

                  {/* Action */}
                  <td className="px-4 py-4 text-right">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                    >
                      <Link
                        href={`/admin/products/${product.id}`}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}