import { Store, CalendarDays, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
};

export default function OrderHeader({ order }) {
  const status = statusConfig[order.status] || statusConfig.pending;
  const payment =
    paymentConfig[order.payment_status] || paymentConfig.pending;

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardContent className="p-5">
        {/* Shop */}
        <div className="flex items-center gap-2 text-slate-700">
          <Store className="h-5 w-5" />
          <span className="font-semibold text-slate-900">
            {order.shops?.name || "Shop"}
          </span>
        </div>

        {/* Order Number */}
        <div className="mt-4 flex items-center gap-2">
          <Receipt className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-semibold text-slate-900">
            #{order.order_number}
          </span>
        </div>

        {/* Date */}
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays className="h-4 w-4" />
          {new Date(order.created_at).toLocaleDateString("bn-BD", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        {/* Status */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge className={status.className}>{status.label}</Badge>

          <Badge variant="outline" className={payment.className}>
            {payment.label}
          </Badge>
        </div>

        {/* Total */}
        <div className="mt-5 border-t border-slate-200 pt-4">
          <p className="text-sm text-slate-500">মোট পরিশোধযোগ্য</p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            ৳{Number(order.total_amount).toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}