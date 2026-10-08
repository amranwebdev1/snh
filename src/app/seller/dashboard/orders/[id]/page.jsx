import { notFound } from "next/navigation";

import Main from "./_components/Main";
import { getSellerOrderById } from "./lib/getSellerOrderById";

export default async function SellerOrderDetailsPage({ params }) {
  const { id } = await params;

  const order = await getSellerOrderById(id);


  if (!order) notFound();

  return <Main order={order} />;
}