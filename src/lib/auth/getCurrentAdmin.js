import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getCurrentAdmin = cache(async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, username, name, email,phone, avatar_url, role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return null;
  }

  if (profile.role !== "admin") {
    return null;
  }

  return {
    user,
    profile,
  };
});