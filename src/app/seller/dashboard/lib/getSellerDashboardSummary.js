"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export async function getSellerDashboardSummary() {
  const supabase = await createClient();
  const currentUser = await getCurrentUser();

  if (!currentUser?.shop?.id) return null;

  const shop = currentUser.shop;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [
    productsRes,
    ordersRes,
    pendingRes,
    todayRevenueRes,
    lowStockRes,
  ] = await Promise.all([
    // Active Products Count
    supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("shop_id", shop.id)
      .eq("is_delete", false),

    // Total Orders
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("shop_id", shop.id),

    // Pending + Confirmed Orders
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("shop_id", shop.id)
      .in("status", ["pending", "confirmed"]),

    // Today's Delivered Revenue
    supabase
      .from("orders")
      .select("total_amount")
      .eq("shop_id", shop.id)
      .eq("status", "delivered")
      .gte("created_at", todayStart.toISOString()),

    // Low Stock Products
    supabase
      .from("products")
      .select("id,name,stock,thumbnail")
      .eq("shop_id", shop.id)
      .eq("is_delete", false)
      .lte("stock", 10)
      .order("stock", { ascending: true })
      .limit(5),
  ]);

  const todayRevenue =
    todayRevenueRes.data?.reduce(
      (sum, item) => sum + Number(item.total_amount || 0),
      0
    ) || 0;

  return {
    shop,
    stats: {
      totalProducts: productsRes.count || 0,
      totalOrders: ordersRes.count || 0,
      pendingOrders: pendingRes.count || 0,
      todayRevenue,
    },
    lowStockProducts: lowStockRes.data || [],
  };
}