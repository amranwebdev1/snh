"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { BadgePercent, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CartSummary({
  cartItems = [],
  subtotal = 0,
  deliveryFee = 0,
  deliveryZoneName = null,
}) {
  const router = useRouter();

  // ---------------------------------------
  // Original price total
  // ---------------------------------------

  const originalSubtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = Number(
        item?.product?.price || 0
      );

      const quantity = Number(
        item?.quantity || 0
      );

      return sum + price * quantity;
    }, 0);
  }, [cartItems]);

  // ---------------------------------------
  // Discount
  // ---------------------------------------

  const discount = Math.max(
    0,
    originalSubtotal - subtotal
  );

  // ---------------------------------------
  // Delivery
  // ---------------------------------------


const safeDeliveryFee = Number(
  deliveryFee || 0
);
  // ---------------------------------------
  // Final Total
  // ---------------------------------------

  const total =
    subtotal +
    safeDeliveryFee;

  return (
    <div
      id="cart-summary"
      className="rounded-3xl border bg-white p-5 shadow-sm"
    >
      <h2 className="text-lg font-bold">
        Order Summary
      </h2>

      <div className="mt-5 space-y-3 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-slate-600">
            Subtotal
          </span>

          <span className="font-medium">
            ৳{originalSubtotal.toLocaleString()}
          </span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center gap-2">
              <BadgePercent className="h-4 w-4" />
              Discount
            </span>

            <span>
              -৳{discount.toLocaleString()}
            </span>
          </div>
        )}

        {/* After Discount */}
        <div className="flex justify-between">
          <span className="text-slate-600">
            Product Total
          </span>

          <span className="font-medium">
            ৳{subtotal.toLocaleString()}
          </span>
        </div>

        {/* Delivery */}
        <div className="flex justify-between">
  <span className="flex items-center gap-2 text-slate-600">
    <Truck className="h-4 w-4" />
    Delivery
  </span>

  <span>
    {deliveryZoneName ? (
      `৳${safeDeliveryFee.toLocaleString()}`
    ) : (
      <span className="text-xs text-slate-500">
        ঠিকানা নির্বাচন করুন
      </span>
    )}
  </span>
</div>

        {/* Total */}
        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>

            <span className="text-emerald-600">
              ৳{total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Coupon */}
      <div className="mt-5 flex gap-2 hidden">
        <Input placeholder="Coupon code" />

        <Button
          variant="outline"
          size="icon"
        >
          <BadgePercent className="h-4 w-4" />
        </Button>
      </div>

      {/* Checkout */}
      <Button
        onClick={() => router.push("/checkout")}
        className="mt-5 h-12 w-full rounded-xl text-base"
      >
        Proceed to Checkout
      </Button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Secure payment & fast delivery
      </p>
    </div>
  );
}