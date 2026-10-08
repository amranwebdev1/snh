import PageHeader from "@/components/common/PageHeader";
import Container from "@/components/common/Container";
import BottomNev from "@/components/layout/BottomNev";
import Header from "@/components/layout/Header";

import Main from "./_components/Main";
import { getCartItems } from "@/lib/cart/getCartItems";
import { getDefaultDeliveryCharge } from "@/lib/delivery/getDefaultDeliveryCharge";

export default async function CartPage() {
  const [cartItems, deliveryData] =
    await Promise.all([
      getCartItems(),
      getDefaultDeliveryCharge(),
    ]);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      <PageHeader
        title="My Cart"
        hideOnScroll
      />

      <Container>
        <div className="hidden lg:block">
          <Header />
        </div>

        <Main
          initialCartItems={cartItems}
          initialDeliveryFee={
            deliveryData?.success
              ? deliveryData.deliveryCharge
              : 0
          }
          deliveryZoneName={
            deliveryData?.success
              ? deliveryData.zoneName
              : null
          }
        />
      </Container>

      <div className="lg:hidden">
        <BottomNev />
      </div>
    </div>
  );
}