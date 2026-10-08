import {
  MapPin,
  Phone,
  Mail,
  User,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerInfo({
  customer,
  address,
}) {
  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-5 w-5" />
          Customer
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Info
          icon={User}
          label="Name"
          value={
            customer?.name ||
            customer?.username ||
            "Unknown"
          }
        />

        {customer?.phone && (
          <Info
            icon={Phone}
            label="Phone"
            value={customer.phone}
          />
        )}

        {customer?.email && (
          <Info
            icon={Mail}
            label="Email"
            value={customer.email}
          />
        )}

        {address && (
          <div className="border-t border-slate-100 pt-4">
            <div className="mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-400" />

              <span className="text-sm font-semibold text-slate-700">
                Delivery Address
              </span>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-600">
              <p className="font-semibold text-slate-800">
                {address.full_name}
              </p>

              <p>{address.phone}</p>

              <p>
                {address.address_line}
              </p>

              {address.landmark && (
                <p>
                  Landmark: {address.landmark}
                </p>
              )}

              <p>
                {address.post_office},{" "}
                {address.upazila},{" "}
                {address.district}
              </p>

              <p>
                {address.division}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100">
        <Icon className="h-4 w-4 text-slate-500" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="break-words text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}