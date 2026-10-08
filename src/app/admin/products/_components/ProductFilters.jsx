"use client";

import {
  CheckCircle2,
  Clock3,
  Package,
  XCircle,
} from "lucide-react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import { Button } from "@/components/ui/button";

const filters = [
  {
    value: "all",
    label: "All Products",
    icon: Package,
    key: "all",
  },
  {
    value: "pending",
    label: "Pending",
    icon: Clock3,
    key: "pending",
  },
  {
    value: "approved",
    label: "Approved",
    icon: CheckCircle2,
    key: "approved",
  },
  {
    value: "rejected",
    label: "Rejected",
    icon: XCircle,
    key: "rejected",
  },
];

export default function ProductFilters({
  activeFilter = "all",
  stats,
  search = "",
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (value) => {
    const params =
      new URLSearchParams();

    if (search?.trim()) {
      params.set(
        "search",
        search.trim()
      );
    }

    if (value !== "all") {
      params.set(
        "approval",
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

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const Icon = filter.icon;

        const active =
          activeFilter ===
          filter.value;

        return (
          <Button
            key={filter.value}
            type="button"
            variant={
              active
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
                  active
                    ? "bg-white/20"
                    : "bg-slate-100"
                }
              `}
            >
              {stats?.[filter.key] ||
                0}
            </span>
          </Button>
        );
      })}
    </div>
  );
}