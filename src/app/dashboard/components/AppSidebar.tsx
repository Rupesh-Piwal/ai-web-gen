import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarHeader,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2, Sparkles, Code, Layers } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AppSidebarProps {
  pages: { id: string; title: string }[];
  selectedPage: string;
  onPageSelect: (id: string) => void;
}

export function AppSidebar({
  pages,
  selectedPage,
  onPageSelect,
}: AppSidebarProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

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

      toast.success(`Website regenerated! (${Object.keys(data).length} pages)`);

      const usePageStore = (await import("@/store/store")).usePageStore;
      usePageStore.getState().setPages(data);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Sidebar className="flex flex-col h-full bg-zinc-950 border-r border-zinc-800">
      <SidebarHeader className="bg-zinc-950 border-b border-zinc-800/50 p-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-sm"></div>
            <div className="relative bg-zinc-900 p-2 rounded-lg border border-zinc-700">
              <Sparkles className="h-5 w-5 text-blue-400" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">
              AI Website Generator
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Build beautiful sites with AI
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-auto p-4 bg-zinc-900">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="h-4 w-4 text-zinc-400" />
            <span className="text-sm font-medium text-zinc-300">Pages</span>
            <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
              {pages.length}
            </span>
          </div>

          <SidebarMenu className="space-y-1">
            {pages.map((page) => (
              <SidebarMenuItem
                key={page.id}
                onClick={() => onPageSelect(page.id)}
                className={`
                  relative group cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 
                  ${
                    selectedPage === page.id
                      ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 border border-blue-500/20"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                    w-2 h-2 rounded-full transition-all duration-200
                    ${
                      selectedPage === page.id
                        ? "bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg shadow-blue-500/20"
                        : "bg-zinc-600 group-hover:bg-zinc-500"
                    }
                  `}
                  ></div>
                  <span className="flex-1 truncate">{page.title}</span>
                  <Code className="h-3 w-3 opacity-60" />
                </div>

                {selectedPage === page.id && (
                  <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full"></div>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>

      <div className="p-4 border-t border-zinc-800/50 bg-zinc-950 backdrop-blur-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="h-4 w-4 text-zinc-400" />
            <span className="text-sm font-medium text-zinc-300">
              Regenerate Site
            </span>
          </div>

          <div className="relative">
            <Textarea
              placeholder="Describe your website...(e.g.,Modern portfolio for a designer with dark theme)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="resize-none text-[10px] min-h-[80px] bg-zinc-800/30 border-zinc-800/50 text-zinc-200 placeholder:text-zinc-700 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200"
            />
            <div className="absolute bottom-2 right-2 text-xs text-zinc-500">
              {prompt.length}/500
            </div>
          </div>

          <Button
            onClick={handleRegenerate}
            disabled={isGenerating || !prompt.trim()}
            className={`
              w-full relative overflow-hidden transition-all duration-300 font-medium
              ${
                isGenerating
                  ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
              }
            `}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                <span>Generating...</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Generate Website</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </>
            )}
          </Button>
        </div>
      </div>
    </Sidebar>
  );
}
