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
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command           | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `npm run dev`     | Start the development server                                   |
| `npm run build`   | Create a Next.js production build                              |
| `npm run preview` | Build for Cloudflare and run it locally in the Workers runtime |
| `npm run deploy`  | Build for Cloudflare and deploy to Workers                     |
| `npm run lint`    | Run ESLint                                                     |

## Deployment

The site runs on Cloudflare Workers (worker name `aqelacademy`, configured in `wrangler.jsonc`) and is served on `aqelacademy.com`. `www.aqelacademy.com` redirects to the apex domain.

Deploys run through Cloudflare Workers Builds, connected to this repository. Every push to `master` builds and deploys automatically.

- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx opennextjs-cloudflare deploy`

Use `npm run preview` to check a build in the Workers runtime before pushing.

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

## Project structure

```
src/
  app/          Routes (App Router)
  components/   UI components (layout, ui, home, courses, blog)
  content/      Site content: courses, articles, pages, contact details
  lib/          Formatting and link helpers
  types/        Shared content types
  assets/       Images
```

All site copy lives in `src/content/`. To add a course or an article, add an entry to `courses.ts` or `articles.ts`. The pages and cards pick it up automatically.
