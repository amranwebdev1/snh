"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin } from "@/lib/auth/getCurrentAdmin";

const allowedTransitions = {
  pickup_requested: ["shipped"],
  shipped: ["out_for_delivery"],
  out_for_delivery: ["delivered"],
};

export async function updateAdminOrderStatus(
  orderId,
  nextStatus
) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    throw new Error("Unauthorized");
  }

  if (!orderId || !nextStatus) {
    throw new Error("Order information missing.");
  }

  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      id,
      order_number,
      status
    `)
    .eq("id", orderId)
    .single();

  if (error || !order) {
    throw new Error("Order not found.");
  }

  const allowed =
    allowedTransitions[order.status] || [];

  if (!allowed.includes(nextStatus)) {
    throw new Error(
      `Cannot change ${order.status} → ${nextStatus}`
    );
  }

  const now = new Date().toISOString();

  const updateData = {
    status: nextStatus,
    updated_at: now,
  };

  if (nextStatus === "shipped") {
    updateData.picked_up_at = now;
    
    updateData.rider_name =
    admin.profile.name ||
    admin.profile.username ||
    "Admin";

  updateData.rider_phone =
    admin.profile.phone || null;
  }

  if (nextStatus === "out_for_delivery") {
    updateData.out_for_delivery_at = now;
  }

  if (nextStatus === "delivered") {
    updateData.delivered_at = now;
  }

  const { error: updateError } = await supabase
    .from("orders")
    .update(updateData)
    .eq("id", order.id);

  if (updateError) {
    console.error(
      "Admin Update Order Status Error:",
      updateError
    );

    throw new Error(
      updateError.message ||
        "Order status update করা যায়নি।"
    );
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/orders");
  revalidatePath(`/orders/${order.id}`);

  return {
    success: true,
    orderId: order.id,
    orderNumber: order.order_number,
    status: nextStatus,
  };
}