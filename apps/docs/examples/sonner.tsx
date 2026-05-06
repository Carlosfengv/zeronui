"use client";

import { Button } from "@zeron-ui/ui/button";
import { Toaster } from "@zeron-ui/ui/sonner";
import { toast } from "sonner";

export default function SonnerExample() {
  return (
    <>
      <Button
        onClick={() =>
          toast.success("Saved", {
            description: "Your changes have been published.",
          })
        }
        type="button"
      >
        Show toast
      </Button>
      <Toaster />
    </>
  );
}
