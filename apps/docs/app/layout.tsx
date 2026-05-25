import "./global.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ThemeShortcut } from "@/components/theme-shortcut";

export const metadata: Metadata = {
  title: {
    default: "Zeron UI",
    template: "%s | Zeron UI",
  },
  description:
    "Composable, accessible components built with Tailwind CSS, Base UI, shadcn/ui philosophy, and Fumadocs.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>
          <ThemeShortcut />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
