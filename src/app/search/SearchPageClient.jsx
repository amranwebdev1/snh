"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  SearchIcon,
  Loader2,
  X,
  Package,
  Store,
  LayoutGrid,
  List,
} from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import StoreCard from "@/components/common/SmartStoreCard";
import ProductCard from "@/components/common/ProductCard";

import { addToCart } from "@/lib/cart/addToCart";
import { useCart } from "@/providers/CartProvider";

import { toast } from "react-hot-toast";

export default function SearchPageClient({
  initialQuery = "",
  initialType = "products",
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { refreshCartCount } = useCart();

  const [query, setQuery] = useState(initialQuery);
  const [activeType, setActiveType] =
    useState(initialType);

  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlQuery =
      searchParams.get("q") || "";

    const urlType =
      searchParams.get("type") === "shops"
        ? "shops"
        : "products";

    setQuery(urlQuery);
    setActiveType(urlType);
  }, [searchParams]);

  /*
  =========================================
  Search API
  =========================================
  */

  useEffect(() => {
    const value = query.trim();

    if (!value) {
      setProducts([]);
      setShops([]);
      setLoading(false);
      return;
    }

    const controller =
      new AbortController();

    const timer = setTimeout(
      async () => {
        try {
          setLoading(true);

          const response = await fetch(
            `/api/search?q=${encodeURIComponent(
              value
            )}&type=${activeType}`,
            {
              method: "GET",
              cache: "no-store",
              signal: controller.signal,
            }
          );

          if (!response.ok) {
            throw new Error(
              "Search failed"
            );
          }

          const data =
            await response.json();

          if (
            activeType === "products"
          ) {
            setProducts(
              data.products || []
            );

            setShops([]);
          } else {
            setShops(
              data.shops || []
            );

            setProducts([]);
          }
        } catch (error) {
          if (
            error.name ===
            "AbortError"
          ) {
            return;
          }

          console.error(
            "Search Error:",
            error
          );

          setProducts([]);
          setShops([]);
        } finally {
          if (
            !controller.signal.aborted
          ) {
            setLoading(false);
          }
        }
      },
      350
    );

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, activeType]);

  /*
  =========================================
  Update Search URL
  =========================================
  */

  const updateSearchUrl = (
    value,
    type
  ) => {
    const params =
      new URLSearchParams();

    const trimmedValue =
      value.trim();

    if (trimmedValue) {
      params.set(
        "q",
        trimmedValue
      );
    }

    if (type === "shops") {
      params.set(
        "type",
        "shops"
      );
    }

    const queryString =
      params.toString();

    router.replace(
      queryString
        ? `/search?${queryString}`
        : "/search",
      {
        scroll: false,
      }
    );
  };

  /*
  =========================================
  Search Input
  =========================================
  */

  const handleQueryChange = (
    event
  ) => {
    const value =
      event.target.value;

    setQuery(value);

    updateSearchUrl(
      value,
      activeType
    );
  };

  /*
  =========================================
  Search Type
  =========================================
  */

  const handleTypeChange = (
    type
  ) => {
    setActiveType(type);

    updateSearchUrl(
      query,
      type
    );
  };

  /*
  =========================================
  Clear Search
  =========================================
  */

  const handleClear = () => {
    setQuery("");

    setProducts([]);
    setShops([]);

    updateSearchUrl(
      "",
      activeType
    );
  };

  /*
  =========================================
  Shop Click
  =========================================
  */

  const handleShopClick = (
    shop
  ) => {
    if (!shop?.slug) {
      return;
    }

    router.push(
      `/shops/${shop.slug}`
    );
  };

  /*
  =========================================
  Add To Cart
  =========================================
  */

  const handleAddToCart = async (
    product
  ) => {
    try {
      await addToCart(
        product.id,
        1
      );

      await refreshCartCount();

      toast.success(
        `${product.name} কার্টে যোগ হয়েছে`
      );
    } catch (error) {
      console.error(
        "Add To Cart Error:",
        error
      );

      toast.error(
        error?.message ||
          "কার্টে যোগ করা যায়নি"
      );
    }
  };

  /*
  =========================================
  Page
  =========================================
  */

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6 lg:px-8">

        {/* =================================
            Search Input
        ================================= */}

        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <InputGroup className="h-12">

            <InputGroupAddon align="inline-start">
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
              ) : (
                <SearchIcon className="h-5 w-5 text-slate-500" />
              )}
            </InputGroupAddon>

            <InputGroupInput
              autoFocus
              type="search"
              value={query}
              onChange={
                handleQueryChange
              }
              placeholder="পণ্য বা দোকান খুঁজুন..."
              autoComplete="off"
              className="text-base"
              aria-label="Search products or shops"
            />

            {query && (
              <InputGroupAddon
                align="inline-end"
                onClick={handleClear}
                className="cursor-pointer"
              >
                <X className="h-4 w-4 text-slate-400 hover:text-slate-800" />
              </InputGroupAddon>
            )}

          </InputGroup>
        </div>

        {/* =================================
            Search Type
        ================================= */}

        <div className="mt-4 rounded-2xl bg-white p-1.5 shadow-sm">
          <div className="grid grid-cols-2 gap-1">

            {/* Products */}

            <button
              type="button"
              onClick={() =>
                handleTypeChange(
                  "products"
                )
              }
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                activeType ===
                "products"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Package className="h-4 w-4" />

              Products
            </button>

            {/* Shops */}

            <button
              type="button"
              onClick={() =>
                handleTypeChange(
                  "shops"
                )
              }
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                activeType ===
                "shops"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Store className="h-4 w-4" />

              Shops
            </button>

          </div>
        </div>

        {/* =================================
            Results
        ================================= */}

        <div className="mt-5">
          {activeType ===
          "products" ? (
            <ProductResults
              query={query}
              products={products}
              loading={loading}
              onAddToCart={
                handleAddToCart
              }
            />
          ) : (
            <ShopResults
              query={query}
              shops={shops}
              loading={loading}
              onShopClick={
                handleShopClick
              }
            />
          )}
        </div>

      </div>
    </main>
  );
}

/*
=========================================
Product Results
=========================================
*/

function ProductResults({
  query,
  products,
  loading,
  onAddToCart,
}) {
  /*
  ---------------------------------------
  Empty Search
  ---------------------------------------
  */

  if (!query.trim()) {
    return (
      <div className="rounded-2xl bg-white px-6 py-14 text-center shadow-sm">

        <Package className="mx-auto h-10 w-10 text-slate-300" />

        <p className="mt-3 text-sm font-semibold text-slate-700">
          Product খুঁজতে শুরু করুন
        </p>

        <p className="mt-1 text-xs text-slate-500">
          বাংলা, English অথবা
          Banglish দিয়ে Product
          খুঁজুন
        </p>

      </div>
    );
  }

  /*
  ---------------------------------------
  Loading
  ---------------------------------------
  */

  if (loading) {
    return (
      <div className="rounded-2xl bg-white px-6 py-14 text-center shadow-sm">

        <Loader2 className="mx-auto h-6 w-6 animate-spin text-emerald-600" />

        <p className="mt-3 text-sm text-slate-500">
          Product খোঁজা হচ্ছে...
        </p>

      </div>
    );
  }

  /*
  ---------------------------------------
  No Results
  ---------------------------------------
  */

  if (products.length === 0) {
    return (
      <div className="rounded-2xl bg-white px-6 py-14 text-center shadow-sm">

        <Package className="mx-auto h-10 w-10 text-slate-300" />

        <p className="mt-3 text-sm font-semibold text-slate-700">
          কোনো Product পাওয়া যায়নি
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          অন্য বানান, বাংলা অথবা
          Banglish দিয়ে আবার চেষ্টা
          করুন
        </p>

      </div>
    );
  }

  /*
  ---------------------------------------
  Product List
  ---------------------------------------
  */

  return (
    <section>

      {/* Header */}

      <div className="mb-3 flex items-center justify-between">

        <div>
          <h1 className="text-lg font-bold text-slate-900">
            Products
          </h1>

          <p className="text-xs text-slate-500">
            “{query}” এর জন্য
            ফলাফল
          </p>
        </div>

        <span className="text-sm font-medium text-slate-500">
          {products.length}টি
        </span>

      </div>

      {/* Product Grid */}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

        {products.map(
          (product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={
                onAddToCart
              }
            />
          )
        )}

      </div>

    </section>
  );
}

/*
=========================================
Shop Results
=========================================
*/

function ShopResults({
  query,
  shops,
  loading,
  onShopClick,
}) {
  const [viewMode, setViewMode] =
    useState("grid");

  /*
  ---------------------------------------
  Empty Search
  ---------------------------------------
  */

  if (!query.trim()) {
    return (
      <div className="rounded-2xl bg-white px-6 py-14 text-center shadow-sm">

        <Store className="mx-auto h-10 w-10 text-slate-300" />

        <p className="mt-3 text-sm font-semibold text-slate-700">
          Shop খুঁজতে শুরু করুন
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Shop-এর নাম, এলাকা বা
          বর্ণনা লিখে খুঁজুন
        </p>

      </div>
    );
  }

  /*
  ---------------------------------------
  Loading
  ---------------------------------------
  */

  if (loading) {
    return (
      <div className="rounded-2xl bg-white px-6 py-14 text-center shadow-sm">

        <Loader2 className="mx-auto h-6 w-6 animate-spin text-emerald-600" />

        <p className="mt-3 text-sm text-slate-500">
          Shop খোঁজা হচ্ছে...
        </p>

      </div>
    );
  }

  /*
  ---------------------------------------
  No Results
  ---------------------------------------
  */

  if (shops.length === 0) {
    return (
      <div className="rounded-2xl bg-white px-6 py-14 text-center shadow-sm">

        <Store className="mx-auto h-10 w-10 text-slate-300" />

        <p className="mt-3 text-sm font-semibold text-slate-700">
          কোনো Shop পাওয়া যায়নি
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Shop-এর নাম, এলাকা বা
          অন্য বানান দিয়ে আবার
          চেষ্টা করুন
        </p>

      </div>
    );
  }

  /*
  ---------------------------------------
  Results
  ---------------------------------------
  */

  return (
    <section>

      {/* Header */}

      <div className="mb-3 flex items-center justify-between gap-3">

        <div className="min-w-0">

          <h1 className="text-lg font-bold text-slate-900">
            Shops
          </h1>

          <p className="truncate text-xs text-slate-500">
            “{query}” এর জন্য
            ফলাফল
          </p>

        </div>

        <div className="flex shrink-0 items-center gap-2">

          <span className="text-sm font-medium text-slate-500">
            {shops.length}টি
          </span>

          {/* View Toggle */}

          <div className="flex rounded-lg border border-slate-200 bg-white p-0.5">

            {/* Grid */}

            <button
              type="button"
              onClick={() =>
                setViewMode(
                  "grid"
                )
              }
              className={`rounded-md p-1.5 transition ${
                viewMode ===
                "grid"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>

            {/* List */}

            <button
              type="button"
              onClick={() =>
                setViewMode(
                  "list"
                )
              }
              className={`rounded-md p-1.5 transition ${
                viewMode ===
                "list"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>

          </div>

        </div>

      </div>

      {/* =================================
          Grid View
      ================================= */}

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

          {shops.map(
            (shop) => (
              <StoreCard
                key={shop.id}
                shop={shop}
                viewMode="grid"
                showRating={false}
                showBookmark={false}
                showOpenStatus={false}
                onClick={
                  onShopClick
                }
              />
            )
          )}

        </div>
      ) : (
        /* =================================
           List View
        ================================= */

        <div className="space-y-3">

          {shops.map(
            (shop) => (
              <StoreCard
                key={shop.id}
                shop={shop}
                viewMode="list"
                showRating={false}
                showBookmark={false}
                showOpenStatus={false}
                onClick={
                  onShopClick
                }
              />
            )
          )}

        </div>
      )}

    </section>
  );
}