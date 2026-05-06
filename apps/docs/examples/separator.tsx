import { Separator } from "@zeron-ui/ui/separator";

export default function SeparatorExample() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-1">
        <h4 className="font-medium text-sm leading-none">Zeron UI</h4>
        <p className="text-muted-foreground text-sm">
          Components built from shared primitives.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  );
}
