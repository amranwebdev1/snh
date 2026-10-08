import { redirect } from "next/navigation";

import Container from "@/components/common/Container";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

import SellerBottomNav from "./_components/SellerBottomNav";
import SellerSidebar from "./_components/SellerSidebar";

import { getSellerNavData } from "./lib/getSellerNavData";

const Layout = async ({ children }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/auth/login");
  }

  if (currentUser.shop?.verification_status !== "approved") {
    redirect("/profile");
  }

  const { pendingCount } = await getSellerNavData();

  return (
  <Container className="min-h-screen bg-slate-50">
    <SellerSidebar
      pendingCount={pendingCount || 0}
      profile={currentUser.profile}
    />

    <main className="lg:pl-64">
      {children}
    </main>

    <SellerBottomNav
        pendingCount={pendingCount}
        profile={{
          name: currentUser?.profile?.name,
          avatar_url: currentUser?.profile?.avatar_url,
        }}
      />
  </Container>
);
};

export default Layout;