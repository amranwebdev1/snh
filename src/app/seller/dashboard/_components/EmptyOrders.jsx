import { PackageOpen } from "lucide-react";

export default function EmptyOrders() {
  return (
    <div className="rounded-3xl border bg-white p-6 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
        <PackageOpen className="h-7 w-7 text-slate-500" />
      </div>

      <h3 className="font-bold">No Orders Yet</h3>

      <p className="mt-2 text-sm text-slate-500">
        Your recent orders will appear here.
      </p>
    </div>
  );
}