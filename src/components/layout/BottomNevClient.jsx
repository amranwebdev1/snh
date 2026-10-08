"use client";

import { useState } from "react";
import { useCart } from "@/providers/CartProvider";

import {
  useRouter,
  usePathname,
} from "next/navigation";

import {
  Home,
  ChartBarStacked,
  ShoppingCart,
  User,
} from "lucide-react";

import CategorySheet from "@/components/common/CategorySheet";

export default function BotomNevClient({
  categories = [],
}) {
  const [openCaregorySheet, setOpenCaregorySheet] =
    useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { cartCount } = useCart();

  return (
    <div>
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white px-2 py-2 shadow-lg lg:hidden">
        <div className="flex items-center justify-around">

          {/* Home */}
          <button
            type="button"
            onClick={() => router.push("/")}
            className={`flex w-16 flex-col items-center justify-center gap-1 text-gray-600 transition-colors hover:text-green-600 ${
              pathname === "/"
                ? "text-green-500"
                : ""
            }`}
          >
            <Home className="h-5 w-5" />

            <span className="text-[10px] font-medium">
              Home
            </span>
          </button>

          {/* Category */}
          <button
            type="button"
            onClick={() =>
              setOpenCaregorySheet(true)
            }
            className="flex w-16 flex-col items-center justify-center gap-1 text-gray-600 transition-colors hover:text-green-600"
          >
            <ChartBarStacked className="h-5 w-5" />

            <span className="text-[10px] font-medium">
              Category
            </span>
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={() => router.push("/cart")}
            className={`flex w-16 flex-col items-center justify-center gap-1 text-gray-600 transition-colors hover:text-green-600 ${
              pathname === "/cart"
                ? "text-green-500"
                : ""
            }`}
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </div>

            <span className="text-[10px] font-medium">
              Cart
            </span>
          </button>

          {/* Profile */}
          <button
            type="button"
            onClick={() =>
              router.push("/profile")
            }
            className={`flex w-16 flex-col items-center justify-center gap-1 text-gray-600 transition-colors hover:text-green-600 ${
              pathname === "/profile"
                ? "text-green-500"
                : ""
            }`}
          >
            <User className="h-5 w-5" />

            <span className="text-[10px] font-medium">
              Profile
            </span>
          </button>

        </div>
      </div>

      <CategorySheet
        open={openCaregorySheet}
        onOpenChange={setOpenCaregorySheet}
        categories={categories}
      />
    </div>
  );
}