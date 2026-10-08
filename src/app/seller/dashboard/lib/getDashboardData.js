"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export async function getDashboardData() {
  const supabase = await createClient();
  const currentUser = await getCurrentUser();

  if (!currentUser?.shop?.id) return null;

  const shopId = currentUser.shop.id;

  const [
    { data: orders },
    { data: products },
    { data: lowStock },
  ] = await Promise.all([
    supabase
      .from("orders")
      .select("id,status,total_amount,created_at,order_number")
      .eq("shop_id", shopId),

    supabase
      .from("products")
      .select("id")
      .eq("shop_id", shopId)
      .eq("is_delete", false),

    supabase
      .from("products")
      .select("id,name,stock,thumbnail")
      .eq("shop_id", shopId)
      .eq("is_delete", false)
      .lte("stock", 10)
      .order("stock", { ascending: true })
      .limit(5),
  ]);

  const today = new Date().toDateString();

  const todaySales = (orders || [])
    .filter(
      (o) =>
        o.status === "delivered" &&
        new Date(o.created_at).toDateString() === today
    )
    .reduce((sum, o) => sum + Number(o.total_amount), 0);

  return {
    stats: {
      pendingOrders: (orders || []).filter(
        (o) => o.status === "pending"
      ).length,

      totalProducts: products?.length || 0,

      todaySales,

      totalOrders: orders?.length || 0,
    },

    recentOrders: (orders || [])
      .sort(
        (a, b) =>
          new Date(b.created_at) - new Date(a.created_at)
      )
      .slice(0, 5),

    lowStockProducts: lowStock || [],
  };
}