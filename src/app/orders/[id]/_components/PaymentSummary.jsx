import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, CreditCard, Truck } from "lucide-react";

export default function PaymentSummary({ order }) {
  const subtotal = Number(order.subtotal || 0);
  const deliveryFee = Number(order.delivery_fee || 0);
  const discount = Number(order.discount || 0);
  const total = Number(order.total_amount || 0);

  let paymentLabel = "Cash On Delivery";
  let paymentIcon = Truck;

  if (order.payment_method === "partial") {
    paymentLabel = "Partial Advance";
    paymentIcon = Wallet;
  }

  if (order.payment_method === "full_online") {
    paymentLabel = "Online Payment";
    paymentIcon = CreditCard;
  }

  const PaymentIcon = paymentIcon;

  const nowPayable =
    order.payment_method === "cod"
      ? 0
      : order.payment_method === "partial"
      ? deliveryFee
      : total;

  const remainingPayable =
    order.payment_method === "cod"
      ? total
      : order.payment_method === "partial"
      ? total - deliveryFee
      : 0;

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardContent className="p-5">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-slate-700" />
            <h3 className="text-lg font-bold text-slate-900">
              Payment Summary
            </h3>
          </div>

          <Badge variant="outline" className="gap-1">
            <PaymentIcon className="h-3.5 w-3.5" />
            {paymentLabel}
          </Badge>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Subtotal</span>
            <span className="font-medium">
              ৳{subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Delivery Fee</span>
            <span className="font-medium">
              ৳{deliveryFee.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Discount</span>
            <span className="font-medium text-emerald-600">
              -৳{discount.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="my-4 border-t border-slate-200" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-slate-900">
            Total Amount
          </span>

          <span className="text-xl font-bold text-slate-900">
            ৳{total.toLocaleString()}
          </span>
        </div>

        {/* Payment Breakdown */}
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-emerald-700">
              এখন পরিশোধ
            </span>

            <span className="font-bold text-emerald-700">
              ৳{nowPayable.toLocaleString()}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-slate-500">
              পরে পরিশোধ
            </span>

            <span className="font-semibold text-slate-700">
              ৳{remainingPayable.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Payment Status */}
        <div className="mt-5 border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Payment Status
            </span>

            <Badge
              className={
                order.payment_status === "paid"
                  ? "bg-emerald-100 text-emerald-700"
                  : order.payment_status === "pending"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
              }
            >
              {order.payment_status === "paid"
                ? "Paid"
                : order.payment_status === "pending"
                ? "Pending"
                : "Unpaid"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}