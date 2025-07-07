import { create } from "zustand";

type PageStore = {
  pages: Record<string, string>;
  setPages: (pages: Record<string, string>) => void;
  setPage: (slug: string, html: string) => void; 
  getPage: (slug: string) => string | undefined;
};

export const usePageStore = create<PageStore>((set, get) => ({
  pages: {},
  setPages: (pages) => set({ pages }),
  setPage: (slug, html) =>
    set((state) => ({
      pages: {
        ...state.pages,
        [slug]: html,
      },
    })),
  getPage: (slug) => get().pages[slug],
}));
