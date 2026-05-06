"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "../lib/utils";

export function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "default" | "sm";
}) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-input shadow-xs outline-none transition-all after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 data-checked:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-50 dark:bg-input/80",
        "data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-4 data-[size=sm]:w-7",
        className,
      )}
      data-size={size}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block rounded-full bg-background ring-0 transition-transform data-unchecked:translate-x-0",
          "group-data-[size=default]/switch:size-4 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)]",
          "group-data-[size=sm]/switch:size-3.5 group-data-[size=sm]/switch:data-checked:translate-x-3",
          "dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground",
        )}
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Root>
  );
}
