import { GoogleGenerativeAI } from '@google/generative-ai';

import type {
  Biomarkers,
  Finding,
  RecommendationItem,
  ReportAnalysis,
  RiskItem,
} from '@/lib/health-types';

const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

const analysisSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    healthScore: { type: 'integer', minimum: 0, maximum: 100 },
    summary: { type: 'string' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: { type: 'string' },
          value: { type: 'string' },
          referenceRange: { type: 'string' },
          status: { type: 'string', enum: ['normal', 'low', 'elevated'] },
          impact: { type: 'string' },
        },
        required: ['name', 'value', 'referenceRange', 'status', 'impact'],
      },
    },
    risks: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          category: { type: 'string' },
          level: { type: 'string', enum: ['low', 'moderate', 'high'] },
          findings: { type: 'string' },
        },
        required: ['category', 'level', 'findings'],
      },
    },
    recommendations: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          type: { type: 'string', enum: ['diet', 'lifestyle', 'medical_questions'] },
          title: { type: 'string' },
          description: { type: 'string' },
        },
        required: ['type', 'title', 'description'],
      },
    },
    biomarkers: {
      type: 'object',
      additionalProperties: false,
      properties: {
        bloodPressure: { type: ['string', 'null'] },
        cholesterol: { type: ['number', 'null'] },
        glucose: { type: ['number', 'null'] },
        heartRate: { type: ['number', 'null'] },
      },
      required: ['bloodPressure', 'cholesterol', 'glucose', 'heartRate'],
    },
  },
  required: ['healthScore', 'summary', 'findings', 'risks', 'recommendations', 'biomarkers'],
} as const;

const fallbackAnalysis: ReportAnalysis = {
  healthScore: 75,
  summary:
    'This is a demo analysis. In production mode, the AI will analyze your actual health report data and provide personalized insights based on the specific biomarkers and findings in your document.',
  findings: [
    {
      name: 'Sample Biomarker',
      value: 'Pending analysis',
      referenceRange: 'Refer to report',
      status: 'normal',
      impact:
        'This is a placeholder. The actual analysis will extract and interpret the specific biomarkers from your uploaded report.',
    },
  ],
  risks: [
    {
      category: 'General Health Assessment',
      level: 'low',
      findings:
        'Risk assessment will be based on the actual data extracted from your health report. This demo shows the structure of the analysis.',
    },
  ],
  recommendations: [
    {
      type: 'medical_questions',
      title: 'Consult your healthcare provider',
      description:
        'Always discuss your health reports with a qualified healthcare professional who can provide personalized medical advice.',
    },
  ],
  biomarkers: {
    bloodPressure: null,
    cholesterol: null,
    glucose: null,
    heartRate: null,
  },
};

export function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey.startsWith('your_')) {
    return null;
  }

  return new GoogleGenerativeAI(apiKey);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toStringValue(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function toNullableNumber(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function normalizeFinding(value: unknown): Finding | null {
  if (!isObject(value)) return null;
  const status = value.status;

  if (status !== 'normal' && status !== 'low' && status !== 'elevated') {
    return null;
  }

  return {
    name: toStringValue(value.name, 'Unnamed finding'),
    value: toStringValue(value.value, 'Not provided'),
    referenceRange: toStringValue(value.referenceRange, 'Not provided'),
    status,
    impact: toStringValue(value.impact, 'No explanation was provided.'),
  };
}

function normalizeRisk(value: unknown): RiskItem | null {
  if (!isObject(value)) return null;
  const level = value.level;

  if (level !== 'low' && level !== 'moderate' && level !== 'high') {
    return null;
  }

  return {
    category: toStringValue(value.category, 'General risk'),
    level,
    findings: toStringValue(value.findings, 'No additional details provided.'),
  };
}

function normalizeRecommendation(value: unknown): RecommendationItem | null {
  if (!isObject(value)) return null;
  const type = value.type;

  if (type !== 'diet' && type !== 'lifestyle' && type !== 'medical_questions') {
    return null;
  }

  return {
    type,
    title: toStringValue(value.title, 'Recommendation'),
    description: toStringValue(value.description, 'No description provided.'),
  };
}

function normalizeBiomarkers(value: unknown): Biomarkers {
  if (!isObject(value)) {
    return fallbackAnalysis.biomarkers;
  }

  return {
    bloodPressure: typeof value.bloodPressure === 'string' ? value.bloodPressure : null,
    cholesterol: toNullableNumber(value.cholesterol),
    glucose: toNullableNumber(value.glucose),
    heartRate: toNullableNumber(value.heartRate),
  };
}

export function normalizeAnalysis(value: unknown): ReportAnalysis {
  if (!isObject(value)) {
    return fallbackAnalysis;
  }

  const findings = Array.isArray(value.findings)
    ? value.findings.map(normalizeFinding).filter((item): item is Finding => item !== null)
    : [];
  const risks = Array.isArray(value.risks)
    ? value.risks.map(normalizeRisk).filter((item): item is RiskItem => item !== null)
    : [];
  const recommendations = Array.isArray(value.recommendations)
    ? value.recommendations
        .map(normalizeRecommendation)
        .filter((item): item is RecommendationItem => item !== null)
    : [];
  const healthScore =
    typeof value.healthScore === 'number' && Number.isFinite(value.healthScore)
      ? Math.max(0, Math.min(100, Math.round(value.healthScore)))
      : fallbackAnalysis.healthScore;

  return {
    healthScore,
    summary: toStringValue(value.summary, fallbackAnalysis.summary),
    findings: findings.length > 0 ? findings : fallbackAnalysis.findings,
    risks: risks.length > 0 ? risks : fallbackAnalysis.risks,
    recommendations:
      recommendations.length > 0 ? recommendations : fallbackAnalysis.recommendations,
    biomarkers: normalizeBiomarkers(value.biomarkers),
  };
}

export function getFallbackAnalysis() {
  return fallbackAnalysis;
}

export async function createReportAnalysis(
  genAI: GoogleGenerativeAI,
  reportText: string,
): Promise<ReportAnalysis> {
  const model = genAI.getGenerativeModel({ model: DEFAULT_MODEL });

  const prompt = `You are HealthGuard AI, a careful healthcare report explainer. Summarize only what the uploaded report supports. Do not diagnose. Use clear patient-friendly language.

Analyze the following healthcare report text and return a structured JSON response.

Report text:
${reportText}

Return a JSON object with this exact structure:
{
  "healthScore": number (0-100),
  "summary": "string - executive summary of the report",
  "findings": [
    {
      "name": "string - biomarker or test name",
      "value": "string - the measured value",
      "referenceRange": "string - normal range",
      "status": "normal" | "low" | "elevated",
      "impact": "string - what this means for health"
    }
  ],
  "risks": [
    {
      "category": "string - risk category",
      "level": "low" | "moderate" | "high",
      "findings": "string - explanation of risk"
    }
  ],
  "recommendations": [
    {
      "type": "diet" | "lifestyle" | "medical_questions",
      "title": "string - recommendation title",
      "description": "string - detailed recommendation"
    }
  ],
  "biomarkers": {
    "bloodPressure": string | null,
    "cholesterol": number | null,
    "glucose": number | null,
    "heartRate": number | null
  }
}

Important: Extract actual values from the report. Do not hardcode specific biomarkers like vitamin D or glucose unless they are present in the report. Adapt to whatever type of health report is uploaded (blood work, pathology, radiology, discharge summary, wellness report, prescription, diagnostic report, etc.).`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  
  // Extract JSON from response (Gemini may add markdown formatting)
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  const jsonString = jsonMatch ? jsonMatch[0] : responseText;
  
  return normalizeAnalysis(JSON.parse(jsonString));
}

export async function createReportChatReply(params: {
  analysis: ReportAnalysis;
  genAI: GoogleGenerativeAI;
  rawText: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
}) {
  const { analysis, genAI, rawText, messages } = params;
  const trimmedText = rawText.slice(0, 15000);

  const model = genAI.getGenerativeModel({ model: DEFAULT_MODEL });

  const conversationHistory = messages
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join('\n');

  const prompt = `You are HealthGuard AI, a calm and precise healthcare assistant. Answer using the uploaded report context only. Be plain-language, actionable, and honest about uncertainty. End with a short educational disclaimer.

Structured analysis context:
${JSON.stringify(analysis, null, 2)}

Extracted report text:
${trimmedText || 'No extracted report text available.'}

Conversation history:
${conversationHistory}

Please provide a helpful response to the user's last message.`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}
