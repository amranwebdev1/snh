import { createClient } from "@/lib/supabase/client"

export async function uploadProductImages(files) {
  const supabase = createClient()

  const urls = []

  for (const file of files) {
    const ext = file.name.split(".").pop()

    const fileName = `products/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${ext}`

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file)

    if (error) throw error

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName)

    urls.push(data.publicUrl)
  }

  return urls
}