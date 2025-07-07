"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePageStore } from "@/store/store";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { QuickActions } from "@/components/landing/QuickActions";
import { ExamplePrompts } from "@/components/landing/ExamplePrompts";
import { motion } from "framer-motion";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="text-center space-y-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Hero />

          <motion.div
            className="max-w-3xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask AI to build... e.g., A modern portfolio for a product designer with dark mode and smooth animations"
                className="min-h-[120px] text-base bg-zinc-900/50 border-zinc-800 focus:border-blue-500/50 focus:ring-blue-500/20 placeholder:text-zinc-500 resize-none rounded-xl backdrop-blur-sm"
                maxLength={500}
              />
              <div className="absolute bottom-3 right-3 text-xs text-zinc-500">
                {prompt.length}/500
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                size="lg"
                className="w-full h-14 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Generating your website...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 mr-2" />
                    Generate Website
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <QuickActions setPrompt={setPrompt} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <ExamplePrompts setPrompt={setPrompt} />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
