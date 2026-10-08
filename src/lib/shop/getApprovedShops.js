import { createClient } from "@/lib/supabase/server";

export async function getApprovedShops(limit = 8) {
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
      description,
      profiles!shops_owner_id_fkey (
        username
      )
    `)
    .eq("status", "active")
    .eq("verification_status", "approved")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Get Approved Shops Error:", error.message);
    return [];
  }

  return data || [];
}