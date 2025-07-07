type PageMap = Record<string, string>;

let sitePages: PageMap = {};

export function savePages(pages: PageMap) {
  sitePages = { ...pages };
}

export function getPages(): PageMap {
  return { ...sitePages };
}

export function getPage(slug: string): string | undefined {
  return sitePages[slug];
}

export function hasPages(): boolean {
  return Object.keys(sitePages).length > 0;
}

export function clearPages() {
  sitePages = {};
}
