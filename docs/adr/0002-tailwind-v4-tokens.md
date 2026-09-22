# ADR 0002: Tailwind CSS v4 design tokens

## Status

Accepted

## Context

The site needs a coherent light/dark system and a distinctive editorial look without a heavy design-system dependency.

## Decision

Use Tailwind CSS v4 with semantic tokens defined in CSS `@theme` (`--color-fg`, `--color-muted`, `--color-accent`, etc.). Both themes derive from the same token set. Typography: Newsreader (display), Geist Sans (body), Geist Mono (labels) via `next/font`.

## Consequences

- Theme changes are centralized in one CSS file.
- Components consume semantic utilities, not raw palette colors.
- Dark mode is a class strategy via `next-themes`.
