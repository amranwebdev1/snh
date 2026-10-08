"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { cancelOrder } from "@/lib/order/cancelOrder";
import { useRouter } from "next/navigation";
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Store, CalendarDays, Package } from "lucide-react";

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  processing: {
    label: "Processing",
    className: "bg-indigo-100 text-indigo-700 border-indigo-200",
  },
  shipped: {
    label: "Shipped",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
  delivered: {
    label: "Delivered",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700 border-red-200",
  },
};

const paymentConfig = {
  paid: {
    label: "Paid",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  unpaid: {
    label: "Unpaid",
    className: "bg-red-100 text-red-700 border-red-200",
  },
  pending: {
    label: "Pending Payment",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  refunded: {
    label: "Refunded",
    className: "bg-slate-100 text-slate-700 border-slate-200",
  },
  out_for_delivery: {
  label: "Out for Delivery",
  className: "bg-cyan-100 text-cyan-700 border-cyan-200",
},
};

export default function OrderCard({ order }) {
  const router = useRouter();
const [loading, setLoading] = useState(false);

  const status = statusConfig[order.status] || statusConfig.pending;
  const payment =
    paymentConfig[order.payment_status] || paymentConfig.pending;

  const items = order.order_items || [];
  const visibleItems = items.slice(0, 2);
  const remaining = items.length - 2;



const handleCancelOrder = async () => {
  const confirmed = window.confirm(
    "আপনি কি নিশ্চিত যে এই অর্ডারটি বাতিল করতে চান?"
  );

  if (!confirmed) return;

  try {
    setLoading(true);

    await toast.promise(cancelOrder(order.id), {
      loading: "অর্ডার বাতিল হচ্ছে...",
      success: "অর্ডার সফলভাবে বাতিল হয়েছে",
      error: (err) => err.message,
    });

    router.refresh();
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardContent>
        {/* Top */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1 text-slate-700">
              <Store className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {order.shops?.name || "Shop"}
              </span>
            </div>

            <p className="mt-1 text-sm font-bold text-slate-900">
              #{order.order_number}
            </p>

            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
              <CalendarDays className="h-3.5 w-3.5" />
              {new Date(order.created_at).toLocaleDateString("bn-BD")}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <Badge className={status.className}>{status.label}</Badge>

            <Badge variant="outline" className={payment.className}>
              {payment.label}
            </Badge>
          </div>
        </div>

        {/* Products */}
        <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3">
          <div className="flex items-center gap-2">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="h-14 w-14 overflow-hidden rounded-xl border bg-white"
              >
                <Image
                width={30}
                height={30}
                src={item?.product_image}
                alt={item?.product_name}
                className="h-full w-full object-cover"
                />
              </div>
            ))}

            {remaining > 0 && (
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border bg-white text-sm font-bold text-slate-700">
                +{remaining}
              </div>
            )}
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500">
              {items.length}টি পণ্য
            </p>

            <p className="text-lg font-bold text-slate-900">
              ৳{Number(order.total_amount).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex flex-wrap justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/orders/${order.id}`)}
          >
            View Details
          </Button>

          {["confirmed", "processing", "shipped"].includes(order.status) && (
            <Button size="sm">Track Order</Button>
          )}

          {order.status === "delivered" && (
            <Button size="sm">Buy Again</Button>
          )}

          {order.status === "pending" && (
            <Button
  variant="destructive"
  size="sm"
  onClick={handleCancelOrder}
  disabled={loading}
>
  {loading ? "Cancelling..." : "Cancel Order"}
</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}