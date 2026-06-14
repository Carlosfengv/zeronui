import { cn } from "@zeron-ui/ui/utils";
import {
  BlocksIcon,
  BracesIcon,
  ComponentIcon,
  CopyIcon,
  DatabaseIcon,
  FileTextIcon,
  Grid3X3Icon,
  Layers3Icon,
  LibraryIcon,
  MousePointerClickIcon,
  PanelsTopLeftIcon,
  SparklesIcon,
  SwatchBookIcon,
  WandSparklesIcon,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ComponentDemo } from "../../../components/showcase/showcase-page";
import {
  type ShowcaseItem,
  showcaseItems,
  showcaseItemsByKind,
} from "../../../lib/showcase-items";

type RailItem = {
  count: string;
  href: string;
  icon: ReactNode;
  label: string;
};

const railItems: RailItem[] = [
  {
    count: "All",
    href: "/",
    icon: <SparklesIcon />,
    label: "All",
  },
  {
    count: String(showcaseItemsByKind.component.length),
    href: "/?kind=component",
    icon: <ComponentIcon />,
    label: "Components",
  },
  {
    count: String(showcaseItemsByKind.pattern.length),
    href: "/?kind=pattern",
    icon: <Layers3Icon />,
    label: "Patterns",
  },
  {
    count: String(showcaseItemsByKind.block.length),
    href: "/?kind=block",
    icon: <BlocksIcon />,
    label: "Blocks",
  },
  {
    count: "AI",
    href: "/docs/philosophy",
    icon: <WandSparklesIcon />,
    label: "AI Usage",
  },
  {
    count: "CLI",
    href: "/docs/setup",
    icon: <CopyIcon />,
    label: "Install Flow",
  },
  {
    count: "MDX",
    href: "/docs/architecture",
    icon: <FileTextIcon />,
    label: "Docs Source",
  },
  {
    count: "Token",
    href: "/docs/style-variables",
    icon: <SwatchBookIcon />,
    label: "Style Variables",
  },
];

type HomePageProps = {
  activeKind?: string;
};

export default function HomePage({ activeKind = "all" }: HomePageProps) {
  const normalizedKind =
    activeKind === "component" ||
    activeKind === "pattern" ||
    activeKind === "block"
      ? activeKind
      : "all";
  const items =
    normalizedKind === "all"
      ? showcaseItemsByKind.all
      : showcaseItemsByKind[normalizedKind];

  return (
    <main className="min-h-screen bg-[#fbfbfa] text-[#17181a] dark:bg-background dark:text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[15.75rem_minmax(0,1fr)]">
        <aside className="sticky top-[var(--nav-height)] hidden h-[calc(100dvh-var(--nav-height))] border-r bg-[#fbfbfa] px-4 py-4 dark:bg-background lg:flex lg:flex-col">
          <nav aria-label="Homepage sections" className="grid gap-1">
            {railItems.map((item, index) => (
              <Link
                className={cn(
                  "group flex h-9 items-center gap-3 rounded-lg px-3 text-[15px] transition-colors hover:bg-[#efeff1] dark:hover:bg-muted",
                  isActiveRailItem(item, normalizedKind) &&
                    "bg-[#efeff1] dark:bg-muted",
                )}
                href={item.href}
                key={item.label}
              >
                <span className="flex size-4 items-center justify-center text-[#a3a8b1] transition-colors group-hover:text-foreground [&>svg]:size-4">
                  {item.icon}
                </span>
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                <span className="text-[#9aa1ac] text-xs">{item.count}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto grid gap-2 text-sm">
            <Link
              className="flex h-10 items-center justify-between rounded-lg bg-[#f0f1f3] px-3 transition-colors hover:bg-[#e8e9ec] dark:bg-muted"
              href="/docs/setup"
            >
              <span>CLI setup</span>
              <BracesIcon className="size-4 text-[#9aa1ac]" />
            </Link>
            <Link
              className="flex h-10 items-center justify-between rounded-lg bg-[#f0f1f3] px-3 transition-colors hover:bg-[#e8e9ec] dark:bg-muted"
              href="/docs/architecture"
            >
              <span>Registry map</span>
              <DatabaseIcon className="size-4 text-[#9aa1ac]" />
            </Link>
            <p className="px-3 pt-2 text-[#9aa1ac] text-sm">
              Zeron UI component system
            </p>
          </div>
        </aside>

        <section className="min-w-0 px-4 pt-8 pb-16 sm:px-6 lg:px-6 lg:pt-9 xl:px-8">
          <div className="mx-auto w-full max-w-none">
            <section className="grid gap-7 pb-12">
              <div className="max-w-3xl">
                <div className="mb-5 flex flex-wrap items-center gap-2 lg:hidden">
                  {railItems.slice(0, 5).map((item) => (
                    <Link
                      className={cn(
                        "inline-flex h-8 items-center gap-2 rounded-full border bg-background px-3 text-sm",
                        isActiveRailItem(item, normalizedKind) &&
                          "bg-foreground text-background",
                      )}
                      href={item.href}
                      key={item.label}
                    >
                      <span className="[&>svg]:size-3.5">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>

                <h1 className="max-w-3xl font-semibold text-4xl tracking-tight sm:text-5xl">
                  The best product components for AI-era business apps
                </h1>
                <p className="mt-3 max-w-2xl text-[#727987] text-xl leading-7">
                  Browse installable components, patterns, and blocks. Copy the
                  registry command, preview the UI, then hand the usage notes to
                  your coding agent.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 font-medium text-primary-foreground text-sm shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    href="/showcase/button"
                  >
                    Browse components
                  </Link>
                  <span className="text-[#9aa1ac] text-base">
                    Updated for docs, registry, and component previews
                  </span>
                </div>
              </div>
            </section>

            <section
              aria-label="Featured Zeron UI items"
              className="grid gap-x-10 gap-y-12 md:grid-cols-2 min-[1441px]:grid-cols-3"
            >
              {items.map((item) => (
                <GalleryCard item={item} key={item.name} />
              ))}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function GalleryCard({ item }: { item: ShowcaseItem }) {
  return (
    <Link className="group block min-w-0" href={`/showcase/${item.slug}`}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-md border bg-card transition-colors group-hover:border-[#bfc3ca]">
        <div className="relative grid size-full place-items-center p-3 sm:p-4">
          <div className="flex size-full items-center justify-center">
            <ComponentDemo item={item} mode="cover" />
          </div>
        </div>
      </div>
      <div className="mt-3 flex min-w-0 items-start gap-2">
        <ItemMark kind={item.kind} />
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-2">
            <h2 className="truncate font-medium text-[15px] leading-5">
              {item.name}
            </h2>
            <span className="rounded bg-[#eff0f2] px-1.5 py-0.5 text-[#8d95a1] text-[11px] leading-none dark:bg-muted">
              {item.kind}
            </span>
          </div>
          <p className="mt-0.5 line-clamp-2 text-[#9aa1ac] text-[15px] leading-5">
            {item.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

function isActiveRailItem(item: RailItem, activeKind: string) {
  if (item.label === "All") {
    return activeKind === "all";
  }

  return item.href === `/?kind=${activeKind}`;
}

function ItemMark({ kind }: { kind: ShowcaseItem["kind"] }) {
  const Icon =
    kind === "Pattern"
      ? Grid3X3Icon
      : kind === "Block"
        ? PanelsTopLeftIcon
        : kind === "Guide"
          ? LibraryIcon
          : MousePointerClickIcon;

  return (
    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-[#eef0f3] text-[#17181a] dark:bg-muted dark:text-foreground">
      <Icon className="size-3.5" />
    </span>
  );
}
