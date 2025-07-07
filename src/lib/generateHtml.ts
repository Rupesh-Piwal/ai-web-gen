import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function generateHtmlPages(description: string) {
  console.log("🟡 Generating pages for prompt:", description);

  try {
    const { text } = await generateText({
      model: google("models/gemini-1.5-flash"),
      prompt: `
You are an expert web designer.

Generate a JSON object containing 3 HTML pages for a website based on the following description:

"${description}"

Return the result as **valid JSON only**, with the following structure:

{
  "home": "<html>...</html>",
  "about": "<html>...</html>",
  "contact": "<html>...</html>"
}

Each HTML page must be fully self-contained (including minimal inline CSS).
No Markdown. No explanation.
ONLY return valid JSON.
`,
      temperature: 0.6,
    });

    console.log("🔵 Gemini raw text output:\n", text);

    const pages = JSON.parse(text);
    return pages;

  } catch (err) {
    console.error("❌ Error from Gemini generateText:", err);
    return {
      home: "<html><body><h1>Error</h1></body></html>",
      about: "<html><body><h1>Error</h1></body></html>",
      contact: "<html><body><h1>Error</h1></body></html>",
    };
  }
}
