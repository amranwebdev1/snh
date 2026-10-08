"use client";
import PageHeader from "@/components/common/PageHeader";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";

export default function SellerHeader() {
  const router = useRouter();

  return (
    <>
      <PageHeader 
      title="Seller Dashboard" 
      rightAction={
      <button>
          <Bell className="h-5 w-5" />
      </button>
      } />
    </>
  );
}