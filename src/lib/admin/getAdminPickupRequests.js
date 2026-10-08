import { createClient } from "@/lib/supabase/server";

export async function getAdminPickupRequests() {
  const supabase = await createClient();

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
      total_amount,
      created_at,
      updated_at,
      pickup_requested_at,

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
    .eq("status", "pickup_requested")
    .order("pickup_requested_at", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Get Admin Pickup Requests Error:",
      error
    );

    return [];
  }

  return data || [];
}