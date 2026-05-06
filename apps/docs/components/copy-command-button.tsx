"use client";

import { Button } from "@zeron-ui/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

type CopyCommandButtonProps = {
  value: string;
};

export function CopyCommandButton({ value }: CopyCommandButtonProps) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      aria-label="Copy command"
      className="text-muted-foreground"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
      }}
      size="icon-sm"
      type="button"
      variant="ghost"
    >
      {copied ? <CheckIcon size={15} /> : <CopyIcon size={15} />}
    </Button>
  );
}
