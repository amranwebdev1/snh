"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

const statusConfig = {
  pending: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-700",
  },

  confirmed: {
    label: "Confirmed",
    className:
      "bg-blue-100 text-blue-700",
  },

  processing: {
    label: "Processing",
    className:
      "bg-indigo-100 text-indigo-700",
  },

  pickup_requested: {
    label: "Pickup Request",
    className:
      "bg-orange-100 text-orange-700",
  },

  shipped: {
    label: "Picked Up",
    className:
      "bg-purple-100 text-purple-700",
  },

  out_for_delivery: {
    label: "Out for Delivery",
    className:
      "bg-cyan-100 text-cyan-700",
  },

  delivered: {
    label: "Delivered",
    className:
      "bg-emerald-100 text-emerald-700",
  },

  cancelled: {
    label: "Cancelled",
    className:
      "bg-red-100 text-red-700",
  },
};

export default function OrdersTable({
  orders = [],
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
              <th className="px-4 py-3">
                Order
              </th>

              <th className="px-4 py-3">
                Customer
              </th>

              <th className="px-4 py-3">
                Shop
              </th>

              <th className="px-4 py-3">
                Amount
              </th>

              <th className="px-4 py-3">
                Payment
              </th>

              <th className="px-4 py-3">
                Status
              </th>

              <th className="px-4 py-3">
                Date
              </th>

              <th className="px-4 py-3 text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <DesktopRow
                key={order.id}
                order={order}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="divide-y divide-slate-100 md:hidden">
        {orders.map((order) => (
          <MobileRow
            key={order.id}
            order={order}
          />
        ))}
      </div>
    </div>
  );
}

function DesktopRow({ order }) {
  const status =
    statusConfig[order.status] ||
    {
      label: order.status,
      className:
        "bg-slate-100 text-slate-600",
    };

  const customer =
    order.profiles?.name ||
    order.profiles?.username ||
    "Customer";

  const shop =
    order.shops?.name ||
    "Unknown Shop";

  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="px-4 py-4">
        <p className="font-bold text-slate-900">
          #{order.order_number}
        </p>
      </td>

      <td className="px-4 py-4">
        <p className="max-w-[160px] truncate text-sm font-medium text-slate-700">
          {customer}
        </p>
      </td>

      <td className="px-4 py-4">
        <p className="max-w-[160px] truncate text-sm text-slate-600">
          {shop}
        </p>
      </td>

      <td className="px-4 py-4">
        <p className="font-bold text-slate-900">
          ৳
          {Number(
            order.total_amount || 0
          ).toLocaleString("en-BD")}
        </p>
      </td>

      <td className="px-4 py-4">
        <p className="text-xs font-semibold uppercase text-slate-600">
          {order.payment_method}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {order.payment_status}
        </p>
      </td>

      <td className="px-4 py-4">
        <StatusBadge status={status} />
      </td>

      <td className="px-4 py-4">
        <p className="text-xs text-slate-500">
          {formatDate(order.created_at)}
        </p>
      </td>

      <td className="px-4 py-4 text-right">
        <Link
          href={`/admin/orders/${order.id}`}
        >
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg"
          >
            <Eye className="mr-1.5 h-4 w-4" />
            View
          </Button>
        </Link>
      </td>
    </tr>
  );
}

function MobileRow({ order }) {
  const status =
    statusConfig[order.status] ||
    {
      label: order.status,
      className:
        "bg-slate-100 text-slate-600",
    };

  const customer =
    order.profiles?.name ||
    order.profiles?.username ||
    "Customer";

  const shop =
    order.shops?.name ||
    "Unknown Shop";

  return (
    <div className="space-y-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-bold text-slate-900">
            #{order.order_number}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {formatDate(order.created_at)}
          </p>
        </div>

        <StatusBadge status={status} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <Info
          label="Customer"
          value={customer}
        />

        <Info
          label="Shop"
          value={shop}
        />

        <Info
          label="Amount"
          value={`৳${Number(
            order.total_amount || 0
          ).toLocaleString("en-BD")}`}
        />

        <Info
          label="Payment"
          value={`${order.payment_method} / ${order.payment_status}`}
        />
      </div>

      <Link
        href={`/admin/orders/${order.id}`}
        className="block"
      >
        <Button
          variant="outline"
          className="h-10 w-full rounded-xl"
        >
          <Eye className="mr-2 h-4 w-4" />
          Order দেখুন
        </Button>
      </Link>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.className}`}
    >
      {status.label}
    </span>
  );
}

function Info({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-0.5 truncate font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
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