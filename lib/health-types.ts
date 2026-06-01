export type FindingStatus = 'normal' | 'low' | 'elevated';
export type RiskLevel = 'low' | 'moderate' | 'high';
export type RecommendationType = 'diet' | 'lifestyle' | 'medical_questions';

export interface Finding {
  name: string;
  value: string;
  referenceRange: string;
  status: FindingStatus;
  impact: string;
}

export interface RiskItem {
  category: string;
  level: RiskLevel;
  findings: string;
}

export interface RecommendationItem {
  type: RecommendationType | string;
  title: string;
  description: string;
}

export interface Biomarkers {
  bloodPressure: string | null;
  cholesterol: number | null;
  glucose: number | null;
  heartRate: number | null;
}

export interface ReportAnalysis {
  healthScore: number;
  summary: string;
  findings: Finding[];
  risks: RiskItem[];
  recommendations: RecommendationItem[];
  biomarkers: Biomarkers;
}

export interface AnalyzeResponse extends ReportAnalysis {
  success: true;
  demoMode: boolean;
  fileName: string;
  extractedText: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
