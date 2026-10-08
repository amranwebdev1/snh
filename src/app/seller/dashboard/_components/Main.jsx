import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import QuickActions from "./QuickActions";
import RecentOrders from "./RecentOrders";
import ShopOverview from "./ShopOverview";
import PromotionCard from "./PromotionCard";
import LowStockProducts from "./LowStockProducts";

export default function Main({
  dashboard,
  recentOrders,
}) {
  const { shop, stats, lowStockProducts } = dashboard;

  return (
    <main className="space-y-5 pb-24 lg:space-y-6 lg:pb-6 overflow-x-hidden">
      {/* Welcome Header */}
      <DashboardHeader shop={shop} />

      {/* Statistics */}
      <StatsCards stats={stats} />

      {/* Main Content */}
      <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
        {/* Left */}
        <div className="space-y-5">
          <QuickActions />

          <RecentOrders orders={recentOrders} />

          <LowStockProducts
            products={lowStockProducts}
          />
        </div>

        {/* Right */}
        <div className="space-y-5">
          <ShopOverview shop={shop} />

          <PromotionCard />
        </div>
      </div>
    </main>
  );
}