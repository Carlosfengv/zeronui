"use client";

import { Button } from "@zeron-ui/ui/button";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { SearchIcon } from "lucide-react";

export function Search() {
  const { setOpenSearch } = useSearchContext();

  return (
    <Button
      className="relative h-8 w-60 justify-start pr-19 text-muted-foreground"
      onClick={() => setOpenSearch(true)}
      size="sm"
      type="button"
      variant="secondary"
    >
      <SearchIcon className="size-4" />
      <span>Search...</span>
      <span className="-translate-y-1/2 absolute top-1/2 right-1.5 flex items-center gap-0.5">
        <kbd className="rounded-md border bg-background px-1.5 text-xs">⌘</kbd>
        <kbd className="rounded-md border bg-background px-1.5 text-xs">K</kbd>
      </span>
    </Button>
  );
}
