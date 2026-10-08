import { notFound, redirect } from "next/navigation";

import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";

import { getCurrentAdmin } from "@/lib/auth/getCurrentAdmin";
import { getAdminOrder } from "@/lib/admin/getAdminOrder";

import OrderSummary from "./_components/OrderSummary";
import CustomerInfo from "./_components/CustomerInfo";
import ShopInfo from "./_components/ShopInfo";
import OrderProducts from "./_components/OrderProducts";
import AdminOrderTimeline from "./_components/AdminOrderTimeline";
import AdminOrderActions from "./_components/AdminOrderActions";
import RiderInfo from "./_components/RiderInfo";

export default async function AdminOrderDetailsPage({
  params,
}) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/login");
  }

  const { id } = await params;

  const order = await getAdminOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader title={`Order #${order.order_number}`} />

      <main>
        <Container className="py-5">
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Order Details
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Order #{order.order_number}
              </p>
            </div>

            <AdminOrderActions order={order} />

            <AdminOrderTimeline
              order={order}
            />

            <div className="grid gap-5 lg:grid-cols-3">
              <div className="space-y-5 lg:col-span-2">
                <OrderProducts
                  items={order.order_items || []}
                />

                <OrderSummary order={order} />
              </div>

              <div className="space-y-5">
                <CustomerInfo
                  customer={order.profiles}
                  address={order.addresses}
                />

                <ShopInfo shop={order.shops} />
                
                <RiderInfo order={order} />
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}