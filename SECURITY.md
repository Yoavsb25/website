# Security Policy

## Supported versions

Only the latest deployment on `main` (https://yoavsb25.github.io) is supported.

## Reporting a vulnerability

Please open a private security advisory on GitHub, or email the address published on the site.

Do not open a public issue for sensitive reports.

## Hardening notes

- Static export on GitHub Pages (no server attack surface)
- Post-build CSP meta with hashed inline scripts
- Dependency review + CodeQL + gitleaks + `pnpm audit` in CI
- Build-time GitHub token never reaches the client bundle (`server-only`)
