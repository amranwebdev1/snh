import { createClient } from "@/lib/supabase/server";

export async function getCategoryPageData(slug) {
  const supabase = await createClient();

  // --------------------------------
  // 1. Category
  // --------------------------------
  const { data: category, error: categoryError } =
    await supabase
      .from("categories")
      .select(`
        id,
        name,
        slug,
        image,
        description
      `)
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

  if (categoryError || !category) {
    console.error(
      "Get Category Error:",
      categoryError?.message
    );

    return null;
  }

  // --------------------------------
  // 2. Active Subcategories
  // --------------------------------
  const {
    data: subcategories,
    error: subcategoryError,
  } = await supabase
    .from("subcategories")
    .select(`
      id,
      category_id,
      name,
      slug,
      image,
      is_active,
      sort_order
    `)
    .eq("category_id", category.id)
    .eq("is_active", true)
    .order("sort_order", {
      ascending: true,
    });

  if (subcategoryError) {
    console.error(
      "Get Subcategories Error:",
      subcategoryError.message
    );
  }

  // --------------------------------
  // 3. Approved Products
  // --------------------------------
  const {
    data: products,
    error: productsError,
  } = await supabase
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
      subcategory_id
    `)
    .eq("category_id", category.id)
    .eq("approval_status", "approved")
    .eq("status", "active")
    .eq("is_delete", false)
    .order("created_at", {
      ascending: false,
    });

  if (productsError) {
    console.error(
      "Get Category Products Error:",
      productsError.message
    );
  }

  return {
    category,
    subcategories: subcategories || [],
    products: products || [],
  };
}