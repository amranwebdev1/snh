"use server";

import { createClient } from "@/lib/supabase/server";

export async function getDefaultDeliveryCharge() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      deliveryCharge: 0,
      zoneName: null,
      addressId: null,
      message: "Login required",
    };
  }

  // প্রথমে default address খুঁজবে
  // default না থাকলে প্রথম address নেবে
  const { data: addresses, error: addressError } =
    await supabase
      .from("addresses")
      .select("id, district, upazila, is_default")
      .eq("user_id", user.id)
      .order("is_default", {
        ascending: false,
      })
      .order("created_at", {
        ascending: true,
      })
      .limit(1);

  if (addressError) {
    console.error(
      "Get Default Address Error:",
      addressError
    );

    return {
      success: false,
      deliveryCharge: 0,
      zoneName: null,
      addressId: null,
      message: "Address পাওয়া যায়নি।",
    };
  }

  const address = addresses?.[0];

  if (!address) {
    return {
      success: true,
      deliveryCharge: 0,
      zoneName: null,
      addressId: null,
      message: "কোনো shipping address নেই।",
    };
  }

  const { data, error } = await supabase.rpc(
    "get_delivery_charge_for_address",
    {
      p_address_id: address.id,
    }
  );

  if (error) {
    console.error(
      "Get Default Delivery Charge Error:",
      error
    );

    return {
      success: false,
      deliveryCharge: 0,
      zoneName: null,
      addressId: address.id,
      message:
        error.message ||
        "Delivery charge পাওয়া যায়নি।",
    };
  }

  const result = data?.[0];

  if (!result) {
    return {
      success: false,
      deliveryCharge: 0,
      zoneName: null,
      addressId: address.id,
      message:
        "এই address-এর জন্য delivery zone পাওয়া যায়নি।",
    };
  }

  return {
    success: true,
    deliveryCharge: Number(
      result.delivery_charge || 0
    ),
    zoneName: result.zone_name,
    addressId: address.id,
  };
}