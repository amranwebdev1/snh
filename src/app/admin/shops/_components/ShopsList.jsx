import ShopsTable from "./ShopsTable";
import ShopCard from "./ShopCard";

export default function ShopsList({
  shops = [],
}) {
  if (!shops.length) {
    return (
      <div className="rounded-xl border bg-white px-5 py-12 text-center shadow-sm">
        <div className="mx-auto max-w-md">
          <h2 className="text-lg font-semibold text-slate-900">
            কোনো shop পাওয়া যায়নি
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Search পরিবর্তন করে আবার চেষ্টা করুন।
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <ShopsTable shops={shops} />
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {shops.map((shop) => (
          <ShopCard
            key={shop.id}
            shop={shop}
          />
        ))}
      </div>
    </>
  );
}