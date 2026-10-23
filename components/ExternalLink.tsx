import type { ComponentProps } from "react";

/** A link that opens in a new tab with the safe `rel` required for external URLs. */
export function ExternalLink(props: Omit<ComponentProps<"a">, "target" | "rel">) {
  return <a {...props} target="_blank" rel="noopener noreferrer" />;
}
