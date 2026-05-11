import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/utils";
import { Slot } from "./slot";

const itemVariants = cva(
  "group/item flex w-full items-center gap-4 rounded-2xl text-sm transition-colors outline-none",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "p-4",
        sm: "p-3",
        xs: "p-2",
      },
      variant: {
        default: "",
        muted: "bg-muted",
        outline: "border bg-background",
      },
    },
  },
);

export function Item({
  asChild = false,
  className,
  size,
  variant,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(itemVariants({ className, size, variant }))}
      data-slot="item"
      {...props}
    />
  );
}

export function ItemGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex w-full flex-col gap-2", className)}
      data-slot="item-group"
      {...props}
    />
  );
}

export function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<"hr">) {
  return (
    <hr
      className={cn("h-px w-full border-0 bg-border", className)}
      data-slot="item-separator"
      {...props}
    />
  );
}

export function ItemHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1", className)}
      data-slot="item-header"
      {...props}
    />
  );
}

export function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "icon" | "image" | "avatar";
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden",
        variant === "icon" &&
          "size-10 rounded-md border bg-muted text-muted-foreground",
        variant === "image" && "size-12 rounded-md",
        variant === "avatar" && "size-10 rounded-full bg-muted",
        className,
      )}
      data-slot="item-media"
      data-variant={variant}
      {...props}
    />
  );
}

export function ItemContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("grid flex-1 gap-1 leading-none", className)}
      data-slot="item-content"
      {...props}
    />
  );
}

export function ItemTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("font-medium leading-snug", className)}
      data-slot="item-title"
      {...props}
    />
  );
}

export function ItemDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-muted-foreground text-sm leading-snug", className)}
      data-slot="item-description"
      {...props}
    />
  );
}

export function ItemActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex shrink-0 items-center gap-2", className)}
      data-slot="item-actions"
      {...props}
    />
  );
}

export function ItemFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      data-slot="item-footer"
      {...props}
    />
  );
}
