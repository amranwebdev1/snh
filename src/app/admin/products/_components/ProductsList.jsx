import ProductsTable from "./ProductsTable";
import ProductCard from "./ProductCard";

export default function ProductsList({
  products = [],
}) {
  if (!products.length) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">
          কোনো product পাওয়া যায়নি
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          আপনার বর্তমান search বা filter অনুযায়ী
          কোনো product নেই।
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <ProductsTable products={products} />
      </div>

      <div className="space-y-3 md:hidden">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
}