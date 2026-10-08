"use client";

import { createClient } from "@/lib/supabase/client";

export async function updateAddress(id, form) {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Login required");
  }

  if (!id) {
    throw new Error(
      "Address ID পাওয়া যায়নি।"
    );
  }

  const payload = {
    full_name: form.fullName?.trim(),
    phone: form.phone?.trim(),
    division: form.division?.trim(),
    district: form.district?.trim(),
    upazila: form.upazila?.trim(),
    post_office: form.postOffice?.trim(),
    address_line: form.addressLine?.trim(),
    landmark: form.landmark?.trim() || null,
    label: form.type || "Home",
    updated_at: new Date().toISOString(),
  };

  if (
    !payload.full_name ||
    !payload.phone ||
    !payload.division ||
    !payload.district ||
    !payload.upazila ||
    !payload.post_office ||
    !payload.address_line
  ) {
    throw new Error(
      "ঠিকানার প্রয়োজনীয় তথ্য পূরণ করুন।"
    );
  }

  const {
    data,
    error,
  } = await supabase
    .from("addresses")
    .update(payload)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error(
      "Update Address Error:",
      error
    );

    throw new Error(
      error.message ||
        "ঠিকানা আপডেট করা যায়নি।"
    );
  }

  return data;
}