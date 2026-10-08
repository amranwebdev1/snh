import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  User,
  Home,
  Briefcase,
  Building,
  MessageSquareText,
} from "lucide-react";

const typeIcon = {
  Home: Home,
  Office: Briefcase,
  Other: Building,
};

export default function ShippingCard({ address, customerNote }) {
  const Icon = typeIcon[address?.label] || Home;

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardContent className="p-5">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Shipping Address
          </h3>

          <Badge
            variant="outline"
            className="gap-1 border-slate-200 bg-slate-50 text-slate-700"
          >
            <Icon className="h-3.5 w-3.5" />
            {address?.label || "Home"}
          </Badge>
        </div>

        {/* Receiver */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
              <User className="h-5 w-5 text-emerald-700" />
            </div>

            <div>
              <p className="text-sm text-slate-500">Receiver</p>
              <p className="font-semibold text-slate-900">
                {address?.full_name}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
              <Phone className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <p className="text-sm text-slate-500">Phone</p>
              <p className="font-semibold text-slate-900">
                {address?.phone}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
              <MapPin className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <p className="text-sm text-slate-500">Delivery Address</p>

              <p className="font-medium text-slate-900 leading-6">
                {address?.address_line}
              </p>

              <p className="text-sm text-slate-600">
                {address?.upazila}, {address?.district},{" "}
                {address?.division}
              </p>

              {address?.landmark && (
                <p className="mt-2 text-sm text-slate-500">
                  <span className="font-medium">Landmark:</span>{" "}
                  {address.landmark}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Customer Note */}
        {customerNote && (
          <div className="mt-5 border-t border-slate-200 pt-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <MessageSquareText className="h-5 w-5 text-amber-700" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Delivery Note</p>

                <p className="mt-1 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                  {customerNote}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}