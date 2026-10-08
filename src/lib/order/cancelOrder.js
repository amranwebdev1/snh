"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function cancelOrder(orderId) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("cancel_order", {
    p_order_id: orderId,
  });

  if (error) {
    console.error("RPC Error:", error);
    throw new Error(error.message);
  }

  revalidatePath(`/orders/${orderId}`);
  revalidatePath("/profile/my_orders");

  return { success: true };
}