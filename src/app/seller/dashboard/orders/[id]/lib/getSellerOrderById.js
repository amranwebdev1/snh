"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export async function getSellerOrderById(orderId) {
  const supabase = await createClient();
  const currentUser = await getCurrentUser();

  if (!currentUser?.shop?.id) return null;

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      shops(id,name,slug),
      addresses(*),
      order_items(*)
    `)
    .eq("id", orderId)
    .eq("shop_id", currentUser.shop.id)
    .single();

  if (error) return null;

  return data;
}