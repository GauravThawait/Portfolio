import { ExternalLink } from "@/components/ExternalLink";
import { Markdown } from "@/components/Markdown";
import type { HomeContent } from "@/lib/content";

const linkClass =
  "rounded-md border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-accent hover:text-accent-soft";

export function Hero({ home }: { home: HomeContent }) {
  return (
    <section aria-labelledby="hero-heading" className="dot-grid border-b border-border">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-24">
        <p className="font-mono text-sm text-accent-soft">{home.role}</p>
        <h1 id="hero-heading" className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
          {home.name}
        </h1>
        <p className="mt-5 max-w-article text-lg leading-relaxed text-muted sm:text-xl">{home.tagline}</p>
        {home.location ? <p className="mt-3 font-mono text-xs text-muted">{home.location}</p> : null}
        <ul className="mt-8 flex flex-wrap gap-3">
          <li>
            <ExternalLink href={home.links.linkedin} className={linkClass}>
              LinkedIn
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={home.links.github} className={linkClass}>
              GitHub
            </ExternalLink>
          </li>
          <li>
            <a href={`mailto:${home.email}`} className={linkClass}>
              Email
            </a>
          </li>
        </ul>
        <Markdown className="mt-12 max-w-article space-y-4 leading-relaxed text-foreground/90">{home.body}</Markdown>
      </div>
    </section>
  );
}
