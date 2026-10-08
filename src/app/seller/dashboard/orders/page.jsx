import Main from "./_components/Main";
import { getSellerOrders } from "./lib/getSellerOrders";

export default async function OrdersPage() {
  const orders = await getSellerOrders();

  return <Main orders={orders} />;
}