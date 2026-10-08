import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";

export default function ProductList({ items = [] }) {
  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardContent className="p-5">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-slate-700" />
            <h3 className="text-lg font-bold text-slate-900">
              Ordered Products
            </h3>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
            {items.length}টি
          </span>
        </div>

        {/* Products */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`flex gap-3 ${
                index !== items.length - 1
                  ? "border-b border-slate-100 pb-4"
                  : ""
              }`}
            >
              {/* Thumbnail */}
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                {item.product_image ? (
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Package className="h-8 w-8 text-slate-300" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <h4 className="line-clamp-2 font-semibold text-slate-900">
                    {item.product_name}
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    ৳{Number(item.price).toLocaleString()} × {item.quantity}
                  </span>

                  <span className="font-bold text-slate-900">
                    ৳{Number(item.subtotal).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="py-10 text-center text-slate-500">
            <Package className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <p>কোনো প্রোডাক্ট পাওয়া যায়নি।</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}