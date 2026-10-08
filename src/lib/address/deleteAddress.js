"use client";

import { createClient } from "@/lib/supabase/client";

export async function deleteAddress(addressId) {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Login required");
  }

  if (!addressId) {
    throw new Error("Address ID পাওয়া যায়নি।");
  }

  const { data, error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", addressId)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Delete Address Error:", error);

    throw new Error(
      error.message || "ঠিকানা মুছে ফেলা যায়নি।"
    );
  }

  return data;
}