import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { ConditionalContainer } from "../../components/conditional-container";
import { Navbar } from "../../components/navbar";
import { baseOptions } from "../../lib/layout.shared";
import { source } from "../../lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ConditionalContainer>
      <DocsLayout
        {...baseOptions()}
        nav={{
          component: <Navbar />,
        }}
        searchToggle={{
          enabled: false,
        }}
        sidebar={{
          className: "border-none",
          collapsible: false,
          tabs: false,
        }}
        themeSwitch={{
          enabled: false,
        }}
        tree={source.pageTree}
      >
        {children}
      </DocsLayout>
    </ConditionalContainer>
  );
}
