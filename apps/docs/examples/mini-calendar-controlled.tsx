"use client";

import {
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
  MiniCalendarNavigation,
} from "@zeron-ui/ui/mini-calendar";
import { useState } from "react";

export default function MiniCalendarControlledExample() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  return (
    <div className="space-y-4">
      <MiniCalendar onValueChange={setSelectedDate} value={selectedDate}>
        <MiniCalendarNavigation direction="prev" />
        <MiniCalendarDays>
          {(date) => <MiniCalendarDay date={date} key={date.toISOString()} />}
        </MiniCalendarDays>
        <MiniCalendarNavigation direction="next" />
      </MiniCalendar>

      {selectedDate ? (
        <p className="text-muted-foreground text-sm">
          Selected:{" "}
          {selectedDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            weekday: "long",
            year: "numeric",
          })}
        </p>
      ) : null}
    </div>
  );
}
