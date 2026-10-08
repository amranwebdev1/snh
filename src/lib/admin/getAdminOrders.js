import { createClient } from "@/lib/supabase/server";

export async function getAdminOrders({
  status = "all",
  search = "",
  limit = 50,
} = {}) {
  const supabase = await createClient();

  let query = supabase
    .from("orders")
    .select(`
      id,
      order_number,
      customer_id,
      shop_id,
      status,
      payment_method,
      payment_status,
      subtotal,
      delivery_fee,
      discount,
      total_amount,
      rider_name,
      rider_phone,
      created_at,
      updated_at,
      pickup_requested_at,
      picked_up_at,
      out_for_delivery_at,
      delivered_at,

      profiles!orders_customer_id_fkey (
        id,
        name,
        username
      ),

      shops!orders_shop_id_fkey (
        id,
        name,
        logo
      )
    `)
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);

  if (status !== "all") {
    query = query.eq("status", status);
  }

  if (search?.trim()) {
    const value = search.trim();

    query = query.or(
      `order_number.ilike.%${value}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error(
      "Get Admin Orders Error:",
      error
    );

    return [];
  }

  return data || [];
}