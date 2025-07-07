import { useEffect, useRef } from "react";
import { usePageStore } from "@/lib/store";

interface PreviewPanelProps {
  selectedPage: string;
}

export function PreviewPanel({ selectedPage }: PreviewPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pageHtml = usePageStore((state) => state.pages?.[selectedPage]);
  const updatePage = usePageStore((state) => state.setPage); 

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !pageHtml) return;

    const onLoad = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const editableTags = "h1,h2,h3,h4,h5,h6,p,span,a,li,td,th,button";
      doc.querySelectorAll(editableTags).forEach((el) => {
        el.setAttribute("contenteditable", "true");

        el.addEventListener("focus", () => {
          (el as HTMLElement).style.outline = "2px solid #3b82f6";
        });

        el.addEventListener("blur", () => {
          (el as HTMLElement).style.outline = "none";
        });
      });
    };

    iframe.addEventListener("load", onLoad);

    return () => {
      iframe.removeEventListener("load", onLoad);
    };
  }, [pageHtml]);

  const handleSave = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const editedHTML = iframe.contentDocument?.documentElement.outerHTML;

    if (editedHTML) {
      updatePage(selectedPage, editedHTML); 
      alert("Changes saved!");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <iframe
        ref={iframeRef}
        srcDoc={
          pageHtml || "<h2 style='text-align:center;'>No preview available</h2>"
        }
        className="w-full h-[600px] bg-white rounded-xl shadow border"
      />
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
}
