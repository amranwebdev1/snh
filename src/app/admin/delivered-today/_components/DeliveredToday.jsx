import Link from "next/link";

import {
  Bike,
  CircleCheckBig,
  ExternalLink,
  Store,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DeliveredToday({
  orders = [],
}) {
  if (!orders.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <CircleCheckBig className="mx-auto h-10 w-10 text-slate-300" />

        <p className="mt-3 font-semibold text-slate-600">
          আজ এখনো কোনো order delivered হয়নি।
        </p>

        <p className="mt-1 text-sm text-slate-400">
          কোনো order সফলভাবে delivery হলে এখানে দেখা যাবে।
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <DeliveredOrderCard
          key={order.id}
          order={order}
        />
      ))}
    </div>
  );
}

function DeliveredOrderCard({ order }) {
  const shopName =
    order?.shops?.name || "Unknown Shop";

  const customerName =
    order?.profiles?.name ||
    order?.profiles?.username ||
    "Customer";

  const deliveredAt = order?.delivered_at
    ? new Date(order.delivered_at)
    : null;

  const riderName =
    order?.rider_name || "Admin";

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-900">
                #{order.order_number}
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                <CircleCheckBig className="h-3.5 w-3.5" />
                Delivered
              </span>
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

        {/* Information */}
        <div className="grid gap-3 sm:grid-cols-2">
          <Info
            icon={Store}
            label="Shop"
            value={shopName}
          />

          <Info
            icon={User}
            label="Customer"
            value={customerName}
          />

          <Info
            icon={Bike}
            label="Delivery Person"
            value={riderName}
          />

          <Info
            icon={CircleCheckBig}
            label="Delivered At"
            value={
              deliveredAt
                ? deliveredAt.toLocaleString("bn-BD")
                : "সময় পাওয়া যায়নি"
            }
          />
        </div>

        {/* Actions */}
        <div className="border-t border-slate-100 pt-3">
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
        </div>
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
        <Icon className="h-4 w-4 text-slate-500" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}