import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/utils";

export const inputVariants = cva(
  "flex w-full min-w-0 rounded-md outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    defaultVariants: {
      size: "default",
      variant: "outline",
    },
    variants: {
      size: {
        default: "h-9 px-3 py-1 text-base md:text-sm",
        lg: "h-10 px-3.5 py-2 text-base",
        sm: "h-8 px-2.5 py-1 text-sm",
        xl: "h-11 px-4 py-2 text-base",
      },
      variant: {
        ghost: "border border-transparent bg-transparent shadow-none",
        outline:
          "border border-input bg-transparent shadow-xs dark:bg-input/30",
        secondary: "border border-transparent bg-secondary shadow-none",
      },
    },
  },
);

export function Input({
  className,
  size,
  type,
  variant,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>) {
  return (
    <input
      className={cn(
        inputVariants({ size, variant }),
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      data-size={size}
      data-slot="input"
      data-variant={variant}
      type={type}
      {...props}
    />
  );
}
