import { createClient } from "@/lib/supabase/server";

export async function getCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select(`
      id,
      name,
      slug,
      image,
      description,
      subcategories (
        id,
        category_id,
        name,
        slug,
        image,
        is_active,
        sort_order
      )
    `)
    .eq("is_active", true)
    .order("sort_order", {
      ascending: true,
    })
    .order("sort_order", {
      referencedTable: "subcategories",
      ascending: true,
    });

  if (error) {
    console.error(
      "Get Categories Error:",
      error.message
    );

    return [];
  }

  return (data || []).map((category) => ({
    ...category,

    subcategories: (category.subcategories || []).filter(
      (subcategory) => subcategory.is_active
    ),
  }));
}