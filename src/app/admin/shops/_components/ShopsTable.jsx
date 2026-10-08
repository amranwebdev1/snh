import Link from "next/link";

import {
  Eye,
  MapPin,
  Phone,
  Store,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

function formatDate(value) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function VerificationBadge({
  status,
}) {
  const isApproved =
    status === "approved";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        isApproved
          ? "bg-emerald-100 text-emerald-700"
          : "bg-amber-100 text-amber-700",
      ].join(" ")}
    >
      {isApproved
        ? "Approved"
        : status || "Unknown"}
    </span>
  );
}

function StatusBadge({ status }) {
  const isActive =
    status === "active";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        isActive
          ? "bg-blue-100 text-blue-700"
          : "bg-slate-100 text-slate-600",
      ].join(" ")}
    >
      {status || "Unknown"}
    </span>
  );
}

export default function ShopsTable({
  shops = [],
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="border-b bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">
                Shop
              </th>

              <th className="px-5 py-4">
                Seller
              </th>

              <th className="px-5 py-4">
                Contact
              </th>

              <th className="px-5 py-4">
                Status
              </th>

              <th className="px-5 py-4">
                Verification
              </th>

              <th className="px-5 py-4">
                Created
              </th>

              <th className="px-5 py-4 text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {shops.map((shop) => {
              const seller =
                shop.profiles;

              return (
                <tr
                  key={shop.id}
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                        {shop.logo ? (
                          <img
                            src={shop.logo}
                            alt={shop.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Store
                            size={20}
                            className="text-slate-400"
                          />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900">
                          {shop.name}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          /{shop.slug}
                        </p>

                        {shop.location && (
                          <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                            <MapPin size={12} />
                            <span className="max-w-[180px] truncate">
                              {shop.location}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-slate-900">
                        {seller?.name ||
                          "Unnamed seller"}
                      </p>

                      {seller?.username && (
                        <p className="mt-0.5 text-xs text-slate-500">
                          @{seller.username}
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    {shop.phone ||
                    seller?.phone ? (
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <Phone size={14} />
                        <span>
                          {shop.phone ||
                            seller?.phone}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400">
                        —
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      status={shop.status}
                    />
                  </td>

                  <td className="px-5 py-4">
                    <VerificationBadge
                      status={
                        shop.verification_status
                      }
                    />
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                    {formatDate(
                      shop.created_at
                    )}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                    >
                      <Link
                        href={`/admin/shops/${shop.id}`}
                      >
                        <Eye size={15} />
                        View
                      </Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}