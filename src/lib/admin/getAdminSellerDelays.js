import { createClient } from "@/lib/supabase/server";

const DELAY_MINUTES = 120;

export async function getAdminSellerDelays() {
  const supabase = await createClient();

  const now = Date.now();

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
        owner_id,

        profiles!shops_owner_id_fkey (
          id,
          name,
          username,
          phone
        )
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
      "Get Admin Seller Delays Error:",
      error
    );

    return [];
  }

  return (data || [])
    .map((order) => {
      const updatedAt = order?.updated_at
        ? new Date(order.updated_at)
        : null;

      const waitingMinutes = updatedAt
        ? Math.max(
            0,
            Math.floor(
              (now - updatedAt.getTime()) /
                60000
            )
          )
        : 0;

      return {
        ...order,
        waitingMinutes,
      };
    })
    .filter(
      (order) =>
        order.waitingMinutes >= DELAY_MINUTES
    );
}