import type * as React from "react";
import { cn } from "../lib/utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-card text-card-foreground shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        className,
      )}
      data-slot="card"
      {...props}
    />
  );
}

export function CardFrame({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-card text-card-foreground shadow-xs/5 [--clip-bottom:-1rem] [--clip-top:-1rem] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:bg-muted before:shadow-[0_1px_--theme(--color-black/4%)] *:data-[slot=card]:-m-px *:not-first:data-[slot=card]:rounded-t-xl *:not-last:data-[slot=card]:rounded-b-xl *:data-[slot=card]:bg-clip-padding *:data-[slot=card]:shadow-none *:data-[slot=card]:before:hidden dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        className,
      )}
      data-slot="card-frame"
      {...props}
    />
  );
}

export function CardFrameHeader({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "relative grid auto-rows-min grid-rows-[auto_auto] items-start gap-x-4 px-6 py-4",
        className,
      )}
      data-slot="card-frame-header"
      {...props}
    />
  );
}

export function CardFrameTitle({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("self-center font-semibold text-sm", className)}
      data-slot="card-frame-title"
      {...props}
    />
  );
}

export function CardFrameDescription({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("self-center text-muted-foreground text-sm", className)}
      data-slot="card-frame-description"
      {...props}
    />
  );
}

export function CardPanel({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("flex-1 p-6", className)}
      data-slot="card-panel"
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("grid auto-rows-min gap-1.5 p-6", className)}
      data-slot="card-header"
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("font-semibold text-lg leading-none", className)}
      data-slot="card-title"
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="card-description"
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("flex items-center p-6", className)}
      data-slot="card-footer"
      {...props}
    />
  );
}

export function ResourceCard({
  className,
  ...props
}: DivProps & {
  "data-interactive"?: boolean;
  "data-selected"?: boolean;
}) {
  return (
    <div
      className={cn(
        "group/resource-card flex min-h-40 flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-none ring-0 transition-colors data-[interactive=true]:cursor-pointer data-[interactive=true]:hover:border-border data-[selected=true]:border-primary/40 data-[selected=true]:bg-primary/[0.03]",
        className,
      )}
      data-slot="resource-card"
      {...props}
    />
  );
}

export function ResourceCardHeader({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("flex min-w-0 items-start gap-3 p-4", className)}
      data-slot="resource-card-header"
      {...props}
    />
  );
}

export function ResourceCardIcon({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted/20 text-foreground [&>svg]:size-5",
        className,
      )}
      data-slot="resource-card-icon"
      {...props}
    />
  );
}

export function ResourceCardBody({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("min-w-0 flex-1", className)}
      data-slot="resource-card-body"
      {...props}
    />
  );
}

export function ResourceCardTitle({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "truncate font-medium text-foreground text-sm leading-5",
        className,
      )}
      data-slot="resource-card-title"
      {...props}
    />
  );
}

export function ResourceCardDescription({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "mt-1 line-clamp-2 text-muted-foreground text-xs leading-5",
        className,
      )}
      data-slot="resource-card-description"
      {...props}
    />
  );
}

export function ResourceCardMeta({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-1.5 px-4 text-muted-foreground text-xs leading-5",
        className,
      )}
      data-slot="resource-card-meta"
      {...props}
    />
  );
}

export function ResourceCardDivider({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("mx-4 h-px bg-border/70", className)}
      data-slot="resource-card-divider"
      {...props}
    />
  );
}

export function ResourceCardFooter({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("flex items-center justify-between gap-3 p-4", className)}
      data-slot="resource-card-footer"
      {...props}
    />
  );
}

export { CardPanel as CardContent };
