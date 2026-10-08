import Link from "next/link";
import ProductCard from "@/components/common/ProductCard";

export default function RelatedProducts({ products = [] }) {
  if (products.length === 0) return null;

  return (
    <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">
          Related Products
        </h2>

        <span className="text-xs text-slate-500">
          {products.length} items
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}