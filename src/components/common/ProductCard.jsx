"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Plus,
  ShoppingCart,
  Package,
  Tag,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({
  product,
  onAddToCart,
}) {
  const router = useRouter();

  const stock = Number(product?.stock || 0);

  const price = Number(product?.price || 0);

  // Database field
  const discountPrice = Number(
    product?.discount_price || 0
  );

  const outOfStock = stock <= 0;

  // ---------------------------------------
  // Discount
  // ---------------------------------------

  const hasDiscount =
    discountPrice > 0 &&
    discountPrice < price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((price - discountPrice) / price) *
          100
      )
    : 0;

  // যে price customer actually pay করবে
  const finalPrice = hasDiscount
    ? discountPrice
    : price;

  return (
    <Card
      onClick={() =>
        router.push(
          `/products/${product.slug}`
        )
      }
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.99]"
    >
      <CardContent className="p-0">

        {/* ================================= */}
        {/* Product Image */}
        {/* ================================= */}

        <div className="relative aspect-square overflow-hidden bg-slate-100">

          {product?.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product?.name || "Product"}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-12 w-12 text-slate-300" />
            </div>
          )}

          {/* ================================= */}
          {/* Offer Badge */}
          {/* ================================= */}

          {hasDiscount && (
  <Badge
    className="absolute left-2 top-2 z-10 rounded-md bg-red-500 px-2 py-1 text-[10px] font-bold text-white shadow-sm hover:bg-red-500"
  >
    অফার {discountPercent}%
  </Badge>
)}

          {/* ================================= */}
          {/* Out Of Stock */}
          {/* ================================= */}

          {outOfStock && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-900 shadow">
                Out of Stock
              </span>
            </div>
          )}

        </div>

        {/* ================================= */}
        {/* Content */}
        {/* ================================= */}

        <div className="p-3">

          {/* Product Name */}

          <h3 className="line-clamp-2 min-h-[40px] text-sm font-semibold leading-5 text-slate-800">
            {product?.name}
          </h3>

          {/* ================================= */}
          {/* Price */}
          {/* ================================= */}

          <div className="mt-1 space-y-0.5">

            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">

              {/* Current Price */}

              <span className="text-lg font-extrabold text-emerald-600">
                ৳{finalPrice.toLocaleString()}
              </span>

              {/* Original Price */}

              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through">
                  ৳{price.toLocaleString()}
                </span>
              )}

            </div>

            {/* ================================= */}
            {/* Stock */}
            {/* ================================= */}

            <p
              className={`text-xs ${
                outOfStock
                  ? "text-red-500"
                  : "text-slate-500"
              }`}
            >
              {outOfStock
                ? "Out of Stock"
                : stock > 999
                ? "999+ in stock"
                : `${stock} in stock`}
            </p>

          </div>

          {/* ================================= */}
          {/* Add To Cart */}
          {/* ================================= */}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();

              if (
                !outOfStock &&
                onAddToCart
              ) {
                onAddToCart(product);
              }
            }}
            disabled={outOfStock}
            className={`mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold transition active:scale-95 ${
              outOfStock
                ? "cursor-not-allowed bg-slate-100 text-slate-400"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            {outOfStock ? (
              <>
                <ShoppingCart className="h-4 w-4" />
                Unavailable
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </button>

        </div>
      </CardContent>
    </Card>
  );
}