import { redirect } from "next/navigation";

import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";

import { getCurrentAdmin } from "@/lib/auth/getCurrentAdmin";
import { getAdminSellerDelays } from "@/lib/admin/getAdminSellerDelays";

import SellerDelayList from "./_components/SellerDelayList";

export default async function AdminSellerDelaysPage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/login");
  }

  const orders = await getAdminSellerDelays();

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader title="Seller Delays" />

      <main>
        <Container className="py-5">
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Seller Delay Monitoring
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                যেসব order দীর্ঘ সময় ধরে seller-এর কাছে
                processing অবস্থায় আছে সেগুলো এখানে দেখুন।
              </p>
            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-red-900">
                    Delayed Orders
                  </p>

                  <p className="mt-1 text-xs text-red-700">
                    ২ ঘণ্টার বেশি সময় ধরে processing-এ থাকা order।
                  </p>
                </div>

                <div className="flex h-11 min-w-11 items-center justify-center rounded-full bg-red-600 px-3 text-lg font-bold text-white">
                  {orders.length}
                </div>
              </div>
            </div>

            <SellerDelayList orders={orders} />
          </div>
        </Container>
      </main>
    </div>
  );
}