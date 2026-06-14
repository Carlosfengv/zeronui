import { getShowcaseItem } from "../../../../lib/showcase-items";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, props: RouteProps) {
  const { slug } = await props.params;
  const item = getShowcaseItem(slug);

  if (!item) {
    return new Response("Component not found.\n", { status: 404 });
  }

  const importLine =
    item.kind === "Pattern" || item.kind === "Block"
      ? `Install this generated component with \`npx zeron-ui add ${item.installName}\`, then import it from the generated target file.`
      : `import { /* exported parts */ } from "@zeron-ui/ui/${item.installName}";`;

  const body = `# ${item.name}

${item.description}

## Install

\`\`\`bash
npx zeron-ui add ${item.installName}
\`\`\`

## Import

${importLine}

## Use When

Use this ${item.kind.toLowerCase()} when you need ${item.summary.toLowerCase()}

## Variants

${item.variants.map((variant) => `- ${variant}`).join("\n")}

## Slots

${item.slots.map((slot) => `- ${slot}`).join("\n")}

## Implementation Notes

- Prefer the installed registry component over rebuilding the same UI by hand.
- Keep slot names visible in code comments when replacing placeholder content.
- Preserve the existing Zeron UI imports and Tailwind utility style.
${item.docHref ? `- Full human docs: ${item.docHref}` : ""}

## Preview

Open /showcase/${item.slug} to inspect the live preview.
`;

  return new Response(body, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
    },
  });
}
