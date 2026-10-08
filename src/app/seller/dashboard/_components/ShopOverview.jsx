import {
  Store,
  BadgeCheck,
  Clock3,
  Link2,
} from "lucide-react";

export default function ShopOverview({ shop }) {
  const approved = shop?.verification_status === "approved";

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">
          Shop Overview
        </h2>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            approved
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {approved ? "Approved" : "Pending"}
        </span>
      </div>

      {/* Shop Info */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-emerald-100">
          {shop?.logo ? (
            <img
              src={shop.logo}
              alt={shop.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <Store className="h-8 w-8 text-emerald-700" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-slate-900">
            {shop?.name}
          </h3>

          <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <BadgeCheck className="h-4 w-4 text-emerald-600" />
            {approved ? "Verified Shop" : "Verification Pending"}
          </div>
        </div>
      </div>

      {/* Info List */}
      <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <Link2 className="h-4 w-4" />
            Shop Slug
          </div>

          <span className="font-medium text-slate-900">
            /{shop?.slug || "shop"}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <Clock3 className="h-4 w-4" />
            Joined
          </div>

          <span className="font-medium text-slate-900">
            {shop?.created_at
              ? new Date(shop.created_at).toLocaleDateString(
                  "bn-BD"
                )
              : "--"}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 rounded-2xl bg-slate-50 p-3">
        <p className="text-xs leading-5 text-slate-500">
          আপনার Shop Approved থাকলে Customer আপনার Product দেখতে ও অর্ডার করতে পারবে।
        </p>
      </div>
    </section>
  );
}