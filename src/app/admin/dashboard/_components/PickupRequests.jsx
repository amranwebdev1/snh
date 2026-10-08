"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Clock3,
  Store,
  User,
  ExternalLink,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { updateAdminOrderStatus } from "@/lib/admin/updateAdminOrderStatus";

export default function PickupRequests({
  requests = [],
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Pickup Requests
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Seller যেসব order pickup-এর জন্য ready করেছে।
          </p>
        </div>

        <div className="flex h-9 min-w-9 items-center justify-center rounded-full bg-orange-100 px-3 text-sm font-bold text-orange-700">
          {requests.length}
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <Truck className="mx-auto h-10 w-10 text-slate-300" />

          <p className="mt-3 text-sm font-semibold text-slate-600">
            এখন কোনো pickup request নেই।
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Seller product ready করলে এখানে request দেখা যাবে।
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((order) => (
            <PickupRequestCard
              key={order.id}
              order={order}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function PickupRequestCard({ order }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const shopName =
    order.shops?.name || "Unknown Shop";

  const customerName =
    order.profiles?.name ||
    order.profiles?.username ||
    "Customer";

  const requestedAt = order.pickup_requested_at
    ? new Date(order.pickup_requested_at)
    : null;

  const diffMinutes = requestedAt
    ? Math.max(
        0,
        Math.floor(
          (Date.now() - requestedAt.getTime()) /
            60000
        )
      )
    : null;

  const isDelayed =
    diffMinutes !== null &&
    diffMinutes >= 60;

  let waitingText = "এইমাত্র";

  if (diffMinutes !== null) {
    if (diffMinutes < 1) {
      waitingText = "এইমাত্র";
    } else if (diffMinutes < 60) {
      waitingText = `${diffMinutes} মিনিট আগে`;
    } else {
      const hours = Math.floor(
        diffMinutes / 60
      );

      const minutes = diffMinutes % 60;

      waitingText = minutes
        ? `${hours} ঘণ্টা ${minutes} মিনিট আগে`
        : `${hours} ঘণ্টা আগে`;
    }
  }

  const handlePickup = async () => {
    try {
      setLoading(true);

      await toast.promise(
        updateAdminOrderStatus(
          order.id,
          "shipped"
        ),
        {
          loading: "Pickup হিসেবে Mark করা হচ্ছে...",
          success:
            "Order সফলভাবে Picked Up হিসেবে Mark হয়েছে।",
          error: (error) =>
            error?.message ||
            "Order update করা যায়নি।",
        }
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Mark Pickup Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`rounded-2xl border bg-white p-4 shadow-sm ${
        isDelayed
          ? "border-red-200"
          : "border-slate-200"
      }`}
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-900">
                #{order.order_number}
              </span>

              <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-semibold text-orange-700">
                Pickup Requested
              </span>

              {isDelayed && (
                <span className="rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-semibold text-red-700">
                  Delay
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
                : order.payment_method}
            </p>
          </div>
        </div>

        {/* Information */}
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
              requestedAt
                ? requestedAt.toLocaleString(
                    "bn-BD"
                  )
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

        {/* Actions */}
        <div className="flex flex-col gap-2 border-t border-slate-100 pt-3 sm:flex-row">
          <Link
            href={`/admin/orders/${order.id}`}
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ExternalLink className="h-4 w-4" />
            Order দেখুন
          </Link>

          <Button
            type="button"
            disabled={loading}
            onClick={handlePickup}
            className="h-10 flex-1 rounded-xl bg-orange-600 text-sm font-semibold hover:bg-orange-700"
          >
            <Truck className="mr-2 h-4 w-4" />

            {loading
              ? "Updating..."
              : "Mark Picked Up"}
          </Button>
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