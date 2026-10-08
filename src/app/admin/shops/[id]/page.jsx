import { notFound, redirect } from "next/navigation";

import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";

import { getCurrentAdmin } from "@/lib/auth/getCurrentAdmin";
import { getAdminShop } from "@/lib/admin/getAdminShop";

import ShopOverview from "./_components/ShopOverview";
import ShopOwnerInfo from "./_components/ShopOwnerInfo";
import ShopVerification from "./_components/ShopVerification";
import ShopProducts from "./_components/ShopProducts";

export default async function AdminShopDetailsPage({
  params,
}) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/login");
  }

  const { id } = await params;

  const data = await getAdminShop(id);

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader title="Shop Details" />

      <main>
        <Container className="py-5">
          <div className="space-y-6">
            <ShopOverview
              shop={data.shop}
              ordersCount={data.ordersCount}
            />

            <div className="grid gap-6 lg:grid-cols-2">
              <ShopOwnerInfo
                shop={data.shop}
              />

              <ShopVerification
                shop={data.shop}
              />
            </div>

            <ShopProducts
              shop={data.shop}
              products={data.products}
            />
          </div>
        </Container>
      </main>
    </div>
  );
}