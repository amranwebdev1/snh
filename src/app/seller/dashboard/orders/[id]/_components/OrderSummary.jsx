import { Card, CardContent } from "@/components/ui/card";

export default function OrderSummary({ order }) {
  return (
    <Card className="rounded-3xl">
      <CardContent className="space-y-3 p-5">
        <h3 className="font-bold">Order Summary</h3>

        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>৳{Number(order.subtotal).toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Delivery</span>
          <span>৳{Number(order.delivery_fee).toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Discount</span>
          <span>-৳{Number(order.discount).toLocaleString()}</span>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>৳{Number(order.total_amount).toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}