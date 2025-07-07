export async function generateHtmlPages(
  description: string
): Promise<Record<string, string>> {
  const pages = ["Home", "About", "Contact"];

  const htmlByPage: Record<string, string> = {};

  for (const page of pages) {
    const prompt = `Generate a complete HTML + inline CSS page for a '${page}' of a website described as: ${description}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    const html =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      `<html><body>Error</body></html>`;
    htmlByPage[page.toLowerCase()] = html;
  }

  return htmlByPage;
}
