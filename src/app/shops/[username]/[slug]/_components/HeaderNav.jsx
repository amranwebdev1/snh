"use client";
import { useCart } from "@/providers/CartProvider";
import PageHeader from "@/components/common/PageHeader";
import { Share2, ShoppingCart } from "lucide-react";

export default function HeaderNav({
  shopName,
  onShare,
  onOpenCart,
}) {
  const { cartCount } = useCart();
  return (
    <PageHeader
      title={shopName}
      rightAction={
        <div className="flex items-center gap-2">
          <button
            onClick={onShare}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 active:scale-95"
            aria-label="Share shop"
          >
            <Share2 className="h-5 w-5" />
          </button>

          <div className="relative">
            <button
              onClick={onOpenCart}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100 active:scale-95"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border border-white bg-emerald-600 px-1 text-[10px] font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>
        </div>
      }
    />
  );
}