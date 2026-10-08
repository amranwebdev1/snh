"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/providers/CartProvider";

import { updateCartQuantity } from "@/lib/cart/updateCartQuantity";
import { addToCart } from "@/lib/cart/addToCart";

import { useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "@/components/common/PageHeader";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ShopCard from "./ShopCard";
import QuantitySelector from "@/components/common/QuantitySelector";
import StickyCheckoutBar from "./StickyCheckoutBar";
import RelatedProducts from "./RelatedProducts";

export default function Main({
  product,
  relatedProducts,
  cartQuantity,
}) {
  const router = useRouter();

  const [quantity, setQuantity] = useState(
    cartQuantity || 1
  );

  const [isInCart, setIsInCart] = useState(
    cartQuantity > 0
  );

  const { refreshCartCount } = useCart();

  const handleAddToCart = async () => {
    if (quantity > product.stock) return;

    if (!isInCart) {
      await addToCart(product.id, quantity);

      await refreshCartCount();

      setIsInCart(true);
    } else {
      await addToCart(product.id, 1);

      await refreshCartCount();

      setQuantity((prev) =>
        Math.min(product.stock, prev + 1)
      );
    }

    toast.success("Product added to cart");
  };

  const increaseQuantity = async () => {
    if (quantity >= product.stock) return;

    const next = quantity + 1;

    setQuantity(next);

    await updateCartQuantity(
      product.id,
      next
    );

    await refreshCartCount();
  };

  const decreaseQuantity = async () => {
    if (quantity <= 1) return;

    const next = quantity - 1;

    setQuantity(next);

    await updateCartQuantity(
      product.id,
      next
    );

    await refreshCartCount();
  };

  const handleBuyNow = () => {
    if (!product?.id) return;

    if (product.stock <= 0) {
      toast.error("Product out of stock");
      return;
    }

    if (quantity < 1) {
      toast.error("Invalid quantity");
      return;
    }

    if (quantity > product.stock) {
      toast.error("পর্যাপ্ত stock নেই");
      return;
    }

    const params = new URLSearchParams({
      product: product.id,
      quantity: String(quantity),
    });

    router.push(
      `/checkout?${params.toString()}`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <PageHeader title={product.name} />

      <main className="mx-auto max-w-5xl">
        <ProductGallery
          images={product.images || []}
          thumbnail={product.thumbnail}
        />

        <ProductInfo product={product} />

        <QuantitySelector
          quantity={quantity}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          max={product?.stock}
          size="md"
        />

        <ShopCard shop={product.shop} />

        <RelatedProducts
          products={relatedProducts}
        />
      </main>

      <StickyCheckoutBar
        product={product}
        quantity={quantity}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
}