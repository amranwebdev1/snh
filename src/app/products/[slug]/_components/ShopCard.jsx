"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Store, MapPin, CheckCircle } from "lucide-react";

export default function ShopCard({ shop }) {
  const router = useRouter();

  if (!shop) return null;

  const isVerified = shop.verification_status === "approved";

  return (
    <section className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">Sold by</h2>

        <button
          onClick={() => router.push(`/shops/${shop.slug}`)}
          className="text-sm font-semibold text-emerald-600 hover:underline"
        >
          Visit Shop
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 overflow-hidden rounded-2xl border bg-slate-100">
          {shop.logo ? (
            <Image
              src={shop.logo}
              alt={shop.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Store className="h-8 w-8 text-slate-400" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <h3 className="truncate text-base font-bold text-slate-900">
              {shop.name}
            </h3>

            {isVerified && (
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            )}
          </div>

          <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />
            <span className="truncate">
              {shop.location || "Bangladesh"}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Marketplace Verified Seller
          </p>
        </div>
      </div>

      <button
        onClick={() => router.push(`/shops/${shop.slug}`)}
        className="mt-4 h-11 w-full rounded-xl border border-emerald-200 bg-emerald-50 font-semibold text-emerald-700 transition hover:bg-emerald-100 active:scale-95"
      >
        Visit Shop
      </button>
    </section>
  );
}