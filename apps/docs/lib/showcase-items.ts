import blocksRegistry from "../../../packages/registry/src/blocks.json";
import componentsRegistry from "../../../packages/registry/src/components.json";

export type ShowcaseKind = "Component" | "Pattern" | "Block" | "Guide";

export type ShowcaseItem = {
  description: string;
  docHref?: string;
  installName: string;
  kind: ShowcaseKind;
  name: string;
  registryType: string;
  slots: string[];
  slug: string;
  summary: string;
  variants: string[];
};

type RegistryItem = {
  description?: string;
  name: string;
  registryDependencies?: string[];
  title?: string;
  type: string;
};

const documentedComponents = new Set([
  "alert",
  "alert-dialog",
  "avatar",
  "badge",
  "badge-overflow",
  "breadcrumb",
  "button",
  "card",
  "checkbox",
  "checkbox-group",
  "collapsible",
  "data-grid",
  "data-table",
  "dialog",
  "dropdown-menu",
  "field",
  "filter-badge",
  "input",
  "item",
  "kbd",
  "key-value",
  "label",
  "mini-calendar",
  "radio-group",
  "select",
  "separator",
  "sidebar",
  "skeleton",
  "sonner",
  "status",
  "stepper",
  "switch",
  "table",
  "tabs",
  "textarea",
  "theme-switcher",
  "tooltip",
]);

const hiddenShowcaseItems = new Set(["sidebar"]);

const slotOverrides: Record<string, string[]> = {
  button: ["button", "icon", "label"],
  card: ["header", "title", "content", "footer"],
  "data-grid": ["toolbar", "column header", "cell", "row actions"],
  dialog: ["trigger", "header", "content", "footer"],
  "input-group": ["prefix", "input", "suffix", "action"],
  item: ["media", "content", "description", "actions"],
  "key-value": ["key", "value", "visibility", "row actions"],
  sidebar: ["sidebar", "navigation", "rail", "workspace"],
  tabs: ["list", "trigger", "indicator", "content"],
  "theme-switcher": ["trigger", "theme option", "icon", "label"],
  "pattern-agent-behavior-guidelines": [
    "guideline",
    "status",
    "action",
    "note",
  ],
  "pattern-environment-variable-editor": [
    "key",
    "value",
    "visibility",
    "row actions",
  ],
  "pattern-quota-usage-card": ["metric", "progress", "limit", "action"],
  "user-app-layout": ["sidebar", "breadcrumb", "workspace", "user menu"],
};

const variantOverrides: Record<string, string[]> = {
  button: ["default", "secondary", "outline", "ghost", "destructive"],
  card: ["card", "frame", "resource", "panel"],
  "data-grid": ["search", "pinned columns", "keyboard nav", "paste dialog"],
  dialog: ["modal", "confirmation", "form", "destructive"],
  "input-group": ["default", "with prefix", "with action", "textarea"],
  item: ["basic", "media", "link", "dropdown", "grouped"],
  "key-value": ["display", "edit", "masked", "actions"],
  sidebar: ["desktop", "mobile", "collapsed", "nested nav"],
  tabs: ["default", "line", "underline", "vertical"],
  "theme-switcher": ["controlled", "uncontrolled", "icon", "segmented"],
  "pattern-agent-behavior-guidelines": [
    "behavior",
    "workflow",
    "identity",
    "profile",
  ],
  "pattern-environment-variable-editor": [
    "masked",
    "editing",
    "adding",
    "saved",
  ],
  "pattern-quota-usage-card": [
    "usage card",
    "metric list",
    "warning",
    "upgrade CTA",
  ],
  "user-app-layout": ["desktop", "mobile", "collapsed", "nested nav"],
};

const patternDocByName: Record<string, string> = {
  "pattern-agent-behavior-guidelines": "/patterns/agent-detail",
  "pattern-environment-variable-editor": "/patterns/environment",
  "pattern-quota-usage-card": "/patterns/quota",
};

function getPatternDocHref(name: string) {
  if (patternDocByName[name]) {
    return patternDocByName[name];
  }

  if (name.startsWith("pattern-item-")) {
    return "/patterns/item";
  }

  return undefined;
}

function getKind(item: RegistryItem): ShowcaseKind {
  if (item.type === "registry:block") {
    return "Block";
  }

  if (item.name.startsWith("pattern-")) {
    return "Pattern";
  }

  return "Component";
}

function getDocHref(item: RegistryItem, kind: ShowcaseKind) {
  if (kind === "Block") {
    return `/blocks/${item.name}`;
  }

  if (kind === "Pattern") {
    return getPatternDocHref(item.name);
  }

  if (documentedComponents.has(item.name)) {
    return `/components/${item.name}`;
  }

  return undefined;
}

function defaultSlots(item: RegistryItem, kind: ShowcaseKind) {
  const override = slotOverrides[item.name];

  if (override) {
    return override;
  }

  if (kind === "Pattern") {
    return ["root", "content", "actions", "state"];
  }

  if (kind === "Block") {
    return ["layout", "navigation", "content", "actions"];
  }

  const dependencies = item.registryDependencies?.slice(0, 3) ?? [];
  return dependencies.length > 0 ? dependencies : ["root", "content"];
}

function defaultVariants(item: RegistryItem, kind: ShowcaseKind) {
  const override = variantOverrides[item.name];

  if (override) {
    return override;
  }

  if (kind === "Pattern") {
    return ["default", "with data", "with action", "empty state"];
  }

  if (kind === "Block") {
    return ["desktop", "mobile", "responsive", "with navigation"];
  }

  return ["default", "disabled", "composition", "responsive"];
}

function toShowcaseItem(item: RegistryItem): ShowcaseItem {
  const kind = getKind(item);
  const description = item.description ?? `${item.title ?? item.name} component.`;

  return {
    description,
    docHref: getDocHref(item, kind),
    installName: item.name,
    kind,
    name: item.title ?? item.name,
    registryType: item.type,
    slots: defaultSlots(item, kind),
    slug: item.name,
    summary: description,
    variants: defaultVariants(item, kind),
  };
}

export const showcaseItems: ShowcaseItem[] = [
  ...componentsRegistry.items.map((item) => toShowcaseItem(item)),
  ...blocksRegistry.items.map((item) => toShowcaseItem(item)),
]
  .filter((item) => !hiddenShowcaseItems.has(item.slug))
  .sort((a, b) => {
  const order: Record<ShowcaseKind, number> = {
    Component: 0,
    Pattern: 1,
    Block: 2,
    Guide: 3,
  };

  return order[a.kind] - order[b.kind] || a.name.localeCompare(b.name);
});

export const showcaseItemsByKind = {
  all: showcaseItems,
  block: showcaseItems.filter((item) => item.kind === "Block"),
  component: showcaseItems.filter((item) => item.kind === "Component"),
  pattern: showcaseItems.filter((item) => item.kind === "Pattern"),
};

export function getShowcaseItem(slug: string | undefined) {
  return showcaseItems.find((item) => item.slug === slug);
}
