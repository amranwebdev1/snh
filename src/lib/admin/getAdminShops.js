import { createClient } from "@/lib/supabase/server";

export async function getAdminShops({
  search = "",
  verification = "all",
  limit = 50,
} = {}) {
  const supabase = await createClient();

  let query = supabase
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
    .order("created_at", { ascending: false })
    .limit(limit);

  if (
    verification &&
    verification !== "all"
  ) {
    query = query.eq(
      "verification_status",
      verification
    );
  }

  if (search?.trim()) {
    const value = search.trim();

    query = query.or(
      `name.ilike.%${value}%,slug.ilike.%${value}%,phone.ilike.%${value}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error(
      "Get Admin Shops Error:",
      error
    );

    return [];
  }

  return data || [];
}