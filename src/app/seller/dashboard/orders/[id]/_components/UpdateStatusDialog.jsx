"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { updateOrderStatus } from "../lib/updateOrderStatus";

export default function UpdateStatusDialog({
  open,
  onOpenChange,
  order,
  nextStatus,
  buttonLabel,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await toast.promise(
        updateOrderStatus(order.id, nextStatus),
        {
          loading: "Status Update হচ্ছে...",
          success: "Status Update হয়েছে",
          error: (err) =>
            err.message || "Update করা যায়নি",
        }
      );

      onOpenChange(false);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Status পরিবর্তন করবেন?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Order-এর Status{" "}
            <span className="font-semibold">
              {nextStatus}
            </span>{" "}
            হবে।
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : buttonLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}