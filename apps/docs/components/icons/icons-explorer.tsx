"use client";

import { Badge } from "@zeron-ui/ui/badge";
import { Button } from "@zeron-ui/ui/button";
import { Card, CardPanel } from "@zeron-ui/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@zeron-ui/ui/dialog";
import { Input } from "@zeron-ui/ui/input";
import { Separator } from "@zeron-ui/ui/separator";
import { CheckIcon, CopyIcon, SearchIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { aiStudioIcons } from "./ai-studio-icons";

type IconEntry = {
  Icon: (typeof aiStudioIcons)[keyof typeof aiStudioIcons];
  label: string;
  name: string;
  searchValue: string;
};

const iconEntries = Object.entries(aiStudioIcons).map(([name, Icon]) => {
  const label = humanizeIconName(name);

  return {
    Icon,
    label,
    name,
    searchValue: `${name} ${label}`.toLowerCase(),
  } satisfies IconEntry;
});

function humanizeIconName(name: string) {
  return name
    .replace(/^Icon/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\bAi\b/g, "AI")
    .replace(/\bNotifi\b/g, "Notifications");
}

function getUsageCode(name: string, label: string) {
  return `import { ${name} } from "@/components/icons/ai-studio-icons";

export function Example() {
  return <${name} size={20} title="${label}" />;
}`;
}

export function IconsExplorer() {
  const [copied, setCopied] = useState<"svg" | "usage" | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<IconEntry | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const filteredIcons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return iconEntries;
    }

    return iconEntries.filter((icon) =>
      icon.searchValue.includes(normalizedQuery),
    );
  }, [query]);

  async function copyText(value: string, type: "svg" | "usage") {
    await navigator.clipboard.writeText(value);
    setCopied(type);
    window.setTimeout(() => setCopied(null), 1200);
  }

  async function copySvg() {
    const svg = previewRef.current?.querySelector("svg")?.outerHTML;

    if (svg) {
      await copyText(svg, "svg");
    }
  }

  function openIcon(icon: IconEntry) {
    setSelectedIcon(icon);
    setDialogOpen(true);
  }

  function handleDialogOpenChange(open: boolean) {
    setDialogOpen(open);
  }

  function handleDialogOpenChangeComplete(open: boolean) {
    if (!open) {
      setCopied(null);
      setSelectedIcon(null);
    }
  }

  const usageCode = selectedIcon
    ? getUsageCode(selectedIcon.name, selectedIcon.label)
    : "";

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-10 px-4 pt-24 pb-16 sm:px-6 lg:px-8">
      <section className="grid gap-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <Badge className="w-fit" variant="secondary">
              Icons
            </Badge>
            <div className="space-y-2">
              <h1 className="font-semibold text-3xl tracking-tight md:text-5xl">
                AI Studio Icons
              </h1>
              <p className="text-muted-foreground">
                从当前组件库导入的图标集合，支持搜索、预览以及复制使用代码或
                SVG。
              </p>
            </div>
          </div>
          <div className="w-full md:max-w-sm">
            <label className="sr-only" htmlFor="icon-search">
              Search icons
            </label>
            <div className="relative">
              <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-muted-foreground" />
              <Input
                className="h-10 pl-9"
                id="icon-search"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search icons..."
                value={query}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-y py-3 text-muted-foreground text-sm">
          <span>{filteredIcons.length} icons</span>
          <span>{query ? `Filtered by "${query}"` : "All icons"}</span>
        </div>
      </section>

      {filteredIcons.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {filteredIcons.map(({ Icon, label, name }) => (
            <button
              className="group text-left"
              key={name}
              onClick={() => openIcon({ Icon, label, name, searchValue: "" })}
              type="button"
            >
              <Card className="h-full overflow-hidden border-transparent shadow-none">
                <CardPanel className="grid gap-2 p-2">
                  <div className="grid aspect-square place-items-center rounded-lg border bg-background text-foreground hover:border-primary/60 group-hover:border-primary/60">
                    <Icon size={40} title={label} />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <div className="truncate font-medium text-sm">{label}</div>
                    <div className="truncate text-muted-foreground text-xs">
                      {name}
                    </div>
                  </div>
                </CardPanel>
              </Card>
            </button>
          ))}
        </section>
      ) : (
        <div className="grid min-h-64 place-items-center rounded-lg border border-dashed text-center">
          <div className="space-y-2">
            <p className="font-medium">No icons found</p>
            <p className="text-muted-foreground text-sm">
              Try another icon name or clear the search field.
            </p>
          </div>
        </div>
      )}

      <Dialog
        onOpenChange={handleDialogOpenChange}
        onOpenChangeComplete={handleDialogOpenChangeComplete}
        open={dialogOpen}
      >
        <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-w-3xl lg:max-w-4xl">
          {selectedIcon ? (
            <>
              <DialogHeader>
                <DialogTitle>{selectedIcon.name}</DialogTitle>
                <DialogDescription>{selectedIcon.label}</DialogDescription>
              </DialogHeader>

              <div className="grid gap-5 md:grid-cols-[13rem_minmax(0,1fr)]">
                <div
                  className="grid aspect-square place-items-center rounded-lg border bg-card text-foreground"
                  ref={previewRef}
                >
                  <selectedIcon.Icon size={72} title={selectedIcon.label} />
                </div>

                <div className="grid min-w-0 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="font-medium text-sm">Usage</h2>
                      <Button
                        onClick={() => copyText(usageCode, "usage")}
                        size="sm"
                        type="button"
                        variant="outline"
                      >
                        {copied === "usage" ? (
                          <CheckIcon className="size-4" />
                        ) : (
                          <CopyIcon className="size-4" />
                        )}
                        Copy
                      </Button>
                    </div>
                    <pre className="max-w-full overflow-x-auto rounded-lg border bg-muted/50 p-3 text-xs">
                      <code>{usageCode}</code>
                    </pre>
                  </div>

                  <Separator />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-muted-foreground text-sm">
                      Copy the rendered SVG for quick handoff.
                    </div>
                    <Button
                      onClick={copySvg}
                      size="sm"
                      type="button"
                      variant="secondary"
                    >
                      {copied === "svg" ? (
                        <CheckIcon className="size-4" />
                      ) : (
                        <CopyIcon className="size-4" />
                      )}
                      Copy SVG
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </main>
  );
}
