import { ResourceItem } from "../types";

export const resourceItems: ResourceItem[] = [
  // Free Courses
  {
    title: "DeepLearning.AI Short Courses",
    description: "Incredibly high-quality bite-sized lessons taught by Andrew Ng and industry leaders on Prompting, RAG, LangChain, and Agents.",
    category: "course",
    url: "https://www.deeplearning.ai/short-courses/",
    tags: ["Prompting", "Agents", "LangChain"],
    cost: "Free",
    rating: "4.9/5"
  },
  {
    title: "Fast.ai: Practical Deep Learning for Coders",
    description: "The absolute best hands-on introduction to training neural networks without requiring a math PhD upfront.",
    category: "course",
    url: "https://course.fast.ai/",
    tags: ["PyTorch", "Deep Learning", "CNNs"],
    cost: "Free",
    rating: "4.9/5"
  },
  {
    title: "Hugging Face NLP Course",
    description: "Learn how to use datasets, tokenizers, and transformers libraries to train or fine-tune models from scratch.",
    category: "course",
    url: "https://huggingface.co/learn/nlp-course",
    tags: ["Hugging Face", "Transformers", "Fine-Tuning"],
    cost: "Free",
    rating: "4.8/5"
  },
  // Datasets
  {
    title: "Llama-Dataset on HuggingFace",
    description: "Pre-formatted chat instruction datasets commonly used to fine-tune open language models.",
    category: "dataset",
    url: "https://huggingface.co/datasets",
    tags: ["Instruct", "JSON", "Fine-Tuning"],
    cost: "Free",
    rating: "4.7/5"
  },
  {
    title: "Kaggle Machine Learning Repository",
    description: "The ultimate hub of thousands of clean, real-world spreadsheet tables, images, and texts for model practice.",
    category: "dataset",
    url: "https://www.kaggle.com/datasets",
    tags: ["Tabular", "Computer Vision", "Analytics"],
    cost: "Free",
    rating: "4.7/5"
  },
  // GitHub Repositories
  {
    title: "LangChain (GitHub)",
    description: "The primary orchestrator pipeline to connect language models with external tool bindings and document chains.",
    category: "github",
    url: "https://github.com/langchain-ai/langchain",
    tags: ["SDK", "Python", "Tooling"],
    cost: "Open Source",
    rating: "5.0/5"
  },
  {
    title: "AutoGPT (GitHub)",
    description: "An experimental open-source helper showcasing the capability of autonomous agent loops.",
    category: "github",
    url: "https://github.com/Significant-Gravitas/AutoGPT",
    tags: ["Agents", "Automation"],
    cost: "Open Source",
    rating: "4.6/5"
  },
  // Research Papers
  {
    title: "Attention Is All You Need (Transformer foundation)",
    description: "The absolute Bible of modern Generative AI. Introduced self-attention mechanisms that replaced old RNN loops.",
    category: "paper",
    url: "https://arxiv.org/abs/1706.03762",
    tags: ["Transformer", "Self-Attention", "Core Math"],
    cost: "Free",
    rating: "5.0/5"
  },
  {
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    description: "The primary research proving that joining dense retrievers with generators halts hallucination.",
    category: "paper",
    url: "https://arxiv.org/abs/2005.11401",
    tags: ["RAG", "Dense Search"],
    cost: "Free",
    rating: "4.8/5"
  },
  {
    title: "Andrej Karpathy's Neural Networks: Zero to Hero (YouTube)",
    description: "The absolute best video lecture series for programmers who want to build GPT models, backprop layers, and tokenizers step-by-step from scratch in pure Python/PyTorch.",
    category: "youtube",
    url: "https://www.youtube.com/@karpathy",
    tags: ["Core Math", "Transformers", "PyTorch"],
    cost: "Free",
    rating: "5.0/5"
  },
  {
    title: "3Blue1Brown: Neural Networks Sequence (YouTube)",
    description: "Incredibly geometric visual breakdowns of neural networks, backpropagation, gradient descent, and the internal machinery of Transformers.",
    category: "youtube",
    url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
    tags: ["Deep Learning", "Math Visuals"],
    cost: "Free",
    rating: "5.0/5"
  },
  {
    title: "Direct Preference Optimization Paper (DPO)",
    description: "The seminal Stanford paper showing how to align LLMs with human preferences directly using text pair classification without a reward model.",
    category: "paper",
    url: "https://arxiv.org/abs/2305.18290",
    tags: ["DPO", "Reinforcement Learning", "Alignment"],
    cost: "Free",
    rating: "4.9/5"
  },
  {
    title: "Ollama (GitHub)",
    description: "Get large language models up and running locally on macOS, Linux, and Windows with a single command—highly optimized using llama.cpp.",
    category: "github",
    url: "https://github.com/ollama/ollama",
    tags: ["Local LLM", "Inference", "Docker-Style"],
    cost: "Open Source",
    rating: "4.9/5"
  },
  {
    title: "Hugging Face Hub Community",
    description: "The global social space for AI: collaborate, discover, host and run thousands of open-weights models, datasets, and web apps.",
    category: "community",
    url: "https://huggingface.co/",
    tags: ["AI Hub", "Open Weights", "Spaces"],
    cost: "Free",
    rating: "4.9/5"
  },
  {
    title: "Reddit LocalLLaMA Subreddit",
    description: "The primary community discussing local open-weights LLMs: hardware builds, token optimizations, quantization formats (GGUF/exl2), and model comparisons.",
    category: "community",
    url: "https://www.reddit.com/r/LocalLLaMA/",
    tags: ["Forums", "Local LLMs", "Hardware Setup"],
    cost: "Free",
    rating: "4.8/5"
  },
  {
    title: "vLLM: High-Throughput Serving Engine",
    description: "A fast and easy-to-use library for LLM inference and serving, leveraging PagedAttention to maximize GPU hardware memory bandwidth.",
    category: "github",
    url: "https://github.com/vllm-project/vllm",
    tags: ["vLLM", "Serving", "Latency Reduction"],
    cost: "Open Source",
    rating: "4.9/5"
  }
];
