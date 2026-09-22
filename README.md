# Yoav Sborovsky — Portfolio

Personal developer portfolio. Static Next.js site deployed to GitHub Pages.

**Live:** https://yoavsb25.github.io

[![CI](https://github.com/Yoavsb25/Yoavsb25.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/Yoavsb25/Yoavsb25.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/Yoavsb25/Yoavsb25.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/Yoavsb25/Yoavsb25.github.io/actions/workflows/deploy.yml)
[![Security](https://github.com/Yoavsb25/Yoavsb25.github.io/actions/workflows/security.yml/badge.svg)](https://github.com/Yoavsb25/Yoavsb25.github.io/actions/workflows/security.yml)

## Stack

- Next.js 15 (App Router, static export)
- TypeScript (strict + `noUncheckedIndexedAccess`)
- Tailwind CSS v4 (semantic tokens, light/dark)
- pnpm + GitHub Actions → GitHub Pages

## Quality gates

Defense in depth:

1. **Editor** — format on save, ESLint, pinned Node/pnpm
2. **Git hooks** — lint-staged, commitlint, pre-push typecheck/tests
3. **PR checks** — lint, types, knip, cspell, unit coverage, static build artifact, Playwright + axe, Lighthouse, lychee, CodeQL, dependency review, gitleaks, audit
4. **Merge ruleset** — required checks, squash-only, linear history (configure in GitHub)
5. **Deploy** — Pages Actions only; smoke tests; rollback to last good SHA
6. **Scheduled** — hourly uptime, daily rebuild, weekly Scorecard

See [docs/specs/2026-09-22-portfolio-design.md](docs/specs/2026-09-22-portfolio-design.md) and [docs/adr](docs/adr).

## Scripts

| Command          | Description                     |
| ---------------- | ------------------------------- |
| `pnpm dev`       | Local development               |
| `pnpm build`     | Static export + CSP inject      |
| `pnpm lint`      | ESLint                          |
| `pnpm typecheck` | `tsc --noEmit`                  |
| `pnpm test`      | Vitest unit tests               |
| `pnpm test:e2e`  | Playwright e2e (against `out/`) |
| `pnpm format`    | Prettier write                  |
| `pnpm knip`      | Unused code/deps                |
| `pnpm cspell`    | Spellcheck                      |

## Architecture

```text
src/app           → thin routes
src/features/*    → isolated features (no cross-imports)
src/components/ui → design-system primitives
src/lib           → env, seo, schemas, utils
content/          → MDX case studies + typed data
```

Details: [docs/architecture.md](docs/architecture.md)

## Setup

```bash
nvm use
pnpm install
cp .env.example .env.local
pnpm dev
```

Optional: set `GH_PROFILE_TOKEN` (read-only fine-grained GitHub token) for live GitHub stats at build time.

## Deploy

1. Create a public repo named `Yoavsb25.github.io`
2. Push `main`
3. Settings → Pages → Source: **GitHub Actions**
4. Add secret `GH_PROFILE_TOKEN` to the `github-pages` environment (optional)
5. `deploy.yml` publishes on every push to `main`

## Docs

- [Design spec](docs/specs/2026-09-22-portfolio-design.md)
- [ADRs](docs/adr)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)

## License

Private / personal use unless otherwise noted.
