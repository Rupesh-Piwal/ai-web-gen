import { Code, Globe, Palette, Sparkles } from "lucide-react";

export const quickActions = [
  {
    icon: Code,
    label: "SaaS Startup",
    prompt:
      "Design a minimalist, ultra-clean SaaS startup website with soft pastel gradients and elegant spacing. Emphasize user-friendliness, strong visual hierarchy, and generous white space. Use subtle motion effects, card-based UI, and rounded corners. Include sections for features, integrations, use-cases, and testimonials. The tone should feel premium, scalable, and approachable for early-stage tech users.",
  },
  {
    icon: Palette,
    label: "Elegant Startup UI",
    prompt:
      "Design a modern, elegant startup website with a clean layout, soft gradients, and crisp UI components. Use light neutral backgrounds with subtle color accents, rounded cards, and smooth section transitions. Prioritize clarity, whitespace, and consistent spacing. Include hero section, product features, customer quotes, and a bold CTA. Typography should feel refined and tech-savvy, evoking trust, innovation, and simplicity.",
  },
  {
    icon: Sparkles,
    label: "Neon Startup Vibe",
    prompt:
      "Generate a dark-themed, sleek startup website with neon-accent gradients, glassy UI elements, and smooth transitions. Use a grid-based layout with clear navigation, bold call-to-actions, and interactive hover effects. Ideal for a cutting-edge AI or Web3 product. Typography should be modern and clean, with vibrant gradients subtly guiding user flow. The design should feel powerful, futuristic, and polished.",
  },
];

export function QuickActions({
  setPrompt,
}: {
  setPrompt: (val: string) => void;
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => setPrompt(action.prompt)}
            className="p-4 bg-zinc-900/30 hover:bg-zinc-800/50 border border-zinc-800/50 hover:border-zinc-700 rounded-xl transition-all duration-200 text-left group cursor-pointer"
          >
            <action.icon className="h-5 w-5 text-zinc-400 group-hover:text-blue-400 mb-2 transition-colors" />
            <div className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
              {action.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
