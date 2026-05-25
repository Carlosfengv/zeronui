import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { PreviewTabs } from "./preview-tabs";

type PreviewProps = {
  path: string;
  size?: "default" | "compact";
  type?: "component" | "block";
};

export async function Preview({
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
        <div
          className="relative flex size-full flex-col items-center justify-center gap-4 overflow-hidden p-8 data-[size=compact]:p-6"
          data-size={size}
        >
          <div
            className="-translate-y-px absolute top-8 right-0 left-0 border-[0.5px] border-border/50 border-dashed data-[size=compact]:top-6"
            data-size={size}
          />
          <div
            className="absolute right-0 bottom-8 left-0 translate-y-px border-[0.5px] border-border/50 border-dashed data-[size=compact]:bottom-6"
            data-size={size}
          />
          <div
            className="-translate-x-px absolute top-0 bottom-0 left-8 border-[0.5px] border-border/50 border-dashed data-[size=compact]:left-6"
            data-size={size}
          />
          <div
            className="absolute top-0 right-8 bottom-0 translate-x-px border-[0.5px] border-border/50 border-dashed data-[size=compact]:right-6"
            data-size={size}
          />
          <Component />
        </div>
      )}
    </PreviewTabs>
  );
}
