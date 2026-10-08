import { Card, CardContent } from "@/components/ui/card";

export default function PaymentInfo({ order }) {
  return (
    <Card className="rounded-3xl">
      <CardContent className="space-y-3 p-5">
        <h3 className="font-bold">Payment</h3>

        <div className="flex justify-between text-sm">
          <span>Method</span>
          <span>{order.payment_method}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Status</span>
          <span className="font-semibold capitalize">
            {order.payment_status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}