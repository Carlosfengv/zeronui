import { Badge } from "@zeron-ui/ui/badge";
import { cn } from "@zeron-ui/ui/utils";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  BracesIcon,
  Code2Icon,
  FileTextIcon,
  Layers3Icon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import {
  type ShowcaseItem,
  getShowcaseItem,
  showcaseItems,
} from "../../lib/showcase-items";
import type { ComponentType, ReactNode } from "react";

type ShowcasePageProps = {
  slug: string | undefined;
};

export function ShowcasePage({ slug }: ShowcasePageProps) {
  const item = getShowcaseItem(slug) ?? showcaseItems[0]!;
  const relatedItems = showcaseItems
    .filter((candidate) => candidate.slug !== item.slug)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#fbfbfa] px-4 pt-10 pb-16 text-[#17181a] dark:bg-background dark:text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[88rem] gap-10">
        <section className="grid justify-items-center gap-4 pt-4 text-center">
          <Link
            className="mb-2 inline-flex h-7 items-center justify-center gap-1.5 rounded-full border bg-background px-2.5 font-medium text-sm shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
            href="/"
          >
            <ArrowLeftIcon className="size-4" />
            Gallery
          </Link>
          <div className="grid gap-2">
            <p className="font-medium text-[#8f97a3] text-sm">{item.kind}</p>
            <h1 className="font-semibold text-4xl tracking-tight md:text-5xl">
              {item.name}
            </h1>
            <p className="max-w-2xl text-[#69717f] text-xl leading-7">
              {item.summary}
            </p>
          </div>
          {item.docHref ? (
            <Link
              className="inline-flex h-8 items-center justify-center gap-2 rounded-full border bg-background px-3 font-medium text-sm shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
              href={item.docHref}
            >
              Open docs
              <ArrowUpRightIcon className="size-4" />
            </Link>
          ) : null}
        </section>

        <section className="overflow-hidden rounded-lg border bg-background shadow-xs">
          <div className="flex h-11 items-center justify-between border-b px-4">
            <div className="flex items-center gap-2">
              <div className="size-2.5 rounded-full bg-[#ff5f57]" />
              <div className="size-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="hidden items-center gap-2 rounded-full bg-[#f0f1f3] px-3 py-1.5 text-[#8f97a3] text-xs sm:flex dark:bg-muted">
              <SearchIcon className="size-3.5" />
              component preview / {item.slug}
            </div>
            <Badge variant="secondary">{item.installName}</Badge>
          </div>
          <div className="relative min-h-[34rem] overflow-hidden p-5 sm:p-8 lg:min-h-[44rem]">
            <div className="mx-auto flex min-h-[30rem] max-w-5xl items-center justify-center lg:min-h-[38rem]">
              <ComponentDemo item={item} />
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-4xl gap-7 md:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)]">
          <div className="grid gap-5">
            <p className="font-medium text-[#8f97a3]">6.14.2026</p>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-3xl tracking-tight">
                  {item.name}
                </h2>
                {item.docHref ? (
                  <Link
                    aria-label={`Open ${item.name} docs`}
                    className="inline-flex size-7 items-center justify-center rounded-full border bg-background shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                    href={item.docHref}
                  >
                    <ArrowUpRightIcon className="size-4" />
                  </Link>
                ) : null}
              </div>
              <p className="mt-2 text-[#69717f] text-lg">{item.description}</p>
            </div>

            <div className="grid gap-4 rounded-xl border bg-background p-4">
              <DetailRow
                icon={<Code2Icon />}
                label="Install"
                value={`npx zeron-ui add ${item.installName}`}
              />
              <DetailRow
                icon={<FileTextIcon />}
                label="AI usage md"
                value={`/llms/components/${item.slug}`}
              />
              <DetailRow
                icon={<BracesIcon />}
                label="Import"
                value={
                  item.kind === "Pattern" || item.kind === "Block"
                    ? "Copy generated component"
                    : `@zeron-ui/ui/${item.installName}`
                }
              />
            </div>
          </div>

          <aside className="grid content-start gap-5">
            <MetaGroup title="Variants" values={item.variants} />
            <MetaGroup title="Slots" values={item.slots} />
          </aside>
        </section>

        <section className="mx-auto w-full max-w-6xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium text-lg">Related components</h2>
            <Link
              className="inline-flex h-7 items-center justify-center gap-1.5 rounded-md px-2.5 font-medium text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              href="/"
            >
              View all
              <ArrowUpRightIcon className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedItems.map((related) => (
              <Link
                className="group rounded-xl border bg-background p-4 transition-colors hover:border-[#bfc3ca]"
                href={`/showcase/${related.slug}`}
                key={related.slug}
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#eff0f2] text-[#69717f] dark:bg-muted">
                    <Layers3Icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-medium">{related.name}</h3>
                      <Badge variant="secondary">{related.kind}</Badge>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[#8f97a3] text-sm">
                      {related.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[8rem_minmax(0,1fr)] sm:items-center">
      <div className="flex items-center gap-2 text-[#8f97a3] text-sm [&>svg]:size-4">
        {icon}
        {label}
      </div>
      <code className="truncate rounded-md bg-[#f3f4f5] px-2 py-1.5 text-sm dark:bg-muted">
        {value}
      </code>
    </div>
  );
}

function MetaGroup({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="grid gap-2">
      <p className="text-[#8f97a3] text-sm">{title}</p>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <span
            className="rounded-full border bg-background px-3 py-1 text-sm"
            key={value}
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

export async function ComponentDemo({
  item,
  mode = "detail",
}: {
  item: ShowcaseItem;
  mode?: "cover" | "detail";
}) {
  const Example = await loadExample(item.installName);

  if (!Example) {
    return <MissingDemo item={item} mode={mode} />;
  }

  return (
    <DemoFrame item={item} mode={mode}>
      <Example />
    </DemoFrame>
  );
}

async function loadExample(path: string) {
  try {
    const mod = await import(`../../examples/${path}.tsx`);

    return mod.default as ComponentType;
  } catch {
    return null;
  }
}

function DemoFrame({
  children,
  item,
  mode = "detail",
}: {
  children: ReactNode;
  item: ShowcaseItem;
  mode?: "cover" | "detail";
}) {
  const isBlock = item.kind === "Block";

  return (
    <div
      className={cn(
        mode === "cover" &&
          "flex size-full items-center justify-center overflow-hidden",
        isBlock && "w-full",
      )}
    >
      <div
        className={cn(
          isBlock ? "size-full overflow-hidden" : "max-w-full",
          mode === "cover" &&
            (isBlock
              ? "origin-center scale-[0.42] sm:scale-50"
              : "scale-95"),
        )}
      >
        {children}
      </div>
    </div>
  );
}

function MissingDemo({
  item,
  mode,
}: {
  item: ShowcaseItem;
  mode: "cover" | "detail";
}) {
  return (
    <div
      className={cn(
        "grid w-full place-items-center rounded-xl border bg-background p-4 text-center",
        mode === "cover" ? "min-h-36" : "min-h-80",
      )}
    >
      <div className="max-w-sm">
        <p className="font-medium">{item.name}</p>
        <p className="mt-1 text-muted-foreground text-sm">
          No demo file found at apps/docs/examples/{item.installName}.tsx.
        </p>
      </div>
    </div>
  );
}
