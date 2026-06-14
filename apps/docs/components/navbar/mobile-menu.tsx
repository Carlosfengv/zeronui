"use client";

import { Button } from "@zeron-ui/ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        onClick={() => setOpen((value) => !value)}
        size="icon-sm"
        type="button"
        variant="ghost"
      >
        <MenuIcon size={16} />
        <span className="sr-only">Menu</span>
      </Button>
      {open ? (
        <div className="absolute top-10 right-0 z-50 flex min-w-40 flex-col gap-2 rounded-lg border bg-popover p-3 shadow-md">
          <Link href="/docs" onClick={() => setOpen(false)}>
            Docs
          </Link>
          <Link href="/icons" onClick={() => setOpen(false)}>
            Icons
          </Link>
          <Link href="/?kind=component" onClick={() => setOpen(false)}>
            Components
          </Link>
          <Link href="/?kind=pattern" onClick={() => setOpen(false)}>
            Patterns
          </Link>
          <Link href="/?kind=block" onClick={() => setOpen(false)}>
            Blocks
          </Link>
        </div>
      ) : null}
    </div>
  );
}
