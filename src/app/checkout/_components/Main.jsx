"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import ShippingAddress from "./ShippingAddress";
import PaymentSelection from "./PaymentSelection";
import OrderSummary from "./OrderSummary";

import { placeOrder } from "@/lib/order/placeOrder";
import { validateCoupon } from "@/lib/coupon/validateCoupon";

export default function Main({
  cartItems,
  subtotal,
  deliveryFee,
  total,
  addresses: initialAddresses = [],
  isBuyNow = false,
}) {
  const router = useRouter();

  const [addresses, setAddresses] =
    useState(initialAddresses);
  const [currentDeliveryFee, setCurrentDeliveryFee] =
  useState(Number(deliveryFee || 0));
  
  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [selectedAddressId, setSelectedAddressId] =
    useState(
      initialAddresses.find(
        (address) => address.is_default
      )?.id ||
        initialAddresses[0]?.id ||
        null
    );

  const [customerNote, setCustomerNote] =
    useState("");

  const [placingOrder, setPlacingOrder] =
    useState(false);

  /*
   * --------------------------------
   * Coupon state
   * --------------------------------
   */

  const [couponCode, setCouponCode] =
    useState("");

  const [appliedCoupon, setAppliedCoupon] =
    useState(null);

  const [couponLoading, setCouponLoading] =
    useState(false);

  const [couponError, setCouponError] =
    useState("");

  /*
   * --------------------------------
   * Apply Coupon
   * --------------------------------
   */

  const handleApplyCoupon = async () => {
    if (couponLoading) {
      return;
    }

    const code = couponCode.trim();

    if (!code) {
      setCouponError(
        "Coupon code দিন।"
      );

      return;
    }

    if (
      !Number.isFinite(
        Number(subtotal)
      ) ||
      Number(subtotal) < 0
    ) {
      setCouponError(
        "Order amount সঠিক নয়।"
      );

      return;
    }

    try {
      setCouponLoading(true);
      setCouponError("");

      const result =
        await validateCoupon({
          code,
          subtotal:
            Number(subtotal),
        });

      if (!result?.success) {
        setAppliedCoupon(null);

        setCouponError(
          result?.message ||
            "Coupon apply করা যায়নি।"
        );

        return;
      }

      setAppliedCoupon(result);

      setCouponCode(
        result.coupon.code
      );

      toast.success(
        "Coupon সফলভাবে apply হয়েছে"
      );
    } catch (error) {
      console.error(
        "Apply Coupon Error:",
        error
      );

      setAppliedCoupon(null);

      setCouponError(
        error?.message ||
          "Coupon apply করা যায়নি।"
      );
    } finally {
      setCouponLoading(false);
    }
  };

  /*
   * --------------------------------
   * Remove Coupon
   * --------------------------------
   */

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  /*
   * --------------------------------
   * Coupon discount
   * --------------------------------
   */

  const couponDiscount =
    Number(
      appliedCoupon?.discountAmount ||
        0
    );

  const safeSubtotal =
    Number(subtotal || 0);

  const safeDeliveryFee =
  Number(currentDeliveryFee || 0);

  const safeCouponDiscount =
    Math.min(
      Math.max(couponDiscount, 0),
      safeSubtotal
    );

  /*
   * এই total শুধু UI display-এর জন্য।
   *
   * আসল total server-side placeOrder()
   * আবার calculate করবে।
   */

  const finalTotal = Math.max(
    0,
    safeSubtotal +
      safeDeliveryFee -
      safeCouponDiscount
  );

  /*
   * --------------------------------
   * Place Order
   * --------------------------------
   */

  const handlePlaceOrder = async () => {
    if (placingOrder) {
      return;
    }

    if (!selectedAddressId) {
      toast.error(
        "একটি ঠিকানা নির্বাচন করুন"
      );

      return;
    }

    if (!cartItems?.length) {
      toast.error("কার্ট খালি");

      return;
    }

    try {
      setPlacingOrder(true);

      const orders =
        await placeOrder({
          addressId:
            selectedAddressId,

          paymentMethod,

          cartItems,

          customerNote,

          isBuyNow,

          couponCode:
            appliedCoupon
              ?.coupon
              ?.code || null,
        });

      if (
        !orders ||
        orders.length === 0
      ) {
        throw new Error(
          "Order তৈরি করা যায়নি।"
        );
      }

      toast.success(
        `${orders.length}টি অর্ডার সফল হয়েছে`
      );

      const ids = orders
        .map(
          (order) => order.id
        )
        .filter(Boolean)
        .join(",");

      router.replace(
        `/orders/success?ids=${ids}`
      );
    } catch (error) {
      console.error(
        "Place Order Error:",
        error
      );

      toast.error(
        error?.message ||
          "অর্ডার করা যায়নি।"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">

      {/* =========================
          Left side
      ========================== */}

      <div className="space-y-5 lg:col-span-2">

       <ShippingAddress
  addresses={addresses}
  setAddresses={setAddresses}
  selectedAddressId={
    selectedAddressId
  }
  setSelectedAddressId={
    setSelectedAddressId
  }
  customerNote={
    customerNote
  }
  setCustomerNote={
    setCustomerNote
  }
  onDeliveryFeeChange={
    setCurrentDeliveryFee
  }
/>

        <PaymentSelection
          paymentMethod={
            paymentMethod
          }
          setPaymentMethod={
            setPaymentMethod
          }
        />

      </div>

      {/* =========================
          Right side
      ========================== */}

      <div className="h-fit lg:sticky lg:top-24">

        <OrderSummary
  cartItems={cartItems}
  subtotal={safeSubtotal}
  deliveryFee={
    currentDeliveryFee
  }
  total={finalTotal}

  couponCode={couponCode}
  setCouponCode={setCouponCode}
  appliedCoupon={appliedCoupon}
  couponError={couponError}
  couponLoading={couponLoading}
  onApplyCoupon={handleApplyCoupon}
  onRemoveCoupon={handleRemoveCoupon}
  paymentMethod={paymentMethod}
  onPlaceOrder={handlePlaceOrder}
  loading={placingOrder}
/>

      </div>

    </div>
  );
}