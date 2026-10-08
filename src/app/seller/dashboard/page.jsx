import Main from "./_components/Main";
import { getSellerDashboardSummary } from "./lib/getSellerDashboardSummary";
import { getRecentShopOrders } from "./lib/getRecentShopOrders";

export default async function SellerDashboardPage() {
  const [dashboard, recentOrders] = await Promise.all([
    getSellerDashboardSummary(),
    getRecentShopOrders(),
  ]);

  return (
    <Main
      dashboard={dashboard}
      recentOrders={recentOrders}
    />
  );
}