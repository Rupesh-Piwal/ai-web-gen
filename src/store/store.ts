import { create } from "zustand";
import { persist } from "zustand/middleware";

type PageStore = {
  pages: Record<string, string>;
  setPages: (pages: Record<string, string>) => void;
  setPage: (slug: string, html: string) => void;
  getPage: (slug: string) => string | undefined;
};

export const usePageStore = create<PageStore>()(
  persist(
    (set, get) => ({
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
    }),
    {
      name: "page-store", 
    }
  )
);
