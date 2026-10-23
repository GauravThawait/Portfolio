import type { Metadata } from "next";

import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ContactLinks } from "@/components/ContactLinks";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Hero } from "@/components/Hero";
import { MetricList } from "@/components/MetricList";
import { Section } from "@/components/Section";
import { SkillGroups } from "@/components/SkillGroups";
import { getCaseStudies, getHome } from "@/lib/content";
import { pageMetadata } from "@/lib/site";

export function generateMetadata(): Metadata {
  const home = getHome();
  return pageMetadata({ socialTitle: `${home.name}, ${home.role}`, description: home.tagline, path: "/", siteName: home.name });
}

export default function HomePage() {
  const home = getHome();
  const studies = getCaseStudies();

  return (
    <>
      <Hero home={home} />
      <div className="mx-auto max-w-page px-4 sm:px-6">
        <Section id="highlights" title="Highlights">
          <MetricList metrics={home.highlights} />
        </Section>
        <Section id="work" title="Selected work">
          <ul className="grid gap-5 md:grid-cols-2">
            {studies.map((study) => (
              <li key={study.slug}>
                <CaseStudyCard study={study} />
              </li>
            ))}
          </ul>
        </Section>
        <Section id="experience" title="Experience">
          <ExperienceTimeline items={home.experience} />
        </Section>
        <Section id="skills" title="Skills">
          <SkillGroups skills={home.skills} />
        </Section>
        <Section id="contact" title="Contact">
          <ContactLinks home={home} />
        </Section>
      </div>
    </>
  );
}
