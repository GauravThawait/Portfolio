import Link from "next/link";

import { Chip } from "@/components/Chip";
import type { CaseStudy } from "@/lib/content";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="relative flex h-full flex-col rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent sm:p-6">
      <p className="font-mono text-xs text-muted">{study.period}</p>
      <h3 className="mt-2 text-lg leading-snug font-semibold">
        {/* The ::after overlay makes the whole card clickable; the card shows the focus ring instead. */}
        <Link
          href={`/work/${study.slug}`}
          className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none"
        >
          {study.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{study.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Stack">
        {study.stack.map((item) => (
          <Chip key={item}>{item}</Chip>
        ))}
      </ul>
      <p aria-hidden="true" className="mt-5 font-mono text-xs text-accent-soft">
        Read case study →
      </p>
    </article>
  );
}
