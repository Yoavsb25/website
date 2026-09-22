# ADR 0004: Feature isolation

## Status

Accepted

## Context

A portfolio grows by sections. Without boundaries, cross-imports make changes risky and obscure ownership.

## Decision

Organize by feature under `src/features/*`. Enforce with `eslint-plugin-boundaries`:

- `app/` imports features only
- Features do not import other features
- Public API is each feature's `index.ts`
- Shared code lives in `components/ui` or `lib`

## Consequences

- Clear ownership and testability per feature.
- Shared code requires deliberate downward extraction.
- Deep imports are lint-blocked.
