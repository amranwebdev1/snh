import OrderTimeline from "@/app/orders/[id]/_components/OrderTimeline";

import CustomerInfo from "./CustomerInfo";
import DeliveryAddress from "./DeliveryAddress";
import OrderItems from "./OrderItems";
import PaymentInfo from "./PaymentInfo";
import OrderSummary from "./OrderSummary";
import ActionButtons from "./ActionButtons";

export default function Main({ order }) {
  return (
    <div className="space-y-5 pb-24 lg:pb-6">
      <div>
        <h1 className="text-2xl font-bold">
          Order #{order.order_number}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Seller Order Details
        </p>
      </div>

      <OrderTimeline
        status={order.status}
        updatedAt={order.updated_at}
        pickupRequestedAt={order.pickup_requested_at}
      />

      <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
        <div className="space-y-5">
          <OrderItems order={order} />
          <CustomerInfo order={order} />
          <DeliveryAddress order={order} />
        </div>

        <div className="space-y-5">
          <PaymentInfo order={order} />
          <OrderSummary order={order} />
          <ActionButtons order={order} />
        </div>
      </div>
    </div>
  );
}