import { createClient } from "@/lib/supabase/client";

export async function updateCartQuantity(
  productId,
  quantity
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Login required");
  }

  if (!productId) {
    throw new Error("Product ID required");
  }

  if (quantity <= 0) {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);

    if (error) {
      console.error(
        "Remove Cart Item Error:",
        error
      );

      throw new Error(
        "Cart item remove করা যায়নি"
      );
    }

    return;
  }

  const { error } = await supabase
    .from("cart_items")
    .update({
      quantity,
    })
    .eq("user_id", user.id)
    .eq("product_id", productId);

  if (error) {
    console.error(
      "Update Cart Quantity Error:",
      error
    );

    throw new Error(
      "Cart quantity update করা যায়নি"
    );
  }
}