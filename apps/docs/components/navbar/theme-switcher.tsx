"use client";

import {
  ThemeSwitcher,
  type ThemeSwitcherValue,
} from "@zeron-ui/ui/theme-switcher";
import { useTheme } from "next-themes";

function normalizeTheme(theme: string | undefined): ThemeSwitcherValue {
  if (theme === "light" || theme === "dark" || theme === "system") {
    return theme;
  }

  return "system";
}

export function NavbarThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return <ThemeSwitcher onChange={setTheme} value={normalizeTheme(theme)} />;
}
