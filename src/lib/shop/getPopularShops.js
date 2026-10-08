import { createClient } from "@/lib/supabase/server";

export async function getPopularShops() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("shops")
    .select(`
      id,
      owner_id,
      name,
      slug,
      logo,
      cover,
      location,
      profiles!shops_owner_id_fkey (
        username
      )
    `)
    .eq("status", "active")
    .eq("verification_status", "approved")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Get Popular Shops Error:", error.message);
    return [];
  }

  return data || [];
}