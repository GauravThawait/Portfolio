import type { Metric } from "@/lib/content";

export function MetricList({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col-reverse justify-end gap-2">
          <dt className="text-sm leading-snug text-muted">{metric.label}</dt>
          <dd className="font-mono text-3xl font-semibold tracking-tight break-words text-accent-soft sm:text-4xl">
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
