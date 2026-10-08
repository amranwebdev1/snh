import { createClient } from "@/lib/supabase/server";

export async function getCartItems() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,

      product:products(
        id,
        name,
        slug,
        price,
        discount_price,
        stock,
        thumbnail,

        shop:shops(
          id,
          name,
          slug
        )
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Get Cart Items Error:",
      error
    );

    return [];
  }

  return data || [];
}