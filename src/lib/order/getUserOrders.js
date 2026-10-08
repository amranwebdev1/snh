"use server";

import { createClient } from "@/lib/supabase/server";

export async function getUserOrders(status = "all") {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  let query = supabase
    .from("orders")
    .select(`
      id,
      order_number,
      status,
      payment_method,
      payment_status,
      total_amount,
      subtotal,
      delivery_fee,
      discount,
      created_at,

      shops(name, slug),

      addresses(
        full_name,
        phone
      ),

      order_items(
        id,
        product_name,
        product_image,
        quantity,
        price,
        subtotal
      )
    `)
    .eq("customer_id", user.id)
    .order("created_at", { ascending: false });

  if (status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data || [];
}