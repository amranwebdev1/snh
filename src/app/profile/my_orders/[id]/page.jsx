import React from 'react'
import PageHeader from "@/components/common/PageHeader"
import Container from "@/components/common/Container"
import OrderTracking from "./_components/OrderTracking"
import OrderedItems from "./_components/OrderedItems"
import ReturnPolicyBanne from "./_components/ReturnPolicyBanne"
import CustomerShippingInfo from "./_components/CustomerShippingInfo"
import PaymentDetailsCard from "./_components/PaymentDetailsCard"
import SupportBanner from "./_components/SupportBanner"
const OrderDetailsPage = async ({params}) => {
  const {id} = await params;
  return (
    <div>
      <PageHeader title="Order Details" PageHeader />
      <Container>
        <OrderTracking />
        <OrderedItems />
        <ReturnPolicyBanne />
        <CustomerShippingInfo />
        <PaymentDetailsCard />
        <SupportBanner />
      </Container>
    </div>
  )
}

export default OrderDetailsPage