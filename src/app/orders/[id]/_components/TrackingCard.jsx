import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bike,
  Phone,
  Truck,
  Clock3,
  Hash,
} from "lucide-react";

export default function TrackingCard({ order }) {
  const etaText =
    order.status === "out_for_delivery"
      ? "আজ ডেলিভারির সম্ভাবনা"
      : order.status === "shipped"
      ? "শীঘ্রই ডেলিভারি হবে"
      : "এখনো ডেলিভারির পথে নয়";

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardContent className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Delivery Tracking
            </h3>

            <p className="text-sm text-slate-500">
              আপনার অর্ডারের বর্তমান ডেলিভারি তথ্য।
            </p>
          </div>

          <Badge
            className={
              order.status === "out_for_delivery"
                ? "bg-cyan-100 text-cyan-700 border-cyan-200"
                : "bg-slate-100 text-slate-700 border-slate-200"
            }
          >
            {order.status === "out_for_delivery"
              ? "Rider পথে"
              : "Tracking"}
          </Badge>
        </div>

        <div className="space-y-4">
          {/* ETA */}
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-emerald-100 p-2">
              <Clock3 className="h-5 w-5 text-emerald-700" />
            </div>

            <div>
              <p className="font-medium text-slate-900">
                আনুমানিক ডেলিভারি
              </p>

              <p className="text-sm text-slate-500">
                {etaText}
              </p>
            </div>
          </div>

          {/* Courier */}
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-slate-100 p-2">
              <Truck className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <p className="font-medium text-slate-900">
                কুরিয়ার
              </p>

              <p className="text-sm text-slate-500">
                {order.courier_name || "এখনো নির্ধারণ করা হয়নি"}
              </p>
            </div>
          </div>

          {/* Tracking Number */}
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-slate-100 p-2">
              <Hash className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <p className="font-medium text-slate-900">
                Tracking Number
              </p>

              <p className="text-sm text-slate-500 break-all">
                {order.tracking_number || "এখনো তৈরি হয়নি"}
              </p>
            </div>
          </div>

          {/* Rider */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Bike className="h-5 w-5 text-slate-700" />

              <h4 className="font-semibold text-slate-900">
                Rider
              </h4>
            </div>

            {order.rider_name ? (
              <>
                <p className="font-medium text-slate-900">
                  {order.rider_name}
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="h-4 w-4" />
                  {order.rider_phone}
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500">
                এখনো Rider Assign করা হয়নি।
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}