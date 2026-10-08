"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Loader2,
  PackageSearch,
  RefreshCw,
} from "lucide-react";

import { useCart } from "@/providers/CartProvider";
import { addToCart } from "@/lib/cart/addToCart";
import ProductCard from "@/components/common/ProductCard";

import toast from "react-hot-toast";

const PAGE_SIZE = 20;

const AllProduct = ({
  products: initialProducts = [],
  categories = [],
}) => {
  const { refreshCartCount } = useCart();

  // ---------------------------------------
  // Products
  // ---------------------------------------

  const [products, setProducts] =
    useState(initialProducts);

  // ---------------------------------------
  // Category
  // ---------------------------------------

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  // ---------------------------------------
  // Pagination
  // ---------------------------------------

  const [offset, setOffset] = useState(
    initialProducts.length
  );

  const [hasMore, setHasMore] = useState(
    initialProducts.length >= PAGE_SIZE
  );

  // ---------------------------------------
  // UI State
  // ---------------------------------------

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ---------------------------------------
  // Refs
  // ---------------------------------------

  const loadingRef = useRef(false);

  const observerRef = useRef(null);

  const abortControllerRef = useRef(null);

  // ---------------------------------------
  // Add To Cart
  // ---------------------------------------

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product.id, 1);

      await refreshCartCount();

      toast.success(
        `${product.name} কার্টে যোগ হয়েছে`
      );
    } catch (err) {
      toast.error(
        err?.message ||
          "কার্টে যোগ করা যায়নি"
      );
    }
  };

  // ---------------------------------------
  // Load Products
  // ---------------------------------------

  const loadProducts = useCallback(
    async ({
      categoryId = null,
      nextOffset = 0,
      replace = false,
    } = {}) => {
      if (loadingRef.current) {
        return;
      }

      if (!replace && !hasMore) {
        return;
      }

      /*
        নতুন category request হলে
        আগের request cancel হবে।
      */
      if (replace) {
        abortControllerRef.current?.abort();

        abortControllerRef.current =
          new AbortController();
      }

      const controller =
        abortControllerRef.current;

      try {
        loadingRef.current = true;

        setLoading(true);

        setError("");

        const params =
          new URLSearchParams();

        params.set(
          "offset",
          String(nextOffset)
        );

        params.set(
          "limit",
          String(PAGE_SIZE)
        );

        if (categoryId) {
          params.set(
            "category_id",
            categoryId
          );
        }

        const response = await fetch(
          `/api/products?${params.toString()}`,
          {
            method: "GET",
            cache: "no-store",
            signal: controller?.signal,
          }
        );

        const result =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result?.message ||
              "Products load করা যায়নি"
          );
        }

        const newProducts =
          result.products || [];

        const pagination =
          result.pagination || {};

        // -----------------------------------
        // Replace
        // -----------------------------------

        if (replace) {
          setProducts(newProducts);
        }

        // -----------------------------------
        // Append
        // -----------------------------------

        else {
          setProducts(
            (currentProducts) => {
              const existingIds =
                new Set(
                  currentProducts.map(
                    (product) =>
                      product.id
                  )
                );

              const uniqueProducts =
                newProducts.filter(
                  (product) =>
                    !existingIds.has(
                      product.id
                    )
                );

              return [
                ...currentProducts,
                ...uniqueProducts,
              ];
            }
          );
        }

        setOffset(
          pagination.nextOffset ??
            nextOffset +
              newProducts.length
        );

        setHasMore(
          Boolean(pagination.hasMore)
        );
      } catch (err) {
        /*
          AbortController দ্বারা cancel
          হওয়া request error দেখাবো না।
        */

        if (
          err?.name ===
          "AbortError"
        ) {
          return;
        }

        console.error(
          "Load Products Error:",
          err
        );

        setError(
          err?.message ||
            "Products load করা যায়নি"
        );
      } finally {
        /*
          শুধুমাত্র active request
          loading false করবে।
        */

        if (
          !controller?.signal
            ?.aborted
        ) {
          loadingRef.current = false;

          setLoading(false);
        }
      }
    },
    [hasMore]
  );

  // ---------------------------------------
  // Category Change
  // ---------------------------------------

  const handleCategoryChange =
    async (categoryId) => {
      if (
        categoryId ===
        selectedCategory
      ) {
        return;
      }

      /*
        নতুন category আসার সাথে সাথে
        পুরোনো request cancel।
      */

      abortControllerRef.current?.abort();

      loadingRef.current = false;

      setSelectedCategory(categoryId);

      setError("");

      // -----------------------------------
      // All Products
      // -----------------------------------

      if (categoryId === "all") {
        setProducts(initialProducts);

        setOffset(
          initialProducts.length
        );

        setHasMore(
          initialProducts.length >=
            PAGE_SIZE
        );

        setLoading(false);

        return;
      }

      // -----------------------------------
      // Category Products
      // -----------------------------------

      setProducts([]);

      setOffset(0);

      setHasMore(true);

      await loadProducts({
        categoryId,
        nextOffset: 0,
        replace: true,
      });
    };

  // ---------------------------------------
  // Retry
  // ---------------------------------------

  const handleRetry = async () => {
    setError("");

    await loadProducts({
      categoryId:
        selectedCategory === "all"
          ? null
          : selectedCategory,

      nextOffset:
        selectedCategory === "all"
          ? offset
          : offset,

      replace: false,
    });
  };

  // ---------------------------------------
  // Infinite Scroll
  // ---------------------------------------

  useEffect(() => {
    const target =
      observerRef.current;

    if (!target) {
      return;
    }

    if (!hasMore) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          const entry =
            entries[0];

          if (
            !entry?.isIntersecting
          ) {
            return;
          }

          if (loadingRef.current) {
            return;
          }

          loadProducts({
            categoryId:
              selectedCategory ===
              "all"
                ? null
                : selectedCategory,

            nextOffset: offset,

            replace: false,
          });
        },
        {
          root: null,

          /*
            User একদম নিচে পৌঁছানোর
            আগেই request শুরু হবে।
          */

          rootMargin: "400px",

          threshold: 0,
        }
      );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [
    offset,
    hasMore,
    selectedCategory,
    loadProducts,
  ]);

  // ---------------------------------------
  // Cleanup
  // ---------------------------------------

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return (
    <section className="pb-20 pt-5">

      {/* ================================= */}
      {/* Sticky Header */}
      {/* ================================= */}

      <div className="sticky top-0 z-20 -mx-2.5 bg-slate-100 px-2.5 pb-2 pt-2 sm:-mx-4 sm:px-4">

        <div className="mb-3 flex items-center justify-between gap-3">

          <h2 className="text-xl font-bold text-slate-900">
            All Products
          </h2>

          <span className="shrink-0 text-xs text-slate-500">
            {products.length} Products
          </span>

        </div>

        {/* ================================= */}
        {/* Categories */}
        {/* ================================= */}

        <div className="scrollbar-hide flex gap-2 overflow-x-auto">

          {/* All */}

          <button
            type="button"
            onClick={() =>
              handleCategoryChange(
                "all"
              )
            }
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${
              selectedCategory ===
              "all"
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600"
            }`}
          >
            সব
          </button>

          {/* Categories */}

          {categories.map(
            (category) => {
              const active =
                selectedCategory ===
                category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    handleCategoryChange(
                      category.id
                    )
                  }
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    active
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600"
                  }`}
                >
                  {category.name}
                </button>
              );
            }
          )}

        </div>
      </div>

      {/* ================================= */}
      {/* Error */}
      {/* ================================= */}

      {error && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-5 text-center">

          <p className="text-sm font-medium text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={
              handleRetry
            }
            disabled={loading}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            আবার চেষ্টা করুন
          </button>

        </div>
      )}

      {/* ================================= */}
      {/* Empty State */}
      {/* ================================= */}

      {!loading &&
        !error &&
        products.length === 0 && (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center">

            <PackageSearch className="mx-auto mb-3 h-12 w-12 text-slate-300" />

            <h3 className="text-sm font-semibold text-slate-700">
              কোনো পণ্য পাওয়া যায়নি
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              এই category-তে বর্তমানে
              কোনো পণ্য নেই।
            </p>

          </div>
        )}

      {/* ================================= */}
      {/* Product Grid */}
      {/* ================================= */}

      {products.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

          {products.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={
                  handleAddToCart
                }
              />
            )
          )}

        </div>
      )}

      {/* ================================= */}
      {/* Infinite Scroll Sentinel */}
      {/* ================================= */}

      <div
        ref={observerRef}
        className="flex min-h-24 items-center justify-center"
      >

        {loading && (
          <div className="flex items-center gap-2 text-sm text-slate-500">

            <Loader2
              size={18}
              className="animate-spin"
            />

            <span>
              আরও পণ্য লোড হচ্ছে...
            </span>

          </div>
        )}

        {!loading &&
          !error &&
          !hasMore &&
          products.length > 0 && (
            <p className="text-xs text-slate-400">
              সব পণ্য দেখানো হয়েছে
            </p>
          )}

      </div>
    </section>
  );
};

export default AllProduct;