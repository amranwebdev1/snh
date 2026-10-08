"use client";

import { ShoppingCart, CreditCard } from "lucide-react";

export default function StickyCheckoutBar({
  product,
  quantity,
  onAddToCart,
  onBuyNow,
}) {
  const stock = Number(product?.stock || 0);

  const regularPrice = Number(product?.price || 0);
  const discountPrice = Number(product?.discount_price || 0);

  const hasDiscount =
    discountPrice > 0 &&
    discountPrice < regularPrice;

  const sellingPrice = hasDiscount
    ? discountPrice
    : regularPrice;

  const outOfStock = stock <= 0;

  const total = sellingPrice * quantity;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center gap-3 p-3">
        {/* Price */}
        <div className="min-w-[100px]">
          <p className="text-[11px] text-slate-500">
            {quantity} × ৳{sellingPrice.toLocaleString()}
          </p>

          <p className="text-lg font-extrabold text-emerald-600">
            ৳{total.toLocaleString()}
          </p>
        </div>

        {/* Add to Cart */}
        <button
          onClick={onAddToCart}
          disabled={outOfStock}
          className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-bold transition active:scale-95 ${
            outOfStock
              ? "cursor-not-allowed bg-slate-100 text-slate-400"
              : "border border-emerald-600 bg-white text-emerald-700 hover:bg-emerald-50"
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
          Cart
        </button>

        {/* Buy Now */}
        <button
          onClick={onBuyNow}
          disabled={outOfStock}
          className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-bold transition active:scale-95 ${
            outOfStock
              ? "cursor-not-allowed bg-slate-300 text-white"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          <CreditCard className="h-5 w-5" />
          Buy Now
        </button>
      </div>
    </div>
  );
}