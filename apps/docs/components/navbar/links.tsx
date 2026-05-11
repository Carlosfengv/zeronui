"use client";

import { cn } from "@zeron-ui/ui/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinksProps = {
  blocksCount: number;
  className?: string;
  componentsCount: number;
  iconsCount: number;
  patternsCount: number;
};

export function Links({
  blocksCount,
  className,
  componentsCount,
  iconsCount,
  patternsCount,
}: LinksProps) {
  const pathname = usePathname();
  const links = [
    {
      active:
        pathname !== "/" &&
        !pathname.startsWith("/components") &&
        !pathname.startsWith("/blocks") &&
        !pathname.startsWith("/icons") &&
        !pathname.startsWith("/patterns"),
      href: "/docs",
      label: "Docs",
    },
    {
      active: pathname.startsWith("/icons"),
      count: iconsCount,
      href: "/icons",
      label: "Icons",
    },
    {
      active: pathname.startsWith("/components"),
      count: componentsCount,
      href: "/components/button",
      label: "Components",
    },
    {
      active: pathname.startsWith("/patterns"),
      count: patternsCount,
      href: "/patterns",
      label: "Patterns",
    },
    {
      active: pathname.startsWith("/blocks"),
      count: blocksCount,
      href: "/blocks",
      label: "Blocks",
    },
  ];

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {links.map((link) => (
        <Link
          className={cn(
            "inline-flex h-auto items-center rounded-md bg-transparent px-3 py-1.5 text-sm font-medium shadow-none transition-all hover:bg-accent hover:text-accent-foreground",
            link.active && "bg-muted text-foreground font-medium",
          )}
          href={link.href}
          key={link.href}
        >
          {link.label}
          {Boolean(link.count) && (
            <span
              className={cn(
                "ml-1.5 hidden rounded-md bg-foreground/5 px-1.5 py-0.5 text-xs lg:block",
                link.active && "bg-muted text-foreground font-medium",
              )}
            >
              {link.count}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
