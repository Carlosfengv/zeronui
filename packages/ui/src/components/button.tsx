import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "min-h-8 px-3 py-[5px] has-[>svg]:px-2.5",
        icon: "min-h-8 min-w-8 p-0",
        "icon-lg": "min-h-9 min-w-9 p-0",
        "icon-sm": "min-h-7 min-w-7 rounded-md p-0",
        "icon-xs": "min-h-6 min-w-6 rounded-sm p-0",
        lg: "min-h-9 rounded-lg px-5 py-1.5 has-[>svg]:px-3.5",
        sm: "min-h-7 rounded-md gap-1.5 px-2.5 py-[3px] has-[>svg]:px-2",
        xs: "min-h-6 rounded-sm gap-1 px-2 py-[3px] text-xs has-[>svg]:px-1.5",
      },
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      },
    },
  },
);

export function Button({
  asChild = false,
  children,
  className,
  render,
  size,
  variant,
  ...props
}: React.ComponentProps<typeof ButtonPrimitive> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const resolvedSize = size ?? "default";

  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ className, size: resolvedSize, variant }))}
      data-size={resolvedSize}
      data-slot="button"
      render={asChild && React.isValidElement(children) ? children : render}
      {...props}
    >
      {asChild ? null : children}
    </ButtonPrimitive>
  );
}

/*
 * Keep a displayName for existing docs/devtools output even though this is a
 * function component.
 */
Button.displayName = "Button";
