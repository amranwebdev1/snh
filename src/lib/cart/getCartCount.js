import { createClient } from "@/lib/supabase/client";

export async function getCartCount() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return 0;

  const { data, error } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("user_id", user.id);

  if (error) return 0;

  return data.reduce((sum, item) => sum + item.quantity, 0);
}