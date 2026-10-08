"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  ChevronRight,
  Grid,
  LayoutGrid,
  ShoppingBag,
  Shirt,
  Smartphone,
  Sparkles,
  BookOpen,
  Pill,
  Footprints,
} from "lucide-react";

import CategorySheet from "@/components/common/CategorySheet";

import SeeAllBtn from "@/components/common/SeeAllBtn"

const CATEGORY_ICONS = {
  grocery: ShoppingBag,
  fashion: Shirt,
  electronics: Smartphone,
  beauty: Sparkles,
  books: BookOpen,
  pharmacy: Pill,
  shoes: Footprints,
};

const CATEGORY_STYLES = {
  grocery: "bg-emerald-50 text-emerald-600",
  fashion: "bg-blue-50 text-blue-600",
  electronics: "bg-purple-50 text-purple-600",
  beauty: "bg-pink-50 text-pink-600",
  books: "bg-amber-50 text-amber-600",
  pharmacy: "bg-rose-50 text-rose-600",
  shoes: "bg-orange-50 text-orange-600",
};

export default function CategoriesSection({
  categories = [],
}) {
  const router = useRouter();

  const [openCategorySheet, setOpenCategorySheet] =
    useState(false);

  const handleCategoryClick = (category) => {
    router.push(`/category/${category.slug}`);
  };

  const handleSeeAll = () => {
    setOpenCategorySheet(true);
  };

  return (
    <>
      <section className="mx-auto w-full max-w-6xl py-4 sm:px-4">
        {/* Section Header */}
        <div className="mb-3 flex items-center justify-between sm:mb-4">
          <div>
            <h2 className="flex items-center gap-1.5 text-sm font-bold text-slate-900 sm:text-lg">
              <Grid className="h-4 w-4 text-emerald-600 sm:hidden" />

              ক্যাটাগরি
            </h2>

            <p className="hidden text-[11px] text-slate-500 sm:block sm:text-xs">
              আপনার প্রয়োজনীয় ক্যাটাগরি বেছে নিন
            </p>
          </div>

          {/* See All */}
          <SeeAllBtn onClick={handleSeeAll} />
        </div>

        {/* No Categories */}
        {categories.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-8 text-center">
            <LayoutGrid className="mx-auto mb-2 h-8 w-8 text-slate-300" />

            <p className="text-sm text-slate-500">
              কোনো Category পাওয়া যায়নি
            </p>
          </div>
        ) : (
          <>
            {/* ================= MOBILE ================= */}
            <div className="block lg:hidden">
              <div className="-mx-3 flex gap-3 overflow-x-auto px-3 pb-2 scrollbar-none">
                {categories.map((category) => {
                  const Icon =
                    CATEGORY_ICONS[category.slug] ||
                    LayoutGrid;

                  const style =
                    CATEGORY_STYLES[category.slug] ||
                    "bg-slate-50 text-slate-600";

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() =>
                        handleCategoryClick(category)
                      }
                      className="group flex w-[72px] shrink-0 flex-col items-center gap-1.5"
                    >
                      <div
                        className={`flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 shadow-xs transition-all duration-200 active:scale-95 ${style}`}
                      >
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
                        )}
                      </div>

                      <span className="w-full truncate text-center text-[11px] font-semibold text-slate-700">
                        {category.name}
                      </span>
                    </button>
                  );
                })}

                {/* See All */}
                <button
                  type="button"
                  onClick={handleSeeAll}
                  className="group flex w-[72px] shrink-0 flex-col items-center gap-1.5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-100 text-slate-600 transition-all duration-200 group-hover:bg-slate-900 group-hover:text-white active:scale-95">
                    <ChevronRight className="h-6 w-6" />
                  </div>

                  <span className="w-full truncate text-center text-[11px] font-bold text-emerald-600">
                    সব দেখুন
                  </span>
                </button>
              </div>
            </div>

            {/* ================= DESKTOP ================= */}
            <div className="hidden grid-cols-7 gap-3 lg:grid">
              {categories.map((category) => {
                const Icon =
                  CATEGORY_ICONS[category.slug] ||
                  LayoutGrid;

                const style =
                  CATEGORY_STYLES[category.slug] ||
                  "bg-slate-50 text-slate-600";

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                      handleCategoryClick(category)
                    }
                    className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-3 transition-all hover:border-emerald-500 hover:shadow-md"
                  >
                    <div
                      className={`mb-2 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl ${style}`}
                    >
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                      )}
                    </div>

                    <span className="text-xs font-bold text-slate-800 transition-colors group-hover:text-emerald-600">
                      {category.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </section>

      {/* Category Sheet */}
      <CategorySheet
        open={openCategorySheet}
        onOpenChange={setOpenCategorySheet}
        categories={categories}
      />
    </>
  );
}