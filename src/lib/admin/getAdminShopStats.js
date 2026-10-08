import { createClient } from "@/lib/supabase/server";

export async function getAdminShopStats() {
  const supabase = await createClient();

  const [
    allResult,
    pendingResult,
    approvedResult,
    rejectedResult,
  ] = await Promise.all([
    supabase
      .from("shops")
      .select("id", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("shops")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq(
        "verification_status",
        "pending_review"
      ),

    supabase
      .from("shops")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq(
        "verification_status",
        "approved"
      ),

    supabase
      .from("shops")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq(
        "verification_status",
        "rejected"
      ),
  ]);

  if (allResult.error) {
    console.error(
      "Get All Shops Count Error:",
      allResult.error
    );
  }

  if (pendingResult.error) {
    console.error(
      "Get Pending Shops Count Error:",
      pendingResult.error
    );
  }

  if (approvedResult.error) {
    console.error(
      "Get Approved Shops Count Error:",
      approvedResult.error
    );
  }

  if (rejectedResult.error) {
    console.error(
      "Get Rejected Shops Count Error:",
      rejectedResult.error
    );
  }

  return {
    all: allResult.count || 0,
    pending: pendingResult.count || 0,
    approved: approvedResult.count || 0,
    rejected: rejectedResult.count || 0,
  };
}