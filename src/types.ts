export interface AITerm {
  id: string; // e.g. "rag", "mcp"
  name: string;
  category: string; // e.g. "RAG", "LLM", "Agents", "AI Basics", "ML"
  shortDesc: string;
  definition: string;
  explanation: string;
  example: string;
  useCases: string[];
  advantages: string[];
  disadvantages: string[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  relatedTerms: string[]; // ids of other terms
  references: {
    title: string;
    url: string;
  }[];
}

export interface InterviewQuestion {
  id: string;
  category: string; // Python, Machine Learning, Deep Learning, LLM, etc.
  question: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  beginnerAnswer: string;
  intermediateAnswer: string;
  advancedAnswer: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  skills: string[];
  resources: { title: string; type: "course" | "book" | "video"; url: string }[];
}

export interface AIRoadmap {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  iconName: string;
  steps: RoadmapStep[];
}

export interface CheatSheetSection {
  title: string;
  items: {
    command?: string;
    code?: string;
    desc: string;
    explanation?: string;
  }[];
}

export interface CheatSheet {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: string;
  sections: CheatSheetSection[];
}

export interface AIModel {
  name: string;
  developer: string;
  pricing: string; // e.g. "$2 / 1M input"
  contextWindow: string; // e.g. "128K"
  codingScore: number; // e.g. 92
  reasoningScore: number; // e.g. 95
  visionSupport: boolean;
  apiAvailability: boolean;
  bestFor: string;
  description: string;
}

export interface ResourceItem {
  title: string;
  description: string;
  category: "course" | "dataset" | "github" | "paper" | "youtube" | "community";
  url: string;
  tags: string[];
  rating?: string;
  cost?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string; // markdown or clean paragraphs
  category: string;
  readTime: string;
  author: string;
  date: string;
  image?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
