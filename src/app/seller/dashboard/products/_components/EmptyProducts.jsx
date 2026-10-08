"use client";

import Link from "next/link";
import { PackagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function EmptyProducts({
  search,
  status = "all",
}) {
  const hasSearch = search?.trim();

  const statusMessages = {
    pending: {
      title: "কোনো Pending Product নেই",
      description:
        "বর্তমানে Admin Review-এর জন্য কোনো Product অপেক্ষায় নেই।",
    },

    approved: {
      title: "কোনো Approved Product নেই",
      description:
        "এখনো কোনো Product Admin দ্বারা Approved হয়নি।",
    },

    rejected: {
      title: "কোনো Rejected Product নেই",
      description:
        "আপনার কোনো Product এখনো Rejected হয়নি।",
    },

    all: {
      title: "এখনো কোনো Product নেই",
      description:
        "আপনার প্রথম Product যোগ করুন।",
    },
  };

  let title;
  let description;

  if (hasSearch) {
    title = "কোনো Product পাওয়া যায়নি";
    description =
      "অন্য নাম দিয়ে খুঁজে দেখুন।";
  } else {
    const message =
      statusMessages[status] ||
      statusMessages.all;

    title = message.title;
    description = message.description;
  }

  const showAddButton =
    !hasSearch && status === "all";

  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
      <PackagePlus className="mx-auto mb-4 h-14 w-14 text-slate-300" />

      <h3 className="text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

      {showAddButton && (
        <Link href="/seller/dashboard/products/new">
          <Button className="mt-5">
            প্রথম Product যোগ করুন
          </Button>
        </Link>
      )}
    </div>
  );
}