"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin } from "@/lib/auth/getCurrentAdmin";

const ALLOWED_STATUSES = [
  "pending_review",
  "approved",
  "rejected",
];

export async function updateShopVerification({
  shopId,
  status,
  rejectionReason = "",
}) {
  if (!shopId) {
    throw new Error("Shop ID পাওয়া যায়নি।");
  }

  if (!ALLOWED_STATUSES.includes(status)) {
    throw new Error("Invalid verification status।");
  }

  const admin = await getCurrentAdmin();

  if (!admin) {
    throw new Error("Admin access required।");
  }

  if (
    status === "rejected" &&
    !rejectionReason?.trim()
  ) {
    throw new Error(
      "Rejected করার জন্য rejection reason দিতে হবে।"
    );
  }

  const supabase = await createClient();

  const { data: shop, error: shopError } =
    await supabase
      .from("shops")
      .select(
        "id, owner_id, name, slug, verification_status"
      )
      .eq("id", shopId)
      .single();

  if (shopError || !shop) {
    console.error(
      "Get Shop For Verification Error:",
      shopError
    );

    throw new Error("Shop পাওয়া যায়নি।");
  }

  const updateData = {
    verification_status: status,
    rejection_reason:
      status === "rejected"
        ? rejectionReason.trim()
        : null,
    verified_at:
      status === "approved"
        ? new Date().toISOString()
        : null,
    updated_at: new Date().toISOString(),
  };

  const { data: updatedShop, error: updateError } =
    await supabase
      .from("shops")
      .update(updateData)
      .eq("id", shopId)
      .select(
        `
          id,
          name,
          slug,
          verification_status,
          rejection_reason,
          verified_at,
          updated_at
        `
      )
      .single();

  if (updateError || !updatedShop) {
    console.error(
      "Update Shop Verification Error:",
      updateError
    );

    throw new Error(
      updateError?.message ||
        "Shop verification update করা যায়নি।"
    );
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/shops");
  revalidatePath(`/admin/shops/${shopId}`);

  return {
    success: true,
    shop: updatedShop,
  };
}