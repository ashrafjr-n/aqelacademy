# Aqel Academy

Website for **أكاديمية الدكتور موفق عقل لتحليل السلوك التطبيقي والتأهيل** (Dr. Muaffaq Aqel Academy for Applied Behavior Analysis and Rehabilitation): training programs in ABA, special education, and behavioral rehabilitation.

It's an Arabic, right-to-left marketing site built with Next.js. It replaces the academy's previous WordPress site.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- TypeScript
- Tailwind CSS 4
- [lucide-react](https://lucide.dev) icons
- Cairo font via `next/font`
- Hosted on [Cloudflare Workers](https://developers.cloudflare.com/workers/) via the [OpenNext adapter](https://opennext.js.org/cloudflare)

## Getting started

Requires Node.js 20.9 or later.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open [http://localhost:4646](http://localhost:4646).

## Scripts

| Command           | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `npm run dev`     | Start the development server                                   |
| `npm run build`   | Create a Next.js production build                              |
| `npm run preview` | Build for Cloudflare and run it locally in the Workers runtime |
| `npm run deploy`  | Build for Cloudflare and deploy to Workers                     |
| `npm run lint`    | Run ESLint                                                     |
| `npm run test:db` | Run the database security tests against a throwaway local Postgres |
| `npm run db:types` | Regenerate `src/types/database.ts` from the linked Supabase project |

## Environment variables

| Name                       | Purpose                                         |
| -------------------------- | ----------------------------------------------- |
| `SITE_URL`                 | Public origin, used in auth email links         |
| `SUPABASE_URL`             | Supabase project URL                            |
| `SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key                        |
| `TURNSTILE_SITE_KEY`       | Cloudflare Turnstile site key (captcha)         |
| `GOOGLE_CLIENT_ID`         | Google OAuth client ID ("Continue with Google"), optional |
| `RESEND_API_KEY`           | Resend key for notification emails (Worker secret), optional |
| `NOTIFY_EMAIL`             | Inbox for "new booking" / student message emails (the doctor's), optional |

Locally they live in `.env.local`. In production they are Worker variables (set in the Cloudflare dashboard, or in `wrangler.jsonc` for public values such as `GOOGLE_CLIENT_ID`). They are read at runtime on the server only. Without `RESEND_API_KEY`, notification emails are skipped (in-app notifications still work).

## Authentication

Accounts use Supabase Auth with email and password, or "Continue with Google": Google Identity Services gives the browser an ID token, and Supabase verifies it with a per-attempt nonce. The flow lives in `src/app/(auth)` and `src/app/account`:

- **Sign-up:** email confirmation is required. Sign-up, login and password reset are protected by Turnstile, which Supabase Auth verifies.
- **Email links:** they open `/auth/confirm`, which verifies the token only after a click, so link scanners can't use it up.
- **Session cookies:** they are `httpOnly`. `src/middleware.ts` refreshes the session before protected pages render and redirects signed-out visitors to `/login`.
- **Server checks:** every page and action re-checks the user through the data access layer in `src/lib/dal`.

Auth settings (password policy, captcha, Resend SMTP, Arabic email templates in `supabase/templates/`) are versioned in `supabase/config.toml`. To apply them, put `SUPABASE_AUTH_CAPTCHA_SECRET` and `RESEND_API_KEY` in `supabase/.env` (gitignored), then run:

```bash
npx supabase config diff
npx supabase config push
```

## Security

- **Headers:** set in `next.config.ts` for every route.
  - A Content-Security-Policy that allows only our origin, Cloudflare Turnstile and Google Identity Services.
  - Also HSTS, `X-Frame-Options: DENY`, `nosniff`, a strict `Referrer-Policy` and `Permissions-Policy`, and COOP `same-origin-allow-popups` for the Google popup.
  - Static assets get basic headers from `public/_headers`.
- **CSP trade-off:** it has no nonces, so public pages stay statically prerendered. That's why `'unsafe-inline'` scripts are allowed.
- **Account deletion:** users can delete their account themselves (`public.delete_my_account()`). It cascades to profile, bookings, messages and notifications.
- **CI:** GitHub Actions run typecheck, lint and the database security tests on every push. Dependabot keeps npm packages and actions up to date.

## Deployment

The site runs on Cloudflare Workers (worker name `aqelacademy`, configured in `wrangler.jsonc`) and is served on `aqelacademy.com`. `www.aqelacademy.com` redirects to the apex domain.

Deploys run through Cloudflare Workers Builds, connected to this repository. Every push to `master` builds and deploys automatically.

- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx opennextjs-cloudflare deploy`

Use `npm run preview` to check a build in the Workers runtime before pushing.

## Database

The database runs on [Supabase](https://supabase.com) (Postgres). The schema lives in `supabase/migrations/`:

- **Tables:** profiles, courses, bookings, messages, notifications, audit log.
- **Access rules:** every table has Row Level Security. Grants are explicit and column-level wherever a client can write. Anonymous visitors get no access.
- **Admins:** listed in `private.admins`, which is not exposed through the API. **Admin rights require a Google sign-in:** `private.is_admin()` checks the JWT `amr` for `oauth`. The app asks `public.current_user_admin_status()`: non-admins get a 404 on `/admin`, and admin accounts signed in another way are sent to `/admin-sign-in`.
- **Server-side logic:** booking decisions, notifications, the audit log, and rate limits are written by database triggers, never by clients.

Apply migrations to the linked project:

```bash
npx supabase login
npx supabase link --project-ref <project-ref>
npx supabase db push
```

`npm run test:db` replays the migrations on a temporary local Postgres and checks the access rules. It needs `initdb`, `pg_ctl`, and `psql` on `PATH`. Docker is not required.

## Keep-alive

The free Supabase project pauses after 7 days without database activity. `.github/workflows/keep-alive.yml` calls `https://aqelacademy.com/api/health` once a day, which runs `public.health_check()`. It needs no secrets.

## Backups

`.github/workflows/backup.yml` runs `scripts/backup-db.sh` every day at 02:17 UTC.

- **What it does:** a data-only `pg_dump` (our tables plus `auth.users`/`auth.identities`; the schema lives in the migrations) → gzip → AES-256 (`openssl`, PBKDF2) → Cloudflare R2. The R2 bucket deletes objects after 30 days.
- **Side effect:** the daily run also keeps the free Supabase project from pausing.
- **Secrets it needs:** `SUPABASE_DB_URL` (session pooler URI), `BACKUP_PASSPHRASE`, `R2_ACCOUNT_ID`, `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`. Until they're set, the workflow skips.

To restore into a project that already has the migrations applied:

```bash
openssl enc -d -aes-256-cbc -pbkdf2 -iter 600000 -in aqelacademy-<date>.sql.gz.enc | gunzip > backup.sql
PGOPTIONS='-c session_replication_role=replica' psql "$SUPABASE_DB_URL" -f backup.sql
```

`session_replication_role=replica` stops the sign-up trigger from creating duplicate profiles during the restore.

## Pages

| Route              | Page                         |
| ------------------ | ---------------------------- |
| `/`                | Home                         |
| `/courses`         | Course list                  |
| `/courses/[slug]`  | Course details               |
| `/blog`            | Articles                     |
| `/blog/[slug]`     | Article                      |
| `/about-us`        | About the academy            |
| `/faqs`            | Frequently asked questions   |
| `/contact-us`      | Contact details              |
| `/policy`          | Privacy policy               |
| `/register`        | Create an account            |
| `/login`           | Sign in                      |
| `/forgot-password` | Request a password reset     |
| `/reset-password`  | Set a new password           |
| `/auth/confirm`    | Confirm an email link        |
| `/account`         | Profile and sign out         |
| `/account/bookings` | My bookings and their status |
| `/account/bookings/[id]` | Booking details and the conversation with the doctor |
| `/account/notifications` | Notifications (open one to mark it read) |
| `/api/notifications/summary` | Unread count for the header bell (JSON, private) |
| `/courses/[slug]/book` | Confirm a course booking (signed in) |
| `/admin`           | Doctor dashboard: overview (admins only) |
| `/admin/bookings`  | Booking requests: approve, reject, reopen |
| `/admin/bookings/[id]` | One request: decision buttons, student contact, conversation |
| `/admin/messages`  | Conversations inbox, newest first, with unread counts |
| `/admin-sign-in`   | "Continue with Google" for admin accounts that signed in with a password |
| `/api/health`      | Tiny database query used by the daily keep-alive (returns `{ ok }`) |
| `/robots.txt`, `/sitemap.xml` | Search engine rules (private areas disallowed) and public pages |
| `/admin/students`  | Registered students with search and contact buttons |

## Project structure

```
src/
  app/          Routes (App Router)
  components/   UI components (layout, ui, home, courses, blog)
  content/      Site content: courses, articles, pages, contact details
  lib/          Helpers, validation, Supabase clients, data access layer (dal/)
  types/        Shared content types
  assets/       Images
```

All site copy lives in `src/content/`. To add a course or an article, add an entry to `courses.ts` or `articles.ts`. The pages and cards pick it up automatically.
