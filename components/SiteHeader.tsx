import Link from "next/link";

import { ExternalLink } from "@/components/ExternalLink";
import { ThemeToggle } from "@/components/ThemeToggle";

const linkClass = "text-muted transition-colors hover:text-foreground";

export function SiteHeader({ resumeUrl }: { resumeUrl: string }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-6">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          Gaurav Thawait
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-4 font-mono text-sm sm:gap-6">
              <li>
                <Link href="/#work" className={linkClass}>
                  Work
                </Link>
              </li>
              <li>
                <Link href="/projects" className={linkClass}>
                  Projects
                </Link>
              </li>
              <li>
                <ExternalLink href={resumeUrl} className={linkClass}>
                  Resume
                </ExternalLink>
              </li>
              <li>
                <Link href="/#contact" className={linkClass}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
