# Computer Vision Group — Chalmers University of Technology

Group website. Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui, with light/dark mode via `next-themes`.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint

## Structure

```
src/app/            routes (App Router)
src/components/     shared components (navbar, theme-provider, mode-toggle)
src/components/ui/  shadcn/ui primitives
src/lib/utils.ts    `cn` class helper
```

Add shadcn components with `npx shadcn@latest add <component>`.
