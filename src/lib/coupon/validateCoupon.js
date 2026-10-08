"use server";

import { createClient } from "@/lib/supabase/server";

export async function validateCoupon({
  code,
  subtotal,
}) {
  const supabase = await createClient();

  /*
   * -------------------------------------------------------
   * Authentication
   * -------------------------------------------------------
   */

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Login required");
  }


  /*
   * -------------------------------------------------------
   * Coupon code
   * -------------------------------------------------------
   */

  const normalizedCode = String(code || "")
    .trim()
    .toUpperCase();

  if (!normalizedCode) {
    return {
      success: false,
      message: "Coupon code দিন।",
    };
  }


  /*
   * -------------------------------------------------------
   * Subtotal
   * -------------------------------------------------------
   */

  const orderSubtotal = Number(subtotal);

  if (
    !Number.isFinite(orderSubtotal) ||
    orderSubtotal < 0
  ) {
    return {
      success: false,
      message: "Invalid order amount.",
    };
  }


  /*
   * -------------------------------------------------------
   * Secure coupon preview RPC
   * -------------------------------------------------------
   */

  const { data, error } = await supabase.rpc(
    "preview_coupon",
    {
      p_code: normalizedCode,
      p_order_subtotal: orderSubtotal,
    }
  );


  /*
   * -------------------------------------------------------
   * RPC error
   * -------------------------------------------------------
   */

  if (error) {
    console.error(
      "Preview Coupon Error:",
      error
    );

    return {
      success: false,
      message:
        error?.message ||
        "Coupon যাচাই করা যায়নি।",
    };
  }


  /*
   * -------------------------------------------------------
   * No coupon result
   * -------------------------------------------------------
   */

  const coupon = data?.[0];

  if (!coupon) {
    return {
      success: false,
      message:
        "এই Coupon পাওয়া যায়নি।",
    };
  }


  /*
   * -------------------------------------------------------
   * Return frontend-friendly result
   * -------------------------------------------------------
   */

  return {
    success: true,

    coupon: {
      id: coupon.coupon_id,
      code: coupon.coupon_code,
      description: coupon.description,
      discountType:
        coupon.discount_type,
      discountValue:
        Number(
          coupon.discount_value || 0
        ),
    },

    discountAmount:
      Number(
        coupon.discount_amount || 0
      ),

    finalSubtotal:
      Number(
        coupon.final_subtotal || 0
      ),

    message:
      `Coupon "${coupon.coupon_code}" সফলভাবে apply হয়েছে।`,
  };
}