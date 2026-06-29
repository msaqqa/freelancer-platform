# Freelancer Platform

A bilingual (Arabic / English) marketplace that connects **freelancers** with **clients**.
Freelancers build a profile, list services and work history, and manage their account;
clients browse, hire, and manage users. The UI is built on the Metronic 9 design system
and is fully RTL/LTR aware.

## Features

- **Authentication** — email/password + Google OAuth, email verification, password reset (Supabase Auth).
- **Onboarding** — account-type selection and required-data flow for new users.
- **Freelancer profile** — services, work history, connections, and profile management.
- **User management** — client-side admin screens (status, roles).
- **i18n** — Arabic and English with automatic direction switching.
- **Static pages** — e.g. localized Privacy Policy.

## Tech Stack

| Area | Tool |
|------|------|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4, Radix UI, [ReUI](https://reui.io) (Metronic 9) |
| Backend | Supabase (Postgres + Auth + Storage) |
| Data fetching | TanStack Query, Axios |
| Forms & validation | React Hook Form + Zod |
| State | Zustand |
| i18n | i18next / react-i18next |
| File storage | S3-compatible (AWS SDK v3) |
| Email | Nodemailer (SMTP) |
| Charts / maps | ApexCharts, Recharts, Leaflet |

## Architecture & Conventions

- **JavaScript only** — no TypeScript anywhere.
- **Services layer is mandatory.** The UI and React Query never talk to Supabase
  directly; everything goes through `services/`.
- **Hybrid data flow:**
  - **Read:** UI → React Query → Service → Supabase
  - **Write:** UI → React Query → Service → API Route (Next handler) → Supabase
- The internal API is reached over **axios** (`services/api.js`). Its base URL is
  `NEXT_PUBLIC_API_URL` (empty = same-origin `/api` route handlers), so the backend
  can be swapped by changing the URL only. Some older modules still call Supabase
  from the service directly while the Taqat → Supabase migration finishes.
- **CRUD happens in modals**, built with React Hook Form + Zod.
- **UI reuse priority:** existing project components → Metronic / ReUI → Radix UI.
  Don't introduce new UI libraries.
- **Two user types** — Freelancer and Client — each with its own flow.

## Prerequisites

- Node.js 18.x or higher
- npm (or yarn)
- A Supabase project (cloud or local via the Supabase CLI)

## Getting Started

### 1. Install dependencies

React 19 needs the `--force` flag to resolve peer-dependency conflicts:

```bash
npm install --force
```

### 2. Configure environment

Create a `.env.local` file in the project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Internal API base for axios. Empty = same-origin Next.js route handlers (/api).
NEXT_PUBLIC_API_URL=

# S3-compatible storage
STORAGE_ENDPOINT=
STORAGE_REGION=
STORAGE_BUCKET=
STORAGE_ACCESS_KEY_ID=
STORAGE_SECRET_ACCESS_KEY=
STORAGE_CDN_URL=

# Email (SMTP)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_SENDER=
SMTP_FROM=

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
```

### 3. Apply database migrations

SQL migrations live in [`supabase/migrations`](supabase/migrations). Apply them with the
Supabase CLI:

```bash
supabase db push
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint with ESLint |
| `npm run format` | Format with Prettier |

## Project Structure

```
app/
  (auth)/         Auth routes (signin, signup, verify-email, ...) + shared layout
  (protected)/    Authenticated app (freelancer, client, new-user, account)
  api/            Route handlers
  components/     App-specific chrome (layout shell, partials)
  privacy-policy/ Static localized page
components/        Shared design system (ui, common, layouts, icons)
i18n/             Locales (ar/en) and i18next config
lib/              Supabase clients, S3, helpers
services/         Data-access layer
supabase/         Migrations and local config
hooks/            Reusable hooks (auth, ...)
```

## Internationalization

Locale files live in [`i18n/locales/{ar,en}`](i18n/locales). To add a namespace, drop a
JSON file under each locale and register it in [`i18n/config.js`](i18n/config.js). Direction
(RTL/LTR) follows the selected language automatically.

## Notes

- The legacy Taqat REST API (`NEXT_PUBLIC_TAQAT_API_URL`) is being phased out in favor of
  Supabase; some service modules may still reference it during the migration.
