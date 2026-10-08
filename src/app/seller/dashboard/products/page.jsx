import Main from "./_components/Main";
import { getSellerProducts } from "./lib/getSellerProducts";

export default async function ProductsPage() {
  const products = await getSellerProducts();

  return <Main products={products} />;
}