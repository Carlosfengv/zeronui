# Home Gallery Specification

## Overview

- Target file: `apps/docs/app/(docs)/[[...slug]]/home.tsx`
- Screenshots:
  - `docs/design-references/seesaw-desktop.png`
  - `docs/design-references/seesaw-mobile.png`
- Interaction model: static gallery with link cards and hover states

## DOM Structure

- Page shell
  - Desktop category sidebar
  - Main content
    - Hero header
    - Gallery grid
      - Gallery card
        - Preview media
        - Metadata row
        - Description

## Computed Style Targets

### Page

- Background: near-white.
- Border color: very light neutral.
- Top nav: fixed, white, border-bottom, subtle backdrop.
- Main content: large top padding under nav, spacious horizontal gutters.

### Sidebar

- Width: about 250px.
- Position: sticky/fixed below nav on desktop.
- Items: compact rows, rounded 8px to 10px.
- Active item: light gray fill.

### Hero

- Heading: bold, compact tracking, approximately 40px on desktop.
- Subheading: muted gray, medium-large text.
- CTA row: black primary button and muted secondary note.

### Gallery Card

- Image area: 16:9-ish rounded rectangle.
- Background: muted neutral or subtle component preview.
- Card shell: no heavy outer border; metadata sits below image.
- Hover: image lifts or border darkens slightly.

## States and Behaviors

- Card hover: preview background shifts slightly and image/thumbnail translates upward by a few pixels.
- Category item hover: background changes to muted.
- Mobile: sidebar hidden and cards become single column.

## Content

Use Zeron UI content:

- Components: Button, Data Grid, Input, Dialog, Card, Tabs, Theme Switcher.
- Patterns: Item patterns, Quota card, Environment variable editor, Agent behavior guidelines.
- Blocks: User App Layout.
- Product messages: component workbench, preview variants, AI-ready usage Markdown, registry install flow.
