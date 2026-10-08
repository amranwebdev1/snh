import Link from "next/link";

import {
  ExternalLink,
  Package,
  Store,
} from "lucide-react";

import { Button } from "@/components/ui/button";

function getSellingPrice(product) {
  const price = Number(
    product?.price || 0
  );

  const discountPrice = Number(
    product?.discount_price || 0
  );

  return discountPrice > 0 &&
    discountPrice < price
    ? discountPrice
    : price;
}

function formatPrice(value) {
  return new Intl.NumberFormat("en-BD", {
    maximumFractionDigits: 2,
  }).format(value);
}

export default function ShopProducts({
  products = [],
}) {
  return (
    <section className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-5">
        <div className="flex items-center gap-2">
          <Package
            size={19}
            className="text-slate-500"
          />

          <h2 className="font-semibold text-slate-900">
            Shop Products
          </h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          {products.length} টি product
        </p>
      </div>

      {!products.length ? (
        <div className="px-5 py-10 text-center">
          <Store
            size={32}
            className="mx-auto text-slate-300"
          />

          <p className="mt-3 font-medium text-slate-700">
            এই shop-এ কোনো product নেই
          </p>
        </div>
      ) : (
        <div className="divide-y">
          {products.map((product) => {
            const sellingPrice =
              getSellingPrice(product);

            return (
              <div
                key={product.id}
                className="flex gap-3 p-4 sm:p-5"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Package
                      size={22}
                      className="text-slate-400"
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-medium text-slate-900">
                    {product.name}
                  </h3>

                  <p className="mt-1 font-semibold text-slate-900">
                    ৳{formatPrice(sellingPrice)}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">
                      Stock: {product.stock ?? 0}
                    </span>

                    <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">
                      {product.status || "—"}
                    </span>

                    <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">
                      {product.approval_status || "—"}
                    </span>
                  </div>
                </div>

                {product.slug && (
                  <div className="hidden sm:block">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={15} />
                        View
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}