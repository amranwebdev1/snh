"use client";

import { useRouter } from "next/navigation";
import { CircleCheckBig, ShoppingBag, Receipt } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SuccessContent({ orderIds }) {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-xl rounded-3xl border bg-white p-6 text-center shadow-sm">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <CircleCheckBig className="h-10 w-10 text-emerald-600" />
      </div>

      <h1 className="mt-5 text-2xl font-bold text-slate-900">
        অর্ডার সফল হয়েছে 🎉
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        আপনার {orderIds.length}টি দোকানের জন্য {orderIds.length}টি অর্ডার তৈরি হয়েছে।
      </p>

      <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-left">
        <h2 className="mb-3 flex items-center gap-2 font-semibold text-slate-800">
          <Receipt className="h-5 w-5" />
          তৈরি হওয়া Order
        </h2>

        <div className="space-y-2">
          {orderIds.map((id, index) => (
            <button
              key={id}
              onClick={() => router.push(`/orders/${id}`)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-3 text-left hover:border-emerald-300 hover:bg-emerald-50"
            >
              <div>
                <p className="text-sm font-medium">
                  Order {index + 1}
                </p>

                <p className="text-xs text-slate-500">
                  {id.slice(0, 8).toUpperCase()}...
                </p>
              </div>

              <span className="text-xs font-medium text-emerald-600">
                View
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Button
          className="h-12 w-full rounded-xl"
          onClick={() => router.push("/profile/my-orders")}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          My Orders
        </Button>

        <Button
          variant="outline"
          className="h-12 w-full rounded-xl"
          onClick={() => router.push("/")}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}