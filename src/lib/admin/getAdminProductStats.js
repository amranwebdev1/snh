import { createClient } from "@/lib/supabase/server";

export async function getAdminProductStats() {
  const supabase = await createClient();

  const [
    allResult,
    pendingResult,
    approvedResult,
    rejectedResult,
  ] = await Promise.all([
    supabase
      .from("products")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("is_delete", false),

    supabase
      .from("products")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq(
        "approval_status",
        "pending"
      )
      .eq("is_delete", false),

    supabase
      .from("products")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq(
        "approval_status",
        "approved"
      )
      .eq("is_delete", false),

    supabase
      .from("products")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq(
        "approval_status",
        "rejected"
      )
      .eq("is_delete", false),
  ]);

  return {
    all: allResult.count || 0,
    pending: pendingResult.count || 0,
    approved: approvedResult.count || 0,
    rejected: rejectedResult.count || 0,
  };
}