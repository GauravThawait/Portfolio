export function Chip({ children }: { children: string }) {
  return (
    <li className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-xs text-muted">
      {children}
    </li>
  );
}
