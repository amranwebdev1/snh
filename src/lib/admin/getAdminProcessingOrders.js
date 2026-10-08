import { createClient } from "@/lib/supabase/server";

export async function getAdminProcessingOrders() {
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
    .eq("status", "processing")
    .order("updated_at", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Get Admin Processing Orders Error:",
      error
    );

    return [];
  }

  return data || [];
}