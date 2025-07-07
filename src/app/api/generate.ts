

import { NextRequest, NextResponse } from "next/server";
import { generateHtmlPages } from "@/lib/generateHtml";

export async function POST(req: NextRequest) {
  const { description } = await req.json();

  const pages = await generateHtmlPages(description); 

  return NextResponse.json({ success: true });
}
