import { redirect } from "next/navigation";

import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";

import { getCurrentAdmin } from "@/lib/auth/getCurrentAdmin";
import { getAdminProcessingOrders } from "@/lib/admin/getAdminProcessingOrders";

import ProcessingOrders from "./_components/ProcessingOrders";

export default async function AdminProcessingPage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/login");
  }

  const orders = await getAdminProcessingOrders();

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader title="Processing Orders" />

      <main>
        <Container className="py-5">
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Processing Orders
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Seller বর্তমানে যেসব order প্রস্তুত করছে,
                সেগুলো এখান থেকে পর্যবেক্ষণ করুন।
              </p>
            </div>

            <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-indigo-900">
                    বর্তমানে Processing
                  </p>

                  <p className="mt-1 text-xs text-indigo-700">
                    {orders.length}টি order seller-এর কাছে প্রস্তুত হচ্ছে।
                  </p>
                </div>

                <div className="flex h-11 min-w-11 items-center justify-center rounded-full bg-indigo-600 px-3 text-lg font-bold text-white">
                  {orders.length}
                </div>
              </div>
            </div>

            <ProcessingOrders orders={orders} />
          </div>
        </Container>
      </main>
    </div>
  );
}