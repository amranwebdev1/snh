import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Container from "@/components/common/Container";
import Header from "@/components/layout/Header";
import BottomNev from "@/components/layout/BottomNev";

import Hero from "./_components/hero/Hero";
import Category from "./_components/category/Category";
import { getCategories } from "@/lib/categories/getCategories";

import Store from "./_components/store/Store";
import TrendingProducts from "./_components/trending_products/TrendingProducts";
import AllProduct from "./_components/all_products/AllProduct";

import { getPopularShops } from "@/lib/shop/getPopularShops";
import {
  getTrendingProducts,
  getLatestProducts,
} from "@/lib/products/getProducts";

async function HomePage() {
  const [popularShops, trendingProducts, latestProducts] =
    await Promise.all([
      getPopularShops(),
      getTrendingProducts(10),
      getLatestProducts(20),
    ]);

const categories = await getCategories();


const cookieStore = await cookies();

  const appMode = cookieStore.get("app_mode")?.value;

  if (appMode === "seller") {
    redirect("/seller/dashboard");
  }
  
  return (
    <Container>
      <Header categories={categories} />
      <BottomNev />

      <Hero />

      <Category categories={categories} />

      <Store popularShops={popularShops} />

      <TrendingProducts products={trendingProducts} />

      <AllProduct 
      products={latestProducts}
      categories={categories}
      />
    </Container>
  );
}

export default HomePage;