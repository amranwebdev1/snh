"use server";

import { createClient } from "@/lib/supabase/server";

export async function getOrderById(orderId) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      order_number,
      status,
      payment_method,
      payment_status,
      subtotal,
      delivery_fee,
      discount,
      total_amount,
      customer_note,
      seller_note,
      created_at,
      updated_at,

      shops(
        id,
        name,
        slug
      ),

      addresses(
        full_name,
        phone,
        division,
        district,
        upazila,
        address_line,
        landmark,
        label
      ),

      order_items(
        id,
        product_id,
        product_name,
        product_image,
        quantity,
        price,
        subtotal
      )
    `)
    .eq("id", orderId)
    .eq("customer_id", user.id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}