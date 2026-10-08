"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RecentOrders({ orders }) {
  const router = useRouter();

  return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">
          সাম্প্রতিক অর্ডার
        </h3>

        <button
          onClick={() =>
            router.push("/seller/dashboard/orders")
          }
          className="text-sm font-medium text-blue-600"
        >
          সব দেখুন
        </button>
      </div>

      <div className="space-y-3">
        {orders.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500">
            এখনো কোনো অর্ডার নেই।
          </p>
        ) : (
          orders.map((order) => (
            <button
              key={order.id}
              onClick={() =>
                router.push(
                  `/seller/dashboard/orders/${order.id}`
                )
              }
              className="flex w-full items-center justify-between rounded-2xl border p-3 transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-slate-100">
                  {order.order_items?.[0]?.product_image && (
                    <Image
                      fill
                      src={order.order_items[0].product_image}
                      alt=""
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="text-left">
                  <p className="font-semibold">
                    {order.addresses?.full_name}
                  </p>

                  <p className="text-xs text-slate-500">
                    #{order.order_number}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold">
                  ৳{Number(order.total_amount).toLocaleString()}
                </p>

                <p className="text-xs capitalize text-slate-500">
                  {order.status}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}