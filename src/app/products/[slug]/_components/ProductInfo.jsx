"use client";

import { Badge } from "@/components/ui/badge";
import {
  Package,
  Tag,
  CheckCircle2,
  AlertCircle,
  Share2,
  Heart,
} from "lucide-react";

export default function ProductInfo({ product }) {
  const regularPrice = Number(product?.price || 0);
  const discountPrice = Number(product?.discount_price || 0);
  const stock = Number(product?.stock || 0);

  // discount_price যদি regular price-এর চেয়ে কম হয়,
  // তাহলে discount price-টাই current selling price
  const hasDiscount =
    discountPrice > 0 && discountPrice < regularPrice;

  const sellingPrice = hasDiscount
    ? discountPrice
    : regularPrice;

  const discount = hasDiscount
    ? Math.round(
        ((regularPrice - discountPrice) / regularPrice) * 100
      )
    : 0;

  const outOfStock = stock <= 0;

  return (
    <section className="mt-3 rounded-2xl bg-white p-4 shadow-sm">
      {/* Category */}
      {product?.category && (
        <Badge variant="secondary" className="mb-3">
          {product.category}
        </Badge>
      )}

      {/* Product Name */}
      <h1 className="text-xl font-bold leading-7 text-slate-900 sm:text-2xl">
        {product?.name}
      </h1>

      {/* Price */}
      <div className="mt-4 flex flex-wrap items-end gap-2">
        {/* Current selling price */}
        <span className="text-3xl font-extrabold text-emerald-600">
          ৳{sellingPrice.toLocaleString()}
        </span>

        {/* Regular price */}
        {hasDiscount && (
          <>
            <span className="text-base text-slate-400 line-through">
              ৳{regularPrice.toLocaleString()}
            </span>

            <Badge className="bg-red-500 text-white hover:bg-red-500">
              -{discount}%
            </Badge>
          </>
        )}
      </div>

      {/* Stock */}
      <div className="mt-4 flex items-center gap-2">
        {outOfStock ? (
          <>
            <AlertCircle className="h-5 w-5 text-red-500" />

            <span className="font-semibold text-red-600">
              Out of Stock
            </span>
          </>
        ) : (
          <>
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />

            <span className="font-semibold text-emerald-600">
              {stock > 999
                ? "999+ in stock"
                : `${stock} in stock`}
            </span>
          </>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">
              Availability
            </p>

            <p className="text-sm font-semibold">
              {outOfStock
                ? "Unavailable"
                : "Available"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">
              Product ID
            </p>

            <p className="break-all text-sm font-semibold text-slate-700">
              {product?.slug}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      {product?.description && (
        <div className="mt-5 border-t border-slate-100 pt-4">
          <h3 className="mb-2 text-base font-bold text-slate-900">
            Product Description
          </h3>

          <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
            {product.description}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          <Heart className="h-4 w-4" />
          Save
        </button>

        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>
    </section>
  );
}