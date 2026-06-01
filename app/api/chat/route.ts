import { NextResponse } from 'next/server';

import {
  createReportChatReply,
  getFallbackAnalysis,
  getGeminiClient,
  normalizeAnalysis,
} from '@/lib/health-ai';
import type { ChatMessage } from '@/lib/health-types';

interface ChatRequestBody {
  analysis?: unknown;
  messages?: ChatMessage[];
  rawText?: string;
}

function getMockChatResponse(userMessage: string) {
  const query = userMessage.toLowerCase();

  if (query.includes('simple') || query.includes('explain')) {
    return 'In simple terms, the report mostly points to low vitamin D and mildly elevated glucose. The rest of the major markers look more reassuring. This is educational information only, so please review it with your clinician before acting on it.';
  }

  if (query.includes('concern')) {
    return 'The main concern is the abnormal result that is furthest from the normal range, followed by any early metabolic warning signs like elevated fasting glucose. This is educational information only, so please review it with your clinician before acting on it.';
  }

  if (query.includes('doctor')) {
    return 'A good next question for your doctor is which findings need repeat testing, which lifestyle changes matter most, and whether any result needs urgent follow-up. This is educational information only, so please review it with your clinician before acting on it.';
  }

  return 'I can help explain the report, point out the most concerning findings, suggest lifestyle questions to discuss, or translate it into plain language. This is educational information only, so please review it with your clinician before acting on it.';
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody;

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json({ error: 'Invalid conversational messages array.' }, { status: 400 });
    }

    const genAI = getGeminiClient();

    if (!genAI) {
      const lastUserMessage = body.messages[body.messages.length - 1]?.content || '';
      return NextResponse.json({
        success: true,
        content: getMockChatResponse(lastUserMessage),
        demoMode: true,
      });
    }

    const reply = await createReportChatReply({
      analysis: normalizeAnalysis(body.analysis ?? getFallbackAnalysis()),
      genAI,
      rawText: typeof body.rawText === 'string' ? body.rawText : '',
      messages: body.messages,
    });

    return NextResponse.json({
      success: true,
      content: reply || 'I could not synthesize a response. Please try again.',
      demoMode: false,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Chat response generation failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
