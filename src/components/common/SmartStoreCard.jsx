"use client";

import Image from "next/image";
import {
  Star,
  MapPin,
  Bookmark,
  ShoppingBag,
  Store,
} from "lucide-react";

export default function StoreCard({
  shop,
  viewMode = "grid",
  isSaved = false,
  onBookmark,
  onClick,
  showRating = true,
  showBookmark = true,
  showOpenStatus = true,
}) {
  const handleClick = () => {
    onClick?.(shop);
  };

  const handleBookmark = (event) => {
    event.stopPropagation();

    onBookmark?.(
      shop.id,
      shop.name,
      event
    );
  };

  const hasLogo =
    typeof shop?.logo === "string" &&
    shop.logo.trim() !== "";


  const productCount =
    Number(shop?.total_products ?? 0);

  if (viewMode === "grid") {
    return (
      <div
        onClick={handleClick}
        className="group relative flex w-full shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all hover:border-slate-300 hover:shadow-md"
      >
        <div>
          {/* Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
            {hasLogo ? (
              <Image
                width={400}
                height={250}
                src={shop.logo}
                alt={shop.name || "Shop"}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Store className="h-10 w-10 text-slate-300" />
              </div>
            )}

            {showOpenStatus && (
              <p
                className={`absolute left-2 top-2 rounded-lg px-2 py-0.5 text-[10px] font-bold text-white shadow-xs ${
                  shop.openNow
                    ? "bg-emerald-600"
                    : "bg-rose-600"
                }`}
              >
                {shop.openNow
                  ? "খোলা আছে"
                  : "বন্ধ"}
              </p>
            )}

            {showBookmark && (
              <button
                type="button"
                onClick={handleBookmark}
                className={`absolute right-2 top-2 rounded-full p-1.5 backdrop-blur-md transition-all ${
                  isSaved
                    ? "bg-emerald-600 text-white"
                    : "bg-black/30 text-white hover:bg-black/50"
                }`}
                title={
                  isSaved
                    ? "সেভ করা আছে"
                    : "সেভ করুন"
                }
              >
                <Bookmark
                  className="h-3.5 w-3.5"
                  fill={
                    isSaved
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            )}
          </div>

          {/* Info */}
          <div className="p-2.5">
            <p className="truncate text-xs font-bold text-slate-900 transition group-hover:text-emerald-600 sm:text-sm">
              {shop?.name}
            </p>

            {showRating && (
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                <p className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
                  <Star
                    fill="currentColor"
                    className="h-3 w-3"
                  />
                  {shop?.rating ?? "0.0"}
                </p>

                {shop?.location && (
                  <p className="flex max-w-[120px] items-center gap-0.5 truncate text-[10px] font-medium text-gray-500">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span className="truncate">
                      {shop.location}
                    </span>
                  </p>
                )}
              </div>
            )}

            {!showRating && shop?.location && (
              <p className="mt-1 flex max-w-full items-center gap-0.5 truncate text-[10px] font-medium text-gray-500">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">
                  {shop.location}
                </span>
              </p>
            )}

            {shop?.description && (
              <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-slate-500">
                {shop.description}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-1 border-t border-slate-100/80 px-2.5 pb-2.5 pt-2 hidden">
          <span className="flex w-fit items-center gap-1 rounded-md border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
            <ShoppingBag className="h-3 w-3" />
            {productCount} টি পণ্য
          </span>
        </div>
      </div>
    );
  }

  /* ================================
     LIST VIEW
  ================================= */

  return (
    <div
      onClick={handleClick}
      className="group flex cursor-pointer items-center gap-3 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 transition-all hover:border-slate-300 hover:shadow-sm"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:w-28">
        {hasLogo ? (
          <Image
            width={250}
            height={160}
            src={shop.logo}
            alt={shop.name || "Shop"}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Store className="h-7 w-7 text-slate-300" />
          </div>
        )}

        {showOpenStatus && (
          <p
            className={`absolute left-1 top-1 rounded-md px-1.5 py-0.5 text-[9px] font-bold text-white ${
              shop.openNow
                ? "bg-emerald-600"
                : "bg-rose-600"
            }`}
          >
            {shop.openNow
              ? "খোলা"
              : "বন্ধ"}
          </p>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1 pr-1">
        <div className="flex items-center justify-between gap-1">
          <p className="truncate text-xs font-bold text-slate-900 transition group-hover:text-emerald-600 sm:text-sm">
            {shop?.name}
          </p>

          {showBookmark && (
            <button
              type="button"
              onClick={handleBookmark}
              className={`shrink-0 rounded-full p-1.5 transition-all ${
                isSaved
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              }`}
              title={
                isSaved
                  ? "সেভ করা আছে"
                  : "সেভ করুন"
              }
            >
              <Bookmark
                className="h-3.5 w-3.5"
                fill={
                  isSaved
                    ? "currentColor"
                    : "none"
                }
              />
            </button>
          )}
        </div>

        {showRating && (
          <p className="mt-1 flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
            <Star
              fill="currentColor"
              className="h-3 w-3"
            />
            {shop?.rating ?? "0.0"}
          </p>
        )}

        {shop?.location && (
          <p className="mt-1 flex max-w-full items-center gap-0.5 truncate text-[10px] font-medium text-gray-500">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">
              {shop.location}
            </span>
          </p>
        )}

        {shop?.description && (
          <p className="mt-1 line-clamp-1 text-[10px] text-slate-500">
            {shop.description}
          </p>
        )}

        <div className="mt-1.5 hidden">
          <span className="inline-flex items-center gap-1 rounded-md border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
            <ShoppingBag className="h-3 w-3" />
            {productCount} টি পণ্য
          </span>
        </div>
      </div>
    </div>
  );
}