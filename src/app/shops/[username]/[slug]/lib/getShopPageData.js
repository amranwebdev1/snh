import { createClient } from "@/lib/supabase/server";

export async function getShopPageData({
  username,
  slug,
}) {
  const supabase = await createClient();

  // -----------------------------
  // Profile / Username
  // -----------------------------

  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("username", username)
    .single();

  if (profileError || !profile) {
    console.error(
      "Get Shop Owner Error:",
      profileError?.message
    );

    return null;
  }

  // -----------------------------
  // Shop
  // -----------------------------

  const {
    data: shop,
    error: shopError,
  } = await supabase
    .from("shops")
    .select(`
      id,
      owner_id,
      name,
      slug,
      logo,
      cover,
      location,
      description,
      phone,
      created_at
    `)
    .eq("owner_id", profile.id)
    .eq("slug", slug)
    .eq("status", "active")
    .eq("verification_status", "approved")
    .single();

  if (shopError || !shop) {
    console.error(
      "Get Shop Error:",
      shopError?.message
    );

    return null;
  }

  // -----------------------------
  // Shop Products
  // -----------------------------

  const {
    data: products,
    error: productsError,
  } = await supabase
    .from("products")
    .select(`
      id,
      shop_id,
      name,
      slug,
      price,
      discount_price,
      stock,
      thumbnail,
      category,
      category_id,
      subcategory_id
    `)
    .eq("shop_id", shop.id)
    .eq("approval_status", "approved")
    .eq("status", "active")
    .eq("is_delete", false)
    .order("created_at", {
      ascending: false,
    });

  if (productsError) {
    console.error(
      "Get Shop Products Error:",
      productsError.message
    );
  }

  return {
    shop,
    products: products || [],
  };
}