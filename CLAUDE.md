# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the repo root using pnpm workspaces.

```bash
# Development
pnpm --filter @workspace/timetools run dev       # Start frontend (Vite, requires PORT env)
pnpm --filter @workspace/api-server run dev      # Start backend (Express, requires PORT env)

# Build
pnpm run build                                   # Full build: typecheck + all packages
pnpm --filter @workspace/timetools run build     # Frontend only
pnpm --filter @workspace/api-server run build    # Backend only (esbuild → ESM bundle)

# Type checking
pnpm run typecheck                               # All packages
pnpm --filter @workspace/timetools run typecheck # Frontend only

# Database
pnpm --filter @workspace/db run push             # Push schema changes (dev)
pnpm --filter @workspace/db run push-force       # Force push schema

# Code generation (run after editing lib/api-spec/openapi.yaml)
pnpm --filter @workspace/api-spec run codegen    # Regenerate React Query hooks + Zod schemas
```

No test runner is configured. TypeScript strict mode (`noUnusedLocals`) enforces code hygiene.

## Architecture

pnpm monorepo with two layers: `artifacts/` (deployable apps) and `lib/` (shared packages).

```
artifacts/
  api-server/     # Express 5 backend — routes in src/routes/, pino logging
  timetools/      # React 19 + Vite frontend — the main app

lib/
  api-spec/       # openapi.yaml is the source of truth; orval.config.ts drives codegen
  api-client-react/ # Auto-generated TanStack React Query hooks (do not edit by hand)
  api-zod/        # Auto-generated Zod schemas (do not edit by hand)
  db/             # Drizzle ORM schema + PostgreSQL client (DATABASE_URL required)
```

### Frontend (`artifacts/timetools`)

- **Router**: Wouter with language-prefixed routes (`/:lang/*`) — all 5 tools live under a lang segment
- **i18n**: i18next with 7 languages (en, ar, tr, fr, es, hi, zh); Arabic uses RTL layout. Translation namespaces: `common`, `nav`, `home`, `tz`, `meet`, `dateDiff`, `countdown`, `workDays`, `lang`
- **Theme**: `ThemeContext` manages dark/light; `LangContext` manages active language
- **UI**: Radix UI primitives + TailwindCSS 4; components live in `src/components/ui/`
- **Ads**: `AdSlot.tsx` wraps Google AdSense — slot ID must be real before production

### API Code Generation

`lib/api-spec/openapi.yaml` → Orval → `lib/api-client-react/` and `lib/api-zod/`. Always re-run `codegen` after editing the spec; never manually edit the generated files.

### Key Data Files

- `artifacts/timetools/src/lib/timezones.ts` — 80+ city timezone list used across all tools
- `artifacts/timetools/src/lib/holidays.ts` — US/UK/Global holidays + `countWorkingDays()`

## Environment Variables

| Variable       | Required by         | Purpose                       |
|----------------|---------------------|-------------------------------|
| `DATABASE_URL` | `@workspace/db`     | PostgreSQL connection string  |
| `PORT`         | api-server, Vite    | Server/dev port               |
| `BASE_PATH`    | Vite config         | Optional public base path     |

## TypeScript Config

`tsconfig.base.json` at root sets `strict: true`, `noUnusedLocals: true`, `target: es2022`. All packages extend it via `"extends": "../../tsconfig.base.json"` (or similar relative path). Project references wire the lib packages together.
