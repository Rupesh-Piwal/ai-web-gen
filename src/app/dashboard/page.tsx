"use client";

import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getPages } from "@/lib/siteStore";
import { AppSidebar } from "./components/AppSidebar";
import { PreviewPanel } from "./components/PreviewPanel";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePageStore } from "@/lib/store";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPage, setSelectedPage] = useState("home");
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

  const handleRegenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Prompt cannot be empty");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ description: prompt }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (
        !res.ok ||
        typeof data !== "object" ||
        Object.keys(data).length === 0
      ) {
        throw new Error("Failed to generate site");
      }

      usePageStore.getState().setPages(data);
      const newPages = Object.keys(data).map((slug) => ({
        id: slug,
        title: slug.charAt(0).toUpperCase() + slug.slice(1),
      }));

      setPages(newPages);
      setSelectedPage(newPages[0].id);
      toast.success(`Website regenerated! (${newPages.length} pages)`);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <AppSidebar
          pages={pages}
          selectedPage={selectedPage}
          onPageSelect={setSelectedPage}
        />

        <div className="flex-1 flex flex-col">
        
          <div className="border-b bg-white px-6 py-4 flex items-center gap-4 shadow-sm">
            <Textarea
              placeholder="Update your website prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full max-w-4xl min-h-[80px] text-base border-slate-200 focus:border-blue-400 focus:ring-blue-400 resize-none"
            />
            <Button
              onClick={handleRegenerate}
              disabled={isGenerating || !prompt.trim()}
              className="h-12 px-6 text-base font-semibold"
            >
              {isGenerating ? "Regenerating..." : "Regenerate"}
            </Button>
          </div>

          
          <PreviewPanel selectedPage={selectedPage} />
        </div>
      </div>
    </SidebarProvider>
  );
}
