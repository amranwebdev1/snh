import { createClient } from "@/lib/supabase/server";

// ---------------------------------------
// Trending Products
// ---------------------------------------
export async function getTrendingProducts(limit = 10) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      shop_id,
      name,
      slug,
      price,
      discount_price,
      stock,
      thumbnail,
      category,
      category_id,
      subcategory_id,
      created_at
    `)
    .eq("approval_status", "approved")
    .eq("status", "active")
    .eq("is_delete", false)
    .order("created_at", {
      ascending: false,
    })
    .order("id", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    console.error(
      "Get Trending Products Error:",
      error.message
    );

    return [];
  }

  return data || [];
}

// ---------------------------------------
// Latest / All Products
// ---------------------------------------
export async function getLatestProducts(
  limit = 20
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      shop_id,
      name,
      slug,
      price,
      discount_price,
      stock,
      thumbnail,
      category,
      category_id,
      subcategory_id,
      created_at
    `)
    .eq("approval_status", "approved")
    .eq("status", "active")
    .eq("is_delete", false)
    .order("created_at", {
      ascending: false,
    })
    .order("id", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    console.error(
      "Get Latest Products Error:",
      error.message
    );

    return [];
  }

  return data || [];
}

// ---------------------------------------
// Products By Category
// ---------------------------------------
export async function getProductsByCategory(
  categoryId
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      shop_id,
      name,
      slug,
      price,
      discount_price,
      stock,
      thumbnail,
      category,
      category_id,
      subcategory_id,
      created_at
    `)
    .eq("category_id", categoryId)
    .eq("approval_status", "approved")
    .eq("status", "active")
    .eq("is_delete", false)
    .order("created_at", {
      ascending: false,
    })
    .order("id", {
      ascending: false
    });

  if (error) {
    console.error(
      "Get Products By Category Error:",
      error.message
    );

    return [];
  }

  return data || [];
}