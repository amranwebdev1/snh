import { createClient } from "@/lib/supabase/server";

export async function getCartQuantity(productId) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return 1;

  const { data } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();

  return data?.quantity || 0;
}