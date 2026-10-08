import { notFound } from "next/navigation";
import { getCartQuantity } from "@/lib/cart/getCartQuantity";
import Main from "./_components/Main";

import {
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products/getProductBySlug";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  
  const product = await getProductBySlug(slug);
  
  const cartQuantity = await getCartQuantity(product.id);


  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.category,
    product.shop_id
  );

  return (
    <Main
      product={product}
      relatedProducts={relatedProducts}
      cartQuantity={cartQuantity}
    />
  );
}