"use server";

import { createClient } from "@/lib/supabase/server";

export async function placeOrder({
  addressId,
  paymentMethod,
  cartItems = [],
  customerNote = "",
  isBuyNow = false,
  couponCode = null,
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
   * Basic validation
   * -------------------------------------------------------
   */

  if (!addressId) {
    throw new Error(
      "একটি shipping address নির্বাচন করুন।"
    );
  }

  if (!paymentMethod) {
    throw new Error(
      "একটি payment method নির্বাচন করুন।"
    );
  }

  if (!Array.isArray(cartItems) || !cartItems.length) {
    throw new Error("Order items পাওয়া যায়নি।");
  }


  /*
   * -------------------------------------------------------
   * Only send trusted identifiers + quantity.
   *
   * Price, stock, product status, shop,
   * discount etc. server/RPC নিজে fresh database থেকে নেবে।
   * -------------------------------------------------------
   */

  const items = cartItems.map((item) => ({
    product_id: item?.product?.id,
    quantity: Number(item?.quantity),
  }));


  /*
   * Client-side malformed data guard.
   */

  const invalidItem = items.find(
    (item) =>
      !item.product_id ||
      !Number.isInteger(item.quantity) ||
      item.quantity <= 0
  );

  if (invalidItem) {
    throw new Error(
      "এক বা একাধিক product item invalid।"
    );
  }


  /*
   * -------------------------------------------------------
   * Single PostgreSQL transaction
   * -------------------------------------------------------
   */

  const { data, error } = await supabase.rpc(
    "create_order_transaction",
    {
      p_address_id: addressId,

      p_payment_method: paymentMethod,

      p_items: items,

      p_customer_note:
        customerNote?.trim() || null,

      p_is_buy_now: Boolean(isBuyNow),

      p_coupon_code:
        couponCode?.trim() || null,
    }
  );


  /*
   * -------------------------------------------------------
   * RPC error
   * -------------------------------------------------------
   */

  console.log("========== CREATE ORDER RPC ==========");
console.log("RPC data:", data);
console.log("RPC error:", error);
console.log("RPC data type:", typeof data);
console.log(
  "RPC is array:",
  Array.isArray(data)
);
console.log(
  "RPC data length:",
  Array.isArray(data)
    ? data.length
    : "not-array"
);
console.log("======================================");

if (error) {
  console.error(
    "Create Order Transaction Error:",
    error
  );

  throw new Error(
    error?.message ||
      "অর্ডার তৈরি করা যায়নি।"
  );
}

if (!Array.isArray(data) || !data.length) {
  throw new Error(
    "Order RPC কোনো order row ফেরত দেয়নি।"
  );
}


  /*
   * -------------------------------------------------------
   * Return created orders
   * -------------------------------------------------------
   */

  return data.map((order) => ({
    id: order.order_id,
    orderNumber: order.order_number,
    shopId: order.shop_id,
    subtotal: Number(order.subtotal || 0),
    deliveryFee: Number(
      order.delivery_fee || 0
    ),
    discount: Number(
      order.discount || 0
    ),
    totalAmount: Number(
      order.total_amount || 0
    ),
  }));
}