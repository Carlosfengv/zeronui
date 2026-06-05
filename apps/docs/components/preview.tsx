import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cn } from "@zeron-ui/ui/utils";
import type { ReactNode } from "react";
import { PreviewTabs } from "./preview-tabs";

type PreviewProps = {
  layout?: "center" | "fill";
  path: string;
  size?: "default" | "compact";
  type?: "component" | "block";
};

export async function Preview({
  layout = "center",
  path,
  size = "default",
  type = "component",
}: PreviewProps) {
  const filename = `${path}.tsx`;
  const source = await readFile(
    join(process.cwd(), "examples", filename),
    "utf8",
  );
  const Component = await import(`../examples/${path}.tsx`).then(
    (mod) => mod.default,
  );

  return (
    <PreviewTabs filename={filename} size={size} source={source} type={type}>
      {type === "block" ? (
        <Component />
      ) : (
        <PreviewSurface layout={layout} size={size}>
          <Component />
        </PreviewSurface>
      )}
    </PreviewTabs>
  );
}

type PreviewSurfaceProps = {
  children: ReactNode;
  layout?: "center" | "fill";
  size?: "default" | "compact";
};

export function PreviewSurface({
  children,
  layout = "center",
  size = "default",
}: PreviewSurfaceProps) {
  return (
    <div className="relative size-full overflow-hidden">
      <PreviewGuides size={size} />
      <div
        className="absolute inset-0 grid min-h-0 min-w-0 place-items-center overflow-auto p-8 data-[size=compact]:p-6"
        data-size={size}
      >
        <div
          className={cn(
            "relative z-10 grid min-h-0 min-w-0 place-items-center [isolation:isolate]",
            layout === "fill" ? "size-full" : "max-h-full max-w-full",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

type PreviewGuidesProps = {
  size?: "default" | "compact";
};

export function PreviewGuides({ size = "default" }: PreviewGuidesProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className={cn(
          "-translate-y-px absolute right-0 left-0 border-[0.5px] border-border/50 border-dashed",
          size === "compact" ? "top-6" : "top-8",
        )}
      />
      <div
        className={cn(
          "absolute right-0 left-0 translate-y-px border-[0.5px] border-border/50 border-dashed",
          size === "compact" ? "bottom-6" : "bottom-8",
        )}
      />
      <div
        className={cn(
          "-translate-x-px absolute top-0 bottom-0 border-[0.5px] border-border/50 border-dashed",
          size === "compact" ? "left-6" : "left-8",
        )}
      />
      <div
        className={cn(
          "absolute top-0 bottom-0 translate-x-px border-[0.5px] border-border/50 border-dashed",
          size === "compact" ? "right-6" : "right-8",
        )}
      />
    </div>
  );
}
