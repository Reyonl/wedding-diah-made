/**
 * Base path asset helper for GitHub Pages static export.
 *
 * Prefixes `NEXT_PUBLIC_BASE_PATH` (e.g. `/wedding-diah-made`)
 * to all absolute public asset paths (images, audio, css urls).
 */

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path?: string | null): string {
  if (!path) return "";
  if (!path.startsWith("/")) return path;
  const cleanBase = BASE_PATH.endsWith("/") ? BASE_PATH.slice(0, -1) : BASE_PATH;
  return `${cleanBase}${path}`;
}