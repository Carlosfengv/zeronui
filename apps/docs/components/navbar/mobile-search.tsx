"use client";

import { Button } from "@zeron-ui/ui/button";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { SearchIcon } from "lucide-react";

export function MobileSearch() {
  const { setOpenSearch } = useSearchContext();

  return (
    <Button
      onClick={() => setOpenSearch(true)}
      size="icon-sm"
      type="button"
      variant="ghost"
    >
      <SearchIcon size={16} />
      <span className="sr-only">Search</span>
    </Button>
  );
}
