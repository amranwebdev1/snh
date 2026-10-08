import { Card, CardContent } from "@/components/ui/card";
import {
  Clock3,
  CircleCheckBig,
  Package,
  HandPlatter,
  Truck,
  House,
  CircleX,
  Bike,
} from "lucide-react";

const steps = [
  {
    key: "pending",
    label: "অর্ডার হয়েছে",
    icon: Clock3,
  },
  {
    key: "confirmed",
    label: "নিশ্চিত হয়েছে",
    icon: CircleCheckBig,
  },
  {
    key: "processing",
    label: "প্রস্তুত হচ্ছে",
    icon: Package,
  },
  {
    key: "pickup_requested",
    label: "পিকআপের অনুরোধ করা হয়েছে",
    icon: HandPlatter,
  },
  {
    key: "shipped",
    label: "পাঠানো হয়েছে",
    icon: Truck,
  },
  {
    key: "out_for_delivery",
    label: "ডেলিভারির পথে",
    icon: Bike,
  },
  {
    key: "delivered",
    label: "ডেলিভারি সম্পন্ন",
    icon: House,
  },
];

export default function OrderTimeline({ status, updatedAt,pickupRequestedAt }) {
  // Cancelled Order
  if (status === "cancelled") {
    return (
      <Card className="rounded-3xl border-red-200 shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <CircleX className="h-6 w-6 text-red-600" />
            </div>

            <div>
              <h3 className="font-semibold text-red-700">
                অর্ডার বাতিল হয়েছে
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                এই অর্ডারটি সফলভাবে বাতিল করা হয়েছে।
              </p>

              {updatedAt && (
                <p className="mt-2 text-xs text-slate-400">
                  {new Date(updatedAt).toLocaleString("bn-BD")}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentIndex = Math.max(
    steps.findIndex((step) => step.key === status),
    0
  );

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardContent className="p-5">
        <h3 className="mb-5 text-lg font-bold text-slate-900">
          অর্ডারের অগ্রগতি
        </h3>

        <div className="space-y-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            const completed = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={step.key} className="flex gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                      isCurrent
                        ? "border-emerald-500 bg-emerald-100 text-emerald-700 ring-4 ring-emerald-50"
                        : completed
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-300 bg-white text-slate-400"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {index !== steps.length - 1 && (
                    <div
                      className={`mt-1 h-8 w-0.5 ${
                        completed
                          ? "bg-emerald-500"
                          : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 pt-1">
                  <p
                    className={`font-semibold ${
                      completed || isCurrent
                        ? "text-slate-900"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {isCurrent
                      ? "বর্তমান অবস্থান"
                      : completed
                      ? "সম্পন্ন হয়েছে"
                      : "অপেক্ষমাণ"}
                  </p>

                {isCurrent && (pickupRequestedAt || updatedAt) && (
  <p className="mt-2 text-xs text-slate-400">
    {new Date(
      status === "pickup_requested"
        ? pickupRequestedAt
        : updatedAt
    ).toLocaleString("bn-BD")}
  </p>
)}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}