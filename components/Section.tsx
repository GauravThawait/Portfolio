import type { ReactNode } from "react";

import { FadeIn } from "@/components/FadeIn";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-6 py-12 sm:py-16">
      <FadeIn>
        <h2 id={headingId} className="font-mono text-xs font-medium tracking-widest text-muted uppercase">
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </FadeIn>
    </section>
  );
}
