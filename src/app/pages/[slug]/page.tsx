import { getPage } from "@/lib/siteStore";

export default function PageViewer({ params }: { params: { slug: string } }) {
  const html = getPage(params.slug);

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Preview: {params.slug.charAt(0).toUpperCase() + params.slug.slice(1)}
      </h1>
      <iframe srcDoc={html} className="w-full h-[600px] border" />
    </main>
  );
}
