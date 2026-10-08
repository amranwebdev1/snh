import { createClient } from "@/lib/supabase/client";

export async function deleteShopImage(url) {
  if (!url) return;

  const supabase = createClient();

  const path = url.split("/storage/v1/object/public/shops/")[1];

  if (!path) return;

  await supabase.storage
    .from("shops")
    .remove([path]);
}