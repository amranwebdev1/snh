import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function DeliveryAddress({ order }) {
  const a = order.addresses;

  return (
    <Card className="rounded-3xl">
      <CardContent className="space-y-3 p-5">
        <h3 className="font-bold">Delivery Address</h3>

        <div className="flex items-start gap-2">
          <MapPin className="mt-1 h-4 w-4 text-slate-500" />

          <p className="text-sm leading-6 text-slate-700">
            {a?.address_line}, {a?.upazila}, {a?.district}, {a?.division}
          </p>
        </div>

        {a?.landmark && (
          <p className="text-sm text-slate-500">
            Landmark: {a.landmark}
          </p>
        )}
      </CardContent>
    </Card>
  );
}