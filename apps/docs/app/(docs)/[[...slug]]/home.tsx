import { Button } from "@zeron-ui/ui/button";
import Link from "next/link";
import { CategoryCard } from "../../../components/category-card";
import { getCategoryThumbnail } from "../../../components/category-thumbnails";

const categories = [
  {
    description: "Action control with Zeron UI variants and composition.",
    href: "/components/button",
    name: "Button",
    slug: "button",
  },
  {
    description: "Group related buttons and controls with shared edges.",
    href: "/components/button-group",
    name: "Button Group",
    slug: "button-group",
  },
  {
    description: "Compact status labels with Shadcn variants.",
    href: "/components/badge",
    name: "Badge",
    slug: "badge",
  },
  {
    description: "Important inline messages for product states.",
    href: "/components/alert",
    name: "Alert",
    slug: "alert",
  },
  {
    description: "Page hierarchy navigation primitives.",
    href: "/components/breadcrumb",
    name: "Breadcrumb",
    slug: "breadcrumb",
  },
  {
    description: "Horizontal and vertical dividers built on Base UI.",
    href: "/components/separator",
    name: "Separator",
    slug: "separator",
  },
  {
    description: "Flexible item layout primitive for content rows.",
    href: "/components/item",
    name: "Item",
    slug: "item",
  },
  {
    description: "Layered card primitives for covers and structured content.",
    href: "/components/card",
    name: "Card",
    slug: "card",
  },
  {
    description: "Accessible form layout primitives for labels and messages.",
    href: "/components/field",
    name: "Field",
    slug: "field",
  },
  {
    description: "Text labels associated with form controls.",
    href: "/components/label",
    name: "Label",
    slug: "label",
  },
  {
    description: "Compact calendar for picking nearby dates.",
    href: "/components/mini-calendar",
    name: "Mini Calendar",
    slug: "mini-calendar",
  },
  {
    description: "Styled input control for forms.",
    href: "/components/input",
    name: "Input",
    slug: "input",
  },
  {
    description: "Styled multiline text control for forms.",
    href: "/components/textarea",
    name: "Textarea",
    slug: "textarea",
  },
  {
    description: "Input wrappers with addons, buttons, and helper content.",
    href: "/components/input-group",
    name: "Input Group",
    slug: "input-group",
  },
  {
    description: "Keyboard key primitives for shortcuts and commands.",
    href: "/components/kbd",
    name: "Kbd",
    slug: "kbd",
  },
  {
    description: "Status indicator for uptime and health states.",
    href: "/components/status",
    name: "Status",
    slug: "status",
  },
  {
    description: "Control for switching light, dark, and system themes.",
    href: "/components/theme-switcher",
    name: "Theme Switcher",
    slug: "theme-switcher",
  },
  {
    description: "Accessible checkbox built on Base UI.",
    href: "/components/checkbox",
    name: "Checkbox",
    slug: "checkbox",
  },
  {
    description: "Layout primitives for grouped checkbox choices.",
    href: "/components/checkbox-group",
    name: "Checkbox Group",
    slug: "checkbox-group",
  },
  {
    description: "Accessible single-choice radio group built on Base UI.",
    href: "/components/radio-group",
    name: "Radio Group",
    slug: "radio-group",
  },
  {
    description: "Base UI select primitives styled with Shadcn defaults.",
    href: "/components/select",
    name: "Select",
    slug: "select",
  },
  {
    description: "Base UI menu primitives styled with Shadcn defaults.",
    href: "/components/dropdown-menu",
    name: "Dropdown Menu",
    slug: "dropdown-menu",
  },
  {
    description: "Modal dialog primitives built on Base UI.",
    href: "/components/dialog",
    name: "Dialog",
    slug: "dialog",
  },
  {
    description: "Confirmation dialogs for destructive or important actions.",
    href: "/components/alert-dialog",
    name: "Alert Dialog",
    slug: "alert-dialog",
  },
  {
    description: "Toast notifications built on Sonner.",
    href: "/components/sonner",
    name: "Sonner",
    slug: "sonner",
  },
  {
    description: "Contextual hints for controls and compact UI.",
    href: "/components/tooltip",
    name: "Tooltip",
    slug: "tooltip",
  },
  {
    description: "Base UI tabs primitives styled with Shadcn defaults.",
    href: "/components/tabs",
    name: "Tabs",
    slug: "tabs",
  },
  {
    description: "Accessible toggle control built on Base UI principles.",
    href: "/components/switch",
    name: "Switch",
    slug: "switch",
  },
  {
    description: "Placeholder loading primitive with pulse animation.",
    href: "/components/skeleton",
    name: "Skeleton",
    slug: "skeleton",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-16 p-4 sm:gap-24">
      <section className="flex min-h-[34rem] flex-col items-center justify-center text-center">
        <p className="mb-4 rounded-full border bg-muted/50 px-3 py-1 text-muted-foreground text-sm">
          Zeron UI
        </p>
        <h1 className="max-w-4xl font-semibold text-5xl tracking-tight md:text-7xl">
          Components with ownership, not ornament.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A monorepo starter for an accessible component library, copy-paste
          registry, and Fumadocs documentation site.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/components/button">Browse components</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/docs/setup">Setup guide</Link>
          </Button>
        </div>
      </section>
      <section className="relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-border/64">
        <div
          aria-hidden="true"
          className="container pointer-events-none absolute inset-0 z-50 before:absolute before:top-[-3.5px] before:-left-[11.5px] before:z-1 before:-ml-1 before:size-2 before:rounded-[2px] before:border before:border-border before:bg-popover before:bg-clip-padding before:shadow-xs after:absolute after:top-[-3.5px] after:-right-[11.5px] after:z-1 after:-mr-1 after:size-2 after:rounded-[2px] after:border after:border-border after:bg-background after:bg-clip-padding after:shadow-xs dark:after:bg-clip-border dark:before:bg-clip-border"
        />
        <div className="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              description={category.description}
              href={category.href}
              key={category.slug}
              name={category.name}
              thumbnail={getCategoryThumbnail(category.slug)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
