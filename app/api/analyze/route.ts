import { NextResponse } from "next/server";
import {
  createReportAnalysis,
  getFallbackAnalysis,
  getGeminiClient,
} from "@/lib/health-ai";
import pdfParse from 'pdf-parse';

const MAX_RETURNED_TEXT = 15000;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
    }

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      return NextResponse.json(
        { error: "Only PDF files are supported." },
        { status: 400 }
      );
    }

    // Extract text from PDF
    let extractedText = '';
    let pdfParseError = null;
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      console.log(`[PDF Parse] File: ${file.name}, Size: ${(file.size / 1024).toFixed(2)} KB`);
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text || '';
      console.log(`[PDF Parse] Success. Extracted ${extractedText.length} characters`);
      console.log(`[PDF Parse] Pages: ${pdfData.numpages}`);
      console.log(`[PDF Parse] First 200 chars: "${extractedText.substring(0, 200)}"`);
    } catch (pdfError) {
      pdfParseError = pdfError;
      console.warn('[PDF Parse] Failed:', pdfError);
      extractedText = '';
    }
    
    // Determine if PDF has extractable text
    const hasExtractableText = extractedText.length > 50;
    const isImageBased = !hasExtractableText && !pdfParseError;
    
    console.log(`[PDF Parse] Has extractable text: ${hasExtractableText}`);
    console.log(`[PDF Parse] Likely image-based: ${isImageBased}`);
    
    const fileInfo = extractedText || `
File Name: ${file.name}
File Size: ${(file.size / 1024).toFixed(2)} KB
Type: PDF Health Report
${pdfParseError ? `Parse Error: ${pdfParseError instanceof Error ? pdfParseError.message : 'Unknown error'}` : ''}
${isImageBased ? 'Note: This PDF appears to be image-based (scanned document). OCR would be required to extract text.' : 'Note: Could not extract text from this PDF. The file may be corrupted.'}
The AI will analyze the file metadata instead.
`;

    const genAI = getGeminiClient();

    const analysis = genAI
      ? await createReportAnalysis(genAI, fileInfo)
      : getFallbackAnalysis();

    return NextResponse.json({
      success: true,
      demoMode: !genAI,
      fileName: file.name,
      extractedText: fileInfo.slice(0, MAX_RETURNED_TEXT),
      ...analysis,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Analysis processing failed.",
      },
      { status: 500 }
    );
  }
}