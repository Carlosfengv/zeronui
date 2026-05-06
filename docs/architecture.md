# Zeron UI architecture

Zeron UI uses a monorepo because the component source, documentation examples, registry metadata, and shared configuration need to evolve together.

## Boundaries

- `apps/docs`: Documentation site. It owns routing, MDX, preview UI, search, and documentation-only components.
- `packages/ui`: Component source of truth. Components here must be reusable outside the docs app.
- `packages/registry`: Registry metadata and scripts for copy-paste distribution.
- `packages/typescript-config`: Shared TypeScript settings.

## Rule of thumb

If a component is shown in documentation but should be copied or installed by users, it belongs in `packages/ui`.

If a component only helps render documentation, such as preview tabs or install snippets, it belongs in `apps/docs/components`.
