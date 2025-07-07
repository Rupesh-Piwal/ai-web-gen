import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function generateHtmlPages(description: string) {
  console.log("🟡 Generating pages for prompt:", description);

  try {
    const { text } = await generateText({
      model: google("models/gemini-1.5-flash"),
      prompt: `You are a professional full-stack web developer AI.

Based on the following website description, generate 4 fully-designed and visually appealing HTML pages: Home, About, Services, and Contact.

Description:
"${description}"

Requirements:
- The website should look **modern, clean, and professional**.
- Use **inline CSS styles** inside the <style> tag for layout, fonts, colors, spacing, buttons, etc.
- Each page must have:
  - A consistent header with the site name and navigation links to all 4 pages.
  - A visually distinct hero section on the home page.
  - A styled content section for About, Services, and Contact.
  - A styled footer at the bottom.
- Use a **modern Google Font**.
- Use proper semantic HTML: <header>, <nav>, <main>, <section>, <footer>.
- Make layout responsive (mobile-friendly) with CSS media queries.
- Feel free to use modern UI patterns like cards, grids, buttons, etc.

Return ONLY a valid JSON object in this exact format:
{
  "home": "<!DOCTYPE html>...full HTML for Home...",
  "about": "<!DOCTYPE html>...full HTML for About...",
  "services": "<!DOCTYPE html>...full HTML for Services...",
  "contact": "<!DOCTYPE html>...full HTML for Contact..."
}

Important:
- Do NOT include markdown formatting.
- Do NOT include explanations.
- Do NOT leave any page blank.
- Each page must be full standalone HTML.
- Focus on clean UX, consistency, and basic aesthetics.`,
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
