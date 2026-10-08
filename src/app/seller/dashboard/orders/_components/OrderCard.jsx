"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusColor = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-indigo-100 text-indigo-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrderCard({ order }) {
  const router = useRouter();

  return (
    <div className="rounded-3xl border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold">
            #{order.order_number}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {order.addresses?.full_name}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {new Date(order.created_at).toLocaleDateString(
              "bn-BD"
            )}
          </p>
        </div>

        <Badge className={statusColor[order.status]}>
          {order.status}
        </Badge>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">
            Total
          </p>

          <p className="text-lg font-bold text-slate-900">
            ৳{Number(order.total_amount).toLocaleString()}
          </p>
        </div>

        <Button
          onClick={() =>
            router.push(
              `/seller/dashboard/orders/${order.id}`
            )
          }
        >
          View
        </Button>
      </div>
    </div>
  );
}