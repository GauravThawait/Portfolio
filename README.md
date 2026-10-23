# Portfolio starter kit

Everything Claude Code needs to build your portfolio site.

```
CLAUDE.md                  ← the spec Claude Code follows every session
content/
  home.md                  ← hero, highlights, experience, skills, about
  projects.md              ← smaller projects and earlier work
  work/
    session-ops.md         ← case study 1
    realtime-sync.md       ← case study 2
    data-platform.md       ← case study 3
    police-wms.md          ← case study 4
public/
  (add resume.pdf here)
```

## Before you start

1. **Search for `TODO(Gaurav)`** across `content/` and fill in or delete each one. Most are in `police-wms.md`.
2. **Read every content file once.** It's all written from our resume work, but it's your voice on the page, so change anything that doesn't sound like you.
3. **Copy your final resume** into `public/resume.pdf`.
4. **Ask MAD's director** whether he's comfortable with you publishing the three MAD case studies. They describe architecture only, with no code, data, or internal details.

## Build it with Claude Code

1. Create an empty GitHub repo (for example `portfolio`) and clone it.
2. Copy this kit's files into it.
3. Open Claude Code in the repo folder and give it this first prompt:

> Read CLAUDE.md fully. Then do step 1 of the build order in section 9 only: scaffold the Next.js project with the stack, theme variables, fonts, layout, nav, and footer described there. Don't touch the content files. When you're done, tell me how to run it locally and stop so I can review.

4. Review, then ask for the next step: *"Do step 2 of the build order."* Continue one step at a time.

## Deploy

1. Push to GitHub.
2. On vercel.com, import the repo. Vercel detects Next.js automatically.
3. (Optional) Buy a domain such as `gauravthawait.dev` and add it under the project's **Domains** settings.

After that, every push to `main` deploys automatically.

## Next, optional

A small **public** repo that demonstrates the event-driven sync pattern (database trigger → webhook → retries with backoff → dead-letter queue), with a short README and a diagram. Your MAD code is private, so this gives recruiters something of yours they can actually read, and it's strong evidence for forward-deployed roles.
