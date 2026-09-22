# Personal Portfolio Website — Design Spec

**Date:** 2026-09-22  
**Status:** Approved  
**Author:** Yoav Sborovsky

## Purpose

A production-grade personal portfolio that acts as a developer business card. The site content shows planning, designing, and building ability; the repository itself demonstrates engineering standards (isolation, CI/CD, tests, quality gates).

## Goals

1. Feature-isolated architecture that is easy to extend.
2. Fully static site hosted on GitHub Pages at `https://yoavsb25.github.io`.
3. Quality enforced at editor, hook, PR, merge, deploy, and scheduled layers.
4. Editorial visual direction inspired by [igaltal.github.io/portfolio](https://igaltal.github.io/portfolio), kept clean and organized.

## Non-goals (v1)

- Server-rendered or edge runtime features.
- Contact form backend (mailto + copy-email instead).
- CMS or admin UI.
- Custom domain (can be added later).
- Multi-language / RTL.

## Stack

| Concern         | Choice                                                                           |
| --------------- | -------------------------------------------------------------------------------- |
| Framework       | Next.js 15 App Router, static export (`output: 'export'`, `trailingSlash: true`) |
| Language        | TypeScript `strict` + `noUncheckedIndexedAccess`                                 |
| Styling         | Tailwind CSS v4 with CSS `@theme` tokens                                         |
| Themes          | `next-themes` (light/dark)                                                       |
| Motion          | `motion` with `prefers-reduced-motion` respect                                   |
| Content         | MDX + typed TS, Zod-validated via content-collections                            |
| Images          | `next-image-export-optimizer` (build-time WebP)                                  |
| Env             | `@t3-oss/env-nextjs` (build-time only)                                           |
| Package manager | pnpm, Node pinned via `.nvmrc`                                                   |
| Hosting         | GitHub Pages via GitHub Actions                                                  |

## Information architecture

1. Hero — name/brand signal, one statement, one subtitle, CTAs
2. Live work strip — frames of deployed projects
3. Selected work — case-study cards → `/projects/[slug]/`
4. About + principles
5. Experience timeline + resume PDF
6. GitHub activity (build-time fetch + fallback)
7. Contact — mailto, copy-email, socials

Global: sticky nav, theme toggle, footer, SEO, OG images, sitemap, robots, 404.

## Architecture

Feature-sliced with one-directional imports enforced by `eslint-plugin-boundaries`:

- `app/` composes features only
- Features never import other features
- Shared UI in `components/ui`
- Shared utilities in `lib/`
- Content in `content/`
- Build-time adapters under `features/*/server/` marked `server-only`

## Quality gates

Six layers: editor → git hooks → PR checks → merge ruleset → deploy → live/scheduled.

PR checks build the static site once and run e2e/axe/visual/Lighthouse/links/bundle budgets against the artifact. Deploy uses official Pages actions; smoke failure triggers rollback to last good SHA.

## Security trade-offs on Pages

GitHub Pages cannot set custom HTTP headers. Mitigation: post-build CSP meta injection with script hashes; referrer meta; HTTPS enforced by Pages. Header-only directives (`frame-ancestors`) are accepted gaps (see ADR).

## Success criteria

- Lighthouse Performance / Accessibility / Best Practices / SEO ≥ 95
- Zero axe serious/critical violations
- All CI workflows green; Pages deploy automatic on `main`
- Adding a project means adding one MDX file (+ optional assets)
