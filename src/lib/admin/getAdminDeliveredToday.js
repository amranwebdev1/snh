import { createClient } from "@/lib/supabase/server";

export async function getAdminDeliveredToday() {
  const supabase = await createClient();

  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(
    startOfTomorrow.getDate() + 1
  );

  const { data, error } = await supabase
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
      picked_up_at,
      out_for_delivery_at,
      delivered_at,

      shops!orders_shop_id_fkey (
        id,
        name,
        logo,
        owner_id
      ),

      profiles!orders_customer_id_fkey (
        id,
        name,
        username
      )
    `)
    .eq("status", "delivered")
    .gte(
      "delivered_at",
      startOfToday.toISOString()
    )
    .lt(
      "delivered_at",
      startOfTomorrow.toISOString()
    )
    .order("delivered_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Get Admin Delivered Today Error:",
      error
    );

    return [];
  }

  return data || [];
}