"use client";

import { Button } from "@zeron-ui/ui/button";
import { cn } from "@zeron-ui/ui/utils";
import { CodeIcon, EyeIcon } from "lucide-react";
import { type ReactNode, useState } from "react";

type PatternPreviewTabsProps = {
  children: ReactNode;
  filename: string;
  source: string;
};

export function PatternPreviewTabs({
  children,
  filename,
  source,
}: PatternPreviewTabsProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <div className="flex size-full min-h-0 flex-col overflow-hidden">
      <div
        aria-label={`${filename} tabs`}
        className="flex shrink-0 items-center gap-2 border-b bg-muted px-2 py-1.5"
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
          <EyeIcon className="size-4" />
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
        <span className="ml-auto hidden truncate pr-2 text-muted-foreground text-xs sm:block">
          {filename}
        </span>
      </div>

      <div
        className={cn(
          "min-h-0 flex-1 overflow-hidden",
          activeTab === "code" && "overflow-auto",
        )}
      >
        {activeTab === "preview" ? (
          children
        ) : (
          <pre className="size-full min-h-0 overflow-auto bg-muted p-4 text-sm leading-6">
            <code>{source}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
