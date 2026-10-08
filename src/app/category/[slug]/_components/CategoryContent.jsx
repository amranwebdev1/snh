"use client";

import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { addToCart } from "@/lib/cart/addToCart";
import { useCart } from "@/providers/CartProvider";

import PageHeader from "@/components/common/PageHeader";
import ProductCard from "@/components/common/ProductCard";

export default function CategoryContent({
  category,
  subcategories = [],
  products = [],
}) {
  const [selectedSubcategory, setSelectedSubcategory] =
    useState("all");

  const { refreshCartCount } = useCart();

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product.id, 1);

      await refreshCartCount();

      toast.success(
        `${product.name} কার্টে যোগ হয়েছে`
      );
    } catch (err) {
      toast.error(
        err.message || "কার্টে যোগ করা যায়নি"
      );
    }
  };

  const filteredProducts = useMemo(() => {
    if (selectedSubcategory === "all") {
      return products;
    }

    return products.filter(
      (product) =>
        product.subcategory_id === selectedSubcategory
    );
  }, [products, selectedSubcategory]);

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Header */}
        <div className="border-b border-slate-200 bg-white">
          <PageHeader
            title={category.name}
            rightAction={
              <span className="whitespace-nowrap text-sm font-medium text-slate-600 sm:text-base">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1
                  ? "Product"
                  : "Products"}
              </span>
            }
          />
        </div>

        {/* Subcategory Filter */}
        {subcategories.length > 0 && (
          <section className="pt-5">
            <h2 className="mb-3 text-base font-bold text-slate-900">
              Subcategories
            </h2>

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {/* All */}
              <button
                type="button"
                onClick={() =>
                  setSelectedSubcategory("all")
                }
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition active:scale-95 ${
                  selectedSubcategory === "all"
                    ? "border-green-600 bg-green-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-green-500 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                All
              </button>

              {/* Subcategories */}
              {subcategories.map((subcategory) => {
                const isActive =
                  selectedSubcategory === subcategory.id;

                return (
                  <button
                    key={subcategory.id}
                    type="button"
                    onClick={() =>
                      setSelectedSubcategory(
                        subcategory.id
                      )
                    }
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition active:scale-95 ${
                      isActive
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-green-500 hover:bg-green-50 hover:text-green-700"
                    }`}
                  >
                    {subcategory.name}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Products */}
        <section className="pt-7">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center">
              <p className="text-base font-semibold text-slate-700">
                এই Subcategory-তে কোনো Product নেই
              </p>

              <p className="mt-2 text-sm text-slate-500">
                অন্য Subcategory নির্বাচন করে দেখুন।
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}