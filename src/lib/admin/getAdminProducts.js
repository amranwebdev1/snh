import { createClient } from "@/lib/supabase/server";

export async function getAdminProducts({
  search = "",
  approval = "all",
  limit = 50,
} = {}) {
  const supabase = await createClient();

  let query = supabase
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
      status,
      approval_status,
      is_delete,
      created_at,

      shops!products_shop_id_fkey (
        id,
        name,
        slug,
        owner_id,

        profiles!shops_owner_id_fkey (
          id,
          name,
          username
        )
      )
    `)
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);

  /*
   * Approval filter
   */
  if (
    approval &&
    approval !== "all"
  ) {
    query = query.eq(
      "approval_status",
      approval
    );
  }

  /*
   * Search
   *
   * Product name / slug
   */
  if (search?.trim()) {
    const value = search.trim();

    query = query.or(
      `name.ilike.%${value}%,slug.ilike.%${value}%`
    );
  }

  const {
    data,
    error,
  } = await query;

  if (error) {
    console.error(
      "Get Admin Products Error:",
      error
    );

    return [];
  }

  return data || [];
}