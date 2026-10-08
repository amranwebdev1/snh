import OrderHeader from "./OrderHeader";
import OrderTimeline from "./OrderTimeline";
import ShippingCard from "./ShippingCard";
import ProductList from "./ProductList";
import PaymentSummary from "./PaymentSummary";
import ActionButtons from "./ActionButtons";
import TrackingCard from "./TrackingCard";

const Main = ({ order }) => {
  return (
    <div className="space-y-5">
      <OrderHeader order={order} />

      <OrderTimeline
  status={order.status}
  updatedAt={order.updated_at}
/>
    <TrackingCard order={order} />
      <ShippingCard
  address={order.addresses}
  customerNote={order.customer_note}
/>

      <ProductList items={order.order_items} />

      <PaymentSummary order={order} />

      <ActionButtons order={order} />
    </div>
  );
};

export default Main;