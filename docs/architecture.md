# Architecture

## Layers

```text
app/  →  features/*  →  components/ui + lib + content
```

Dependencies flow downward only. `eslint-plugin-boundaries` enforces this.

## Features

| Feature      | Responsibility                         |
| ------------ | -------------------------------------- |
| `hero`       | Brand statement and primary CTAs       |
| `projects`   | Case-study list and MDX detail pages   |
| `experience` | Timeline and resume link               |
| `github`     | Build-time GraphQL fetch + fallback UI |
| `contact`    | Mailto, copy-email, socials            |
| `about`      | Principles and toolchain               |

## External adapters

`features/github/server/github-client.ts` is the only network adapter. It is marked `server-only`, Zod-validates responses, times out, and falls back to `content/github-fallback.ts` so builds never fail on API errors.

## Static export constraints

- Every dynamic route must implement `generateStaticParams`.
- No Route Handlers or Server Actions.
- Images go through `next-image-export-optimizer`.
- Post-build CSP injection runs via `scripts/inject-csp.ts`.
