import { redirect } from "next/navigation";

import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";

import { getCurrentAdmin } from "@/lib/auth/getCurrentAdmin";
import { getAdminPickupRequests } from "@/lib/admin/getAdminPickupRequests";

import PickupRequests from "../dashboard/_components/PickupRequests";

export default async function AdminPickupRequestsPage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/login");
  }

  const requests = await getAdminPickupRequests();

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader title="Pickup Requests" />

      <main>
        <Container className="py-5">
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Pickup Requests
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Seller যেসব order pickup-এর জন্য ready করেছে,
                সেগুলো এখান থেকে পরিচালনা করুন।
              </p>
            </div>

            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-orange-900">
                    Pending Pickup
                  </p>

                  <p className="mt-1 text-xs text-orange-700">
                    মোট {requests.length}টি order pickup-এর অপেক্ষায় আছে।
                  </p>
                </div>

                <div className="flex h-11 min-w-11 items-center justify-center rounded-full bg-orange-600 px-3 text-lg font-bold text-white">
                  {requests.length}
                </div>
              </div>
            </div>

            <PickupRequests requests={requests} />
          </div>
        </Container>
      </main>
    </div>
  );
}