"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Truck,
  Bike,
  CircleCheckBig,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { updateAdminOrderStatus } from "@/lib/admin/updateAdminOrderStatus";

const actions = {
  pickup_requested: {
    next: "shipped",
    label: "Mark Picked Up",
    icon: Truck,
    className:
      "bg-orange-600 hover:bg-orange-700",
  },

  shipped: {
    next: "out_for_delivery",
    label: "Out for Delivery",
    icon: Bike,
    className:
      "bg-blue-600 hover:bg-blue-700",
  },

  out_for_delivery: {
    next: "delivered",
    label: "Mark Delivered",
    icon: CircleCheckBig,
    className:
      "bg-emerald-600 hover:bg-emerald-700",
  },
};

export default function AdminOrderActions({
  order,
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const action = actions[order?.status];

  if (!action) {
    return (
      <Card className="rounded-3xl border-slate-200 shadow-sm">
        <CardContent className="p-5">
          <p className="text-sm font-semibold text-slate-600">
            এই order-এর জন্য বর্তমানে কোনো admin action নেই।
          </p>
        </CardContent>
      </Card>
    );
  }

  const Icon = action.icon;

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await toast.promise(
        updateAdminOrderStatus(
          order.id,
          action.next
        ),
        {
          loading: "Order update হচ্ছে...",
          success:
            "Order status সফলভাবে update হয়েছে।",
          error: (error) =>
            error?.message ||
            "Order update করা যায়নি।",
        }
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Admin Order Action Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Current Status
            </p>

            <p className="mt-1 font-bold capitalize text-slate-900">
              {order.status}
            </p>
          </div>

          <Button
            type="button"
            disabled={loading}
            onClick={handleUpdate}
            className={`h-11 rounded-xl px-5 font-semibold text-white ${action.className}`}
          >
            <Icon className="mr-2 h-4 w-4" />

            {loading
              ? "Updating..."
              : action.label}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}