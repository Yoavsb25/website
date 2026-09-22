# ADR 0001: Next.js static export on GitHub Pages

## Status

Accepted

## Context

The portfolio must be hosted without a paid hosting bill and demonstrate CI/CD ownership. GitHub Pages serves static files only. Next.js App Router supports `output: 'export'` for fully static sites.

## Decision

Use Next.js 15 App Router with `output: 'export'` and `trailingSlash: true`. Deploy via GitHub Actions (`actions/deploy-pages`) to `https://yoavsb25.github.io` (user site; repo named `Yoavsb25.github.io`).

## Consequences

- No Server Actions, Route Handlers, ISR, or middleware that needs a Node server.
- Images must be optimized at build time.
- GitHub data is fetched at build time and refreshed by scheduled rebuilds.
- Custom HTTP security headers are unavailable; use meta CSP (see ADR 0006).
