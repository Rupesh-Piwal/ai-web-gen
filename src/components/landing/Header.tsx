import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="border-b border-zinc-800/50 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold">AI Website Generator</span>
          </div>
          <Badge
            variant="secondary"
            className="bg-zinc-800 text-zinc-300 border-zinc-700"
          >
            Beta
          </Badge>
        </div>
      </div>
    </header>
  );
}
