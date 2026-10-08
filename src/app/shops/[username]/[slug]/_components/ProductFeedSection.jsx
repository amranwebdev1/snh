"use client";

import { Store } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";

export default function ProductFeedSection({
  filteredProducts,
  selectedCategory,
  categories,
  onAddToCart,
  onResetFilters,
}) {
  const currentCategory =
    categories.find((c) => c.id === selectedCategory)?.label || "All";

  return (
    <section className="mt-4">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-slate-700">
          <Store className="h-4 w-4 text-emerald-600" />

          {selectedCategory === "all"
            ? "All Products"
            : currentCategory}
        </h2>

        <span className="text-xs font-bold text-slate-400">
          {filteredProducts.length} Items
        </span>
      </div>

      {/* Product Grid */}
      <div className="px-3 sm:px-4">
        {filteredProducts.length === 0 ? (
          <div className="my-4 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <Store className="mx-auto mb-3 h-10 w-10 text-slate-300" />

            <p className="text-sm font-medium text-slate-600">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </p>

            <button
              onClick={onResetFilters}
              className="mt-3 text-xs font-bold text-emerald-600 hover:underline"
            >
              সকল পণ্য দেখুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}