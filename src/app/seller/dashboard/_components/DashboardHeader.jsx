import { Store, BadgeCheck, Clock3 } from "lucide-react";

export default function DashboardHeader({ shop }) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  const approved = shop?.verification_status === "approved";

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 p-5 text-white shadow-lg lg:p-6">
      {/* Background Decoration */}
      <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-10 left-1/3 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

      <div className="relative flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex flex-1 items-center gap-4">
          {/* Shop Logo */}
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
            {shop?.logo ? (
              <img
                src={shop.logo}
                alt={shop.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Store className="h-8 w-8 text-white" />
            )}
          </div>

          <div className="min-w-0">
            <p className="text-sm text-white/80">
              {greeting} 👋
            </p>

            <h1 className="truncate text-2xl font-bold lg:text-3xl">
              {shop?.name}
            </h1>

            <p className="mt-1 text-sm text-white/80">
              Manage your shop and orders
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">
                <Store className="h-3 w-3" />
                Seller Dashboard
              </span>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs backdrop-blur ${
                  approved
                    ? "bg-emerald-400/20 text-white"
                    : "bg-amber-400/20 text-white"
                }`}
              >
                <BadgeCheck className="h-3 w-3" />
                {approved ? "Verified Shop" : "Verification Pending"}
              </span>
            </div>
          </div>
        </div>

        {/* Right (Desktop) */}
        <div className="hidden rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur md:block">
          <div className="flex items-center gap-2 text-sm">
            <Clock3 className="h-4 w-4" />
            <span>Today</span>
          </div>

          <p className="mt-1 text-lg font-bold">
            {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })}
          </p>
        </div>
      </div>
    </section>
  );
}