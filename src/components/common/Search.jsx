"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export function Search() {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push("/search");
  };

  return (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupInput
          type="search"
          placeholder="পণ্য, দোকান বা ক্যাটাগরি খুঁজুন..."
          autoComplete="off"
          readOnly
          onFocus={handleSearchClick}
          onClick={handleSearchClick}
          aria-label="Search products and shops"
        />

        <InputGroupAddon
          align="inline-start"
          className="cursor-pointer"
          onClick={handleSearchClick}
        >
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}