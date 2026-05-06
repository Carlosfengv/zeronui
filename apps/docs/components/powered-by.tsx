import { LibraryIcon } from "lucide-react";

type PoweredByProps = {
  packages?: string[];
};

export function PoweredBy({ packages = [] }: PoweredByProps) {
  if (packages.length === 0) {
    return null;
  }

  return (
    <div className="not-prose mt-6 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <LibraryIcon className="size-4 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">Powered by</p>
      </div>
      <div className="flex flex-col gap-2 pl-[14px]">
        {packages.map((item) => (
          <a
            className="inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-all hover:text-primary"
            href={item}
            key={item}
            rel={item.startsWith("http") ? "noreferrer" : undefined}
            target={item.startsWith("http") ? "_blank" : undefined}
          >
            <span className="size-3.5 rounded-sm bg-muted" />
            <span>
              {item.startsWith("http")
                ? new URL(item).hostname.replace("www.", "")
                : item.replace("/components/", "")}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
