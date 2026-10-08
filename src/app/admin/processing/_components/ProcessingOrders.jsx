import Link from "next/link";
import {
  Clock3,
  Store,
  User,
  ExternalLink,
  Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ProcessingOrders({
  orders = [],
}) {
  if (!orders.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <Package className="mx-auto h-10 w-10 text-slate-300" />

        <p className="mt-3 font-semibold text-slate-600">
          বর্তমানে কোনো processing order নেই।
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Seller নতুন order processing করলে এখানে দেখা যাবে।
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <ProcessingOrderCard
          key={order.id}
          order={order}
        />
      ))}
    </div>
  );
}

function ProcessingOrderCard({ order }) {
  const shopName =
    order?.shops?.name || "Unknown Shop";

  const customerName =
    order?.profiles?.name ||
    order?.profiles?.username ||
    "Customer";

  const updatedAt = order?.updated_at
    ? new Date(order.updated_at)
    : null;

  const diffMinutes = updatedAt
    ? Math.max(
        0,
        Math.floor(
          (Date.now() - updatedAt.getTime()) /
            60000
        )
      )
    : null;

  const isDelayed =
    diffMinutes !== null &&
    diffMinutes >= 120;

  const waitingText = getWaitingText(diffMinutes);

  return (
    <div
      className={`rounded-2xl border bg-white p-4 shadow-sm ${
        isDelayed
          ? "border-red-200"
          : "border-slate-200"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-900">
                #{order.order_number}
              </span>

              <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-[11px] font-semibold text-indigo-700">
                Processing
              </span>

              {isDelayed && (
                <span className="rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-semibold text-red-700">
                  দীর্ঘ সময়
                </span>
              )}
            </div>
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

        <div className="grid gap-2 sm:grid-cols-2">
          <Info
            icon={Store}
            value={shopName}
          />

          <Info
            icon={User}
            value={customerName}
          />

          <Info
            icon={Clock3}
            value={
              updatedAt
                ? updatedAt.toLocaleString("bn-BD")
                : "সময় পাওয়া যায়নি"
            }
          />

          <div
            className={`flex items-center gap-2 text-sm ${
              isDelayed
                ? "font-semibold text-red-600"
                : "text-slate-500"
            }`}
          >
            <Clock3 className="h-4 w-4 shrink-0" />

            <span>{waitingText}</span>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href={`/admin/orders/${order.id}`}
              className="flex-1"
            >
              <Button
                variant="outline"
                className="h-10 w-full rounded-xl"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Order দেখুন
              </Button>
            </Link>

            <div className="flex flex-1 items-center justify-center rounded-xl bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
              Seller product প্রস্তুত করছে
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  value,
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 text-sm text-slate-600">
      <Icon className="h-4 w-4 shrink-0 text-slate-400" />

      <span className="truncate">
        {value}
      </span>
    </div>
  );
}

function getWaitingText(diffMinutes) {
  if (diffMinutes === null) {
    return "সময় পাওয়া যায়নি";
  }

  if (diffMinutes < 1) {
    return "এইমাত্র";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} মিনিট ধরে`;
  }

  const hours = Math.floor(
    diffMinutes / 60
  );

  const minutes = diffMinutes % 60;

  if (!minutes) {
    return `${hours} ঘণ্টা ধরে`;
  }

  return `${hours} ঘণ্টা ${minutes} মিনিট ধরে`;
}