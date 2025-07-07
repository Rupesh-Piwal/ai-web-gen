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
      prompt: `You are a helpful web developer AI. 
Generate HTML pages for a small website based on the following description: "${description}"

You must create exactly 4 pages: home, about, services, and contact.

Return ONLY a valid JSON object with this exact structure:
{
  "home": "<!DOCTYPE html><html><head><title>Home</title></head><body><h1>Home Page</h1></body></html>",
  "about": "<!DOCTYPE html><html><head><title>About</title></head><body><h1>About Page</h1></body></html>",
  "services": "<!DOCTYPE html><html><head><title>Services</title></head><body><h1>Services Page</h1></body></html>",
  "contact": "<!DOCTYPE html><html><head><title>Contact</title></head><body><h1>Contact Page</h1></body></html>"
}

Rules:
- Return ONLY the JSON object
- No markdown code blocks
- No explanatory text
- All 4 pages must be present
- Each page must be complete HTML`,
    });

    // Better JSON extraction
    let jsonText = result.text.trim();

    // Remove markdown code blocks if present
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/, "").replace(/\n?```$/, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/, "").replace(/\n?```$/, "");
    }

    // Find JSON object boundaries
    const jsonStart = jsonText.indexOf("{");
    const jsonEnd = jsonText.lastIndexOf("}") + 1;

    if (jsonStart === -1 || jsonEnd === 0) {
      throw new Error("No valid JSON object found in response");
    }

    jsonText = jsonText.slice(jsonStart, jsonEnd);

    // Parse and validate JSON
    const pages = JSON.parse(jsonText);

    // Validate that we have the expected structure
    const requiredPages = ["home", "about", "services", "contact"];
    const missingPages = requiredPages.filter(
      (page) => !pages[page] || typeof pages[page] !== "string"
    );

    if (missingPages.length > 0) {
      console.error("Missing or invalid pages:", missingPages);
      console.error("Received pages:", Object.keys(pages));
      console.error("Raw AI response:", result.text);

      // Create fallback pages for missing ones
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

    // More specific error handling
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
