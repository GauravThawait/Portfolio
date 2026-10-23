import type { Experience } from "@/lib/content";

export function ExperienceTimeline({ items }: { items: Experience[] }) {
  return (
    <ol className="relative max-w-article border-l border-border">
      {items.map((item) => (
        <li key={`${item.org}-${item.period}`} className="relative pb-10 pl-6 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-[5px] size-2.5 rounded-full border-2 border-accent bg-background"
          />
          <p className="font-mono text-xs text-muted">{item.period}</p>
          <h3 className="mt-1 font-semibold">{item.org}</h3>
          <p className="mt-0.5 text-sm text-accent-soft">{item.role}</p>
          <p className="mt-3 leading-relaxed text-muted">{item.summary}</p>
        </li>
      ))}
    </ol>
  );
}
