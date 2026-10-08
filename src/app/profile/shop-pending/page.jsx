import { CircleCheck } from "lucide-react"
import PageHeader from "@/components/common/PageHeader"
import Container from "@/components/common/Container"

export default function ShopPendingPage() {
  return (
    <>
      <PageHeader title="Shop Application" />
      <Container className="py-10">
        <div className="rounded-3xl border bg-white p-6 text-center shadow-sm">
          <CircleCheck className="mx-auto h-16 w-16 text-orange-500" />
          <h2 className="mt-4 text-2xl font-bold">
            Application Submitted
          </h2>
          <p className="mt-2 text-slate-500">
            Your shop is under review. We'll notify you after approval.
          </p>
        </div>
      </Container>
    </>
  )
}