import Container from "@/components/common/Container";

import Main from "./_components/Main";

import { getUserOrders } from "@/lib/order/getUserOrders";

const MyOrdersPage = async ({ searchParams }) => {
  const params = await searchParams;
  const status = params.status || "all";

  const orders = await getUserOrders(status);

  return (
    <Container className="mt-5 mb-10">
      <Main orders={orders} activeStatus={status} />
    </Container>
  );
};

export default MyOrdersPage;