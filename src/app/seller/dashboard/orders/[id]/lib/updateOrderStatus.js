"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

const allowedTransitions = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["processing", "cancelled"],
  processing: ["pickup_requested"],
  pickup_requested: [],
  shipped: [],
  delivered: [],
  cancelled: [],
};

export async function updateOrderStatus(orderId, nextStatus) {
  const supabase = await createClient();
  const currentUser = await getCurrentUser();

  if (!currentUser?.shop?.id) {
    throw new Error("Unauthorized");
  }

  if (!orderId || !nextStatus) {
    throw new Error("Order information missing.");
  }

  const { data: order, error } = await supabase
    .from("orders")
    .select("id, order_number, status, shop_id")
    .eq("id", orderId)
    .eq("shop_id", currentUser.shop.id)
    .single();

  if (error || !order) {
    throw new Error("Order not found");
  }

  const allowed = allowedTransitions[order.status] || [];

  if (!allowed.includes(nextStatus)) {
    throw new Error(
      `Cannot change ${order.status} → ${nextStatus}`
    );
  }

  const updateData = {
    status: nextStatus,
    updated_at: new Date().toISOString(),
  };

  // Seller যখন product ready করে pickup request করবে
  if (nextStatus === "pickup_requested") {
    updateData.pickup_requested_at =
      new Date().toISOString();
  }

  const { error: updateError } = await supabase
    .from("orders")
    .update(updateData)
    .eq("id", order.id)
    .eq("shop_id", currentUser.shop.id);

  if (updateError) {
    console.error(
      "Update Order Status Error:",
      updateError
    );

    throw new Error(
      updateError.message || "Order status update করা যায়নি।"
    );
  }

  revalidatePath(
    `/seller/dashboard/orders/${order.id}`
  );

  revalidatePath("/seller/dashboard/orders");

  revalidatePath(`/orders/${order.id}`);

  return {
    success: true,
    orderId: order.id,
    orderNumber: order.order_number,
    status: nextStatus,
  };
}