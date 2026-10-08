import { createClient } from "@/lib/supabase/server";

export async function getProductBySlug(slug) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      shop:shops(
        id,
        name,
        slug,
        logo,
        location,
        verification_status
      )
    `)
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error || !data) return null;

  return data;
}



export async function getRelatedProducts(category, shopId, limit = 8) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("products")
    .select("id,name,slug,price,stock,thumbnail")
    .eq("status", "active")
    .eq("category", category)
    .neq("shop_id", shopId)
    .limit(limit);

  return data || [];
}