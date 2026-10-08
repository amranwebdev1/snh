import { redirect } from "next/navigation";

import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";

import { getCurrentAdmin } from "@/lib/auth/getCurrentAdmin";
import { getAdminDashboardData } from "@/lib/admin/getAdminDashboardData";

import DashboardStats from "./_components/DashboardStats";
import PickupRequests from "./_components/PickupRequests";

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/login");
  }

  const data = await getAdminDashboardData();

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader title="Admin Dashboard" />

      <main>
        <Container className="py-5">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                স্বাগতম, {admin.profile.name || "Admin"}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                এখান থেকে আপনার marketplace-এর order ও pickup
                পরিচালনা করুন।
              </p>
            </div>

            <DashboardStats stats={data.stats} />

            <PickupRequests
              requests={data.pickupRequests}
            />
          </div>
        </Container>
      </main>
    </div>
  );
}