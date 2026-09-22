# ADR 0006: Meta CSP instead of HTTP security headers

## Status

Accepted

## Context

GitHub Pages does not allow custom response headers. Browser CSP via `<meta http-equiv>` covers most script/style controls but not header-only directives.

## Decision

Run `scripts/inject-csp.ts` after `next build` / export. Hash every inline script in each HTML file and inject a strict Content-Security-Policy meta tag without `unsafe-inline` for scripts. Also set `<meta name="referrer">`. Document that `frame-ancestors` and HSTS configuration are unavailable (HTTPS is already enforced by Pages). Cloudflare in front of Pages can close the gap later.

## Consequences

- Strong script CSP without a server.
- Cannot prevent framing via CSP meta.
- CSP must be re-injected whenever HTML changes after build.
