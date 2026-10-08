import Link from "next/link";

import {
  Eye,
  MapPin,
  Phone,
  Store,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

function formatDate(value) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function Badge({
  children,
  className,
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

export default function ShopCard({
  shop,
}) {
  const seller =
    shop?.profiles;

  const phone =
    shop?.phone ||
    seller?.phone ||
    null;

  const isApproved =
    shop?.verification_status ===
    "approved";

  const isActive =
    shop?.status === "active";

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
          {shop?.logo ? (
            <img
              src={shop.logo}
              alt={shop.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <Store
              size={22}
              className="text-slate-400"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate font-semibold text-slate-900">
            {shop?.name}
          </h2>

          <p className="mt-0.5 truncate text-xs text-slate-500">
            /{shop?.slug}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            <Badge
              className={
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "bg-slate-100 text-slate-600"
              }
            >
              {shop?.status ||
                "Unknown"}
            </Badge>

            <Badge
              className={
                isApproved
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }
            >
              {shop?.verification_status ||
                "Unknown"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2 border-t pt-4">
        <div className="flex items-center gap-2 text-sm">
          <UserRound
            size={15}
            className="shrink-0 text-slate-400"
          />

          <div className="min-w-0">
            <span className="font-medium text-slate-700">
              {seller?.name ||
                "Unnamed seller"}
            </span>

            {seller?.username && (
              <span className="ml-1 text-xs text-slate-400">
                @{seller.username}
              </span>
            )}
          </div>
        </div>

        {phone && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone
              size={15}
              className="shrink-0 text-slate-400"
            />

            <span>{phone}</span>
          </div>
        )}

        {shop?.location && (
          <div className="flex items-start gap-2 text-sm text-slate-600">
            <MapPin
              size={15}
              className="mt-0.5 shrink-0 text-slate-400"
            />

            <span>{shop.location}</span>
          </div>
        )}

        <div className="text-xs text-slate-400">
          Created: {formatDate(shop?.created_at)}
        </div>
      </div>

      <div className="mt-4">
        <Button
          asChild
          className="w-full"
          variant="outline"
        >
          <Link
            href={`/admin/shops/${shop.id}`}
          >
            <Eye size={16} />
            View Shop
          </Link>
        </Button>
      </div>
    </div>
  );
}