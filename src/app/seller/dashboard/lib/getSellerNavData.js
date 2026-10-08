"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export async function getSellerNavData() {
  const supabase = await createClient();
  const currentUser = await getCurrentUser();

  if (!currentUser?.shop?.id) {
    return { pendingCount: 0 };
  }

  const { count } = await supabase
    .from("orders")
    .select("id", { count: "exact", head: true })
    .eq("shop_id", currentUser.shop.id)
    .eq("status", "pending");

  return {
    pendingCount: count || 0,
  };
}