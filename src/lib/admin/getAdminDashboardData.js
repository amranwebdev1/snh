import { createClient } from "@/lib/supabase/server";

export async function getAdminDashboardData() {
  const supabase = await createClient();

  const today = new Date();

  const startOfToday = new Date(today);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(
    startOfTomorrow.getDate() + 1
  );

  const sellerDelayBefore = new Date(
    Date.now() - 120 * 60 * 1000
  );

  const [
    todayOrdersResult,
    pickupRequestsResult,
    processingResult,
    deliveredTodayResult,
    sellerDelaysResult,
    shopsResult,
    productsResult,
  ] = await Promise.all([
    supabase
      .from("orders")
      .select("id", {
        count: "exact",
        head: true,
      })
      .gte(
        "created_at",
        startOfToday.toISOString()
      )
      .lt(
        "created_at",
        startOfTomorrow.toISOString()
      ),

    supabase
      .from("orders")
      .select(`
        id,
        order_number,
        customer_id,
        shop_id,
        status,
        payment_method,
        payment_status,
        total_amount,
        created_at,
        updated_at,
        pickup_requested_at,

        shops (
          id,
          name,
          logo,
          owner_id
        ),

        profiles!orders_customer_id_fkey (
          id,
          name,
          username
        )
      `)
      .eq("status", "pickup_requested")
      .order("pickup_requested_at", {
        ascending: true,
      }),

    supabase
      .from("orders")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("status", "processing"),

    supabase
      .from("orders")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("status", "delivered")
      .gte(
        "delivered_at",
        startOfToday.toISOString()
      )
      .lt(
        "delivered_at",
        startOfTomorrow.toISOString()
      ),

    supabase
      .from("orders")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("status", "processing")
      .lte(
        "updated_at",
        sellerDelayBefore.toISOString()
      ),

    // Shops
    supabase
      .from("shops")
      .select("id", {
        count: "exact",
        head: true,
      }),
    
    // Products
supabase
  .from("products")
  .select("id", {
    count: "exact",
    head: true,
  })
  .eq("is_delete", false),
  ]);

  if (todayOrdersResult.error) {
    console.error(
      "Admin Today Orders Error:",
      todayOrdersResult.error
    );
  }

  if (pickupRequestsResult.error) {
    console.error(
      "Admin Pickup Requests Error:",
      pickupRequestsResult.error
    );
  }

  if (processingResult.error) {
    console.error(
      "Admin Processing Orders Error:",
      processingResult.error
    );
  }

  if (deliveredTodayResult.error) {
    console.error(
      "Admin Delivered Orders Error:",
      deliveredTodayResult.error
    );
  }

  if (sellerDelaysResult.error) {
    console.error(
      "Admin Seller Delays Error:",
      sellerDelaysResult.error
    );
  }

  if (shopsResult.error) {
    console.error(
      "Admin Shops Count Error:",
      shopsResult.error
    );
  }

if (productsResult.error) {
  console.error(
    "Admin Products Count Error:",
    productsResult.error
  );
}


  return {
  stats: {
    todayOrders:
      todayOrdersResult.count || 0,

    pickupRequests:
      pickupRequestsResult.data?.length || 0,

    processing:
      processingResult.count || 0,

    deliveredToday:
      deliveredTodayResult.count || 0,

    sellerDelays:
      sellerDelaysResult.count || 0,

    shops:
      shopsResult.count || 0,

    products:
      productsResult.count || 0,
  },

  pickupRequests:
    pickupRequestsResult.data || [],
};
}