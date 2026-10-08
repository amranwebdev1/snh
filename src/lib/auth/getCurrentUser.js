import { cache } from "react"
import { createClient } from "@/lib/supabase/server";
import getCurrentShop from "./getCurrentShop"
export const getCurrentUser = cache(async () => {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const shop = await getCurrentShop(user.id)

  return {
    user,
    profile,
    shop,
  }
})