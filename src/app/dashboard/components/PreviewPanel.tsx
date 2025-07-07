import { usePageStore } from "@/lib/store";

interface PreviewPanelProps {
  selectedPage: string;
}

export function PreviewPanel({ selectedPage }: PreviewPanelProps) {
  const pageHtml = usePageStore((state) => state.pages?.[selectedPage]);
  console.log("Selected:", selectedPage);
  console.log("HTML:", pageHtml);

  return (
    <div className="p-6">
      <iframe
        srcDoc={
          pageHtml || "<h2 style='text-align:center;'>No preview available</h2>"
        }
        className="w-full h-[600px] bg-white rounded-xl shadow border"
      />
    </div>
  );
}
