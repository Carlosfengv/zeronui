"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function ConditionalContainer({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const className =
    pathname === "/"
      ? "landing-page"
      : pathname.startsWith("/patterns") || pathname.startsWith("/blocks")
        ? "patterns-page blocks-page"
        : "";

  return <div className={className}>{children}</div>;
}
