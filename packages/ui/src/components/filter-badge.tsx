import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/utils";

export const filterBadgeVariants = cva(
  "group/filter-badge inline-flex min-h-6 flex-initial items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-muted px-1.5 font-normal text-foreground/85 text-sm leading-5 outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-foreground data-active:text-background data-active:hover:bg-foreground/90 data-active:hover:text-background aria-pressed:bg-foreground aria-pressed:text-background aria-pressed:hover:bg-foreground/90 aria-pressed:hover:text-background [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        default: "h-6",
        sm: "h-5 min-h-5 gap-1 rounded-md px-1 text-xs leading-4",
        lg: "h-7 min-h-7 rounded-lg px-2",
      },
    },
  },
);

export function FilterBadgeCount({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex min-w-5 items-center justify-center rounded-md bg-background px-1 text-foreground/70 text-xs leading-5 tabular-nums group-data-active/filter-badge:text-foreground group-aria-pressed/filter-badge:text-foreground",
        className,
      )}
      data-slot="filter-badge-count"
      {...props}
    />
  );
}

export function FilterBadge({
  children,
  className,
  count,
  countClassName,
  render,
  selected,
  size,
  type,
  ...props
}: useRender.ComponentProps<"button"> &
  VariantProps<typeof filterBadgeVariants> & {
    count?: React.ReactNode;
    countClassName?: string;
    selected?: boolean;
  }) {
  const ownProps = {
    "aria-pressed": selected,
    children: (
      <>
        {children}
        {count !== undefined && (
          <FilterBadgeCount className={countClassName}>
            {count}
          </FilterBadgeCount>
        )}
      </>
    ),
    className: cn(
      filterBadgeVariants({ size }),
      count !== undefined && "pr-0.5",
      className,
    ),
    "data-active": selected || undefined,
    "data-slot": "filter-badge",
    type: type ?? "button",
  } as useRender.ComponentProps<"button">;

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(ownProps, props),
    render,
    state: {
      selected,
      size,
      slot: "filter-badge",
    },
  });
}
