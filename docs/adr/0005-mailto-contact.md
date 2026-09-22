# ADR 0005: Mailto contact instead of a backend

## Status

Accepted

## Context

GitHub Pages has no server. A contact form needs a third-party form service or a Worker. For v1, the simplest reliable option is preferred.

## Decision

Ship a contact CTA with `mailto:`, a copy-email button (client-assembled address to reduce scraping), and social links. No Resend, Turnstile, or rate-limit service.

## Consequences

- Zero backend secrets for contact.
- User experience depends on the visitor having a mail client.
- A form backend can be added later without changing the feature boundary.
