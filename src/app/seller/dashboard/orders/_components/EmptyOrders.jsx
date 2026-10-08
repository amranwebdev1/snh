export default function EmptyOrders() {
  return (
    <div className="rounded-3xl border border-dashed bg-white p-10 text-center">
      <h3 className="text-lg font-bold">
        কোনো Order পাওয়া যায়নি
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        নতুন Order এলে এখানে দেখাবে।
      </p>
    </div>
  );
}