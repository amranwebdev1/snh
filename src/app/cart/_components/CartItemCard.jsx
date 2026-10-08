"use client";

import { useCart } from "@/providers/CartProvider";

import { useState } from "react";
import Image from "next/image";
import {
  Minus,
  Plus,
  Trash2,
  Store,
  Package,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { updateCartQuantity } from "@/lib/cart/updateCartQuantity";
import { removeCartItem } from "@/lib/cart/removeCartItem";

export default function CartItemCard({
  item,
  onRemove,
  onQuantityChange,
}) {
  const router = useRouter();

  const { refreshCartCount } = useCart();

  const [quantity, setQuantity] = useState(
    Number(item?.quantity || 1)
  );

  const [loading, setLoading] = useState(false);

  const stock = Number(
    item?.product?.stock || 0
  );

  const price = Number(
    item?.product?.price || 0
  );

  const discountPrice = Number(
    item?.product?.discount_price || 0
  );

  // ---------------------------------------
  // Final Sale Price
  // ---------------------------------------

  const hasDiscount =
    discountPrice > 0 &&
    discountPrice < price;

  const finalPrice = hasDiscount
    ? discountPrice
    : price;

  // ---------------------------------------
  // Discount Percentage
  // ---------------------------------------

  const discountPercent = hasDiscount
    ? Math.round(
        ((price - discountPrice) / price) *
          100
      )
    : 0;

  // ---------------------------------------
  // Item Subtotal
  // ---------------------------------------

  const itemSubtotal =
    finalPrice * quantity;

  // ---------------------------------------
  // Increase
  // ---------------------------------------

  const increase = async () => {
    if (loading) return;

    if (quantity >= stock) return;

    const next = quantity + 1;

    try {
      setLoading(true);

      await updateCartQuantity(
        item.product.id,
        next
      );

      setQuantity(next);

      onQuantityChange(
        item.id,
        next
      );

      await refreshCartCount();
    } catch (error) {
      console.error(
        "Increase Cart Quantity Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------
  // Decrease
  // ---------------------------------------

  const decrease = async () => {
    if (loading) return;

    if (quantity <= 1) return;

    const next = quantity - 1;

    try {
      setLoading(true);

      await updateCartQuantity(
        item.product.id,
        next
      );

      setQuantity(next);

      onQuantityChange(
        item.id,
        next
      );

      await refreshCartCount();
    } catch (error) {
      console.error(
        "Decrease Cart Quantity Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------
  // Remove
  // ---------------------------------------

  const remove = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await removeCartItem(item.id);

      onRemove(item.id);

      await refreshCartCount();
    } catch (error) {
      console.error(
        "Remove Cart Item Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex gap-3">
        {/* -------------------------------- */}
        {/* Product Image */}
        {/* -------------------------------- */}

        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
          {item?.product?.thumbnail ? (
            <Image
              fill
              src={item.product.thumbnail}
              alt={
                item.product.name ||
                "Product"
              }
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-8 w-8 text-slate-300" />
            </div>
          )}
        </div>

        {/* -------------------------------- */}
        {/* Right Side */}
        {/* -------------------------------- */}

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Product Name */}

          <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-900">
            {item?.product?.name}
          </h3>

          {/* -------------------------------- */}
          {/* Shop */}
          {/* -------------------------------- */}

          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <Store className="h-3.5 w-3.5 shrink-0" />

            <span className="truncate">
              {item?.product?.shop?.name ||
                "Shop"}
            </span>
          </div>

          {/* -------------------------------- */}
          {/* Price */}
          {/* -------------------------------- */}

          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-emerald-600">
              ৳{finalPrice.toLocaleString()}
            </span>

            {hasDiscount && (
              <>
                <span className="text-xs text-slate-400 line-through">
                  ৳{price.toLocaleString()}
                </span>

                <span className="rounded-md bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-500">
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          {/* -------------------------------- */}
          {/* Stock */}
          {/* -------------------------------- */}

          <p
            className={`mt-0.5 text-xs ${
              stock <= 0
                ? "text-red-500"
                : "text-slate-500"
            }`}
          >
            {stock <= 0
              ? "Out of Stock"
              : stock > 999
              ? "999+ in stock"
              : `${stock} in stock`}
          </p>

          {/* -------------------------------- */}
          {/* Bottom Actions */}
          {/* -------------------------------- */}

          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
            {/* Quantity */}

            <div className="flex items-center rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={decrease}
                disabled={
                  loading ||
                  quantity <= 1
                }
                className="flex h-8 w-8 items-center justify-center text-slate-700 transition hover:bg-slate-100 disabled:text-slate-300"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="flex h-8 min-w-[36px] items-center justify-center border-x border-slate-200 text-sm font-bold">
                {quantity}
              </span>

              <button
                type="button"
                onClick={increase}
                disabled={
                  loading ||
                  quantity >= stock
                }
                className="flex h-8 w-8 items-center justify-center text-slate-700 transition hover:bg-slate-100 disabled:text-slate-300"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* -------------------------------- */}
            {/* Subtotal + Delete */}
            {/* -------------------------------- */}

            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900">
                ৳{itemSubtotal.toLocaleString()}
              </span>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={remove}
                disabled={loading}
                className="h-8 w-8"
              >
                <Trash2
                  className={`h-4 w-4 ${
                    loading
                      ? "text-slate-300"
                      : "text-red-500"
                  }`}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}