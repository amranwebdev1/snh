import { notFound } from "next/navigation";

import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";

import Main from "./_components/Main";
import { getOrderById } from "@/lib/order/getOrderById";

const OrderDetailsPage = async ({ params }) => {
  const { id } = await params;

  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <PageHeader title="Order Details" />

      <Container className="mt-5 mb-10">
        <Main order={order} />
      </Container>
    </div>
  );
};

export default OrderDetailsPage;