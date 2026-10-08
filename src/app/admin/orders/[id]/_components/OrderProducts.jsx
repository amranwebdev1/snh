import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OrderProducts({
  items = [],
}) {
  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">
          Products
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!items.length ? (
          <div className="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">
            কোনো product পাওয়া যায়নি।
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <ProductRow
                key={item.id}
                item={item}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ProductRow({ item }) {
  const quantity = Number(item?.quantity || 0);
  const price = Number(item?.price || 0);
  const subtotal = Number(item?.subtotal || 0);

  return (
    <div className="flex gap-3 rounded-2xl border border-slate-100 p-3">
      {item?.product_image ? (
        <img
          src={item.product_image}
          alt={item?.product_name || "Product"}
          className="h-16 w-16 shrink-0 rounded-xl object-cover"
        />
      ) : (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-400">
          No Image
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-semibold text-slate-900">
          {item?.product_name || "Product"}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          ৳{price.toLocaleString("en-BD")} ×{" "}
          {quantity}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-sm font-bold text-slate-900">
          ৳{subtotal.toLocaleString("en-BD")}
        </p>
      </div>
    </div>
  );
}