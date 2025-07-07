// lib/siteStore.ts

type PageMap = Record<string, string>;

let sitePages: PageMap = {};

/**
 * Save generated pages into memory (overwrites existing ones)
 */
export function savePages(pages: PageMap) {
  sitePages = { ...pages }; // ensure immutability
}

/**
 * Retrieve all saved pages
 */
export function getPages(): PageMap {
  return { ...sitePages }; // return a copy to avoid external mutation
}

/**
 * Get a specific page by its slug
 */
export function getPage(slug: string): string | undefined {
  return sitePages[slug];
}

/**
 * Check if any pages exist
 */
export function hasPages(): boolean {
  return Object.keys(sitePages).length > 0;
}

/**
 * Clear all stored pages (for regenerate/reset flow)
 */
export function clearPages() {
  sitePages = {};
}
