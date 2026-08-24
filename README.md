# Chalmers Computer Vision (CCV)

Website for the CCV group at Chalmers University of Technology.
Next.js (App Router), TypeScript, Tailwind, shadcn/ui, light/dark via `next-themes`.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

Build without disturbing a running dev server: `NEXT_DIST_DIR=.next-verify npm run build`.

## Editing content

Content lives in typed modules, not in JSX:

```
src/lib/site.ts     group name, contact, nav links
src/data/team.ts    members by role
src/data/           publications, research, news, lectures, events, opportunities
```

Portraits go in `public/team/`, referenced by an `image` field on a person; anyone without one gets a placeholder. Empty data files render an empty state, so pages never break.

## Structure

```
src/app/            routes
src/components/     navbar, footer, page-header, filtered lists
src/components/ui/  shadcn/ui primitives
```

Add components with `npx shadcn@latest add <component>`.
