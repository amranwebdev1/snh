import { redirect } from "next/navigation";

import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";

import {
  getCurrentAdmin,
} from "@/lib/auth/getCurrentAdmin";

import {
  getAdminProducts,
} from "@/lib/admin/getAdminProducts";

import {
  getAdminProductStats,
} from "@/lib/admin/getAdminProductStats";

import ProductFilters from "./_components/ProductFilters";
import ProductsToolbar from "./_components/ProductsToolbar";
import ProductsList from "./_components/ProductsList";

export default async function AdminProductsPage({
  searchParams,
}) {
  const admin =
    await getCurrentAdmin();

  if (!admin) {
    redirect("/login");
  }

  const params =
    await searchParams;

  const search =
    typeof params?.search ===
    "string"
      ? params.search
      : "";

  const approval =
    typeof params?.approval ===
    "string"
      ? params.approval
      : "all";

  const [
    products,
    stats,
  ] = await Promise.all([
    getAdminProducts({
      search,
      approval,
    }),

    getAdminProductStats(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader title="Product Management" />

      <main>
        <Container className="py-5">
          <div className="space-y-6">

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Product Management
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Marketplace-এর সকল product,
                seller এবং approval status
                এখান থেকে পরিচালনা করুন।
              </p>
            </div>

            <ProductFilters
              activeFilter={approval}
              stats={stats}
              search={search}
            />

            <ProductsToolbar
              search={search}
              approval={approval}
            />

            <ProductsList
              products={products}
            />

          </div>
        </Container>
      </main>
    </div>
  );
}