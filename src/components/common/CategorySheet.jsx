"use client";

import { useEffect } from "react";
import { ChevronRight, LayoutGrid } from "lucide-react";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function CategoryDrawer({
  open,
  onOpenChange,
  categories = [],
}) {
  useEffect(() => {
    if (!open) return;

    window.location.hash = "category";

    const handleHashChange = () => {
      if (!window.location.hash.includes("category")) {
        onOpenChange(false);
      }
    };

    window.addEventListener(
      "hashchange",
      handleHashChange
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        handleHashChange
      );
    };
  }, [open, onOpenChange]);

  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      if (
        window.location.hash.includes("category")
      ) {
        window.history.back();
      }

      onOpenChange(false);
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={handleOpenChange}
    >
      <SheetContent
        side="left"
        className="flex h-dvh w-[85%] max-w-sm flex-col overflow-hidden p-0"
      >
        {/* Header */}
        <SheetHeader className="shrink-0 border-b bg-white p-4">
          <SheetTitle className="text-lg font-bold">
            Categories
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="flex flex-col gap-2 px-3 py-2 pb-8">
            {categories.length > 0 ? (
              categories.map((item) => (
                <Link
                  key={item.id}
                  href={`/category/${item.slug}`}
                  onClick={() =>
                    onOpenChange(false)
                  }
                  className="flex min-h-14 shrink-0 items-center justify-between gap-2 rounded-xl bg-green-50 px-3 py-2.5 transition-colors hover:bg-green-100/80"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <LayoutGrid
                          size={20}
                          className="text-green-700"
                        />
                      )}
                    </div>

                    <p className="truncate text-sm font-medium text-slate-700">
                      {item.name}
                    </p>
                  </div>

                  <ChevronRight
                    size={18}
                    className="shrink-0 text-slate-400"
                  />
                </Link>
              ))
            ) : (
              <div className="px-4 py-10 text-center">
                <LayoutGrid className="mx-auto mb-3 h-10 w-10 text-slate-300" />

                <p className="text-sm font-medium text-slate-600">
                  কোনো Category পাওয়া যায়নি
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  পরে আবার চেষ্টা করুন।
                </p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}