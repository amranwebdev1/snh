"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Lock,
  Package,
  ChevronDown,
  ChevronUp,
  Ticket,
  X,
  RefreshCw,
  Check,
} from "lucide-react";

export default function OrderSummary({
  cartItems = [],
  subtotal = 0,
  deliveryFee = 0,
  total = 0,

  couponCode = "",
  setCouponCode,
  appliedCoupon = null,
  couponError = "",
  couponLoading = false,
  onApplyCoupon,
  onRemoveCoupon,

  paymentMethod,
  onPlaceOrder,
  loading = false,
}) {
  const [showAllProducts, setShowAllProducts] =
    useState(false);

  /*
   * --------------------------------
   * Safe values
   * --------------------------------
   */

  const safeSubtotal = Number(subtotal || 0);

  const safeDeliveryFee = Number(
    deliveryFee || 0
  );

  /*
   * --------------------------------
   * Product price helper
   * --------------------------------
   */

  const getProductPrice = (product) => {
    const price = Number(
      product?.price || 0
    );

    const discountPrice = Number(
      product?.discount_price || 0
    );

    const hasDiscount =
      discountPrice > 0 &&
      discountPrice < price;

    const finalPrice = hasDiscount
      ? discountPrice
      : price;

    const discountPercent =
      hasDiscount && price > 0
        ? Math.round(
            ((price - discountPrice) /
              price) *
              100
          )
        : 0;

    return {
      originalPrice: price,
      finalPrice,
      hasDiscount,
      discountPercent,
    };
  };

  /*
   * --------------------------------
   * Coupon discount
   * --------------------------------
   */

  const activeDiscount = Number(
    appliedCoupon?.discountAmount || 0
  );

  /*
   * Coupon discount কখনো subtotal-এর
   * বেশি হতে পারবে না
   */

  const safeDiscount = Math.min(
    Math.max(activeDiscount, 0),
    safeSubtotal
  );

  /*
   * --------------------------------
   * Final total
   * --------------------------------
   *
   * এখানে total Main.jsx থেকে আসছে।
   *
   * Coupon apply হওয়ার পরে Main.jsx
   * finalTotal calculate করে পাঠাচ্ছে।
   *
   * নিরাপত্তার জন্য আমরা এখানে
   * আবার total হিসাব করছি।
   */

  const calculatedTotal = Math.max(
    0,
    safeSubtotal +
      safeDeliveryFee -
      safeDiscount
  );

  /*
   * Main.jsx-এর total থাকলে সেটি ব্যবহার
   * করব, না থাকলে calculatedTotal।
   */

  const totalAmount = Number.isFinite(
    Number(total)
  )
    ? Math.max(0, Number(total))
    : calculatedTotal;

  /*
   * --------------------------------
   * Payment calculation
   * --------------------------------
   */

  const nowPayable =
    paymentMethod === "cod"
      ? 0
      : paymentMethod === "partial"
      ? safeDeliveryFee
      : totalAmount;

  const remainingPayable =
    paymentMethod === "cod"
      ? totalAmount
      : paymentMethod === "partial"
      ? Math.max(
          0,
          totalAmount -
            safeDeliveryFee
        )
      : 0;

  /*
   * --------------------------------
   * Visible products
   * --------------------------------
   */

  const visibleProducts =
    showAllProducts
      ? cartItems
      : cartItems.slice(0, 3);

  /*
   * --------------------------------
   * Apply button
   * --------------------------------
   */

  const handleApplyCoupon = (event) => {
    event?.preventDefault();

    if (!onApplyCoupon) {
      return;
    }

    onApplyCoupon();
  };

  /*
   * --------------------------------
   * Coupon code change
   * --------------------------------
   */

  const handleCouponChange = (event) => {
    const value =
      event.target.value.toUpperCase();

    setCouponCode?.(value);
  };

  /*
   * --------------------------------
   * Enter key
   * --------------------------------
   */

  const handleCouponKeyDown = (event) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    handleApplyCoupon(event);
  };

  /*
   * --------------------------------
   * Button text
   * --------------------------------
   */

  const buttonText =
    paymentMethod === "cod"
      ? "ক্যাশ অন ডেলিভারি অর্ডার করুন"
      : paymentMethod === "partial"
      ? `৳${nowPayable.toLocaleString()} অগ্রিম পরিশোধ করুন`
      : `৳${nowPayable.toLocaleString()} অনলাইনে পরিশোধ করুন`;

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      {/* =========================
          Header
      ========================== */}

      <div className="mb-5 border-b border-slate-200 pb-3">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          অর্ডার সারসংক্ষেপ
        </h2>
      </div>

      {/* =========================
          Product List
      ========================== */}

      <div className="mb-5 space-y-3">
        {visibleProducts.map((item) => {
          const {
            originalPrice,
            finalPrice,
            hasDiscount,
            discountPercent,
          } = getProductPrice(
            item?.product
          );

          const quantity = Number(
            item?.quantity || 0
          );

          const itemSubtotal =
            finalPrice * quantity;

          return (
            <div
              key={item?.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
            >
              {/* Product info */}

              <div className="flex min-w-0 items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  {item?.product?.thumbnail ? (
                    <Image
                      src={
                        item.product
                          .thumbnail
                      }
                      alt={
                        item?.product
                          ?.name ||
                        "Product"
                      }
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Package className="h-6 w-6 text-slate-300" />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-slate-900">
                    {item?.product?.name ||
                      "Product"}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs">
                    <span className="text-slate-500">
                      {quantity} ×
                    </span>

                    <span className="font-semibold text-emerald-600">
                      ৳
                      {finalPrice.toLocaleString()}
                    </span>

                    {hasDiscount && (
                      <>
                        <span className="text-slate-400 line-through">
                          ৳
                          {originalPrice.toLocaleString()}
                        </span>

                        <span className="rounded bg-red-50 px-1 py-0.5 text-[9px] font-bold text-red-500">
                          -{discountPercent}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Item total */}

              <span className="shrink-0 text-sm font-bold text-emerald-600">
                ৳
                {itemSubtotal.toLocaleString()}
              </span>
            </div>
          );
        })}

        {/* Empty products */}

        {cartItems.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center">
            <Package className="mx-auto h-8 w-8 text-slate-300" />

            <p className="mt-2 text-sm text-slate-500">
              কোনো পণ্য নেই
            </p>
          </div>
        )}

        {/* Show more */}

        {cartItems.length > 3 && (
          <button
            type="button"
            onClick={() =>
              setShowAllProducts(
                (prev) => !prev
              )
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
          >
            {showAllProducts ? (
              <>
                <ChevronUp className="h-4 w-4" />

                কম দেখুন
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />

                আরও{" "}
                {cartItems.length - 3}টি পণ্য
                দেখুন
              </>
            )}
          </button>
        )}
      </div>

      {/* =========================
          Coupon
      ========================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4">

        <div className="mb-3 flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
            <Ticket className="h-4 w-4 text-emerald-600" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Coupon Code
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Coupon ব্যবহার করে
              discount নিন।
            </p>
          </div>
        </div>

        {/* Applied coupon */}

        {appliedCoupon ? (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-bold text-emerald-700">
                  {
                    appliedCoupon
                      ?.coupon
                      ?.code
                  }
                </span>

                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-3 w-3" />
                </span>
              </div>

              <p className="mt-1 text-xs text-emerald-600">
                ৳
                {Number(
                  appliedCoupon?.discountAmount ||
                    0
                ).toLocaleString()}{" "}
                discount পাওয়া গেছে
              </p>
            </div>

            <button
              type="button"
              onClick={
                onRemoveCoupon
              }
              className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-bold text-red-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <X className="h-3.5 w-3.5" />

              Remove
            </button>
          </div>
        ) : (
          <form
            onSubmit={
              handleApplyCoupon
            }
          >
            <div className="flex gap-2">

              <input
                type="text"
                value={couponCode}
                onChange={
                  handleCouponChange
                }
                onKeyDown={
                  handleCouponKeyDown
                }
                placeholder="যেমন SAVE100"
                disabled={
                  couponLoading
                }
                autoComplete="off"
                spellCheck={false}
                className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium uppercase outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              />

              <button
                type="submit"
                disabled={
                  couponLoading ||
                  !couponCode.trim()
                }
                className="flex h-11 min-w-[78px] items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                {couponLoading ? (
                  <>
                    <RefreshCw className="mr-1.5 h-4 w-4 animate-spin" />

                    Checking
                  </>
                ) : (
                  "Apply"
                )}
              </button>
            </div>

            {/* Coupon error */}

            {couponError && (
              <div className="mt-2 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2">
                <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />

                <p className="text-xs font-medium text-red-500">
                  {couponError}
                </p>
              </div>
            )}
          </form>
        )}
      </div>

      {/* =========================
          Divider
      ========================== */}

      <div className="my-4 border-t border-slate-200" />

      {/* =========================
          Price Breakdown
      ========================== */}

      <div className="space-y-2.5 text-sm">

        <div className="flex justify-between gap-4">
          <span className="text-slate-500">
            মোট পণ্য ({cartItems.length})
          </span>

          <span className="font-medium text-slate-900">
            ৳
            {safeSubtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-slate-500">
            ডেলিভারি চার্জ
          </span>

          <span className="font-medium text-slate-900">
            ৳
            {safeDeliveryFee.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-slate-500">
            ডিসকাউন্ট
          </span>

          <span className="font-semibold text-emerald-600">
            -৳
            {safeDiscount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* =========================
          Total
      ========================== */}

      <div className="my-4 border-t border-slate-200" />

      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="text-base font-bold text-slate-900 sm:text-lg">
          সর্বমোট
        </span>

        <span className="text-lg font-black text-slate-900 sm:text-xl">
          ৳
          {totalAmount.toLocaleString()}
        </span>
      </div>

      {/* =========================
          Payment Summary
      ========================== */}

      <div className="mb-5 space-y-1.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs sm:text-sm">

        <div className="flex justify-between gap-4 font-medium">
          <span className="text-emerald-600">
            এখন পরিশোধ
          </span>

          <span className="font-bold text-emerald-600">
            ৳
            {nowPayable.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between gap-4 text-slate-500">
          <span>পরে পরিশোধ</span>

          <span className="font-medium text-slate-700">
            ৳
            {remainingPayable.toLocaleString()}
          </span>
        </div>
      </div>

      {/* =========================
          Place Order
      ========================== */}

      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={
          loading ||
          cartItems.length === 0
        }
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-300/40 transition hover:bg-emerald-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
      >
        {loading ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin" />

            <span>
              অর্ডার হচ্ছে...
            </span>
          </>
        ) : (
          <>
            <span>
              {buttonText}
            </span>

            <Lock className="h-4 w-4" />
          </>
        )}
      </button>

    </div>
  );
}