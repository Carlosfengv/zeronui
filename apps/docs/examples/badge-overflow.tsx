"use client";

import { Badge } from "@zeron-ui/ui/badge";
import { BadgeOverflow } from "@zeron-ui/ui/badge-overflow";

const tags = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Shadcn UI",
  "Base UI",
  "Zustand",
  "TanStack Query",
  "Prisma",
  "PostgreSQL",
];

export default function BadgeOverflowExample() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="w-64 rounded-md border p-3">
        <BadgeOverflow
          items={tags}
          renderBadge={(_, label) => <Badge variant="secondary">{label}</Badge>}
        />
      </div>
      <div className="w-64 rounded-md border p-3">
        <BadgeOverflow
          items={tags}
          lineCount={2}
          renderBadge={(_, label) => <Badge variant="outline">{label}</Badge>}
          renderOverflow={(count) => (
            <Badge variant="secondary">+{count} more</Badge>
          )}
        />
      </div>
    </div>
  );
}
