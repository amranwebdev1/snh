import { createClient } from "@/lib/supabase/client";

export async function deleteProductImage(url) {
  if (!url) return;

  const supabase = createClient();

  const path = url.split("/storage/v1/object/public/products/")[1];
  if (!path) return;

  const { error } = await supabase.storage
    .from("products")
    .remove([path]);

  if (error) console.error(error);
}