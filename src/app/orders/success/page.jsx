import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";
import SuccessContent from "./SuccessContent";

export default async function SuccessPage({ searchParams }) {
  const { ids = "" } = await searchParams;

  const orderIds = ids ? ids.split(",") : [];

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader title="Order Success" />

      <Container className="py-6">
        <SuccessContent orderIds={orderIds} />
      </Container>
    </div>
  );
}