"use client";

import { useMemo, useState } from "react";

import CartItemCard from "./CartItemCard";
import CartSummary from "./CartSummary";
import MobileCheckoutBar from "./MobileCheckoutBar";
import EmptyCart from "./EmptyCart";

export default function Main({ initialCartItems,
  initialDeliveryFee = 0,
  deliveryZoneName = null, }) {
  const [cartItems, setCartItems] = useState(initialCartItems);


  const subtotal = useMemo(() => {
  return cartItems.reduce((sum, item) => {
    const price = Number(
      item?.product?.price || 0
    );

    const discountPrice = Number(
      item?.product?.discount_price || 0
    );

    const finalPrice =
      discountPrice > 0 &&
      discountPrice < price
        ? discountPrice
        : price;

    return (
      sum +
      finalPrice *
        Number(item?.quantity || 0)
    );
  }, 0);
}, [cartItems]);

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItemQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="py-5 lg:py-8">
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">
              {cartItems?.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onRemove={removeItem}
                  onQuantityChange={updateItemQuantity}
                />
              ))}
            </div>

            {/* Desktop Summary */}
            <div className="h-fit lg:sticky lg:top-24">
  <CartSummary
    cartItems={cartItems}
    subtotal={subtotal}
    deliveryFee={initialDeliveryFee}
    deliveryZoneName={deliveryZoneName}
  />
</div>
          </div>

          {/* Mobile Checkout */}
          <MobileCheckoutBar
            total={subtotal}
            itemCount={cartItems.length}
          />
        </>
      )}
    </div>
  );
}