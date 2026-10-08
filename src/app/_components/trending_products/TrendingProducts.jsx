"use client";
import { useCart } from "@/providers/CartProvider";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import {addToCart} from "@/lib/cart/addToCart"

import ProductCard from "@/components/common/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast"
import SeeAllBtn from "@/components/common/SeeAllBtn"


function TrendingProducts({ products = [] }) {
  const scrollRef = useRef(null);
  const router = useRouter();
  const {refreshCartCount} = useCart();
  const scroll = (offset) => {
    scrollRef.current?.scrollBy({
      left: offset,
      behavior: "smooth",
    });
  };

const handleAddToCart = async (product) => {
  try {
    await addToCart(product.id, 1); // সবসময় ১টা যোগ হবে
    await refreshCartCount();       // Header Badge Update
    toast.success(`${product.name} কার্টে যোগ হয়েছে`);
  } catch (err) {
    toast.error(err.message || "কার্টে যোগ করা যায়নি");
  }
};
  return (
    <section className="relative py-2">
      {/* Header */}
      <div className="flex items-center justify-between py-3">
        <h2 className="text-sm font-bold text-slate-900 sm:text-lg">Trending Products</h2>

        <SeeAllBtn href="/products" />
      </div>

      {/* Desktop Arrow */}
      <button
        onClick={() => scroll(-320)}
        className="absolute left-0 top-[58%] z-10 hidden h-10 w-10 items-center justify-center rounded-full border bg-white shadow-lg transition hover:bg-gray-100 md:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Products */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-3 snap-x scrollbar-hide"
      >
        {products.length === 0 ? (
          <div className="w-full rounded-xl border bg-white p-8 text-center text-sm text-slate-500">
            No trending products found.
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="w-[170px] shrink-0 snap-start md:w-[220px]"
            >
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </div>
          ))
        )}
      </div>

      {/* Desktop Arrow */}
      <button
        onClick={() => scroll(320)}
        className="absolute right-0 top-[58%] z-10 hidden h-10 w-10 items-center justify-center rounded-full border bg-white shadow-lg transition hover:bg-gray-100 md:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </section>
  );
}

export default TrendingProducts;