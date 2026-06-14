"use client";

import { Button } from "@zeron-ui/ui/button";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { SearchIcon } from "lucide-react";

export function Search() {
  const { setOpenSearch } = useSearchContext();

  return (
    <Button
      className="relative h-8 w-[30rem] justify-start rounded-full bg-[#edeef1] pr-19 text-muted-foreground shadow-none hover:bg-[#e8e9ec] dark:bg-muted"
      onClick={() => setOpenSearch(true)}
      size="sm"
      type="button"
      variant="secondary"
    >
      <SearchIcon className="size-4" />
      <span>Search components, patterns, blocks...</span>
      <span className="-translate-y-1/2 absolute top-1/2 right-1.5 flex items-center gap-0.5">
        <kbd className="rounded-md border bg-background px-1.5 text-xs">⌘</kbd>
        <kbd className="rounded-md border bg-background px-1.5 text-xs">K</kbd>
      </span>
    </Button>
  );
}
