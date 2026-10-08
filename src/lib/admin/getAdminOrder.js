import { createClient } from "@/lib/supabase/server";

export async function getAdminOrder(orderId) {
  if (!orderId) return null;

  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      id,
      order_number,
      customer_id,
      shop_id,
      address_id,
      status,
      payment_method,
      payment_status,
      subtotal,
      delivery_fee,
      discount,
      total_amount,
      seller_note,
      customer_note,
      tracking_number,
      courier_name,
      rider_name,
      rider_phone,
      admin_note,
      created_at,
      updated_at,
      pickup_requested_at,
      picked_up_at,
      out_for_delivery_at,
      delivered_at,

      profiles!orders_customer_id_fkey (
        id,
        name,
        username,
        email,
        phone,
        avatar_url
      ),

      shops!orders_shop_id_fkey (
        id,
        name,
        slug,
        logo,
        cover,
        location,
        owner_id
      ),

      addresses!orders_address_id_fkey (
        id,
        full_name,
        phone,
        division,
        district,
        upazila,
        post_office,
        address_line,
        landmark,
        label
      ),

      order_items (
        id,
        order_id,
        product_id,
        product_name,
        product_image,
        price,
        quantity,
        subtotal,
        created_at
      )
    `)
    .eq("id", orderId)
    .single();

  if (error || !order) {
    console.error("Get Admin Order Error:", error);
    return null;
  }

  return order;
}