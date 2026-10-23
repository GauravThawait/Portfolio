import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import {
  ContentError,
  type Frontmatter,
  optionalString,
  requireMap,
  requireNumber,
  requireObjectList,
  requireString,
  requireStringList,
} from "@/lib/frontmatter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const WORK_DIR = path.join(CONTENT_DIR, "work");
const MAX_CASE_STUDY_METRICS = 4;

export type Metric = {
  value: string;
  label: string;
};

export type Experience = {
  org: string;
  role: string;
  period: string;
  summary: string;
};

export type HomeContent = {
  name: string;
  role: string;
  tagline: string;
  location?: string;
  email: string;
  links: { linkedin: string; github: string; resume: string };
  highlights: Metric[];
  experience: Experience[];
  skills: Record<string, string[]>;
  /** Markdown body: the "About" paragraph. */
  body: string;
};

export type ProjectsContent = {
  title: string;
  /** Markdown body: one `##` section per project. */
  body: string;
};

export type CaseStudy = {
  title: string;
  slug: string;
  order: number;
  summary: string;
  role: string;
  period: string;
  stack: string[];
  metrics: Metric[];
  /** Markdown body: the case study itself. */
  body: string;
};

type ParsedFile = {
  file: string;
  data: Frontmatter;
  body: string;
};

function relative(filePath: string): string {
  return path.relative(process.cwd(), filePath).split(path.sep).join("/");
}

function readMarkdown(filePath: string): ParsedFile {
  const file = relative(filePath);
  if (!fs.existsSync(filePath)) {
    throw new ContentError(file, "file not found");
  }
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  return { file, data, body: content.trim() };
}

function parseMetric(item: Frontmatter, location: string): Metric {
  return {
    value: requireString(item, "value", location),
    label: requireString(item, "label", location),
  };
}

function parseExperience(item: Frontmatter, location: string): Experience {
  return {
    org: requireString(item, "org", location),
    role: requireString(item, "role", location),
    period: requireString(item, "period", location),
    summary: requireString(item, "summary", location),
  };
}

function parseSkills(data: Frontmatter, file: string): Record<string, string[]> {
  const groups = requireMap(data, "skills", file);
  return Object.fromEntries(
    Object.keys(groups).map((group) => [group, requireStringList(groups, group, `${file} (skills)`)]),
  );
}

export function getHome(): HomeContent {
  const { file, data, body } = readMarkdown(path.join(CONTENT_DIR, "home.md"));
  const links = requireMap(data, "links", file);
  return {
    name: requireString(data, "name", file),
    role: requireString(data, "role", file),
    tagline: requireString(data, "tagline", file),
    location: optionalString(data, "location", file),
    email: requireString(data, "email", file),
    links: {
      linkedin: requireString(links, "linkedin", `${file} (links)`),
      github: requireString(links, "github", `${file} (links)`),
      resume: requireString(links, "resume", `${file} (links)`),
    },
    highlights: requireObjectList(data, "highlights", file, parseMetric),
    experience: requireObjectList(data, "experience", file, parseExperience),
    skills: parseSkills(data, file),
    body,
  };
}

export function getProjects(): ProjectsContent {
  const { file, data, body } = readMarkdown(path.join(CONTENT_DIR, "projects.md"));
  return { title: requireString(data, "title", file), body };
}

function parseCaseStudy(filePath: string): CaseStudy {
  const { file, data, body } = readMarkdown(filePath);
  const slug = requireString(data, "slug", file);
  const expectedSlug = path.basename(filePath, ".md");
  if (slug !== expectedSlug) {
    throw new ContentError(file, `"slug" is "${slug}" but the file name implies "${expectedSlug}"; make them match`);
  }
  const metrics = requireObjectList(data, "metrics", file, parseMetric);
  if (metrics.length > MAX_CASE_STUDY_METRICS) {
    throw new ContentError(file, `"metrics" has ${metrics.length} items; the maximum is ${MAX_CASE_STUDY_METRICS}`);
  }
  return {
    title: requireString(data, "title", file),
    slug,
    order: requireNumber(data, "order", file),
    summary: requireString(data, "summary", file),
    role: requireString(data, "role", file),
    period: requireString(data, "period", file),
    stack: requireStringList(data, "stack", file),
    metrics,
    body,
  };
}

/** Every case study in `content/work`, sorted by `order`. */
export function getCaseStudies(): CaseStudy[] {
  const studies = fs
    .readdirSync(WORK_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => parseCaseStudy(path.join(WORK_DIR, name)))
    .sort((a, b) => a.order - b.order);

  studies.forEach((study, i) => {
    const previous = studies[i - 1];
    if (previous && previous.order === study.order) {
      throw new ContentError(
        `content/work/${study.slug}.md`,
        `"order" ${study.order} is also used by ${previous.slug}.md; each case study needs a unique order`,
      );
    }
  });
  return studies;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((study) => study.slug === slug);
}
