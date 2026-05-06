"use client";

import { Button } from "@zeron-ui/ui/button";
import {
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
  MiniCalendarNavigation,
} from "@zeron-ui/ui/mini-calendar";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export default function MiniCalendarCustomExample() {
  return (
    <MiniCalendar className="bg-card p-4 shadow-lg">
      <div className="flex items-center gap-4">
        <MiniCalendarNavigation asChild direction="prev">
          <Button size="icon" variant="outline">
            <ArrowLeftIcon className="size-4" />
          </Button>
        </MiniCalendarNavigation>

        <MiniCalendarDays className="gap-2">
          {(date) => <MiniCalendarDay date={date} key={date.toISOString()} />}
        </MiniCalendarDays>

        <MiniCalendarNavigation asChild direction="next">
          <Button size="icon" variant="outline">
            <ArrowRightIcon className="size-4" />
          </Button>
        </MiniCalendarNavigation>
      </div>
    </MiniCalendar>
  );
}
