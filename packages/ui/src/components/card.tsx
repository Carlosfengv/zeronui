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
        "relative flex flex-col rounded-2xl border bg-card text-card-foreground shadow-xs/5 [--clip-bottom:-1rem] [--clip-top:-1rem] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:bg-muted/72 before:shadow-[0_1px_--theme(--color-black/4%)] *:data-[slot=card]:-m-px *:not-first:data-[slot=card]:rounded-t-xl *:not-last:data-[slot=card]:rounded-b-xl *:data-[slot=card]:bg-clip-padding *:data-[slot=card]:shadow-none *:data-[slot=card]:before:hidden dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
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

export { CardPanel as CardContent };
