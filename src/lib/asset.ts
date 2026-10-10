/**
 * Base path helper.
 *
 * GitHub Pages melayani repo di subpath `/wedding-diah-made/`, sehingga
 * asset yang ditulis absolut (`/images/..`) akan 404 di produksi.
 * Next otomatis meng-prefix `/_next/*`, tapi <img>/<audio>/metadata TIDAK,
 * jadi semua path asset publik harus lewat `asset()`.
 *
 * NEXT_PUBLIC_BASE_PATH dikosongkan untuk dev (root) dan diisi
 * `/wedding-diah-made` saat build untuk GitHub Pages.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}