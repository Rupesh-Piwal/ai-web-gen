import { useEffect, useRef } from "react";
import { usePageStore } from "@/store/store";

interface PreviewPanelProps {
  selectedPage: string;
}

export function PreviewPanel({ selectedPage }: PreviewPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pageHtml = usePageStore((state) => state.pages?.[selectedPage]);

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

  return (
    <div className="p-6 space-y-4">
      <iframe
        ref={iframeRef}
        srcDoc={
          pageHtml || "<h2 style='text-align:center;'>No preview available</h2>"
        }
        className="w-full h-[600px] bg-white rounded-xl shadow border"
      />
    </div>
  );
}
