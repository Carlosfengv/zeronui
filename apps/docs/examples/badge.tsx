import { Badge } from "@zeron-ui/ui/badge";
import { BadgeCheck } from "lucide-react";

export default function BadgeExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge>
        <BadgeCheck data-icon="inline-start" />
        Verified
      </Badge>
      <Badge render={<a href="https://ui.shadcn.com">Link</a>} />
    </div>
  );
}
