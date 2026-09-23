# Contributing

Thanks for helping improve this portfolio.

## Setup

```bash
nvm use
pnpm install
cp .env.example .env.local
pnpm dev
```

## Workflow

1. Create a branch from `main`
2. Make focused changes (one concern per PR)
3. Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `ci:`, …)
4. Open a PR with a semantic title — squash merge uses the title as the commit

## Local gates

Hooks run automatically:

- `pre-commit` — lint-staged (ESLint, Prettier)
- `commit-msg` — commitlint
- `pre-push` — typecheck + unit tests

Useful commands:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

## Architecture rules

- Features under `src/features/*` must not import each other
- Prefer adding content in `content/` over hardcoding in components
- Non-trivial architecture changes should be called out and explained in the PR description

## Security

Never commit secrets. Use repository environment secrets for `GH_PROFILE_TOKEN`.
