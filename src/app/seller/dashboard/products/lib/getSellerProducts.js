"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export async function getSellerProducts() {
  const supabase = await createClient();
  const currentUser = await getCurrentUser();

  if (!currentUser?.shop?.id) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("shop_id", currentUser.shop.id)
    .eq("is_delete",false)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
}