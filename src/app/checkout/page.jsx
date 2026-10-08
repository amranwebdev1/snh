import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";
import Main from "./_components/Main";

import { getCartItems } from "@/lib/cart/getCartItems";
import { getUserAddresses } from "@/lib/address/getUserAddresses";
import { createClient } from "@/lib/supabase/server";

const CheckoutPage = async ({ searchParams }) => {
  const params = await searchParams;

  const buyNowProductId =
    params?.product || null;
const isBuyNow = Boolean(buyNowProductId);

  const buyNowQuantity =
    Number(params?.quantity || 1);

  let cartItems = [];

  // --------------------------------
  // Buy Now
  // --------------------------------

  if (buyNowProductId) {
    const supabase = await createClient();

    const { data: product, error } = await supabase
  .from("products")
  .select(`
    id,
    shop_id,
    name,
    slug,
    price,
    discount_price,
    stock,
    thumbnail,

    shop:shops (
      id,
      name,
      owner_id
    )
  `)
  .eq("id", buyNowProductId)
  .eq("approval_status", "approved")
  .eq("status", "active")
  .eq("is_delete", false)
  .single();

    if (error || !product) {
      throw new Error("Product not found");
    }

    if (
      buyNowQuantity < 1 ||
      buyNowQuantity > product.stock
    ) {
      throw new Error("Invalid product quantity");
    }

    cartItems = [
  {
    id: `buy-now-${product.id}`,
    quantity: buyNowQuantity,
    product,
  },
];
  } else {
    // --------------------------------
    // Normal Cart Checkout
    // --------------------------------

    cartItems = await getCartItems();
  }

  // --------------------------------
  // Addresses
  // --------------------------------

  const addresses = await getUserAddresses();

  // --------------------------------
  // Price
  // --------------------------------

  const subtotal = cartItems.reduce(
    (sum, item) => {
      const price =
        Number(item.product.discount_price) > 0 &&
        Number(item.product.discount_price) <
          Number(item.product.price)
          ? Number(item.product.discount_price)
          : Number(item.product.price);

      return sum + price * item.quantity;
    },
    0
  );

  const deliveryFee = 0;

  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <PageHeader title="Checkout" />

      <Container className="mt-5 mb-10">
        <Main
          cartItems={cartItems}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
          addresses={addresses}
          isBuyNow={isBuyNow}
        />
      </Container>
    </div>
  );
};

export default CheckoutPage;