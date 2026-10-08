import Link from "next/link";

import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  Phone,
  ShoppingBag,
  Store,
} from "lucide-react";

import { Button } from "@/components/ui/button";

function formatDate(value) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function ShopOverview({
  shop,
  ordersCount = 0,
}) {
  const username =
    shop?.profiles?.username;

  const publicShopUrl =
    username && shop?.slug
      ? `/shops/${username}/${shop.slug}`
      : null;

  return (
    <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
      {/* Cover */}
      <div className="relative h-44 bg-slate-200 sm:h-56">
        {shop?.cover ? (
          <img
            src={shop.cover}
            alt={`${shop.name} cover`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Store
              size={42}
              className="text-slate-400"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="flex items-end gap-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-white bg-white shadow-lg sm:h-20 sm:w-20">
              {shop?.logo ? (
                <img
                  src={shop.logo}
                  alt={shop.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Store
                  size={28}
                  className="text-slate-400"
                />
              )}
            </div>

            <div className="min-w-0 text-white">
              <h1 className="truncate text-xl font-bold sm:text-2xl">
                {shop.name}
              </h1>

              <p className="truncate text-sm text-white/80">
                /{shop.slug}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <Button
            asChild
            size="sm"
            variant="outline"
          >
            <Link href="/admin/shops">
              <ArrowLeft size={16} />
              Back
            </Link>
          </Button>

          {publicShopUrl && (
            <Button
              asChild
              size="sm"
            >
              <Link
                href={publicShopUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} />
                Public Shop
              </Link>
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-slate-50 p-4">
            <p className="text-xs text-slate-500">
              Status
            </p>

            <p className="mt-1 font-semibold capitalize text-slate-900">
              {shop.status || "—"}
            </p>
          </div>

          <div className="rounded-lg border bg-slate-50 p-4">
            <p className="text-xs text-slate-500">
              Verification
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {shop.verification_status || "—"}
            </p>
          </div>

          <div className="rounded-lg border bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShoppingBag size={14} />
              Orders
            </div>

            <p className="mt-1 font-semibold text-slate-900">
              {ordersCount}
            </p>
          </div>

          <div className="rounded-lg border bg-slate-50 p-4">
            <p className="text-xs text-slate-500">
              Created
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
              {formatDate(shop.created_at)}
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-5 grid gap-4 border-t pt-5 sm:grid-cols-2">
          {shop.location && (
            <div className="flex items-start gap-2">
              <MapPin
                size={17}
                className="mt-0.5 shrink-0 text-slate-400"
              />

              <div>
                <p className="text-sm font-medium text-slate-900">
                  Location
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {shop.location}
                </p>
              </div>
            </div>
          )}

          {shop.phone && (
            <div className="flex items-start gap-2">
              <Phone
                size={17}
                className="mt-0.5 shrink-0 text-slate-400"
              />

              <div>
                <p className="text-sm font-medium text-slate-900">
                  Shop Phone
                </p>

                <a
                  href={`tel:${shop.phone}`}
                  className="mt-1 block text-sm text-blue-600 hover:underline"
                >
                  {shop.phone}
                </a>
              </div>
            </div>
          )}
        </div>

        {shop.description && (
          <div className="mt-5 border-t pt-5">
            <h2 className="font-semibold text-slate-900">
              Description
            </h2>

            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
              {shop.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}