"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export async function getSellerOrders() {
  const supabase = await createClient();
  const currentUser = await getCurrentUser();

  if (!currentUser?.shop?.id) return [];

  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      order_number,
      status,
      payment_status,
      total_amount,
      created_at,
      addresses(full_name),
      order_items(product_image)
    `)
    .eq("shop_id", currentUser.shop.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
}