import { createClient } from "@/lib/supabase/server";

export async function getAdminShop(shopId) {
  if (!shopId) {
    return null;
  }

  const supabase = await createClient();

  const { data: shop, error: shopError } =
    await supabase
      .from("shops")
      .select(`
        id,
        owner_id,
        name,
        slug,
        logo,
        cover,
        location,
        phone,
        description,
        status,
        created_at,
        updated_at,
        verification_status,
        rejection_reason,
        verified_at,
        search_keywords,

        profiles!shops_owner_id_fkey (
          id,
          name,
          username,
          email,
          phone,
          avatar_url
        )
      `)
      .eq("id", shopId)
      .single();

  if (shopError || !shop) {
    console.error(
      "Get Admin Shop Error:",
      shopError
    );

    return null;
  }

  const { data: products, error: productsError } =
    await supabase
      .from("products")
      .select(`
        id,
        name,
        slug,
        price,
        discount_price,
        stock,
        thumbnail,
        status,
        approval_status,
        is_delete,
        created_at
      `)
      .eq("shop_id", shop.id)
      .order("created_at", {
        ascending: false,
      });

  if (productsError) {
    console.error(
      "Get Admin Shop Products Error:",
      productsError
    );
  }

  const {
    count: ordersCount,
    error: ordersError,
  } = await supabase
    .from("orders")
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq("shop_id", shop.id);

  if (ordersError) {
    console.error(
      "Get Admin Shop Orders Count Error:",
      ordersError
    );
  }

  return {
    shop,
    products: products || [],
    ordersCount: ordersCount || 0,
  };
}