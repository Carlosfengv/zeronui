"use client";

import { Badge } from "@zeron-ui/ui/badge";
import { Input } from "@zeron-ui/ui/input";
import { cn } from "@zeron-ui/ui/utils";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { blockDocs } from "./blocks-data";

type BlocksSidebarProps = {
  activePath: string;
};

export function BlocksSidebar({ activePath }: BlocksSidebarProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredBlocks = useMemo(() => {
    if (!normalizedQuery) {
      return blockDocs;
    }

    return blockDocs.filter((item) =>
      `${item.name} ${item.slug} ${item.description ?? ""}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  return (
    <aside className="border-border/70 border-r bg-background lg:sticky lg:top-[var(--nav-height)] lg:h-[calc(100vh-var(--nav-height))]">
      <div className="sticky top-[var(--nav-height)] z-10 border-b bg-background p-4 lg:static">
        <div className="relative">
          <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-muted-foreground" />
          <Input
            className="h-9 bg-background pl-9"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search blocks..."
            value={query}
          />
        </div>
      </div>

      <nav className="grid max-h-[28rem] gap-5 overflow-y-auto px-3 py-4 lg:max-h-[calc(100vh-var(--nav-height)-73px)]">
        <section className="grid gap-2">
          <div className="flex items-center justify-between">
            <h2 className="px-2 font-medium text-muted-foreground text-sm">
              Blocks
            </h2>
            <Badge variant="secondary">{blockDocs.length}</Badge>
          </div>
          <div className="grid gap-0.5">
            {filteredBlocks.map((item) => (
              <Link
                className={cn(
                  "rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                  activePath === item.href
                    ? "bg-muted/40 text-primary font-medium"
                    : "text-foreground",
                )}
                href={item.href}
                key={item.slug}
              >
                <span className="block truncate">{item.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </nav>
    </aside>
  );
}
