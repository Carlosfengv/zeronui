"use client";

import {
  ThemeSwitcher,
  type ThemeSwitcherValue,
} from "@zeron-ui/ui/theme-switcher";
import { useState } from "react";

export default function ThemeSwitcherExample() {
  const [theme, setTheme] = useState<ThemeSwitcherValue>("system");

  return <ThemeSwitcher onChange={setTheme} value={theme} />;
}
