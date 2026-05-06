"use client";

import { Button } from "@zeron-ui/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@zeron-ui/ui/collapsible";

export default function CollapsibleExample() {
  return (
    <Collapsible className="w-72 rounded-lg border p-4">
      <div className="flex items-center justify-between gap-4">
        <span className="font-medium text-sm">Project shortcuts</span>
        <CollapsibleTrigger asChild>
          <Button size="sm" type="button" variant="outline">
            Toggle
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-3 space-y-2 text-muted-foreground text-sm">
        <p>Documentation</p>
        <p>Components</p>
        <p>Blocks</p>
      </CollapsibleContent>
    </Collapsible>
  );
}
