"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";

export function InputGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: Keep parity with the Shadcn input-group primitive.
    <div
      className={cn(
        "group/input-group relative flex w-full min-w-0 items-center rounded-md border border-input bg-transparent shadow-xs outline-none transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 has-[>textarea]:h-auto dark:has-aria-invalid:ring-destructive/40 dark:bg-input/30",
        className,
      )}
      data-slot="input-group"
      role="group"
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  "flex cursor-text select-none items-center justify-center gap-2 px-3 text-muted-foreground text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    defaultVariants: {
      align: "inline-start",
    },
    variants: {
      align: {
        "block-end": "order-last w-full justify-start",
        "block-start": "order-first w-full justify-start",
        "inline-end": "order-last",
        "inline-start": "order-first",
      },
    },
  },
);

export function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: Matches Shadcn click-to-focus behavior for mouse users.
    // biome-ignore lint/a11y/useSemanticElements: Keep parity with the Shadcn input-group primitive.
    <div
      className={cn(inputGroupAddonVariants({ align }), className)}
      data-align={align}
      data-slot="input-group-addon"
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("button")) {
          return;
        }

        event.currentTarget.parentElement
          ?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
            "input, textarea",
          )
          ?.focus();
      }}
      role="group"
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva("flex items-center shadow-none", {
  defaultVariants: {
    size: "xs",
  },
  variants: {
    size: {
      "icon-sm": "size-7",
      "icon-xs": "size-6",
      sm: "h-7 rounded-sm px-2.5",
      xs: "h-6 rounded-sm px-2",
    },
  },
});

export function InputGroupButton({
  className,
  size = "xs",
  type = "button",
  variant = "ghost",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset";
  }) {
  return (
    <Button
      className={cn(inputGroupButtonVariants({ size }), className)}
      data-size={size}
      data-slot="input-group-button"
      size={size}
      type={type}
      variant={variant}
      {...props}
    />
  );
}

export function InputGroupText({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center text-muted-foreground text-sm [&_svg]:pointer-events-none",
        className,
      )}
      data-slot="input-group-text"
      {...props}
    />
  );
}

export function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      className={cn(
        "flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 group-has-data-[align=inline-start]/input-group:pl-0 group-has-data-[align=inline-end]/input-group:pr-0",
        className,
      )}
      data-slot="input-group-control"
      {...props}
    />
  );
}

export function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      className={cn(
        "field-sizing-content min-h-24 flex-1 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
        className,
      )}
      data-slot="input-group-control"
      {...props}
    />
  );
}
