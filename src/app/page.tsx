"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const examplePrompts = [
  "A modern portfolio website for a UX designer with dark theme",
  "A restaurant website with menu, about, and contact pages",
  "A tech startup landing page with hero section and pricing",
  "A photography portfolio with gallery and client testimonials",
  "A local business website with services and location info",
  "An e-commerce store for handmade jewelry",
];

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

    
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Website generated successfully!");
      router.push("/dashboard");
    }, 3000);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-blue-500 rounded-2xl mr-3">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Website Generator
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Describe your dream website and watch it come to life with the power
            of AI
          </p>
        </div>

        
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="text-lg font-semibold text-slate-800 mb-4 block">
                    Describe your website
                  </label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="I want a modern website for my coffee shop with a warm, cozy design. It should have pages for our menu, story, and location..."
                    className="min-h-[120px] text-base border-slate-200 focus:border-blue-400 focus:ring-blue-400 resize-none"
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-slate-500">
                      {prompt.length}/500 characters
                    </span>
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
                      Generating Your Website...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Generate Website
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

       
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">
            Need inspiration? Try these examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {examplePrompts.map((example, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-slate-200 hover:border-blue-300 bg-white/60 backdrop-blur-sm"
                onClick={() => handleExampleClick(example)}
              >
                <CardContent className="p-6">
                  <p className="text-slate-700 leading-relaxed">{example}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
