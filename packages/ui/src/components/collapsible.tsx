"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import * as React from "react";

export function Collapsible({
  asChild,
  children,
  render,
  ...props
}: CollapsiblePrimitive.Root.Props & {
  asChild?: boolean;
}) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      render={asChild && React.isValidElement(children) ? children : render}
      {...props}
    >
      {asChild ? null : children}
    </CollapsiblePrimitive.Root>
  );
}

export function CollapsibleTrigger({
  asChild,
  children,
  render,
  ...props
}: CollapsiblePrimitive.Trigger.Props & {
  asChild?: boolean;
}) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      render={asChild && React.isValidElement(children) ? children : render}
      {...props}
    >
      {asChild ? null : children}
    </CollapsiblePrimitive.Trigger>
  );
}

export function CollapsibleContent(props: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  );
}
