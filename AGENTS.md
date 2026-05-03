# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

Personal site monorepo. Two app variants — `app-next` (Next.js App Router) and `app-react-router` (React Router v7 framework mode) — render the same pages from the shared `personal-site` package. Maintained in parallel as a learning exercise; changes to pages/components belong in `personal-site`, not in either app.

- Vercel deployment: `app-react-router` is the canonical site at `stevenliao.vercel.app`; `app-next` ships to `stevenliao-next.vercel.app`. Both use the edge runtime.
- Package manager + runtime: Bun 1.3+. The build tools (Next/Vite/RR/tsdown) run under Bun's Node-compat runtime; Node is not required locally or in CI.
- Build pipeline: Turborepo 2 (`tasks` schema, not `pipeline`). Persistent tasks do not need `--parallel`.
- Tooling: Oxfmt for formatting, Oxlint for linting with type-aware rules enabled (no Prettier, no ESLint).

## Common commands

All run from the repo root.

```sh
bun install                  # install
bun run build                # turbo: builds personal-site → both apps
bun dev:next                 # turbo dev for app-next + personal-site watch
bun dev:react-router         # turbo dev for app-react-router + personal-site watch
bun check:fmt                # oxfmt --check .
bun check:lint               # oxlint (type-aware via config)
bun check:ts                 # turbo: tsc --noEmit across workspaces (RR app also runs `react-router typegen`)
bun fmt                      # oxfmt . (write)
```

Single workspace: `bun --filter <name> <script>` (e.g. `bun --filter personal-site watch` to rebuild on change).

## Architecture

### Package layout

- `packages/personal-site` — the shared site. Two entry points built by tsdown:
  - `personal-site` — ESM-only bundle. Server-safe components (`Document`, page components like `Index`/`About`, error boundaries, `getArticles`)
  - `personal-site/client` — `Layout` component (uses `framer-motion`, must hydrate). **`client.ts` deliberately has no `'use client'` directive** — the consuming Next files mark themselves `'use client'` instead. Adding it back here breaks SSR in React Router v7 (the directive is interpreted as an RSC client boundary, exposing keys but `undefined` values on the server).
- `packages/personal-site/tailwind.css` — shared CSS, imported by both apps. Uses Tailwind v4 CSS-native configuration (`@plugin`, `@theme`, `@keyframes` — no JS config). `app-react-router` maintains a local copy at `app/css/tailwind.css` with a `@source` pointing at `personal-site`.
- `packages/tsconfig` — base/nextjs/react-library/react-router tsconfig presets.
- `packages/ui`, `packages/big-deuce`, `packages/playing-cards`, `packages/types` — extra workspaces, not currently consumed by the apps. `packages/ui` provides reusable components built on `react-aria-components` (ListBox, Modal, Toast, etc.).

### App-next specifics

- Next 16 App Router on the edge runtime. `cookies()` is async — see [apps/app-next/app/layout.tsx](apps/app-next/app/layout.tsx).
- Every consumer of `personal-site/client` (e.g. [layout-component.tsx](apps/app-next/app/layout-component.tsx)) starts with `'use client'`. This is what makes the shared `Layout` work as a client component in Next without forcing the directive on the package itself.
- Tailwind v4 via `@tailwindcss/postcss` plugin in [postcss.config.mjs](apps/app-next/postcss.config.mjs).

### App-react-router specifics

- React Router v7 framework mode + Vite. Routes are auto-discovered by `@react-router/fs-routes` (the v2 flat-routes convention — root index is `_index.tsx`, not `index.tsx`).
- Per-route generated types live at `./+types/<route>` (`Route.LoaderArgs`, `Route.MetaFunction`, etc.). `react-router typegen` regenerates them; runs automatically before `tsc --noEmit` and `react-router dev`.
- [vite.config.ts](apps/app-react-router/vite.config.ts) sets `ssr.external: ['personal-site']`. **Do not remove this.** Without it, Vite's SSR module runner returns `undefined` for named exports of the workspace package even though `Object.keys()` shows them — a long-standing rough edge with bundled workspace packages on the SSR loader.
- Tailwind v4 via `@tailwindcss/vite` plugin (no postcss.config in this app).
- Vercel deployment via `vercelPreset()` in [react-router.config.ts](apps/app-react-router/react-router.config.ts). Edge runtime is set per-route via `export const config = { runtime: 'edge' }` in `app/root.tsx`.
- Vite 8 resolves `#` imports via `package.json#imports` natively; `vite-tsconfig-paths` is intentionally not installed.

### Build pipeline (Turborepo)

- `personal-site` builds first (it's a dep of both apps); the apps' build / typecheck wait on `^build` to produce `dist/`.
- Outputs cached by turbo: `dist/**`, `.next/**`, `build/**`, `public/build/**`.
- Dev/watch tasks have `cache: false` and `persistent: true`.

## Conventions

Codified in [.oxlintrc.json](.oxlintrc.json):

- File names are `kebab-case` everywhere except route files in both apps, which may be `camelCase` or `kebab-case`.
- Default exports are forbidden except in route files, Next.js convention files, RR config files, and entry points (root, entry.client, entry.server, vite.config, react-router.config, routes).
- React rules `react-hooks/rules-of-hooks` + `react-hooks/exhaustive-deps` are errors.
- Imports must use `import type` for type-only imports (`typescript/consistent-type-imports`).

Format ([.oxfmtrc.json](.oxfmtrc.json)): no semicolons, single quotes, 100-col print width, trailing commas everywhere, Tailwind class sorting on (replaces `prettier-plugin-tailwindcss`).

## Known sharp edges

- **tsdown + ignoreDeprecations**: The `ignoreDeprecations: "6.0"` was removed from both `packages/personal-site/tsconfig.json` and `packages/ui/tsconfig.json` during the tsup→tsdown migration. tsdown uses oxc for DTS generation and shouldn't need it. If `tsc --noEmit` starts showing TS 6 deprecation warnings, add it back to the affected tsconfig only.
- **Path aliases**: Uses Node.js `package.json#imports` with `#` prefix (e.g. `import { Foo } from '#components/foo'`) instead of TypeScript `paths`. TypeScript resolves these automatically via `moduleResolution: "Bundler"`.
- **`@vercel/react-router` warning during typegen/build**: `WARN: The @vercel/react-router package was not detected in your "entry.server.tsx" file.` The preset's source-text scanner doesn't recognize the current import shape, but the edge bundle still builds correctly. Cosmetic.
- **RAC `UNSTABLE_Toast*` components**: React Aria Components v1.13 exports Toast components with an `UNSTABLE_` prefix (`UNSTABLE_Toast`, `UNSTABLE_ToastRegion`, `UNSTABLE_ToastQueue`, `UNSTABLE_ToastContent`). They are imported from the main `react-aria-components` entry. The API is stable in practice but the prefix indicates the surface may still evolve.
- **Never name a `personal-site` entry `*.client.ts`**: React Router v7 strips any file matching `\.client\.(js|jsx|ts|tsx|mjs)$` from the server bundle. The `personal-site/client` subpath is built from `client.ts` → `dist/client.mjs` for this reason — a previous `index.client.ts` → `dist/index.client.mjs` shape silently emitted `jsx(void 0, ...)` for `Layout` in the production server bundle, surfacing on Vercel as `Element type is invalid... got: undefined`. Local dev didn't reproduce because `ssr.external: ['personal-site']` loads the `.mjs` from disk via Node and bypasses the `.client.` filter.

## Reference docs

- README at the repo root has the human-facing dev quickstart.
- Live deploys: https://stevenliao.vercel.app (RR) and https://stevenliao-next.vercel.app (Next).
