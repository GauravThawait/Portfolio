import { ExternalLink } from "@/components/ExternalLink";
import type { HomeContent } from "@/lib/content";

const labelClass = "block text-sm text-muted";
const linkClass = "font-mono text-accent-soft underline-offset-4 break-all hover:underline";

function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}

export function ContactLinks({ home }: { home: HomeContent }) {
  return (
    <ul className="max-w-article space-y-5">
      <li>
        <span className={labelClass}>Email</span>
        <a href={`mailto:${home.email}`} className={`text-lg ${linkClass}`}>
          {home.email}
        </a>
      </li>
      <li>
        <span className={labelClass}>LinkedIn</span>
        <ExternalLink href={home.links.linkedin} className={linkClass}>
          {displayUrl(home.links.linkedin)}
        </ExternalLink>
      </li>
      <li>
        <span className={labelClass}>GitHub</span>
        <ExternalLink href={home.links.github} className={linkClass}>
          {displayUrl(home.links.github)}
        </ExternalLink>
      </li>
    </ul>
  );
}
