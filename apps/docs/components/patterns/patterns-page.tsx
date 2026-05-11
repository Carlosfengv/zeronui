import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Badge } from "@zeron-ui/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@zeron-ui/ui/breadcrumb";
import { DocsBody } from "fumadocs-ui/layouts/docs/page";
import Link from "next/link";
import type { ReactNode } from "react";
import { PatternPreviewTabs } from "./pattern-preview-tabs";
import { patternDocs, patternItems } from "./patterns-data";
import { PatternsSidebar } from "./patterns-sidebar";

type PatternsPageProps = {
  activePath: string;
  children: ReactNode;
  description?: string;
  previewPath?: string;
  title: string;
};

export function PatternsPage({
  activePath,
  children,
  description,
  previewPath,
  title,
}: PatternsPageProps) {
  const isIndex = activePath === "/patterns";

  return (
    <main className="h-dvh overflow-hidden bg-background pt-[var(--nav-height)]">
      <div className="grid h-[calc(100dvh-var(--nav-height))] min-h-0 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <PatternsSidebar activePath={activePath} />
        <section className="flex h-full min-h-0 min-w-0 flex-col p-3 pt-[calc(2.75rem+0.75rem)]">
          <div className="fixed top-[var(--nav-height)] right-0 left-0 z-30 h-11 bg-background/95 px-5 py-4 backdrop-blur lg:left-[18rem] lg:px-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/patterns" />}>
                    Patterns
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {!isIndex ? (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        {title.replace(" Patterns", "")}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                ) : null}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {previewPath ? (
            <div className="min-h-0 w-full flex-1 overflow-hidden rounded-lg bg-muted p-3">
              <div className="grid h-full min-h-0 grid-rows-[minmax(20rem,40vh)_minmax(0,1fr)] gap-3 lg:grid-cols-[minmax(0,4fr)_minmax(0,1fr)] lg:grid-rows-1">
                <div className="flex min-h-[24rem] items-center justify-center overflow-hidden rounded-md bg-background lg:min-h-0 border">
                  <PatternPreviewSurface path={previewPath} />
                </div>
                <aside className="min-h-0 overflow-y-auto rounded-md bg-background px-5 py-6 lg:px-6">
                  <PatternDocumentHeader
                    description={description}
                    isIndex={isIndex}
                    title={title}
                  />
                  <DocsBody>{children}</DocsBody>
                </aside>
              </div>
            </div>
          ) : (
            <div className="min-h-0 w-full flex-1 overflow-y-auto rounded-lg bg-muted px-5 py-8 lg:px-8">
              <PatternDocumentHeader
                description={description}
                isIndex={isIndex}
                title={title}
              />
              <DocsBody>{children}</DocsBody>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function PatternDocumentHeader({
  description,
  isIndex,
  title,
}: {
  description?: string;
  isIndex: boolean;
  title: string;
}) {
  return (
    <header className="mb-8 grid gap-4 border-b pb-8">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">
          {isIndex ? patternItems.length : patternDocs.length} patterns
        </Badge>
        {!isIndex ? <Badge variant="outline">MDX-defined</Badge> : null}
      </div>
      <div className="grid gap-2">
        <h1 className="font-semibold text-3xl tracking-tight md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </header>
  );
}

async function PatternPreviewSurface({ path }: { path: string }) {
  const filename = `${path}.tsx`;
  const source = await readFile(
    join(process.cwd(), "examples", filename),
    "utf8",
  );
  const Component = await import(`../../examples/${path}.tsx`).then(
    (mod) => mod.default,
  );

  return (
    <PatternPreviewTabs filename={filename} source={source}>
      <div className="relative flex size-full min-h-0 items-center justify-center overflow-hidden p-6">
        <div className="-translate-y-px absolute top-8 right-0 left-0 border-[0.5px] border-border/50 border-dashed" />
        <div className="absolute right-0 bottom-8 left-0 translate-y-px border-[0.5px] border-border/50 border-dashed" />
        <div className="-translate-x-px absolute top-0 bottom-0 left-8 border-[0.5px] border-border/50 border-dashed" />
        <div className="absolute top-0 right-8 bottom-0 translate-x-px border-[0.5px] border-border/50 border-dashed" />
        <Component />
      </div>
    </PatternPreviewTabs>
  );
}
