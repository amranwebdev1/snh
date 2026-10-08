import { Card, CardContent } from "@/components/ui/card";

export default function OrderItems({ order }) {
  return (
    <Card className="rounded-3xl">
      <CardContent className="space-y-4 p-5">
        <h3 className="font-bold">Ordered Products</h3>

        {order.order_items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 border-b pb-3 last:border-b-0"
          >
            <img
              src={item.product_image}
              alt={item.product_name}
              className="h-16 w-16 rounded-xl object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 font-semibold">
                {item.product_name}
              </p>

              <p className="text-sm text-slate-500">
                Qty: {item.quantity}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">
                ৳{Number(item.subtotal).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}