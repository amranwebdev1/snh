import {
  Bike,
  Phone,
  User,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RiderInfo({ order }) {
  const riderName =
    order?.rider_name || "Rider assigned হয়নি";

  const riderPhone = order?.rider_phone;

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bike className="h-5 w-5" />
          Delivery Person
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
            <User className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Name
            </p>

            <p className="font-semibold text-slate-900">
              {riderName}
            </p>
          </div>
        </div>

        {riderPhone ? (
          <a
            href={`tel:${riderPhone}`}
            className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 transition hover:bg-slate-100"
          >
            <Phone className="h-4 w-4 text-slate-500" />

            <div>
              <p className="text-xs text-slate-400">
                Phone
              </p>

              <p className="text-sm font-semibold text-slate-800">
                {riderPhone}
              </p>
            </div>
          </a>
        ) : (
          <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
            Rider phone number পাওয়া যায়নি।
          </div>
        )}
      </CardContent>
    </Card>
  );
}