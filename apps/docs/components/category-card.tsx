import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@zeron-ui/ui/card";
import Link from "next/link";
import type { ReactNode } from "react";

type CategoryCardProps = {
  description?: string;
  href: string;
  name: string;
  thumbnail?: ReactNode;
};

export function CategoryCard({
  description,
  href,
  name,
  thumbnail,
}: CategoryCardProps) {
  return (
    <Card className="group/category w-full overflow-hidden after:pointer-events-none after:absolute after:-inset-[5px] after:-z-1 after:rounded-[calc(var(--radius-xl)+4px)] after:border after:border-border/64">
      <CardHeader className="static grid grid-rows-[auto_1fr] p-4">
        <CardTitle className="text-base">
          <h2>
            <Link className="before:absolute before:inset-0" href={href}>
              {name}
            </Link>
          </h2>
        </CardTitle>
        <CardDescription className="line-clamp-2 sm:h-[2lh]">
          {description || "\u00A0"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pointer-events-none mx-[-1px] mb-[-1px] flex min-h-55 flex-1 flex-wrap items-center justify-center overflow-x-auto rounded-t-xl bg-[color-mix(in_srgb,var(--color-card),var(--color-fd-muted))] px-8 [--border:--alpha(var(--color-black)/7%)] [--btn-from:--alpha(var(--color-primary)/90%)] [--btn-to:var(--color-primary)] *:translate-y-0.5 *:transition-transform *:duration-200 group-hover/category:*:translate-y-0 dark:bg-background dark:[--border:--alpha(var(--color-white)/3%)] dark:[--btn-from:var(--color-primary)] dark:[--btn-to:--alpha(var(--color-primary)/90%)]">
        {thumbnail}
      </CardContent>
    </Card>
  );
}
