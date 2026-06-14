# Showcase Detail Specification

## Overview

- Reference URL: `https://www.seesaw.website/websites/raindrop-v2`
- Target files:
  - `apps/docs/components/showcase/showcase-page.tsx`
  - `apps/docs/app/(docs)/[[...slug]]/page.tsx`
  - `apps/docs/lib/showcase-items.ts`
- Screenshots:
  - `docs/design-references/seesaw-detail-raindrop-desktop.png`
  - `docs/design-references/seesaw-detail-raindrop-mobile.png`
- Interaction model: static detail page with central component demo and link navigation.

## Source Layout

The reference page uses:

- A simplified fixed top navigation.
- Centered title, description, and visit button.
- A large browser-like screenshot frame in the middle of the page.
- Detail metadata below the hero screenshot.
- Related website cards beneath the detail metadata.

## Zeron UI Adaptation

The Zeron UI detail page maps those regions to:

- Centered component title, kind, summary, and docs link.
- A large browser-like demo frame with real Zeron UI components rendered inside.
- Detail metadata for install command, AI usage Markdown path, import path, variants, and slots.
- Related component cards that link to other showcase detail pages.

## Demo Area Requirements

- The center demo must be actual component UI, not a static screenshot.
- The demo should use the selected showcase slug to render a relevant component composition.
- The frame should preserve Seesaw's large centered preview rhythm.
- The page must stay responsive: mobile stacks hero, demo, metadata, and related cards.

## Responsive Behavior

- Desktop: large centered preview with metadata below in two columns.
- Mobile: preview remains first-class but scales down; metadata stacks below.
