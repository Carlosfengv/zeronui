"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";
import { cn } from "../lib/utils";

type CheckboxProps = Omit<
  CheckboxPrimitive.Root.Props,
  "checked" | "indeterminate"
> & {
  checked?: boolean | "indeterminate";
  indeterminate?: boolean;
};

export function Checkbox({
  checked,
  className,
  indeterminate,
  ...props
}: CheckboxProps) {
  const isIndeterminate = checked === "indeterminate" || indeterminate;

  return (
    <CheckboxPrimitive.Root
      checked={checked === "indeterminate" ? false : checked}
      className={cn(
        "peer inline-flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input shadow-xs outline-none transition-shadow focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 dark:bg-input/30 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground dark:data-checked:border-primary dark:data-indeterminate:border-primary",
        className,
      )}
      data-slot="checkbox"
      indeterminate={isIndeterminate}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="flex items-center justify-center text-current transition-none"
        data-slot="checkbox-indicator"
      >
        {isIndeterminate ? (
          <MinusIcon className="size-3.5" />
        ) : (
          <CheckIcon className="size-3.5" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
