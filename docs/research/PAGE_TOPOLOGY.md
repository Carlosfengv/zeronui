# Seesaw-Inspired Homepage Topology

## Target Surface

Current project homepage: `apps/docs/app/(docs)/[[...slug]]/home.tsx`

## Layout

1. Fixed global navigation
   - Logo at the left.
   - Search affordance near the center.
   - Primary entry buttons on the right.

2. Left category rail
   - Desktop only.
   - Uses compact category rows.
   - Active item appears as a filled rounded row.
   - Footer utility actions are pinned at the bottom of the rail.

3. Main hero
   - Large, blunt heading.
   - Muted supporting sentence.
   - Primary CTA and small activity indicator.

4. Component gallery
   - Three columns on desktop.
   - Two columns on tablet.
   - One column on mobile.
   - Each card includes a preview thumbnail, icon mark, title, description, and a small type label.

## Implementation Scope

- Build a Seesaw-style homepage for Zeron UI.
- Do not replace component docs, pattern docs, block pages, registry, or CLI behavior.
- Use existing thumbnails from `apps/docs/components/category-thumbnails.tsx` where available.
