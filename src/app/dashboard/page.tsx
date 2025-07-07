"use client";

import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePageStore } from "@/store/store";
import { AppSidebar } from "./components/AppSidebar";
import { PreviewPanel } from "./components/PreviewPanel";

export default function Dashboard() {
  const [selectedPage, setSelectedPage] = useState("home");
  const [pages, setPages] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    const storedPages = usePageStore.getState().pages;
    const pageList = Object.keys(storedPages).map((slug) => ({
      id: slug,
      title: slug.charAt(0).toUpperCase() + slug.slice(1),
    }));

    setPages(pageList);
    if (pageList.length > 0) {
      setSelectedPage(pageList[0].id);
    }
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-zinc-950 text-zinc-100">
        <AppSidebar
          pages={pages}
          selectedPage={selectedPage}
          onPageSelect={setSelectedPage}
        />
        <div className="flex-1 flex flex-col min-h-screen">
          <div className="flex-1 overflow-auto bg-zinc-950">
            <div className="p-6">
              <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg overflow-hidden shadow-2xl">
                <PreviewPanel selectedPage={selectedPage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
