import {
  Card,
  CardFrame,
  CardFrameDescription,
  CardFrameHeader,
  CardFrameTitle,
  CardPanel,
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
    <CardFrame className="w-full after:pointer-events-none after:absolute after:-inset-[5px] after:-z-1 after:rounded-[calc(var(--radius-xl)+4px)] after:border after:border-border/64">
      <CardFrameHeader className="static grid grid-rows-[auto_1fr]">
        <CardFrameTitle className="text-base">
          <h2>
            <Link className="before:absolute before:inset-0" href={href}>
              {name}
            </Link>
          </h2>
        </CardFrameTitle>
        <CardFrameDescription className="line-clamp-2 sm:h-[2lh]">
          {description || "\u00A0"}
        </CardFrameDescription>
      </CardFrameHeader>
      <Card className="pointer-events-none min-h-55 flex-1 flex-col flex-wrap overflow-x-auto bg-[color-mix(in_srgb,var(--color-card),var(--color-fd-muted))] dark:bg-background">
        <CardPanel className="flex flex-1 items-center justify-center px-8 [--border:--alpha(var(--color-black)/7%)] [--btn-from:--alpha(var(--color-primary)/90%)] [--btn-to:var(--color-primary)] *:transition-transform *:duration-200 dark:[--border:--alpha(var(--color-white)/3%)] dark:[--btn-from:var(--color-primary)] dark:[--btn-to:--alpha(var(--color-primary)/90%)] in-[[data-slot=card-frame]:has(a:not(:hover))]:*:translate-y-0.5">
          {thumbnail}
        </CardPanel>
      </Card>
    </CardFrame>
  );
}
