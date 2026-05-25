import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/utils";
import { Slot } from "./slot";

const buttonGroupVariants = cva(
  "inline-flex w-fit items-stretch rounded-lg shadow-xs has-[[data-size=lg]]:rounded-lg has-[[data-size=sm]]:rounded-md has-[[data-size=xs]]:rounded-sm has-[[data-size=icon-lg]]:rounded-lg has-[[data-size=icon-sm]]:rounded-md has-[[data-size=icon-xs]]:rounded-sm [&>*]:rounded-none [&>*]:shadow-none",
  {
    defaultVariants: {
      orientation: "horizontal",
    },
    variants: {
      orientation: {
        horizontal:
          "flex-row [&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg [&>*+*]:-ml-px [&>[data-size=lg]:first-child]:rounded-l-lg [&>[data-size=lg]:last-child]:rounded-r-lg [&>[data-size=sm]:first-child]:rounded-l-md [&>[data-size=sm]:last-child]:rounded-r-md [&>[data-size=xs]:first-child]:rounded-l-sm [&>[data-size=xs]:last-child]:rounded-r-sm [&>[data-size=icon-lg]:first-child]:rounded-l-lg [&>[data-size=icon-lg]:last-child]:rounded-r-lg [&>[data-size=icon-sm]:first-child]:rounded-l-md [&>[data-size=icon-sm]:last-child]:rounded-r-md [&>[data-size=icon-xs]:first-child]:rounded-l-sm [&>[data-size=icon-xs]:last-child]:rounded-r-sm",
        vertical:
          "flex-col [&>*:first-child]:rounded-t-lg [&>*:last-child]:rounded-b-lg [&>*+*]:-mt-px [&>[data-size=lg]:first-child]:rounded-t-lg [&>[data-size=lg]:last-child]:rounded-b-lg [&>[data-size=sm]:first-child]:rounded-t-md [&>[data-size=sm]:last-child]:rounded-b-md [&>[data-size=xs]:first-child]:rounded-t-sm [&>[data-size=xs]:last-child]:rounded-b-sm [&>[data-size=icon-lg]:first-child]:rounded-t-lg [&>[data-size=icon-lg]:last-child]:rounded-b-lg [&>[data-size=icon-sm]:first-child]:rounded-t-md [&>[data-size=icon-sm]:last-child]:rounded-b-md [&>[data-size=icon-xs]:first-child]:rounded-t-sm [&>[data-size=icon-xs]:last-child]:rounded-b-sm",
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
        orientation === "vertical"
          ? "mx-0 my-0 w-px shrink-0 self-stretch"
          : "my-0 h-px w-full shrink-0",
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
        "flex min-h-8 items-center justify-center border border-input bg-background px-3 text-sm",
        className,
      )}
      data-slot="button-group-text"
      {...props}
    />
  );
}
