"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Zap } from "lucide-react";
import { usePageStore } from "@/lib/store";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const examplePrompts = [
    "Modern portfolio site for a UX designer",
    "Coffee shop website with warm vibes",
    "Startup landing page with pricing and FAQs",
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please describe the website you want to create");
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
      toast.success(`Website created! (${Object.keys(data).length} pages)`);
      router.push("/dashboard");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-10 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-blue-500 rounded-2xl">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Website Generator
          </h1>
        </div>

        <p className="text-lg text-slate-600">
          Describe your dream website. Our AI will generate the full code
          instantly.
        </p>

        <div className="space-y-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A modern portfolio for a product designer with dark mode..."
            className="min-h-[120px] text-base border-slate-300 focus:border-blue-400 focus:ring-blue-400"
            maxLength={500}
          />
          <div className="text-right text-sm text-slate-500">
            {prompt.length}/500 characters
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="h-5 w-5 mr-2" />
              Generate Website
            </>
          )}
        </Button>

        <div className="text-sm text-slate-500">
          Need inspiration?{" "}
          {examplePrompts.map((e, i) => (
            <button
              key={i}
              onClick={() => setPrompt(e)}
              className="text-blue-600 underline hover:text-blue-800 mr-2"
            >
              {e}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
