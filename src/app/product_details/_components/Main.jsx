"use client";
import React, { useState } from "react";
import { Toast } from "./Toast";
import { Navbar } from "./Navbar";
import { Breadcrumb } from "./Breadcrumb";
import { ProductGallery } from "./ProductGallery";
import { ProductDetails } from "./ProductDetails";
import { FeaturesGrid } from "./FeaturesGrid";
import { ProductTabs } from "./ProductTabs";
import { ProductReviews } from "./ProductReviews";
import { SimilarProducts } from "./SimilarProducts";
import { MobileActionBar } from "./MobileActionBar";
import { CartDrawer } from "./CartDrawer";

const reviewsList = [
  {
    id: 1,
    user: "তানভির আহমেদ",
    avatar: "https://i.pravatar.cc/100?img=33",
    rating: 5,
    date: "12 Feb 2026",
    comment: "কাপড়ের মান অসাধারণ! ১০০% পিওর কটন। সাইজিং একদম পারফেক্ট ছিল। ডেলিভারিও খুব দ্রুত পেয়েছি। ধন্যবাদ!",
    verified: true,
    helpfulCount: 14,
  },
  {
    id: 2,
    user: "সাব্বির হোসেন",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 4,
    date: "28 Jan 2026",
    comment: "পণ্য ভালো ছিল, তবে ডেলিভারি পেতে ৩ দিন সময় লেগেছে। ওভারঅল ডিলটা বেশ ভালো।",
    verified: true,
    helpfulCount: 5,
  },
];

const similarProducts = [
  { id: 1, name: "ক্লাসিক ক্যাজুয়াল শার্ট", price: 750, originalPrice: 1000, rating: 4.7, image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=500&q=80" },
  { id: 2, name: "প্রিমিয়াম ব্ল্যাক শার্ট", price: 950, originalPrice: 1300, rating: 4.9, image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=500&q=80" },
];

const productImages = [
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80",
];

const colors = [
  { name: "Navy", class: "bg-slate-900" },
  { name: "Black", class: "bg-black" },
  { name: "White", class: "bg-white border-slate-300" },
  { name: "Sky Blue", class: "bg-sky-400" },
];

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function App() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Navy");
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const addToCart = () => {
    const newItem = {
      id: Date.now(),
      name: "প্রিমিয়াম ক্যাজুয়াল কটন ফুল স্লিভ শার্ট",
      price: 850,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: productImages[selectedImage],
    };

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.size === selectedSize && item.color === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevItems, newItem];
    });

    setIsCartOpen(true);
    showToast("প্রডাক্ট কার্টে যোগ করা হয়েছে!");
  };

  const handleBuyNow = () => {
    addToCart();
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24 md:pb-12 relative">
      <Toast message={toastMessage} />

      <Navbar
        liked={liked}
        setLiked={setLiked}
        totalItemsCount={totalItemsCount}
        onShare={() => {
          navigator.clipboard?.writeText(window.location.href);
          showToast("লিঙ্ক কপি করা হয়েছে!");
        }}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-0 md:px-8 py-0 md:py-6">
        <Breadcrumb />

        <div className="grid gap-6 lg:grid-cols-12 bg-white md:rounded-3xl md:p-6 md:shadow-sm border-b md:border border-slate-200">
          <ProductGallery
            images={productImages}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          <ProductDetails
            colors={colors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            sizes={sizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            quantity={quantity}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            addToCart={addToCart}
            onBuyNow={handleBuyNow}
          />
        </div>

        <FeaturesGrid />
        
          <ProductTabs />
          <ProductReviews reviews={reviewsList} />
          <SimilarProducts products={similarProducts} />
      </main>

      <MobileActionBar addToCart={addToCart} onBuyNow={handleBuyNow} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        subtotal={subtotal}
      />
    </div>
  );
}
