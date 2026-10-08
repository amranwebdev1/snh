"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export async function deleteProduct(productId) {
  const supabase = await createClient();
  const currentUser = await getCurrentUser();

  if (!currentUser?.shop?.id) {
    throw new Error("Unauthorized");
  }

  // Product নিজের Shop-এর কিনা যাচাই
  const { data: product, error: findError } = await supabase
    .from("products")
    .select("id, shop_id, is_delete")
    .eq("id", productId)
    .eq("shop_id", currentUser.shop.id)
    .single();

  if (findError || !product) {
    throw new Error("Product not found");
  }

  if (product.is_delete) {
    throw new Error("Product already deleted");
  }

  // Soft Delete
  const { error: updateError } = await supabase
    .from("products")
    .update({
      is_delete: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", product.id);

  if (updateError) {
    console.error("Product Soft Delete Error:", updateError);
    throw new Error(updateError.message);
  }

  // Seller Dashboard Refresh
  revalidatePath("/seller/dashboard/products");

  return { success: true };
}