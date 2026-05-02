# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

---

## TimeZone.tools — `artifacts/timetools`

React + Vite frontend-only app. No backend, no auth. Preview path: `/`.

### Features

- **5 tools**: Time Zone Converter, Meeting Planner, Date Difference Calculator, Countdown Timer, Working Days Calculator
- **Live world clock** on homepage (New York, London, Dubai, Singapore, Tokyo, Sydney)
- **Dark/light mode** via `ThemeContext`
- **Google AdSense**: publisher ID `ca-pub-2855881084010257`; slot ID is `REPLACE_WITH_REAL_SLOT_ID` — replace via AdSense dashboard
- **i18n**: 7 languages (en, ar, tr, fr, es, hi, zh) with i18next + HTTP backend
- **RTL support**: Arabic gets `dir="rtl"` on `<html>` and Noto Sans Arabic font
- **Multilingual fonts**: Noto Sans Arabic / Devanagari / SC (SC = Simplified Chinese) loaded via index.html

### Routing

URL pattern: `/{lang}/{tool}` e.g. `/en/time-zone-converter`, `/ar/working-days`

- `/` → redirects to detected language home
- `/:lang/` → home page
- `/:lang/time-zone-converter`
- `/:lang/meeting-planner`
- `/:lang/date-difference`
- `/:lang/countdown-timer`
- `/:lang/working-days`

Language preference saved in `localStorage` key `tz_tools_lang`.

### Key Files

| File | Purpose |
|------|---------|
| `src/i18n.ts` | i18next config, `SUPPORTED_LANGS`, `isRtl()` |
| `src/contexts/LangContext.tsx` | `useLang()` → `{ lang, setLang, rtl, langPath }` |
| `src/contexts/ThemeContext.tsx` | `useTheme()` → `{ theme, toggleTheme }` |
| `src/components/Layout.tsx` | Navbar, footer, `PageLayout`, `FaqSection`, language switcher |
| `src/components/AdSlot.tsx` | AdSense `ins.adsbygoogle` component |
| `src/components/TimezoneSelect.tsx` | Timezone combobox |
| `src/lib/timezones.ts` | 80+ city timezone list + helpers |
| `src/lib/holidays.ts` | US/UK/Global public holiday list + `countWorkingDays()` |
| `public/locales/{lang}/translation.json` | Translation files for all 7 languages |

### i18n Translation Key Namespaces

- `common.*` — advertisement, FAQ title, free badge, footer
- `nav.*` — navigation labels
- `home.*` — hero, tool cards, stats
- `tz.*` — Time Zone Converter page
- `meet.*` — Meeting Planner page
- `dateDiff.*` — Date Difference page
- `countdown.*` — Countdown Timer page
- `workDays.*` — Working Days page
- `lang.*` — language names for switcher

### AdSense Note

The AdSense slot ID is `REPLACE_WITH_REAL_SLOT_ID` in `src/components/AdSlot.tsx`. To activate ads:
1. Log in to Google AdSense → Ads → By ad unit
2. Create a Display ad unit, copy the slot ID
3. Replace `REPLACE_WITH_REAL_SLOT_ID` in `AdSlot.tsx`
