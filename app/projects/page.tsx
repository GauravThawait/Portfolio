import type { Metadata } from "next";

import { Markdown } from "@/components/Markdown";
import { getHome, getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/site";

export function generateMetadata(): Metadata {
  const { title } = getProjects();
  const { name, role } = getHome();
  return pageMetadata({
    title,
    socialTitle: `${title} · ${name}`,
    description: `${title} by ${name}, ${role}.`,
    path: "/projects",
    siteName: name,
  });
}

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <article className="mx-auto max-w-page px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="max-w-article text-3xl leading-tight font-semibold tracking-tight sm:text-5xl">{projects.title}</h1>
      <Markdown className="prose-content mt-12 max-w-article">{projects.body}</Markdown>
    </article>
  );
}
