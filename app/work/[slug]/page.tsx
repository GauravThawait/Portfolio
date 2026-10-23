import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Chip } from "@/components/Chip";
import { Markdown } from "@/components/Markdown";
import { MetricList } from "@/components/MetricList";
import { getCaseStudies, getCaseStudy, getHome } from "@/lib/content";
import { pageMetadata } from "@/lib/site";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

const termClass = "shrink-0 font-mono text-xs tracking-widest text-muted uppercase sm:w-16";

export function generateStaticParams(): { slug: string }[] {
  return getCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  const { name } = getHome();
  return pageMetadata({
    title: study.title,
    socialTitle: `${study.title} · ${name}`,
    description: study.summary,
    path: `/work/${study.slug}`,
    siteName: name,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  return (
    <article className="mx-auto max-w-page px-4 py-12 sm:px-6 sm:py-16">
      <header>
        <Link href="/#work" className="font-mono text-xs text-muted transition-colors hover:text-foreground">
          ← All work
        </Link>
        <h1 className="mt-6 max-w-article text-3xl leading-tight font-semibold tracking-tight sm:text-5xl">
          {study.title}
        </h1>
        <p className="mt-5 max-w-article text-lg leading-relaxed text-muted">{study.summary}</p>

        <dl className="mt-8 max-w-article space-y-4 text-sm">
          <div className="sm:flex sm:gap-6">
            <dt className={termClass}>Role</dt>
            <dd className="mt-1 sm:mt-0">{study.role}</dd>
          </div>
          <div className="sm:flex sm:gap-6">
            <dt className={termClass}>Period</dt>
            <dd className="mt-1 sm:mt-0">{study.period}</dd>
          </div>
          <div className="sm:flex sm:gap-6">
            <dt className={`${termClass} sm:pt-1`}>Stack</dt>
            <dd className="mt-2 sm:mt-0">
              <ul className="flex flex-wrap gap-2">
                {study.stack.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <div className="mt-10 border-y border-border py-8">
          <MetricList metrics={study.metrics} />
        </div>
      </header>

      <Markdown className="prose-content mt-12 max-w-article">{study.body}</Markdown>
    </article>
  );
}
