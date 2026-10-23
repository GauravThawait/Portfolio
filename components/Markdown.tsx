import ReactMarkdown, { type Components, type ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";

import { TODO_MARKER } from "@/lib/todos";

type HastNode = NonNullable<ExtraProps["node"]>;

function textOf(node: HastNode | HastNode["children"][number]): string {
  if ("value" in node && typeof node.value === "string") return node.value;
  if ("children" in node) return node.children.map(textOf).join("");
  return "";
}

function todoClass(node: ExtraProps["node"], className?: string): string | undefined {
  const isTodo = node !== undefined && textOf(node).includes(TODO_MARKER);
  return [className, isTodo ? "todo-placeholder" : undefined].filter(Boolean).join(" ") || undefined;
}

/** A paragraph that is only `*emphasis*`, used in projects.md for the stack and date line. */
function isMetaLine(node: ExtraProps["node"]): boolean {
  const [only, ...rest] = node?.children ?? [];
  return rest.length === 0 && only?.type === "element" && only.tagName === "em";
}

// Paragraphs and list items that still contain TODO(Gaurav) render as highlighted placeholders.
const components: Components = {
  p: ({ node, className, ...props }) => (
    <p className={todoClass(node, isMetaLine(node) ? "meta-line" : className)} {...props} />
  ),
  li: ({ node, className, ...props }) => <li className={todoClass(node, className)} {...props} />,
  // External links open in a new tab; in-site links stay as they are.
  a: ({ href, title, children }) =>
    href && /^https?:\/\//.test(href) ? (
      <a href={href} title={title} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <a href={href} title={title}>
        {children}
      </a>
    ),
};

export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
