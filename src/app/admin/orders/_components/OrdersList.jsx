import OrdersTable from "./OrdersTable";

export default function OrdersList({
  orders = [],
}) {
  if (!orders.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="font-semibold text-slate-600">
          কোনো order পাওয়া যায়নি।
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Search অথবা status filter পরিবর্তন করে আবার চেষ্টা করুন।
        </p>
      </div>
    );
  }

  return (
    <OrdersTable orders={orders} />
  );
}