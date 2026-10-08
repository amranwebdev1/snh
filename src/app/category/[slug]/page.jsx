import { notFound } from "next/navigation";

import { getCategoryPageData } from "./lib/getCategoryPageData";
import CategoryContent from "./_components/CategoryContent";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const data = await getCategoryPageData(slug);

  if (!data) {
    notFound();
  }

  return (
    <CategoryContent
      category={data.category}
      subcategories={data.subcategories}
      products={data.products}
    />
  );
}