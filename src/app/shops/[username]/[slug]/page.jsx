import { notFound } from "next/navigation";

import { getShopPageData } from "./lib/getShopPageData";
import Main from "./_components/Main";

export default async function ShopPage({ params }) {
  const { username, slug } = await params;

  const data = await getShopPageData({
    username,
    slug,
  });

  if (!data) {
    notFound();
  }

  return (
    <Main
      shop={data.shop}
      products={data.products}
    />
  );
}