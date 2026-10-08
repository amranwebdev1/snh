"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import UpdateStatusDialog from "./UpdateStatusDialog";

const actions = {
  pending: {
    next: "confirmed",
    label: "Confirm Order",
    color: "bg-blue-600 hover:bg-blue-700",
  },

  confirmed: {
    next: "processing",
    label: "Start Processing",
    color: "bg-indigo-600 hover:bg-indigo-700",
  },

  processing: {
    next: "pickup_requested",
    label: "Request Pickup",
    color: "bg-orange-600 hover:bg-orange-700",
  },
};

export default function ActionButtons({ order }) {
  const [open, setOpen] = useState(false);

  const action = actions[order.status];

  return (
    <Card className="rounded-3xl">
      <CardContent className="space-y-4 p-5">
        <h3 className="font-bold">Seller Actions</h3>

        {action ? (
          <>
            <Button
              className={`w-full ${action.color}`}
              onClick={() => setOpen(true)}
            >
              {action.label}
            </Button>

            <UpdateStatusDialog
              open={open}
              onOpenChange={setOpen}
              order={order}
              nextStatus={action.next}
              buttonLabel={action.label}
            />
          </>
        ) : (
          <Button disabled className="w-full">
            No More Actions
          </Button>
        )}

        <p className="text-xs text-slate-500">
          Current Status:{" "}
          <span className="font-semibold capitalize">
            {order.status}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}