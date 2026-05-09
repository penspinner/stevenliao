# TanStack Start App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a third app variant at `apps/app-tanstack-react-start` that renders pages from the shared `personal-site` package using TanStack Start (Vite-based framework with TanStack Router).

**Architecture:** Single-file routes at `src/routes/` (default TanStack Start convention). Root route composes `personal-site`'s `Document` and `personal-site/client`'s `Layout` with TanStack Router-adapted link/color-scheme render props. Each page route imports its component and metadata from `personal-site`. Color scheme uses `createServerFn` + cookie. Vite-based with `@tailwindcss/vite`.

**Tech Stack:** TanStack Start v1.167.65, TanStack Router v1.169.2, Vite 8, Tailwind v4, React 19, personal-site (workspace package).

---

### Task 1: Scaffold project

**Files:**

- Create: `apps/app-tanstack-react-start/package.json`
- Create: `apps/app-tanstack-react-start/tsconfig.json`
- Create: `apps/app-tanstack-react-start/.gitignore`
- Create: `apps/app-tanstack-react-start/src/tailwind.css`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "app-tanstack-react-start",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "vite build",
    "dev": "vite dev"
  },
  "dependencies": {
    "@badrap/bar-of-progress": "^0.3.0",
    "@tailwindcss/typography": "^0.5.19",
    "@tailwindcss/vite": "^4.3.0",
    "@tanstack/react-router": "^1.169.2",
    "@tanstack/react-start": "^1.167.65",
    "personal-site": "workspace:*",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "tailwindcss": "^4.3.0"
  },
  "devDependencies": {
    "@react-aria/optimize-locales-plugin": "^1.2.0",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "tsconfig": "workspace:*",
    "typescript": "^6.0.3",
    "vite": "^8.0.11"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "extends": "tsconfig/base.json",
  "include": ["**/*.ts", "**/*.tsx", ".tanstack/**/*"],
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "types": ["vite/client"],
    "verbatimModuleSyntax": false
  }
}
```

- [ ] **Step 3: Create .gitignore**

```
node_modules
dist
/src/routeTree.gen.ts
.tanstack
```

- [ ] **Step 4: Create src/tailwind.css**

```css
@import 'personal-site/tailwind.css';
```

---

### Task 2: Create vite.config.ts

**Files:**

- Create: `apps/app-tanstack-react-start/vite.config.ts`

- [ ] **Step 1: Write vite.config.ts**

```ts
import localesPlugin from '@react-aria/optimize-locales-plugin'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart(),
    react(),
    { ...localesPlugin.vite({ locales: [] }), enforce: 'pre' },
  ],
  ssr: {
    external: ['personal-site'],
  },
})
```

---

### Task 3: Create router config and color-scheme server function

**Files:**

- Create: `apps/app-tanstack-react-start/src/router.tsx`
- Create: `apps/app-tanstack-react-start/src/routes/color-scheme.ts`

- [ ] **Step 1: Write src/router.tsx**

```tsx
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  })

  return router
}
```

- [ ] **Step 2: Write src/routes/color-scheme.ts**

```ts
import type { ColorScheme } from 'personal-site'
import { createServerFn } from '@tanstack/react-start'
import { setResponseHeaders } from '@tanstack/react-start/server'

export const updateColorScheme = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown): ColorScheme => {
    if (d === 'dark' || d === 'light' || d === 'system') return d
    throw new Error('Invalid color scheme')
  })
  .handler(async ({ data }) => {
    if (data === 'system') {
      setResponseHeaders(
        new Headers({
          'Set-Cookie': 'color-scheme=; Max-Age=0; Path=/; SameSite=Lax',
        }),
      )
    } else {
      setResponseHeaders(
        new Headers({
          'Set-Cookie': `color-scheme=${data}; Max-Age=34560000; Path=/; SameSite=Lax`,
        }),
      )
    }
    return { colorScheme: data }
  })
```

---

### Task 4: Create root route (\_\_root.tsx)

**Files:**

- Create: `apps/app-tanstack-react-start/src/routes/__root.tsx`

- [ ] **Step 1: Write src/routes/\_\_root.tsx**

```tsx
import ProgressBar from '@badrap/bar-of-progress'
import type { ColorScheme } from 'personal-site'
import { Document as Doc, RootErrorBoundary, RootNotFound } from 'personal-site'
import { Layout as PageLayout } from 'personal-site/client'
import * as React from 'react'
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouter,
} from '@tanstack/react-router'
import { getRequest } from '@tanstack/react-start/server'

import { updateColorScheme } from './color-scheme'

import tailwindCSSHref from '../tailwind.css?url'

const fontURL =
  'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2'

const progress = new ProgressBar()

export const Route = createRootRoute({
  head: () => ({
    links: [
      { rel: 'icon', href: '/favicon.ico', type: 'image/png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossOrigin: 'anonymous' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'preload',
        href: fontURL,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      { rel: 'stylesheet', href: tailwindCSSHref },
    ],
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1' },
    ],
  }),
  loader: async () => {
    const request = getRequest()
    const cookies = request.headers.get('cookie') ?? ''
    const match = cookies.match(/color-scheme=([^;]+)/)
    const colorScheme = (match?.[1] as ColorScheme | undefined) ?? 'system'
    return { colorScheme }
  },
  component: Root,
  errorComponent: RootError,
})

function Root() {
  const router = useRouter()
  const { colorScheme } = Route.useLoaderData()
  const pathname = router.state.location.pathname
  const [optimisticColorScheme, setOptimisticColorScheme] = React.useState<ColorScheme | null>(null)

  const effectiveColorScheme = optimisticColorScheme ?? colorScheme

  React.useEffect(() => {
    if (router.state.isLoading) {
      progress.start()
    } else {
      progress.finish()
    }
  }, [router.state.isLoading])

  return (
    <Document colorScheme={effectiveColorScheme}>
      <PageLayout
        avatarImg={<img src="/images/logo.png" alt="" />}
        colorScheme={effectiveColorScheme}
        colorSchemeToggleRender={({ children }) => (
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              const form = e.currentTarget
              const formData = new FormData(form)
              const newScheme = formData.get('colorScheme') as ColorScheme
              setOptimisticColorScheme(newScheme)
              await updateColorScheme({ data: newScheme })
            }}
          >
            {children}
          </form>
        )}
        currentPathname={pathname}
        linkRender={({ href, ...props }) => <Link preload="intent" to={href ?? ''} {...props} />}
      >
        <Outlet />
      </PageLayout>
    </Document>
  )
}

function RootError() {
  const router = useRouter()
  const error = router.state.error
  const pathname = router.state.location.pathname
  const is404 = error && typeof error === 'object' && 'status' in error && error.status === 404

  const errorContent = is404 ? <RootNotFound /> : <RootErrorBoundary thrown={error} />

  return (
    <Document colorScheme="system">
      <PageLayout
        avatarImg={<img src="/images/logo.png" alt="" />}
        colorScheme="system"
        currentPathname={pathname}
        linkRender={({ href, ...props }) => <Link preload="intent" to={href ?? ''} {...props} />}
      >
        <main className="relative">{errorContent}</main>
      </PageLayout>
    </Document>
  )
}

function Document({
  children,
  colorScheme,
}: {
  children: React.ReactNode
  colorScheme: ColorScheme
}) {
  return (
    <Doc
      colorScheme={colorScheme}
      head={
        <>
          <HeadContent />
        </>
      }
      body={
        <>
          {children}
          <Scripts />
        </>
      }
    />
  )
}
```

---

### Task 5: Create page routes (index, about, articles)

**Files:**

- Create: `apps/app-tanstack-react-start/src/routes/index.tsx`
- Create: `apps/app-tanstack-react-start/src/routes/about.tsx`
- Create: `apps/app-tanstack-react-start/src/routes/articles.tsx`

- [ ] **Step 1: Write src/routes/index.tsx**

```tsx
import type { Article } from 'personal-site'
import {
  Index,
  PaddedErrorBoundary,
  getArticles,
  indexDescription,
  indexTitle,
} from 'personal-site'
import { createFileRoute, useRouter } from '@tanstack/react-router'

const createCacheControlHeaders = ({
  visibility = 'private',
  maxage = 0,
  sMaxage = maxage,
  swr = sMaxage,
}: {
  visibility?: 'private' | 'public'
  maxage?: number
  sMaxage?: number
  swr?: number
} = {}) => {
  return {
    'Cache-Control': `${visibility}, max-age=${maxage}, s-maxage=${sMaxage}, stale-while-revalidate=${swr}`,
  }
}

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [{ title: indexTitle }, { name: 'description', content: indexDescription }],
  }),
  loader: async () => {
    const response = await getArticles({
      username: '2ezpz2plzme',
      page: '1',
      per_page: '3',
    })
    const articles: Article[] = await response.json()
    return {
      articles,
      headers: createCacheControlHeaders({ visibility: 'public', maxage: 900 }),
    }
  },
  component: IndexPage,
  errorComponent: IndexError,
})

function IndexPage() {
  const { articles } = Route.useLoaderData()
  return (
    <Index
      articles={articles}
      photos={[{ src: '/images/algorithms.png' }, { src: '/images/computer-hackermans.png' }]}
      roles={[
        {
          company: 'Roofstock',
          title: 'Senior Software Engineer',
          logo: '/images/logos/roofstock.jpeg',
          start: 'Oct 2024',
          end: 'Present',
        },
        {
          company: 'Sysarro',
          title: 'Software Engineer (Contract)',
          logo: '/images/logos/sysarro.svg',
          start: 'Feb 2024',
          end: 'Oct 2024',
        },
        {
          company: 'Civil Street',
          title: 'Lead Full Stack Engineer',
          logo: '/images/logos/civil-street.jpeg',
          start: 'Jan 2023',
          end: 'Present',
        },
        {
          company: 'Roofstock',
          title: 'Software Engineer',
          logo: '/images/logos/roofstock.jpeg',
          start: 'May 2022',
          end: 'Oct 2022',
        },
        {
          company: 'Great Jones',
          title: 'Software Engineer',
          logo: '/images/logos/great-jones.jpeg',
          start: 'Mar 2020',
          end: 'May 2022',
        },
        {
          company: 'Percolate/Seismic',
          title: 'Fullstack Developer',
          logo: '/images/logos/percolate.jpeg',
          start: 'Oct 2018',
          end: 'Mar 2020',
        },
        {
          company: 'MANA Partners/Tech',
          title: 'Fullstack Developer',
          logo: '/images/logos/mana-partners.jpeg',
          start: 'Jan 2017',
          end: 'Oct 2018',
        },
      ]}
    />
  )
}

function IndexError() {
  const router = useRouter()
  return <PaddedErrorBoundary thrown={router.state.error} />
}
```

- [ ] **Step 2: Write src/routes/about.tsx**

```tsx
import { About, aboutDescription, aboutTitle } from 'personal-site'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [{ title: aboutTitle }, { name: 'description', content: aboutDescription }],
  }),
  component: AboutPage,
})

function AboutPage() {
  return <About avatarImg={<img src="/images/avatar.jpg" alt="" />} />
}
```

- [ ] **Step 3: Write src/routes/articles.tsx**

```tsx
import type { Article } from 'personal-site'
import { Articles, articlesDescription, articlesTitle, getArticles } from 'personal-site'
import { createFileRoute } from '@tanstack/react-router'

const createCacheControlHeaders = ({
  visibility = 'private',
  maxage = 0,
  sMaxage = maxage,
  swr = sMaxage,
}: {
  visibility?: 'private' | 'public'
  maxage?: number
  sMaxage?: number
  swr?: number
} = {}) => {
  return {
    'Cache-Control': `${visibility}, max-age=${maxage}, s-maxage=${sMaxage}, stale-while-revalidate=${swr}`,
  }
}

export const Route = createFileRoute('/articles')({
  head: () => ({
    meta: [{ title: articlesTitle }, { name: 'description', content: articlesDescription }],
  }),
  loader: async () => {
    const response = await getArticles({
      username: '2ezpz2plzme',
      page: '1',
      per_page: '3',
    })
    const articles: Article[] = await response.json()
    return {
      articles,
      headers: createCacheControlHeaders({ visibility: 'public', maxage: 900 }),
    }
  },
  component: ArticlesPage,
})

function ArticlesPage() {
  const { articles } = Route.useLoaderData()
  return <Articles articles={articles} />
}
```

---

### Task 6: Create page routes (projects, uses)

**Files:**

- Create: `apps/app-tanstack-react-start/src/routes/projects.tsx`
- Create: `apps/app-tanstack-react-start/src/routes/uses.tsx`

- [ ] **Step 1: Write src/routes/projects.tsx**

```tsx
import { Projects, projectsDescription, projectsTitle } from 'personal-site'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects')({
  head: () => ({
    meta: [{ title: projectsTitle }, { name: 'description', content: projectsDescription }],
  }),
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <Projects
      projects={[
        {
          name: 'Steven Liao',
          description: 'This website',
          link: { href: 'https://github.com/penspinner/stevenliao', label: 'Steven Liao' },
          logo: '/images/logo.png',
        },
        {
          name: 'Advent of Code',
          description: 'My solutions to a bunch of Advent of Code programming puzzles',
          link: {
            href: 'https://github.com/penspinner/aoc',
            label: 'github.com/penspinner/aoc',
          },
          logo: 'https://adventofcode.com/favicon.png',
        },
        {
          name: 'Algorithms',
          description:
            'My solutions to a bunch of algorithmic challenges gathered from LeetCode and personal experiences',
          link: {
            href: 'https://github.com/penspinner/algorithms',
            label: 'github.com/penspinner/algorithms',
          },
          logo: '/images/algorithms.png',
        },
        {
          name: 'Steven Liao (old)',
          description: 'My old personal website.',
          link: {
            href: 'https://penspinner.github.io',
            label: 'penspinner.github.io',
          },
          logo: '/images/logo.png',
        },
      ]}
    />
  )
}
```

- [ ] **Step 2: Write src/routes/uses.tsx**

```tsx
import { Uses, usesDescription, usesTitle } from 'personal-site'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/uses')({
  head: () => ({
    meta: [{ title: usesTitle }, { name: 'description', content: usesDescription }],
  }),
  component: UsesPage,
})

function UsesPage() {
  return <Uses />
}
```

---

### Task 7: Wire up Turborepo

**Files:**

- Modify: `turbo.json`
- Modify: `package.json` (root)

- [ ] **Step 1: Add build task to turbo.json**

Read the current `turbo.json`. Under `"build"` → `"outputs"`, ensure `"dist/**"` is present (it already is). No changes needed to the build task itself — the new app inherits the same `build` task via workspace conventions.

- [ ] **Step 2: Add dev:tanstack script to root package.json**

In the root `package.json`, add to `"scripts"`:

```json
"dev:tanstack": "turbo run dev watch --filter app-tanstack-react-start --filter personal-site"
```

The edited scripts section should look like:

```json
"scripts": {
  "build": "turbo run build",
  "check:fmt": "oxfmt --check .",
  "check:lint": "oxlint",
  "dev:next": "turbo run dev watch --filter app-next --filter personal-site",
  "dev:react-router": "turbo run dev watch --filter app-react-router --filter personal-site",
  "dev:tanstack": "turbo run dev watch --filter app-tanstack-react-start --filter personal-site",
  "fmt": "oxfmt .",
  "prepare": "husky",
  "typegen": "turbo run typegen"
}
```

### Task 8: Wire up Oxlint

**Files:**

- Modify: `.oxlintrc.json`

- [ ] **Step 1: Add overrides for the new app**

Add these two override blocks to the `"overrides"` array in `.oxlintrc.json`:

```json
{
  "files": [
    "apps/app-tanstack-react-start/src/routes/**/*",
    "apps/app-tanstack-react-start/src/router.tsx",
    "apps/app-tanstack-react-start/vite.config.ts"
  ],
  "rules": {
    "import/no-default-export": "off",
    "nextjs/no-img-element": "off",
    "nextjs/no-html-link-for-pages": "off",
    "nextjs/no-head-element": "off"
  }
},
{
  "files": ["apps/app-tanstack-react-start/src/routes/**/*"],
  "rules": {
    "unicorn/filename-case": ["error", { "cases": { "camelCase": true, "kebabCase": true } }]
  }
}
```

Also add `"apps/app-tanstack-react-start/**/*"` to the existing override that disables nextjs rules for non-Next apps (the block with `"apps/app-react-router/**/*", "packages/personal-site/**/*", "packages/ui/**/*"`):

```json
{
  "files": [
    "apps/app-tanstack-react-start/**/*",
    "apps/app-react-router/**/*",
    "packages/personal-site/**/*",
    "packages/ui/**/*"
  ],
  "rules": {
    "nextjs/no-img-element": "off",
    "nextjs/no-html-link-for-pages": "off",
    "nextjs/no-head-element": "off"
  }
}
```

And add `".tanstack/**"` to the `"ignorePatterns"` array.

### Task 9: Install dependencies and verify dev server

- [ ] **Step 1: Install dependencies**

```bash
bun install
```

Expected: succeeds without errors.

- [ ] **Step 2: Build personal-site (prerequisite)**

```bash
bun --filter personal-site run build
```

Expected: builds dist/index.mjs and dist/client.mjs.

- [ ] **Step 3: Start dev server**

```bash
bun --filter app-tanstack-react-start run dev
```

Expected: dev server starts. The first run will generate `src/routeTree.gen.ts`. Verify the terminal shows no errors.

- [ ] **Step 4: Verify the dev server renders**

```bash
curl -s http://localhost:3000 | head -n 20
```

Expected: returns HTML with `<html>`, `<head>`, `<body>` content from the root route.

### Task 10: Verify build

- [ ] **Step 1: Run the production build**

```bash
bun --filter app-tanstack-react-start run build
```

Expected: `vite build` completes without errors. Outputs go to `dist/`.

- [ ] **Step 2: Run lint checks**

```bash
bun check:lint
```

Expected: passes (no new errors related to the TanStack Start app).

- [ ] **Step 3: Run format check**

```bash
bun check:fmt
```

Expected: passes for the new files. If not, run `bun fmt`.

- [ ] **Step 4: Commit everything**

```bash
bun fmt
git add apps/app-tanstack-react-start/ package.json .oxlintrc.json
git commit -m "add app-tanstack-react-start with TanStack Start"
```
