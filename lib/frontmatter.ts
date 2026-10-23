/**
 * Small validators for Markdown frontmatter. Each one throws an error that
 * names the file and field, so a broken content file fails the build loudly.
 */

export type Frontmatter = Record<string, unknown>;

export class ContentError extends Error {
  constructor(file: string, message: string) {
    super(`[content] ${file}: ${message}`);
    this.name = "ContentError";
  }
}

function describe(value: unknown): string {
  if (value === undefined) return "missing";
  if (Array.isArray(value)) return "a list";
  return `a ${typeof value}`;
}

function asRecord(value: unknown, file: string, field: string): Frontmatter {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new ContentError(file, `"${field}" must be a map, but it is ${describe(value)}`);
  }
  return value as Frontmatter;
}

export function requireString(data: Frontmatter, field: string, file: string): string {
  const value = data[field];
  if (typeof value !== "string" || value.trim() === "") {
    throw new ContentError(file, `required field "${field}" must be a non-empty string, but it is ${describe(value)}`);
  }
  return value;
}

export function optionalString(data: Frontmatter, field: string, file: string): string | undefined {
  return data[field] === undefined ? undefined : requireString(data, field, file);
}

export function requireNumber(data: Frontmatter, field: string, file: string): number {
  const value = data[field];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new ContentError(file, `required field "${field}" must be a number, but it is ${describe(value)}`);
  }
  return value;
}

export function requireStringList(data: Frontmatter, field: string, file: string): string[] {
  const value = data[field];
  if (!Array.isArray(value) || value.length === 0) {
    throw new ContentError(file, `required field "${field}" must be a non-empty list, but it is ${describe(value)}`);
  }
  return value.map((item, i) => {
    if (typeof item !== "string" || item.trim() === "") {
      throw new ContentError(file, `"${field}[${i}]" must be a non-empty string, but it is ${describe(item)}`);
    }
    return item;
  });
}

/**
 * A list of maps, each validated by `parse`. The location passed to `parse`
 * reads like `content/home.md (experience[1])`, so nested errors point at the item.
 */
export function requireObjectList<T>(
  data: Frontmatter,
  field: string,
  file: string,
  parse: (item: Frontmatter, location: string) => T,
): T[] {
  const value = data[field];
  if (!Array.isArray(value) || value.length === 0) {
    throw new ContentError(file, `required field "${field}" must be a non-empty list, but it is ${describe(value)}`);
  }
  return value.map((item, i) => {
    const path = `${field}[${i}]`;
    return parse(asRecord(item, file, path), `${file} (${path})`);
  });
}

export function requireMap(data: Frontmatter, field: string, file: string): Frontmatter {
  return asRecord(data[field], file, field);
}
