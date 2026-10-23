import { Chip } from "@/components/Chip";

export function SkillGroups({ skills }: { skills: Record<string, string[]> }) {
  return (
    <dl className="grid gap-8 sm:grid-cols-2">
      {Object.entries(skills).map(([group, items]) => (
        <div key={group}>
          <dt className="text-sm font-semibold">{group}</dt>
          <dd className="mt-3">
            <ul className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
