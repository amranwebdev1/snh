"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ShopsToolbar({
  search = "",
  verification = "all",
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [value, setValue] =
    useState(search);

  useEffect(() => {
    setValue(search);
  }, [search]);

  const updateUrl = ({
    nextSearch = value,
  } = {}) => {
    const params =
      new URLSearchParams();

    if (nextSearch?.trim()) {
      params.set(
        "search",
        nextSearch.trim()
      );
    }

    if (
      verification &&
      verification !== "all"
    ) {
      params.set(
        "verification",
        verification
      );
    }

    const queryString =
      params.toString();

    router.push(
      queryString
        ? `${pathname}?${queryString}`
        : pathname
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateUrl({
      nextSearch: value,
    });
  };

  const handleClear = () => {
    setValue("");

    updateUrl({
      nextSearch: "",
    });
  };

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-slate-400
            "
          />

          <Input
            value={value}
            onChange={(event) =>
              setValue(
                event.target.value
              )
            }
            placeholder="Shop name, slug বা phone দিয়ে search করুন..."
            className="pl-9"
          />
        </div>

        <Button
          type="submit"
          className="sm:px-6"
        >
          Search
        </Button>

        {value && (
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
          >
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        )}
      </form>
    </div>
  );
}