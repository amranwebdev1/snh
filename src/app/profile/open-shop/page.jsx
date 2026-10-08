import PageHeader from "@/components/common/PageHeader"
import Container from "@/components/common/Container"
import ShopBasicInfo from "./_components/ShopBasicInfo"
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export default async function OpenShopPage() {
  const currentUser = await getCurrentUser();

  return (
    <>
      <PageHeader title="Open a Shop" />

      <Container className="py-5">
        <ShopBasicInfo 
        currentUser={currentUser} />
      </Container>
    </>
  )
}