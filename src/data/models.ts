import { AIModel } from "../types";

export const aiModels: AIModel[] = [
  {
    name: "Claude 3.7 Sonnet",
    developer: "Anthropic",
    pricing: "$3.00 / 1M input, $15.00 / 1M output",
    contextWindow: "200,000",
    codingScore: 98.2,
    reasoningScore: 97.8,
    visionSupport: true,
    apiAvailability: true,
    bestFor: "Advanced full-stack auto-coding, hybrid reasoning, self-debugging loops, recursive agents",
    description: "Anthropic's 2025/2026 flagship model. Combines ultra-advanced coding with hybrid, user-configurable internal thinking budgets, setting top board ranks across agentic execution benchmarks."
  },
  {
    name: "OpenAI o1",
    developer: "OpenAI",
    pricing: "$15.00 / 1M input, $60.00 / 1M output",
    contextWindow: "200,000",
    codingScore: 96.7,
    reasoningScore: 98.8,
    visionSupport: true,
    apiAvailability: true,
    bestFor: "Complex mathematical modeling, competitive coding, structural physics and biology synthesis",
    description: "OpenAI's premium reinforcement-learned reasoning model. Utilizes advanced hidden chains of thought to plan, test edge cases, and self-correct prior to returning the final output."
  },
  {
    name: "Gemini 2.0 Pro",
    developer: "Google",
    pricing: "$1.50 / 1M input, $5.00 / 1M output",
    contextWindow: "2,097,152",
    codingScore: 95.8,
    reasoningScore: 96.5,
    visionSupport: true,
    apiAvailability: true,
    bestFor: "Massive code repository refactoring, multi-hour native high-res video audits, multi-file software pipelines",
    description: "Google's premium long-context orchestrator. Features a massive 2.1-million token context window, natively absorbing entire legacy code repositories or databases in a single sweep."
  },
  {
    name: "OpenAI o3-mini",
    developer: "OpenAI",
    pricing: "$1.10 / 1M input, $4.40 / 1M output",
    contextWindow: "200,000",
    codingScore: 96.2,
    reasoningScore: 95.5,
    visionSupport: false,
    apiAvailability: true,
    bestFor: "Speed-intensive automated software developers, high-integrity structural JSON schemas, tool-use coordination",
    description: "OpenAI's specialized low-latency reasoning model. Strikes an outstanding balance between deep analytical thinking speeds, cost-efficiency, and flawless API execution."
  },
  {
    name: "DeepSeek-R1",
    developer: "DeepSeek",
    pricing: "$0.55 / 1M input, $2.19 / 1M output",
    contextWindow: "128,000",
    codingScore: 94.3,
    reasoningScore: 97.8,
    visionSupport: false,
    apiAvailability: true,
    bestFor: "Academically rigorous algorithms, open-reasoning tracing research, hyper-budget science analysis",
    description: "The ground-breaking open-weights reasoning sensation. Exposes its full, authentic internal thinking tokens directly in the API stream, equaling proprietary models at a 90% discount."
  },
  {
    name: "Gemini 2.0 Flash",
    developer: "Google",
    pricing: "$0.075 / 1M input, $0.30 / 1M output",
    contextWindow: "1,048,576",
    codingScore: 90.5,
    reasoningScore: 89.8,
    visionSupport: true,
    apiAvailability: true,
    bestFor: "Ultra-low latency production agents, high-frequency context crawling, massive multimedia workloads",
    description: "Google's 2.0 generation cost-to-performance champion. Provides a vast 1M context window, high-density audio/video analysis, and incredible speech processing speeds at negligible costs."
  },
  {
    name: "DeepSeek-V3",
    developer: "DeepSeek",
    pricing: "$0.14 / 1M input, $0.28 / 1M output",
    contextWindow: "128,000",
    codingScore: 92.8,
    reasoningScore: 91.2,
    visionSupport: false,
    apiAvailability: true,
    bestFor: "Extreme daily conversational pipelines, bulk content generation, high-accuracy classification",
    description: "The absolute standard-bearer for low-cost conversational intelligence, leveraging highly optimized Mixture-of-Experts (MoE) hardware routing for rapid, precise replies."
  },
  {
    name: "GPT-4o",
    developer: "OpenAI",
    pricing: "$2.50 / 1M input, $10.00 / 1M output",
    contextWindow: "128,000",
    codingScore: 92.5,
    reasoningScore: 91.0,
    visionSupport: true,
    apiAvailability: true,
    bestFor: "Standard enterprise chatbots, low-flicker live audio translation, robust multiversal API orchestration",
    description: "OpenAI's benchmark multimodal workhorse, renowned globally for reliable multi-party chat operations, precise structured extraction, and mature API infrastructure."
  },
  {
    name: "Llama 3.3 70B Instruct",
    developer: "Meta",
    pricing: "Free (Local / Open Weights)",
    contextWindow: "128,000",
    codingScore: 90.2,
    reasoningScore: 91.5,
    visionSupport: false,
    apiAvailability: true,
    bestFor: "Proprietary offline fine-tuning, high-security on-prem deployments, independent open workflows",
    description: "Meta's highly popular open-weights masterpiece. Packs highly advanced alignment and complex reasoning into a moderately-sized model suitable for local container deployments."
  },
  {
    name: "Claude 3.5 Haiku",
    developer: "Anthropic",
    pricing: "$0.80 / 1M input, $4.00 / 1M output",
    contextWindow: "200,000",
    codingScore: 89.0,
    reasoningScore: 88.0,
    visionSupport: false,
    apiAvailability: true,
    bestFor: "Speed-focused code autocompletion, natural agent dialogue transitions, rapid query categorization",
    description: "Anthropic's high-speed alternative, delivering unmatched linguistic precision and advanced multi-step function calling capabilities at a compact pricing scale."
  }
];
