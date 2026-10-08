import { getCategories } from "@/lib/categories/getCategories";
import BottomNevClient from "./BottomNevClient";

export default async function BotomNev() {
  const categories = await getCategories();

  return (
    <BottomNevClient categories={categories} />
  );
}