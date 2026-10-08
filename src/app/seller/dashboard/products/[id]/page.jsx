import { createClient } from "@/lib/supabase/server"
import { getCurrentUser } from "@/lib/auth/getCurrentUser"
import { redirect } from "next/navigation"

import ProductForm from "../_components/ProductForm"

const EditProductPage = async ({ params }) => {
  const {id} = await params;
  const currentUser = await getCurrentUser()
  const supabase = await createClient()

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("shop_id", currentUser.shop.id)
    .maybeSingle()

  if (!product) redirect("/seller/products")

  return (
    <div className="mx-auto max-w-3xl p-4 lg:p-6">
      <ProductForm
        currentUser={currentUser}
        initialProduct={product}
      />
    </div>
  )
}

export default EditProductPage