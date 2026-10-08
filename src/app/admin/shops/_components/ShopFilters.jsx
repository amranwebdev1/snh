"use client";

import {
  CheckCircle2,
  Clock3,
  Store,
  XCircle,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const filters = [
  {
    value: "all",
    label: "All Shops",
    icon: Store,
  },
  {
    value: "pending_review",
    label: "Pending",
    icon: Clock3,
  },
  {
    value: "approved",
    label: "Approved",
    icon: CheckCircle2,
  },
  {
    value: "rejected",
    label: "Rejected",
    icon: XCircle,
  },
];

export default function ShopFilters({
  activeFilter = "all",
  stats,
  search = "",
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (value) => {
    const params = new URLSearchParams();

    if (search?.trim()) {
      params.set(
        "search",
        search.trim()
      );
    }

    if (value !== "all") {
      params.set(
        "verification",
        value
      );
    }

    const queryString =
      params.toString();

    router.push(
      queryString
        ? `${pathname}?${queryString}`
        : pathname
    );
  };

  const getCount = (value) => {
    if (value === "all") {
      return stats?.all || 0;
    }

    if (value === "pending_review") {
      return stats?.pending || 0;
    }

    if (value === "approved") {
      return stats?.approved || 0;
    }

    if (value === "rejected") {
      return stats?.rejected || 0;
    }

    return 0;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const Icon = filter.icon;

        const isActive =
          activeFilter ===
          filter.value;

        return (
          <Button
            key={filter.value}
            type="button"
            variant={
              isActive
                ? "default"
                : "outline"
            }
            onClick={() =>
              handleFilter(
                filter.value
              )
            }
            className="gap-2"
          >
            <Icon className="h-4 w-4" />

            <span>
              {filter.label}
            </span>

            <span
              className={`
                rounded-full px-2 py-0.5 text-xs
                ${
                  isActive
                    ? "bg-white/20"
                    : "bg-slate-100"
                }
              `}
            >
              {getCount(
                filter.value
              )}
            </span>
          </Button>
        );
      })}
    </div>
  );
}