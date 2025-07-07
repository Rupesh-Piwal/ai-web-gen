"use client";

import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePageStore } from "@/store/store";
import { AppSidebar } from "./components/AppSidebar";
import { PreviewPanel } from "./components/PreviewPanel";
import { Monitor, X } from "lucide-react";

export default function Dashboard() {
  const [selectedPage, setSelectedPage] = useState("home");
  const [pages, setPages] = useState<{ id: string; title: string }[]>([]);
  const [showMobileWarning, setShowMobileWarning] = useState(false);

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

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      setShowMobileWarning(isMobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-zinc-950 text-zinc-100">
        {showMobileWarning && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-600 to-red-600 border-b border-orange-500/20 backdrop-blur-sm">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-1.5 rounded-full">
                  <Monitor className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    For the best experience, use desktop
                  </p>
                  <p className="text-xs text-orange-100/80">
                    Mobile editing is limited - switch to desktop for full
                    functionality
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowMobileWarning(false)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        )}
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
