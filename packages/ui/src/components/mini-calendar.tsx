"use client";

import { addDays, format, isSameDay, isToday } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  type ButtonHTMLAttributes,
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
  useContext,
} from "react";
import { useControllableState } from "../lib/use-controllable-state";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Slot } from "./slot";

type MiniCalendarContextType = {
  days: number;
  onDateSelect: (date: Date) => void;
  onNavigate: (direction: "prev" | "next") => void;
  selectedDate: Date | null | undefined;
  startDate: Date;
};

const MiniCalendarContext = createContext<MiniCalendarContextType | null>(null);

function useMiniCalendar() {
  const context = useContext(MiniCalendarContext);

  if (!context) {
    throw new Error("MiniCalendar components must be used within MiniCalendar");
  }

  return context;
}

function getDays(startDate: Date, count: number): Date[] {
  const days: Date[] = [];

  for (let index = 0; index < count; index++) {
    days.push(addDays(startDate, index));
  }

  return days;
}

function formatDate(date: Date) {
  return {
    day: format(date, "d"),
    month: format(date, "MMM"),
  };
}

export type MiniCalendarProps = HTMLAttributes<HTMLDivElement> & {
  days?: number;
  defaultStartDate?: Date;
  defaultValue?: Date;
  onStartDateChange?: (date: Date | undefined) => void;
  onValueChange?: (date: Date | undefined) => void;
  startDate?: Date;
  value?: Date;
};

export function MiniCalendar({
  children,
  className,
  days = 5,
  defaultStartDate = new Date(),
  defaultValue,
  onStartDateChange,
  onValueChange,
  startDate,
  value,
  ...props
}: MiniCalendarProps) {
  const [selectedDate, setSelectedDate] = useControllableState<
    Date | undefined
  >({
    defaultProp: defaultValue,
    onChange: onValueChange,
    prop: value,
  });

  const [currentStartDate, setCurrentStartDate] = useControllableState({
    defaultProp: defaultStartDate,
    onChange: onStartDateChange,
    prop: startDate,
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleNavigate = (direction: "prev" | "next") => {
    const newStartDate = addDays(
      currentStartDate ?? new Date(),
      direction === "next" ? days : -days,
    );
    setCurrentStartDate(newStartDate);
  };

  const contextValue: MiniCalendarContextType = {
    days,
    onDateSelect: handleDateSelect,
    onNavigate: handleNavigate,
    selectedDate: selectedDate ?? null,
    startDate: currentStartDate ?? new Date(),
  };

  return (
    <MiniCalendarContext.Provider value={contextValue}>
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg border bg-background p-2",
          className,
        )}
        data-slot="mini-calendar"
        {...props}
      >
        {children}
      </div>
    </MiniCalendarContext.Provider>
  );
}

export type MiniCalendarNavigationProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    direction: "prev" | "next";
  };

export function MiniCalendarNavigation({
  asChild = false,
  children,
  direction,
  onClick,
  ...props
}: MiniCalendarNavigationProps) {
  const { onNavigate } = useMiniCalendar();
  const Icon = direction === "prev" ? ChevronLeftIcon : ChevronRightIcon;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onNavigate(direction);
    onClick?.(event);
  };

  if (asChild) {
    return (
      <Slot onClick={handleClick} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <Button
      aria-label={direction === "prev" ? "Previous days" : "Next days"}
      onClick={handleClick}
      size="icon"
      type="button"
      variant="ghost"
      {...props}
    >
      {children ?? <Icon className="size-4" />}
    </Button>
  );
}

export type MiniCalendarDaysProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  children: (date: Date) => ReactNode;
};

export function MiniCalendarDays({
  children,
  className,
  ...props
}: MiniCalendarDaysProps) {
  const { days: dayCount, startDate } = useMiniCalendar();
  const dates = getDays(startDate, dayCount);

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      data-slot="mini-calendar-days"
      {...props}
    >
      {dates.map((date) => children(date))}
    </div>
  );
}

export type MiniCalendarDayProps = ComponentProps<typeof Button> & {
  date: Date;
};

export function MiniCalendarDay({
  className,
  date,
  ...props
}: MiniCalendarDayProps) {
  const { onDateSelect, selectedDate } = useMiniCalendar();
  const { day, month } = formatDate(date);
  const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
  const isTodayDate = isToday(date);

  return (
    <Button
      className={cn(
        "h-auto min-w-12 flex-col gap-0 p-2 text-xs",
        isTodayDate && !isSelected && "bg-accent",
        className,
      )}
      data-slot="mini-calendar-day"
      onClick={() => onDateSelect(date)}
      size="sm"
      type="button"
      variant={isSelected ? "default" : "ghost"}
      {...props}
    >
      <span
        className={cn(
          "font-medium text-[10px] text-muted-foreground",
          isSelected && "text-primary-foreground/70",
        )}
      >
        {month}
      </span>
      <span className="font-semibold text-sm">{day}</span>
    </Button>
  );
}
