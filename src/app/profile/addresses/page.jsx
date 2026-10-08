import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import AddressesPage from "./_components/AddressesPage";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/auth/login");
  }

  const {
    data: addresses,
    error,
  } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id)
    .order("is_default", {
      ascending: false,
    })
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Profile Addresses Fetch Error:",
      error
    );
  }

  return (
    <AddressesPage
      initialAddresses={addresses || []}
    />
  );
}