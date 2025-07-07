let sitePages: Record<string, string> = {};

export function savePages(pages: Record<string, string>) {
  sitePages = pages;
}

export function getPages() {
  return sitePages;
}

export function getPage(slug: string) {
  return sitePages[slug];
}
