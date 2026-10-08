import { createClient } from "@/lib/supabase/client"

export async function uploadShopImage(file, folder = "logo") {
  const supabase = createClient()

  const fileExt = file.name.split(".").pop()
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${fileExt}`

  const filePath = `${folder}/${fileName}`

  const { error } = await supabase.storage
    .from("shops")
    .upload(filePath, file)

  if (error) throw error

  const { data } = supabase.storage
    .from("shops")
    .getPublicUrl(filePath)

  return data.publicUrl
}