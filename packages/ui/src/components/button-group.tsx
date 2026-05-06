import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/utils";
import { Slot } from "./slot";

const buttonGroupVariants = cva(
  "inline-flex w-fit items-stretch rounded-md shadow-xs [&>*]:rounded-none [&>*]:shadow-none",
  {
    defaultVariants: {
      orientation: "horizontal",
    },
    variants: {
      orientation: {
        horizontal:
          "flex-row [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md [&>*+*]:-ml-px",
        vertical:
          "flex-col [&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md [&>*+*]:-mt-px",
      },
    },
  },
);

export function ButtonGroup({
  className,
  orientation,
  role = "group",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      className={cn(buttonGroupVariants({ className, orientation }))}
      data-orientation={orientation ?? "horizontal"}
      data-slot="button-group"
      role={role}
      {...props}
    />
  );
}

export function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"hr"> & {
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <hr
      className={cn(
        "border-0 bg-border",
        orientation === "vertical" ? "mx-0 w-px self-stretch" : "h-px w-full",
        className,
      )}
      data-orientation={orientation}
      data-slot="button-group-separator"
      {...props}
    />
  );
}

export function ButtonGroupText({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"span"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      className={cn(
        "flex items-center justify-center border border-input bg-background px-3 text-sm",
        className,
      )}
      data-slot="button-group-text"
      {...props}
    />
  );
}
