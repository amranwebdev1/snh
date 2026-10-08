"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  XCircle,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { updateShopVerification } from "@/lib/admin/updateShopVerification";

export default function ShopVerification({ shop }) {
  const [status, setStatus] = useState(
    shop?.verification_status || "pending_review"
  );

  const [rejectionReason, setRejectionReason] = useState(
    shop?.rejection_reason || ""
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdate = async (nextStatus) => {
    setError("");
    setSuccess("");

    if (
      nextStatus === "rejected" &&
      !rejectionReason.trim()
    ) {
      setError(
        "Rejected করার আগে rejection reason লিখুন।"
      );
      return;
    }

    try {
      setLoading(true);

      const result =
        await updateShopVerification({
          shopId: shop.id,
          status: nextStatus,
          rejectionReason,
        });

      if (!result?.success) {
        throw new Error(
          "Shop verification update করা যায়নি।"
        );
      }

      setStatus(
        result.shop.verification_status
      );

      setRejectionReason(
        result.shop.rejection_reason || ""
      );

      setSuccess(
        nextStatus === "approved"
          ? "Shop successfully approved হয়েছে।"
          : nextStatus === "rejected"
          ? "Shop rejected হয়েছে।"
          : "Shop আবার review-এর জন্য পাঠানো হয়েছে।"
      );
    } catch (err) {
      console.error(
        "Shop Verification Action Error:",
        err
      );

      setError(
        err?.message ||
          "Shop verification update করা যায়নি।"
      );
    } finally {
      setLoading(false);
    }
  };

  const isApproved = status === "approved";
  const isRejected = status === "rejected";
  const isPending = status === "pending_review";

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Shop Verification
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Admin এখান থেকে shop approval এবং rejection
            পরিচালনা করতে পারবেন।
          </p>
        </div>

        {/* Current Status */}
        <div
          className={`flex items-center gap-3 rounded-xl border p-4 ${
            isApproved
              ? "border-emerald-200 bg-emerald-50"
              : isRejected
              ? "border-red-200 bg-red-50"
              : "border-amber-200 bg-amber-50"
          }`}
        >
          {isApproved && (
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          )}

          {isRejected && (
            <XCircle className="h-6 w-6 text-red-600" />
          )}

          {isPending && (
            <Clock3 className="h-6 w-6 text-amber-600" />
          )}

          <div>
            <p className="text-sm font-medium text-slate-500">
              Current verification status
            </p>

            <p className="font-semibold text-slate-900">
              {isApproved
                ? "Approved"
                : isRejected
                ? "Rejected"
                : "Pending Review"}
            </p>
          </div>
        </div>

        {/* Rejection Reason */}
        <div className="space-y-2">
          <Label htmlFor="rejection-reason">
            Rejection Reason
          </Label>

          <Textarea
            id="rejection-reason"
            value={rejectionReason}
            onChange={(event) =>
              setRejectionReason(
                event.target.value
              )
            }
            placeholder="Shop reject করার কারণ লিখুন..."
            rows={4}
            disabled={loading}
          />

          <p className="text-xs text-slate-500">
            Reject করলে এই কারণটি সংরক্ষণ করা হবে।
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={() =>
              handleUpdate("approved")
            }
            disabled={loading || isApproved}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {loading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            <CheckCircle2 className="mr-2 h-4 w-4" />

            Approve Shop
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={() =>
              handleUpdate("rejected")
            }
            disabled={loading || isRejected}
          >
            {loading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            <XCircle className="mr-2 h-4 w-4" />

            Reject Shop
          </Button>

          {!isPending && (
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                handleUpdate("pending_review")
              }
              disabled={loading}
            >
              {loading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}

              <Clock3 className="mr-2 h-4 w-4" />

              Move to Review
            </Button>
          )}
        </div>

        {/* Verified At */}
        {shop?.verified_at && (
          <div className="border-t pt-4 text-sm text-slate-500">
            Verified at:{" "}
            <span className="font-medium text-slate-700">
              {new Date(
                shop.verified_at
              ).toLocaleString("en-BD")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}