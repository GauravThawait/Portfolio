import fs from "node:fs";
import path from "node:path";

// Kept free of path aliases and third-party imports so next.config.ts can load it.

const CONTENT_DIR = path.join(process.cwd(), "content");

export const TODO_MARKER = "TODO(Gaurav)";

type ContentTodo = {
  file: string;
  line: number;
  text: string;
};

function listMarkdownFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listMarkdownFiles(full);
    return entry.name.endsWith(".md") ? [full] : [];
  });
}

/** Every line in `content/` that still contains a TODO(Gaurav) marker. */
function findContentTodos(): ContentTodo[] {
  return listMarkdownFiles(CONTENT_DIR).flatMap((filePath) => {
    const file = path.relative(process.cwd(), filePath).split(path.sep).join("/");
    return fs
      .readFileSync(filePath, "utf8")
      .split(/\r?\n/)
      .flatMap((text, i) => (text.includes(TODO_MARKER) ? [{ file, line: i + 1, text: text.trim() }] : []));
  });
}

/** Prints a warning listing every remaining TODO(Gaurav); silent when there are none. */
export function warnAboutContentTodos(): void {
  const todos = findContentTodos();
  if (todos.length === 0) return;
  const lines = todos.map((todo) => `  - ${todo.file}:${todo.line}  ${todo.text}`);
  console.warn(`\n⚠ ${todos.length} ${TODO_MARKER} item(s) remain in content/:\n${lines.join("\n")}\n`);
}
