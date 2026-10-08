import { redirect } from "next/navigation";

import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";

import { getCurrentAdmin } from "@/lib/auth/getCurrentAdmin";
import { getAdminOrders } from "@/lib/admin/getAdminOrders";

import OrdersToolbar from "./_components/OrdersToolbar";
import OrdersList from "./_components/OrdersList";

export default async function AdminOrdersPage({
  searchParams,
}) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/login");
  }

  const params = await searchParams;

  const status = params?.status || "all";
  const search = params?.search || "";

  const orders = await getAdminOrders({
    status,
    search,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader title="Orders" />

      <main>
        <Container className="py-5">
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                All Orders
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Marketplace-এর সব order এখান থেকে পরিচালনা করুন।
              </p>
            </div>

            <OrdersToolbar
              status={status}
              search={search}
            />

            <OrdersList orders={orders} />
          </div>
        </Container>
      </main>
    </div>
  );
}