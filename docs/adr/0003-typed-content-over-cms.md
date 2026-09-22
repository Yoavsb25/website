# ADR 0003: Typed content over CMS

## Status

Accepted

## Context

Portfolio content changes infrequently. A headless CMS adds cost, auth surface, and runtime coupling.

## Decision

Store content in-repo: MDX for project case studies and TypeScript modules for profile/experience/GitHub fallback. Validate with Zod via content-collections so invalid content fails the build.

## Consequences

- Content is versioned and reviewed in PRs.
- No CMS credentials or preview environments needed.
- Non-developers cannot edit without git; acceptable for a personal site.
