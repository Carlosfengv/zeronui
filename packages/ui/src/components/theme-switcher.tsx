"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useControllableState } from "../lib/use-controllable-state";
import { cn } from "../lib/utils";
import { Button } from "./button";

const themes = [
  {
    icon: MonitorIcon,
    key: "system",
    label: "System theme",
  },
  {
    icon: SunIcon,
    key: "light",
    label: "Light theme",
  },
  {
    icon: MoonIcon,
    key: "dark",
    label: "Dark theme",
  },
] as const;

export type ThemeSwitcherValue = (typeof themes)[number]["key"];

export type ThemeSwitcherProps = {
  className?: string;
  defaultValue?: ThemeSwitcherValue;
  onChange?: (theme: ThemeSwitcherValue) => void;
  value?: ThemeSwitcherValue;
};

export function ThemeSwitcher({
  className,
  defaultValue = "system",
  onChange,
  value,
}: ThemeSwitcherProps) {
  const [theme, setTheme] = useControllableState({
    defaultProp: defaultValue,
    onChange,
    prop: value,
  });
  const [mounted, setMounted] = useState(false);

  const handleThemeClick = useCallback(
    (themeKey: ThemeSwitcherValue) => {
      setTheme(themeKey);
    },
    [setTheme],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative isolate flex h-8 rounded-full bg-background p-1 ring-1 ring-border",
        className,
      )}
      data-slot="theme-switcher"
    >
      {themes.map(({ icon: Icon, key, label }) => {
        const isActive = theme === key;

        return (
          <Button
            aria-label={label}
            className="relative size-6 rounded-full p-0 hover:bg-transparent"
            data-active={isActive}
            key={key}
            onClick={() => handleThemeClick(key)}
            size="icon-xs"
            type="button"
            variant="ghost"
          >
            {isActive ? (
              <motion.div
                className="absolute inset-0 rounded-full bg-secondary"
                layoutId="activeTheme"
                transition={{ duration: 0.5, type: "spring" }}
              />
            ) : null}
            <Icon
              className={cn(
                "relative z-10 m-auto size-4",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            />
          </Button>
        );
      })}
    </div>
  );
}
