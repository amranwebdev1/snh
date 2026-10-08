import { createClient } from "@/lib/supabase/client";

export async function removeCartItem(cartItemId) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Login required");
  }

  if (!cartItemId) {
    throw new Error("Cart item ID required");
  }

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId)
    .eq("user_id", user.id);

  if (error) {
    console.error(
      "Remove Cart Item Error:",
      error
    );

    throw new Error(
      "Cart item remove করা যায়নি"
    );
  }

  return {
    success: true,
  };
}