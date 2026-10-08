import { redirect } from "next/navigation";

import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";

import { getCurrentAdmin } from "@/lib/auth/getCurrentAdmin";
import { getAdminDeliveredToday } from "@/lib/admin/getAdminDeliveredToday";

import DeliveredToday from "./_components/DeliveredToday";

export default async function AdminDeliveredTodayPage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/login");
  }

  const orders = await getAdminDeliveredToday();

  const totalAmount = orders.reduce(
    (sum, order) =>
      sum + Number(order?.total_amount || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader title="Delivered Today" />

      <main>
        <Container className="py-5">
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Delivered Today
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                আজ সফলভাবে delivered হওয়া order-গুলো এখানে দেখুন।
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-xs font-medium text-emerald-700">
                  আজ Delivered
                </p>

                <p className="mt-2 text-2xl font-bold text-emerald-900">
                  {orders.length}
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
                <p className="text-xs font-medium text-blue-700">
                  মোট Order Amount
                </p>

                <p className="mt-2 text-2xl font-bold text-blue-900">
                  ৳{totalAmount.toLocaleString("en-BD")}
                </p>
              </div>
            </div>

            <DeliveredToday orders={orders} />
          </div>
        </Container>
      </main>
    </div>
  );
}