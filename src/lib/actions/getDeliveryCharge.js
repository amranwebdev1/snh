"use server";

import { createClient } from "@/lib/supabase/server";

export async function getDeliveryCharge(addressId) {
  const supabase = await createClient();

  if (!addressId) {
    throw new Error("Address ID পাওয়া যায়নি।");
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Login required");
  }

  console.log("=== Delivery Charge Test ===");
  console.log("User ID:", user.id);
  console.log("Address ID:", addressId);

  const { data, error } = await supabase.rpc(
    "get_delivery_charge_for_address",
    {
      p_address_id: addressId,
    }
  );

  if (error) {
    console.error(
      "Delivery RPC Error:",
      error
    );

    console.error(
      "Message:",
      error.message
    );

    console.error(
      "Details:",
      error.details
    );

    console.error(
      "Hint:",
      error.hint
    );

    console.error(
      "Code:",
      error.code
    );

    throw new Error(
      error.message ||
        "Delivery charge পাওয়া যায়নি।"
    );
  }

  console.log(
    "Delivery RPC Data:",
    data
  );

  const result = data?.[0];

  if (!result) {
    throw new Error(
      "এই address-এর জন্য delivery zone পাওয়া যায়নি।"
    );
  }

  const delivery = {
    zoneId: result.zone_id,
    zoneName: result.zone_name,
    deliveryCharge: Number(
      result.delivery_charge || 0
    ),
  };

  console.log(
    "Delivery Result:",
    delivery
  );

  return delivery;
}