import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 40;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // ---------------------------------------
    // Query Parameters
    // ---------------------------------------

    const categoryId =
      searchParams.get("category_id")?.trim() || null;

    const offsetParam = Number(
      searchParams.get("offset") || 0
    );

    const limitParam = Number(
      searchParams.get("limit") ||
        DEFAULT_LIMIT
    );

    // ---------------------------------------
    // Validate Offset
    // ---------------------------------------

    const offset =
      Number.isInteger(offsetParam) &&
      offsetParam >= 0
        ? offsetParam
        : 0;

    // ---------------------------------------
    // Validate Limit
    // ---------------------------------------

    const limit =
      Number.isInteger(limitParam) &&
      limitParam > 0
        ? Math.min(
            limitParam,
            MAX_LIMIT
          )
        : DEFAULT_LIMIT;

    // ---------------------------------------
    // Supabase
    // ---------------------------------------

    const supabase =
      await createClient();

    // ---------------------------------------
    // Base Query
    // ---------------------------------------

    let query = supabase
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
      .eq(
        "approval_status",
        "approved"
      )
      .eq("status", "active")
      .eq("is_delete", false);

    // ---------------------------------------
    // Category Filter
    // ---------------------------------------

    if (categoryId) {
      query = query.eq(
        "category_id",
        categoryId
      );
    }

    // ---------------------------------------
    // Fetch limit + 1
    //
    // limit = 20 হলে 21টি নেওয়া হবে।
    // 21তম product থাকলে বুঝব আরও product আছে।
    // ---------------------------------------

    const { data, error } =
      await query
        .order("created_at", {
          ascending: false,
        })
        .order("id", {
          ascending: false,
        })
        .range(
          offset,
          offset + limit
        );

    // ---------------------------------------
    // Database Error
    // ---------------------------------------

    if (error) {
      console.error(
        "Products API Error:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Products load করা যায়নি।",
        },
        {
          status: 500,
        }
      );
    }

    // ---------------------------------------
    // Products
    // ---------------------------------------

    const products = data || [];

    // ---------------------------------------
    // Has More
    // ---------------------------------------

    const hasMore =
      products.length > limit;

    // ---------------------------------------
    // Remove Extra Product
    // ---------------------------------------

    const visibleProducts =
      hasMore
        ? products.slice(0, limit)
        : products;

    // ---------------------------------------
    // Next Offset
    // ---------------------------------------

    const nextOffset =
      offset +
      visibleProducts.length;

    // ---------------------------------------
    // Response
    // ---------------------------------------

    return NextResponse.json(
      {
        success: true,

        products: visibleProducts,

        pagination: {
          offset,
          limit,
          nextOffset,
          hasMore,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "private, no-store",
        },
      }
    );
  } catch (error) {
    // ---------------------------------------
    // Unexpected Error
    // ---------------------------------------

    console.error(
      "Products API Unexpected Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}