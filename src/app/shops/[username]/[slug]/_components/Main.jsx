"use client";

import React, { useState, useMemo } from "react";
import {useRouter} from "next/navigation";
import { useCart } from "@/providers/CartProvider";

import toast from "react-hot-toast"
// Components Import

import HeaderNav from "./HeaderNav";
import ShopProfileHeader from "./ShopProfileHeader";
import ShopMetaCard from "./ShopMetaCard";
import FilterSearchBar from "./FilterSearchBar";
import ProductFeedSection from "./ProductFeedSection";
import ShopReviewsList from "./ShopReviewsList";
import OpeningHoursModal from "./OpeningHoursModal";

import {addToCart} from "@/lib/cart/addToCart"

export default function Main({shop,products}) {
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isHoursModalOpen, setIsHoursModalOpen] = useState(false);

const router = useRouter();
const {refreshCartCount} = useCart();

  

  const handleToggleFollow = () => {
    setIsFollowing((prev) => !prev);
    toast.success(
      !isFollowing
        ? `${shop.name}-কে ফলো করা হয়েছে`
        : `${shop.name}-কে আনফলো করা হয়েছে`
    );
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: shop?.name,
        url: window.location.href,
      });
    } else {
      toast.success("লিঙ্ক কপি করা হয়েছে!");
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);



  const categoryList = useMemo(() => {
  const unique = [...new Set(products.map((p) => p.category).filter(Boolean))];

  return [
    { id: "all", label: "All" },
    ...unique.map((item) => ({
      id: item,
      label: item,
    })),
  ];
}, [products]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 pb-12">
      <HeaderNav
        shopName={shop?.name}
        onShare={handleShare}
        onOpenCart={() => router.push("/cart")}
      />

      <main className="max-w-4xl mx-auto">
        <ShopProfileHeader
          shop={shop}
          isFollowing={isFollowing}
          onToggleFollow={handleToggleFollow}
        />

        <ShopMetaCard
          shop={shop}
          productCount={products?.length}
        />

        <FilterSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categoryList}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <ProductFeedSection
          filteredProducts={filteredProducts}
          categories={categoryList}
          selectedCategory={selectedCategory}
          onAddToCart={handleAddToCart}
          onResetFilters={() => {
            setSelectedCategory("all");
            setSearchQuery("");
          }}
        />
      </main>

      {isHoursModalOpen && (
        <OpeningHoursModal
          hours={shop?.openingHours}
          onClose={() => setIsHoursModalOpen(false)}
        />
      )}
    </div>
  );
}
