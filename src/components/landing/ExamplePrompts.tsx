export const examplePrompts = [
  "Modern portfolio site for a UX designer",
  "Coffee shop website with warm vibes",
  "Startup landing page with pricing and FAQs",
  "E-commerce store with product catalog",
  "Restaurant website with online ordering",
];

export function ExamplePrompts({
  setPrompt,
}: {
  setPrompt: (val: string) => void;
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <p className="text-sm text-zinc-500 mb-4">
        Need inspiration? Try these examples:
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {examplePrompts.map((example, index) => (
          <button
            key={index}
            onClick={() => setPrompt(example)}
            className="px-3 py-1.5 text-xs bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-zinc-600 rounded-full text-zinc-300 hover:text-white transition-all duration-200"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
