import type { ComponentProps, HTMLAttributes } from "react";
import { cn } from "../lib/utils";

export type StatusState = "online" | "offline" | "maintenance" | "degraded";

export type StatusProps = ComponentProps<"span"> & {
  status: StatusState;
  variant?: "secondary" | "outline";
};

export function Status({
  className,
  status,
  variant = "secondary",
  ...props
}: StatusProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-2 py-0.5 font-normal text-sm transition-colors",
        "group/status",
        variant === "secondary" && "border border-transparent bg-secondary",
        variant === "outline" &&
          "border bg-background text-foreground shadow-xs",
        className,
      )}
      data-slot="status"
      data-status={status}
      {...props}
    />
  );
}

export type StatusIndicatorProps = HTMLAttributes<HTMLSpanElement>;

export function StatusIndicator({ className, ...props }: StatusIndicatorProps) {
  return (
    <span
      className={cn("relative flex size-2", className)}
      data-slot="status-indicator"
      {...props}
    >
      <span
        className={cn(
          "absolute inline-flex size-full animate-ping rounded-full opacity-75",
          "group-data-[status=online]/status:bg-emerald-500",
          "group-data-[status=offline]/status:bg-red-500",
          "group-data-[status=maintenance]/status:bg-blue-500",
          "group-data-[status=degraded]/status:bg-amber-500",
        )}
      />
      <span
        className={cn(
          "relative inline-flex size-2 rounded-full",
          "group-data-[status=online]/status:bg-emerald-500",
          "group-data-[status=offline]/status:bg-red-500",
          "group-data-[status=maintenance]/status:bg-blue-500",
          "group-data-[status=degraded]/status:bg-amber-500",
        )}
      />
    </span>
  );
}

export type StatusLabelProps = HTMLAttributes<HTMLSpanElement>;

export function StatusLabel({
  children,
  className,
  ...props
}: StatusLabelProps) {
  return (
    <span
      className={cn("text-muted-foreground", className)}
      data-slot="status-label"
      {...props}
    >
      {children ?? (
        <>
          <span className="hidden group-data-[status=online]/status:block">
            Online
          </span>
          <span className="hidden group-data-[status=offline]/status:block">
            Offline
          </span>
          <span className="hidden group-data-[status=maintenance]/status:block">
            Maintenance
          </span>
          <span className="hidden group-data-[status=degraded]/status:block">
            Degraded
          </span>
        </>
      )}
    </span>
  );
}
