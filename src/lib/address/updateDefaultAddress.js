import { createClient } from "@/lib/supabase/client";

export async function updateDefaultAddress(addressId) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Login required");

  // প্রথমে সব address-এর default false
  const { error: resetError } = await supabase
    .from("addresses")
    .update({ is_default: false })
    .eq("user_id", user.id);

  if (resetError) throw resetError;

  // তারপর নির্বাচিত address default true
  const { data, error } = await supabase
    .from("addresses")
    .update({ is_default: true })
    .eq("id", addressId)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}