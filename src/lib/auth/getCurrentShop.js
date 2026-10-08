import { createClient } from "@/lib/supabase/server"

const getCurrentShop = async (userId) => {
  const supabase = await createClient()

  const { data: shop } = await supabase
    .from("shops")
    .select("*")
    .eq("owner_id", userId)
    .maybeSingle()

  return shop
}

export default getCurrentShop