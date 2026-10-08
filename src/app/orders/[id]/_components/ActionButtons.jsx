"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

import {
  PackageSearch,
  RotateCcw,
  Phone,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { cancelOrder } from "@/lib/order/cancelOrder";

export default function ActionButtons({ order }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
const [loading, setLoading] = useState(false);
  const handleTrackOrder = () => {
    toast("Tracking feature coming soon");
  };

  const handleBuyAgain = () => {
    toast("Buy Again feature coming soon");
  };

  const handleContactShop = () => {
    if (order.shops?.slug) {
      router.push(`/shop/${order.shops.slug}`);
    } else {
      toast("Shop page not available");
    }
  };

  const handleCancelOrder = async () => {
  const confirmed = window.confirm(
    "আপনি কি নিশ্চিত যে এই অর্ডারটি বাতিল করতে চান?"
  );

  if (!confirmed) return;

  try {
    setLoading(true);

    await toast.promise(cancelOrder(order.id), {
      loading: "অর্ডার বাতিল হচ্ছে...",
      success: "অর্ডার সফলভাবে বাতিল হয়েছে",
      error: (err) => err.message,
    });

    router.refresh();
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardContent className="p-5">
        <h3 className="mb-4 text-lg font-bold text-slate-900">
          Order Actions
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {/* সবসময় */}
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleContactShop}
          >
            <Phone className="h-4 w-4" />
            Contact Shop
          </Button>

          {/* Confirmed / Processing / Shipped */}
          {["confirmed", "processing", "shipped", "out_for_delivery"].includes(order.status) && (
            <Button className="gap-2" onClick={handleTrackOrder}>
              <PackageSearch className="h-4 w-4" />
              Track Order
            </Button>
          )}

          {/* Delivered */}
          {order.status === "delivered" && (
            <Button className="gap-2" onClick={handleBuyAgain}>
              <RotateCcw className="h-4 w-4" />
              Buy Again
            </Button>
          )}

          {/* Pending */}
          {order.status === "pending" && (
            <Button
  variant="destructive"
  className="gap-2"
  onClick={handleCancelOrder}
  disabled={loading}
>
  <XCircle className="h-4 w-4" />
  {loading ? "Cancelling..." : "Cancel Order"}
</Button>
          )}
        </div>

        <div className="mt-4 border-t border-slate-200 pt-4">
          <p className="text-xs leading-relaxed text-slate-500">
            অর্ডার সংক্রান্ত কোনো সমস্যা হলে প্রথমে Shop-এর সাথে যোগাযোগ করুন।
          </p>
        </div>
      </CardContent>
    </Card>
  );
}