"use client";

import {
  Package,
  MapPin,
  Calendar,
  Navigation,
  Store,
  Info,
} from "lucide-react";

export default function ShopMetaCard({
  shop,
  productCount = 0,
}) {
  const joinedDate = shop?.created_at
    ? new Date(shop.created_at).toLocaleDateString("en-GB", {
        month: "short",
        year: "numeric",
      })
    : "Recently";

  return (
    <section className="my-3 space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Store Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="mb-1 flex items-center gap-2">
            <Package className="h-4 w-4 text-indigo-600" />
            <span className="text-xs text-slate-500">Products</span>
          </div>
          <p className="text-lg font-bold text-slate-900">
            {productCount}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <div className="mb-1 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-emerald-600" />
            <span className="text-xs text-slate-500">Joined</span>
          </div>
          <p className="text-lg font-bold text-slate-900">
            {joinedDate}
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-900">
            Shop Location
          </h3>
        </div>

        <div>
          <p className="text-sm text-slate-600">
            {shop?.location || "Location not available"}
          </p>
        </div>
      </div>

      {/* About */}
      <div className="border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2">
          <Store className="h-4 w-4 text-slate-600" />
          <h3 className="text-sm font-bold text-slate-900">
            About This Shop
          </h3>
        </div>

        <p className="text-sm leading-6 text-slate-600">
          {shop?.description || "No description available."}
        </p>
      </div>

      {/* Marketplace Notice */}
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
        <div className="mb-1 flex items-center gap-2">
          <Info className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-900">
            Marketplace Notice
          </span>
        </div>

        <p className="text-xs leading-5 text-blue-800">
          এই দোকানটি SunamHat Marketplace-এর অনুমোদিত বিক্রেতা। সারা
          বাংলাদেশে ডেলিভারি সুবিধা খুব শীঘ্রই চালু হবে।
        </p>
      </div>
    </section>
  );
}