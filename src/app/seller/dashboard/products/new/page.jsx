import ProductForm from "../_components/ProductForm"
import { getCurrentUser } from "@/lib/auth/getCurrentUser"
const NewProductPage = async() => {
  const currentUser = await getCurrentUser()
  return (
    <div className="mx-auto max-w-3xl p-4 lg:p-6">
      <ProductForm currentUser={currentUser} />
    </div>
  )
}

export default NewProductPage