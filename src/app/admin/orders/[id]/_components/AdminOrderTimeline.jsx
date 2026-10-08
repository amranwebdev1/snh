import {
  Clock3,
  CircleCheckBig,
  Package,
  HandPlatter,
  Truck,
  Bike,
  House,
  CircleX,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    key: "pending",
    label: "অর্ডার হয়েছে",
    icon: Clock3,
  },
  {
    key: "confirmed",
    label: "অর্ডার নিশ্চিত",
    icon: CircleCheckBig,
  },
  {
    key: "processing",
    label: "প্রস্তুত হচ্ছে",
    icon: Package,
  },
  {
    key: "pickup_requested",
    label: "Pickup Request",
    icon: HandPlatter,
  },
  {
    key: "shipped",
    label: "পণ্য Pickup হয়েছে",
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

export default function AdminOrderTimeline({
  order,
}) {
  if (order?.status === "cancelled") {
    return (
      <Card className="rounded-3xl border-red-200">
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
              <CircleX className="h-5 w-5 text-red-600" />
            </div>

            <div>
              <p className="font-bold text-red-700">
                Order Cancelled
              </p>

              <p className="mt-1 text-sm text-slate-500">
                এই order বাতিল হয়েছে।
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentIndex = Math.max(
    steps.findIndex(
      (step) => step.key === order?.status
    ),
    0
  );

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardContent className="p-5">
        <h2 className="mb-5 text-lg font-bold text-slate-900">
          Order Progress
        </h2>

        <div className="space-y-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            const completed =
              index < currentIndex;

            const current =
              index === currentIndex;

            const timestamp =
              getStepTimestamp(
                step.key,
                order
              );

            return (
              <div
                key={step.key}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      current
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

                <div className="flex-1 pt-1">
                  <p
                    className={`font-semibold ${
                      completed || current
                        ? "text-slate-900"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {current
                      ? "বর্তমান অবস্থান"
                      : completed
                      ? "সম্পন্ন হয়েছে"
                      : "অপেক্ষমাণ"}
                  </p>

                  {timestamp && (
                    <p className="mt-1 text-xs text-slate-400">
                      {new Date(
                        timestamp
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

function getStepTimestamp(key, order) {
  switch (key) {
    case "pending":
      return order?.created_at;

    case "confirmed":
      return null;

    case "processing":
      return order?.updated_at;

    case "pickup_requested":
      return order?.pickup_requested_at;

    case "shipped":
      return order?.picked_up_at;

    case "out_for_delivery":
      return order?.out_for_delivery_at;

    case "delivered":
      return order?.delivered_at;

    default:
      return null;
  }
}