import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

// This is where the magic happens
export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();

    // Validate input
    if (!description || typeof description !== "string") {
      return NextResponse.json(
        { error: "Description is required and must be a string" },
        { status: 400 }
      );
    }

    const result = await generateText({
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
    });

    let jsonText = result.text.trim();

    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/, "").replace(/\n?```$/, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/, "").replace(/\n?```$/, "");
    }

    const jsonStart = jsonText.indexOf("{");
    const jsonEnd = jsonText.lastIndexOf("}") + 1;

    if (jsonStart === -1 || jsonEnd === 0) {
      throw new Error("No valid JSON object found in response");
    }

    jsonText = jsonText.slice(jsonStart, jsonEnd);

    const pages = JSON.parse(jsonText);

    const requiredPages = ["home", "about", "services", "contact"];
    const missingPages = requiredPages.filter(
      (page) => !pages[page] || typeof pages[page] !== "string"
    );

    if (missingPages.length > 0) {
      console.error("Missing or invalid pages:", missingPages);
      console.error("Received pages:", Object.keys(pages));
      console.error("Raw AI response:", result.text);

      missingPages.forEach((page) => {
        pages[page] = `<!DOCTYPE html><html><head><title>${
          page.charAt(0).toUpperCase() + page.slice(1)
        }</title></head><body><h1>${
          page.charAt(0).toUpperCase() + page.slice(1)
        } Page</h1><p>This page is under construction.</p></body></html>`;
      });

      console.log("Added fallback pages for:", missingPages);
    }

    return NextResponse.json(pages);
  } catch (err: any) {
    console.error("🔴 Error in /api/generate:", err?.message || err);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON response from AI model" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: err?.message || "Generation failed" },
      { status: 500 }
    );
  }
}
