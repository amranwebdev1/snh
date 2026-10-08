import SearchPageClient from "./SearchPageClient";

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;

  const query =
    typeof params?.q === "string"
      ? params.q
      : "";

  const type =
    params?.type === "shops"
      ? "shops"
      : "products";

  return (
    <SearchPageClient
      initialQuery={query}
      initialType={type}
    />
  );
}