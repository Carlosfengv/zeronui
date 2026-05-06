import type * as React from "react";
import { cn } from "../lib/utils";
import { Checkbox } from "./checkbox";

export function CheckboxGroup({
  className,
  ...props
}: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      className={cn("m-0 grid gap-3 border-0 p-0", className)}
      data-slot="checkbox-group"
      {...props}
    />
  );
}

export function CheckboxGroupItem({
  children,
  className,
  id,
  ...props
}: React.ComponentProps<typeof Checkbox> & {
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn("flex items-center gap-3", className)}
      data-slot="checkbox-group-item"
    >
      <Checkbox id={id} {...props} />
      {children ? (
        <label className="font-medium text-sm leading-none" htmlFor={id}>
          {children}
        </label>
      ) : null}
    </div>
  );
}
