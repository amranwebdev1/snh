import { redirect } from "next/navigation";

import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";

import { getCurrentAdmin } from "@/lib/auth/getCurrentAdmin";
import { getAdminShops } from "@/lib/admin/getAdminShops";
import { getAdminShopStats } from "@/lib/admin/getAdminShopStats";

import ShopsToolbar from "./_components/ShopsToolbar";
import ShopFilters from "./_components/ShopFilters";
import ShopsList from "./_components/ShopsList";

export default async function AdminShopsPage({
  searchParams,
}) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/login");
  }

  const params = await searchParams;

  const search =
    typeof params?.search === "string"
      ? params.search
      : "";

  const verification =
    typeof params?.verification ===
    "string"
      ? params.verification
      : "all";

  const [
    shops,
    stats,
  ] = await Promise.all([
    getAdminShops({
      search,
      verification,
    }),

    getAdminShopStats(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader title="Shop Management" />

      <main>
        <Container className="py-5">
          <div className="space-y-6">

            {/* Heading */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Shop Management
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Marketplace-এর সকল shop এবং
                seller information এখান থেকে
                পরিচালনা করুন।
              </p>
            </div>

            {/* Verification filters */}
            <ShopFilters
              activeFilter={verification}
              stats={stats}
              search={search}
            />

            {/* Search */}
            <ShopsToolbar
              search={search}
              verification={verification}
            />

            {/* Shops */}
            <ShopsList
              shops={shops}
            />

          </div>
        </Container>
      </main>
    </div>
  );
}