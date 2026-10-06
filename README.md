# Aqel Academy

An Arabic (right-to-left) learning platform for **Dr. Muaffaq Aqel Academy for Applied Behavior Analysis and Rehabilitation**, which runs training programs in ABA, special education and behavioral rehabilitation.

**Live:** [aqelacademy.com](https://aqelacademy.com)

## About

I designed and built this platform end to end. It replaces the academy's old WordPress site. Students can now create an account, book a seat in a course, and talk to the doctor directly. The doctor reviews every request from a simple dashboard. The admin side was designed for an older, non-technical user: large text, plain words and one-tap contact buttons.

The whole platform runs on free tiers. Payments and the courses themselves stay outside the site.

## Features

- **Public site:** courses, articles, FAQ, contact and privacy pages. Pages are statically rendered, with SEO metadata and link previews.
- **Accounts:** email and password with 8-digit email codes, "Continue with Google", captcha protection, and account deletion by the user.
- **Bookings:** a student requests a seat, and the doctor approves or rejects it. The course page itself shows where the request stands, so students need no dashboard. One open request per course, with rate limits.
- **Messages:** one conversation per booking, with read receipts and auto-refresh.
- **Notifications:** in-app header panels (booking sent, decision, new message) plus email.
- **Doctor dashboard:** stats, a request queue, student search, and WhatsApp, call and email shortcuts.
- **Security:** Row Level Security on every table, column-level grants, and a Google session required for admin rights. Strict security headers (CSP, HSTS) and automated database security tests in CI.
- **Operations:** daily encrypted database backups, uptime monitoring, and automated dependency updates.

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- Supabase (Postgres, Auth, Row Level Security)
- Cloudflare Workers (via OpenNext) and Cloudflare Turnstile
- Resend (email)
- Zod
- GitHub Actions

## Development

Setup, environment variables, deployment, database and backups are covered in [docs/operations.md](docs/operations.md).
