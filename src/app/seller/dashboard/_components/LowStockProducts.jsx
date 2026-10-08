"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle, Package, Pencil } from "lucide-react";

export default function LowStockProducts({ products = [] }) {
  const router = useRouter();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-bold text-slate-900">
            Low Stock Alert
          </h2>
        </div>

        <button
          onClick={() => router.push("/seller/dashboard/products")}
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
        >
          Manage All
        </button>
      </div>

      {/* Empty */}
      {products.length === 0 ? (
        <div className="py-8 text-center">
          <Package className="mx-auto mb-3 h-10 w-10 text-slate-300" />

          <p className="font-medium text-slate-700">
            সব Product-এর Stock ঠিক আছে
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Low Stock Product নেই।
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((product) => {
            const outOfStock = Number(product.stock) <= 0;

            return (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3 transition hover:border-slate-300 hover:bg-slate-50"
              >
                {/* Image */}
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Package className="h-6 w-6 text-slate-300" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-900">
                    {product.name}
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        outOfStock
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {outOfStock
                        ? "Out of Stock"
                        : `${product.stock} Left`}
                    </span>
                  </div>
                </div>

                {/* Edit */}
                <button
                  onClick={() =>
                    router.push(
                      `/seller/dashboard/products/${product.id}`
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-white hover:shadow-sm"
                >
                  <Pencil className="h-4 w-4 text-slate-600" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}