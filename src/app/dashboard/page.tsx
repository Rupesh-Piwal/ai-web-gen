"use client"
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

import { getPages } from "@/lib/siteStore";
import { AppSidebar } from "./components/AppSidebar";
import { TopToolbar } from "./components/TopToolbar";
import { PreviewPanel } from "./components/PreviewPanel";

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [websiteTitle] = useState("My AI Generated Website");
  const [pages, setPages] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    const storedPages = getPages();
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
      <div className="min-h-screen flex w-full bg-slate-50">
        <AppSidebar
          pages={pages}
          selectedPage={selectedPage}
          onPageSelect={setSelectedPage}
        />

        <div className="flex-1 flex flex-col">
          <TopToolbar websiteTitle={websiteTitle} selectedPage={selectedPage} />

          <PreviewPanel selectedPage={selectedPage} />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
