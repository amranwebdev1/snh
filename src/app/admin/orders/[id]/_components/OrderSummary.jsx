import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderSummary({ order }) {
  const subtotal = Number(order?.subtotal || 0);
  const deliveryFee = Number(order?.delivery_fee || 0);
  const discount = Number(order?.discount || 0);
  const total = Number(order?.total_amount || 0);

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Row
          label="Subtotal"
          value={subtotal}
        />

        <Row
          label="Delivery Fee"
          value={deliveryFee}
        />

        <Row
          label="Discount"
          value={discount}
          negative
        />

        <div className="border-t border-slate-200 pt-3">
          <div className="flex items-center justify-between gap-4">
            <span className="font-bold text-slate-900">
              Total
            </span>

            <span className="text-xl font-bold text-emerald-600">
              ৳{total.toLocaleString("en-BD")}
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">
              Payment Method
            </span>

            <span className="font-semibold uppercase text-slate-800">
              {order?.payment_method || "-"}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-slate-500">
              Payment Status
            </span>

            <span className="font-semibold capitalize text-slate-800">
              {order?.payment_status || "-"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({
  label,
  value,
  negative = false,
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-slate-500">
        {label}
      </span>

      <span
        className={
          negative
            ? "font-semibold text-red-600"
            : "font-semibold text-slate-800"
        }
      >
        {negative ? "-" : ""}৳
        {Number(value || 0).toLocaleString("en-BD")}
      </span>
    </div>
  );
}