"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ExternalLink,
  MessageCircle,
  Phone,
  Store,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SellerDelayList({
  orders = [],
}) {
  if (!orders.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <Store className="mx-auto h-10 w-10 text-slate-300" />

        <p className="mt-3 font-semibold text-slate-600">
          বর্তমানে কোনো seller delay নেই।
        </p>

        <p className="mt-1 text-sm text-slate-400">
          সব processing order স্বাভাবিক সময়ের মধ্যে আছে।
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <SellerDelayCard
          key={order.id}
          order={order}
        />
      ))}
    </div>
  );
}

function SellerDelayCard({ order }) {
  const shop = order?.shops;
  const seller = shop?.profiles;

  const shopName =
    shop?.name || "Unknown Shop";

  const sellerName =
    seller?.name ||
    seller?.username ||
    "Seller";

  const sellerPhone = seller?.phone || "";

  const customerName =
    order?.profiles?.name ||
    order?.profiles?.username ||
    "Customer";

  const waitingText = getWaitingText(
    order.waitingMinutes
  );

  const whatsappUrl = sellerPhone
    ? `https://wa.me/${normalizePhone(
        sellerPhone
      )}?text=${encodeURIComponent(
        `আসসালামু আলাইকুম। আপনার shop-এর Order #${order.order_number} এখনো processing অবস্থায় আছে। অনুগ্রহ করে orderটি যত দ্রুত সম্ভব প্রস্তুত করে Pickup Request দিন। ধন্যবাদ।`
      )}`
    : null;

  return (
    <div className="rounded-2xl border border-red-200 bg-white p-4 shadow-sm">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-900">
                #{order.order_number}
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-semibold text-red-700">
                <AlertTriangle className="h-3.5 w-3.5" />
                Delayed
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              {waitingText}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-sm font-bold text-slate-800">
              ৳
              {Number(
                order.total_amount || 0
              ).toLocaleString("en-BD")}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {order.payment_method === "cod"
                ? "Cash on Delivery"
                : order.payment_method || "-"}
            </p>
          </div>
        </div>

        {/* Seller */}
        <div className="rounded-xl bg-red-50 p-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
              <Store className="h-5 w-5 text-red-600" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-red-600">
                Shop
              </p>

              <p className="font-bold text-slate-900">
                {shopName}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <User className="h-4 w-4 text-slate-400" />

                <span className="text-sm font-semibold text-slate-700">
                  {sellerName}
                </span>
              </div>

              {sellerPhone ? (
                <div className="mt-1 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-400" />

                  <span className="text-sm text-slate-600">
                    {sellerPhone}
                  </span>
                </div>
              ) : (
                <p className="mt-2 text-xs font-medium text-red-600">
                  Seller phone number পাওয়া যায়নি।
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Order information */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Info
            label="Customer"
            value={customerName}
          />

          <Info
            label="Processing Since"
            value={formatDate(order.updated_at)}
          />
        </div>

        {/* Actions */}
        <div className="border-t border-slate-100 pt-3">
          <div className="grid gap-2 sm:grid-cols-3">
            <Link
              href={`/admin/orders/${order.id}`}
              className="block"
            >
              <Button
                variant="outline"
                className="h-10 w-full rounded-xl"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Order দেখুন
              </Button>
            </Link>

            {sellerPhone ? (
              <a
                href={`tel:${sellerPhone}`}
                className="block"
              >
                <Button
                  type="button"
                  className="h-10 w-full rounded-xl bg-blue-600 hover:bg-blue-700"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Seller
                </Button>
              </a>
            ) : (
              <Button
                type="button"
                disabled
                className="h-10 w-full rounded-xl"
              >
                <Phone className="mr-2 h-4 w-4" />
                No Phone
              </Button>
            )}

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  type="button"
                  className="h-10 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Reminder
                </Button>
              </a>
            ) : (
              <Button
                type="button"
                disabled
                className="h-10 w-full rounded-xl"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                No Phone
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="min-w-0 rounded-xl bg-slate-50 p-3">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

function getWaitingText(minutes) {
  if (!Number.isFinite(minutes)) {
    return "সময় পাওয়া যায়নি";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours <= 0) {
    return `${minutes} মিনিট ধরে processing`;
  }

  if (remainingMinutes === 0) {
    return `${hours} ঘণ্টা ধরে processing`;
  }

  return `${hours} ঘণ্টা ${remainingMinutes} মিনিট ধরে processing`;
}

function formatDate(value) {
  if (!value) return "-";

  return new Date(value).toLocaleString(
    "bn-BD",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );
}

function normalizePhone(phone) {
  const value = String(phone || "").replace(
    /[\s()-]/g,
    ""
  );

  if (value.startsWith("+")) {
    return value.slice(1);
  }

  if (value.startsWith("880")) {
    return value;
  }

  if (value.startsWith("01")) {
    return `88${value}`;
  }

  return value;
}