# CLAUDE.md — Gaurav Thawait Portfolio

This file is the spec for this repository. Read it fully before making changes, and follow it in every session.

## 1. Purpose

A personal portfolio for **Gaurav Thawait, Full-Stack Engineer**, targeting **Full-Stack SDE-1/SDE-2** and **Forward Deployed Engineer** roles.

The site has two jobs:
1. Let a recruiter understand who Gaurav is in **under 10 seconds** (home page hero + highlights).
2. Let a hiring manager see **how he thinks** through detailed case studies (problem → constraints → what he built → outcome).

The code itself is also a work sample. Reviewers may open the repo, so keep it clean, typed, and simple.

## 2. Stack (do not substitute)

- **Next.js** (App Router) + **TypeScript** (strict mode)
- **Tailwind CSS** for styling. No component library; build the few components needed.
- **Content as Markdown** in `/content`, parsed at build time with `gray-matter` and rendered with `react-markdown` + `remark-gfm`.
- **Fully static** output (`generateStaticParams` for case studies). No database, no API routes, no CMS.
- **Deploy on Vercel**, connected to the GitHub repo (auto-deploy on push to `main`).
- Package manager: `pnpm`.

Do not add analytics, cookie banners, tracking scripts, or client-side diagram libraries. Vercel Web Analytics is the only allowed exception, and only if Gaurav asks for it.

## 3. Information architecture

| Route | Source | Contents |
|---|---|---|
| `/` | `content/home.md` | Hero, summary, highlight metrics, featured case studies (cards), experience timeline, skills, contact |
| `/work/[slug]` | `content/work/*.md` | One case study per file |
| `/projects` | `content/projects.md` | Smaller projects and earlier work |
| Resume (external) | `links.resume` in `content/home.md` | Gaurav's resume, hosted on Google Drive; the nav's Resume link opens it in a new tab |

Nav: **Work · Projects · Resume · Contact** (Contact scrolls to the home page contact section). Keep the nav to these four items.

Case-study order on the home page comes from the `order` field in each file's frontmatter.

## 4. Content model

### `content/home.md` frontmatter
`name`, `role`, `tagline`, `location` (optional), `email`, `links` (linkedin, github, resume), `highlights` (list of `{ value, label }`), `experience` (list of `{ org, role, period, summary }`), `skills` (map of group → list). The Markdown body is the short "About" paragraph.

### `content/work/*.md` frontmatter
`title`, `slug`, `order`, `summary` (one sentence, used on cards), `role`, `period`, `stack` (list), `metrics` (list of `{ value, label }`, max 4). Body is the case study.

Case-study body sections, in this order: **Context · The problem · Constraints · What I built · Outcome · What I'd do differently**. Some files may skip a section; never invent content to fill one.

### Diagrams
**No architecture diagrams.** Gaurav decided they reveal too much about confidential MAD systems. Case studies show *what* was built and the outcome, not *how* the internals fit together. Do not add Mermaid blocks, SVG diagrams, or other visuals of system topology or data flow.

## 5. Visual design

Match the LinkedIn banner so the brand is consistent.

- **Default theme: dark.** Support light mode via `prefers-color-scheme` plus a manual toggle (persist the choice in `localStorage`, wrapped in try/catch).
- Colors (define as CSS variables, map them in the Tailwind config):
  - Dark: background `#0A1424`, surface `#101E36`, border `#1E3355`, text `#E6EEF9`, muted `#9FB3CF`, accent `#2F7DF6`, accent-soft `#7FB2FF`
  - Light: background `#FFFFFF`, surface `#F4F7FB`, border `#DCE4EF`, text `#0F1B2D`, muted `#51627A`, accent `#1F5FD1`
- Fonts via `next/font`: **Inter** for text, **JetBrains Mono** for labels, metrics, stack chips, and code.
- Subtle dot-grid background on the hero only. No gradients elsewhere, no animated backgrounds, no parallax.
- Highlight metrics: large mono numbers with a small muted label underneath.
- Stack shown as small rounded mono "chips".
- Generous whitespace. Max content width ~720px for case-study prose, ~1100px for the home page grid.
- Motion: a single fade-in on scroll for sections, disabled under `prefers-reduced-motion`.

## 6. Quality bar (acceptance checklist)

- [ ] Lighthouse ≥ 95 for Performance, Accessibility, Best Practices, SEO (mobile)
- [ ] Works at 360px width with no page-level horizontal scroll
- [ ] Semantic HTML, one `h1` per page, visible focus states, color contrast AA in both themes
- [ ] Per-page `metadata` (title, description), Open Graph image (`public/og.png`, 1200×630), `sitemap.xml`, `robots.txt`
- [ ] All external links open in a new tab with `rel="noopener noreferrer"`
- [ ] `pnpm build` passes with zero TypeScript or lint errors
- [ ] No unused dependencies

## 7. Code conventions

- Server Components by default; `"use client"` only for the theme toggle and scroll animation.
- Content loading lives in `lib/content.ts` (typed loaders with explicit frontmatter types; throw a clear error on a missing required field).
- Components in `components/`, one component per file, named exports.
- No `any`. No commented-out code. Keep files under ~200 lines.
- Commit messages: imperative mood, short subject line.

## 8. Content rules (important)

- **Never invent facts, metrics, dates, or claims.** All content comes from `/content`. If something is missing, leave a visible `TODO(Gaurav):` and tell Gaurav.
- Any line marked `TODO(Gaurav):` in the content must render on the page as a highlighted placeholder during development, and the build should log a warning listing every remaining TODO.
- **Confidentiality:** the MAD work is described at the architecture level only. Never add internal hostnames, IP addresses, workflow or instance IDs, database names, API keys, real records, or screenshots that show any of these. If Gaurav adds a screenshot, remind him to redact it.
- Do not put a phone number on the site.
- Keep Gaurav's wording in `/content` unless he asks for edits. Fix only typos and broken Markdown.

## 9. Suggested build order

1. Scaffold the project, Tailwind config, theme variables, fonts, layout, nav, footer.
2. `lib/content.ts` with typed loaders; render raw content to confirm it parses.
3. Home page sections.
4. Case-study page template.
5. Projects page.
6. Metadata, OG image, sitemap, robots.
7. Run the acceptance checklist; fix issues; deploy.

Work one step at a time and show Gaurav the result before moving on.
