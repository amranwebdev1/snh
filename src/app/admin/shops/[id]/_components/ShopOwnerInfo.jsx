import {
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

export default function ShopOwnerInfo({
  shop,
}) {
  const owner = shop?.profiles;

  return (
    <section className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <UserRound
          size={19}
          className="text-slate-500"
        />

        <h2 className="font-semibold text-slate-900">
          Seller Information
        </h2>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100">
          {owner?.avatar_url ? (
            <img
              src={owner.avatar_url}
              alt={owner.name || "Seller"}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound
              size={21}
              className="text-slate-400"
            />
          )}
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-slate-900">
            {owner?.name ||
              "Unnamed seller"}
          </p>

          {owner?.username && (
            <p className="text-sm text-slate-500">
              @{owner.username}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {owner?.email && (
          <div className="flex items-center gap-3 text-sm">
            <Mail
              size={16}
              className="text-slate-400"
            />

            <span className="break-all text-slate-600">
              {owner.email}
            </span>
          </div>
        )}

        {owner?.phone && (
          <div className="flex items-center gap-3 text-sm">
            <Phone
              size={16}
              className="text-slate-400"
            />

            <a
              href={`tel:${owner.phone}`}
              className="text-blue-600 hover:underline"
            >
              {owner.phone}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}