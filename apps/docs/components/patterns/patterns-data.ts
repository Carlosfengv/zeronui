import { showQueuedPatterns, visiblePatternDocs } from "./patterns-config";

export type PatternNavItem = {
  description?: string;
  href?: string;
  name: string;
  slug: string;
  status: "ready" | "queued";
};

const patternNames = [
  "Accordion",
  "Alert",
  "Alert Dialog",
  "Aspect Ratio",
  "Avatar",
  "Badge",
  "Breadcrumb",
  "Button",
  "Button Group",
  "Calendar",
  "Card",
  "Carousel",
  "Chart",
  "Checkbox",
  "Collapsible",
  "Combobox",
  "Command",
  "Context Menu",
  "Data Table",
  "Date Picker",
  "Dialog",
  "Drawer",
  "Dropdown Menu",
  "Empty",
  "Environment",
  "Field",
  "Form",
  "Hover Card",
  "Input",
  "Input Group",
  "Input OTP",
  "Item",
  "Kbd",
  "Label",
  "Menubar",
  "Navigation Menu",
  "Pagination",
  "Popover",
  "Progress",
  "Quota",
  "Radio Group",
  "Scroll Area",
  "Separator",
  "Sheet",
  "Skeleton",
  "Slider",
  "Sonner",
  "Spinner",
  "Switch",
  "Table",
  "Tabs",
  "Textarea",
  "Toggle",
  "Toggle Group",
  "Tooltip",
];

export const patternDocs: PatternNavItem[] = visiblePatternDocs.map((doc) => ({
  ...doc,
  status: "ready",
}));

const patternDocBySlug = new Map(patternDocs.map((doc) => [doc.slug, doc]));

export const patternItems: PatternNavItem[] = patternNames.flatMap((name) => {
  const slug = name.toLowerCase().replaceAll(" ", "-");
  const doc = patternDocBySlug.get(slug);

  if (doc) {
    return [doc];
  }

  if (!showQueuedPatterns) {
    return [];
  }

  return [
    {
      name,
      slug,
      status: "queued",
    },
  ];
});
