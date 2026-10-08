import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q")?.trim() || "";

    const type =
      searchParams.get("type") === "shops"
        ? "shops"
        : "products";

    if (!query) {
      return NextResponse.json({
        type,
        products: [],
        shops: [],
      });
    }

    const supabase = await createClient();

    // --------------------------------
    // Product Search
    // --------------------------------

    if (type === "products") {
      const { data, error } = await supabase.rpc(
        "search_products",
        {
          search_query: query,
          result_limit: 20,
        }
      );

      if (error) {
        console.error(
          "Product Search RPC Error:",
          error
        );

        return NextResponse.json(
          {
            type,
            products: [],
            shops: [],
            error: "Product search failed",
          },
          {
            status: 500,
          }
        );
      }

      return NextResponse.json({
        type: "products",
        products: data || [],
        shops: [],
      });
    }

    // --------------------------------
    // Shop Search
    // --------------------------------

    const { data, error } = await supabase.rpc(
      "search_shops",
      {
        search_query: query,
        result_limit: 20,
      }
    );

    if (error) {
      console.error(
        "Shop Search RPC Error:",
        error
      );

      return NextResponse.json(
        {
          type,
          products: [],
          shops: [],
          error: "Shop search failed",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      type: "shops",
      products: [],
      shops: data || [],
    });
  } catch (error) {
    console.error("Search API Error:", error);

    return NextResponse.json(
      {
        products: [],
        shops: [],
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}