"use client";

import { Button } from "@zeron-ui/ui/button";
import { cn } from "@zeron-ui/ui/utils";
import { CodeIcon, EyeIcon } from "lucide-react";
import { type ReactNode, useState } from "react";

type PreviewTabsProps = {
  children: ReactNode;
  filename: string;
  size?: "default" | "compact";
  source: string;
  type?: "component" | "block";
};

export function PreviewTabs({
  children,
  filename,
  size = "default",
  source,
  type = "component",
}: PreviewTabsProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-lg border bg-background",
        type === "block"
          ? "h-[48rem]"
          : size === "compact"
            ? "h-44"
            : "h-[32rem]",
      )}
    >
      <div
        aria-label={`${filename} preview tabs`}
        className="flex w-full items-center gap-2 border-b bg-muted px-2 py-1.5"
        role="tablist"
      >
        <Button
          aria-selected={activeTab === "preview"}
          onClick={() => setActiveTab("preview")}
          role="tab"
          size="sm"
          type="button"
          variant={activeTab === "preview" ? "outline" : "ghost"}
        >
          <EyeIcon className="size-4 text-muted-foreground" />
          Preview
        </Button>
        <Button
          aria-selected={activeTab === "code"}
          onClick={() => setActiveTab("code")}
          role="tab"
          size="sm"
          type="button"
          variant={activeTab === "code" ? "outline" : "ghost"}
        >
          <CodeIcon className="size-4" />
          Code
        </Button>
        <span className="ml-auto pr-2 text-muted-foreground text-xs">
          {filename}
        </span>
      </div>
      <div
        className={cn(
          type === "block"
            ? "h-[calc(100%-45px)] overflow-auto"
            : "h-[calc(100%-45px)] overflow-hidden",
          activeTab === "code" && "overflow-auto",
        )}
      >
        {activeTab === "preview" ? (
          children
        ) : (
          <pre className="size-full overflow-auto bg-muted p-4 text-sm leading-6">
            <code>{source}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
