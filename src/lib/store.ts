// lib/store.ts
import { create } from "zustand";

type PageStore = {
  pages: Record<string, string>;
  setPages: (pages: Record<string, string>) => void;
  getPage: (slug: string) => string | undefined;
};

export const usePageStore = create<PageStore>((set, get) => ({
  pages: {}, // ✅ make sure this is set
  setPages: (pages) => set({ pages }),
  getPage: (slug) => get().pages[slug],
}));
