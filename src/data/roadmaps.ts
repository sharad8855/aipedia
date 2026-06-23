import { AIRoadmap } from "../types";

export const aiRoadmaps: AIRoadmap[] = [
  {
    id: "ai-engineer",
    title: "AI Engineer Roadmap",
    description: "Master LLMs, fine-tuning, RAG, agents, and modern API-based application engineering.",
    duration: "12-18 Months",
    difficulty: "Intermediate",
    iconName: "Cpu",
    steps: [
      {
        id: "step1",
        title: "Python & Development Basics",
        description: "Achieve fluency in Python, basic computer architecture, git workflows, and working with APIs.",
        skills: ["Algorithms in Python", "JSON handling", "Command Line", "Git & GitHub", "REST APIs"],
        resources: [
          { title: "Python for Everybody Specialization (Coursera)", type: "course", url: "https://www.coursera.org/specializations/python" },
          { title: "Automate the Boring Stuff with Python", type: "book", url: "https://automatetheboringstuff.com/" }
        ]
      },
      {
        id: "step2",
        title: "LLM Foundational API Usage",
        description: "Learn how to prompt, configure parameters (temperature, top-p), and interact with APIs such as Gemini and OpenAI.",
        skills: ["Standard Prompting", "System Instructions", "Structured JSON Outputs", "Token Limits & Pricing"],
        resources: [
          { title: "ChatGPT Prompt Engineering for Developers (DeepLearning.AI)", type: "course", url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/" },
          { title: "Google Gemini API Quickstart Guide", type: "video", url: "https://ai.google.dev/gemini-api/docs" }
        ]
      },
      {
        id: "step3",
        title: "Retrieval-Augmented Generation (RAG)",
        description: "Introduce custom external context to prevent hallucinations and supply accurate internal data.",
        skills: ["Text Chunking Strategies", "Vector Embeddings", "Vector Databases (Chroma/Pinecone)", "Reranking"],
        resources: [
          { title: "Vector Databases: From Embeddings to Applications", type: "course", url: "https://www.deeplearning.ai/short-courses/vector-databases-embeddings-applications/" },
          { title: "Building RAG Engines with LangChain and LlamaIndex", type: "video", url: "https://www.youtube.com/" }
        ]
      },
      {
        id: "step4",
        title: "Orchestration & Coding Frameworks",
        description: "Glue APIs, tools, memory states, and workflows together seamlessly with LCEL and agents.",
        skills: ["LangChain", "LlamaIndex", "LangGraph", "Chains & Memory", "FastAPI Serving"],
        resources: [
          { title: "LangChain for LLM Application Development", type: "course", url: "https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/" },
          { title: "LangGraph Tutorial Series", type: "video", url: "https://langchain-ai.github.io/langgraph/" }
        ]
      },
      {
        id: "step5",
        title: "Autonomous AI Agents",
        description: "Transition standard LLM calls into self-directed systems capable of using tools and self-correction.",
        skills: ["ReAct pattern", "Tool Calling APIs", "Model Context Protocol (MCP)", "CrewAI / AutoGPT"],
        resources: [
          { title: "AI Agents in LangGraph (DeepLearning.AI)", type: "course", url: "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/" }
        ]
      },
      {
        id: "step6",
        title: "PEFT & Custom Models (Advanced)",
        description: "Learn how to specialize models using your personal datasets with highly efficient fine-tuning scripts.",
        skills: ["Fine-tuning Data Prep", "LoRA & QLoRA", "Hugging Face PEFT Library", "Quantization (GGUF)"],
        resources: [
          { title: "Fine-Tuning Large Language Models (Coursera/DeepLearning.AI)", type: "course", url: "https://www.deeplearning.ai/short-courses/finetuning-large-language-models/" }
        ]
      }
    ]
  },
  {
    id: "ml-engineer",
    title: "ML Engineer Roadmap",
    description: "Learn mathematical fundamentals, statistical models, deep learning, training pipelines, and GPU algorithms.",
    duration: "10-14 Months",
    difficulty: "Advanced",
    iconName: "TrendingUp",
    steps: [
      {
        id: "mlstep1",
        title: "Calculus & Linear Algebra",
        description: "Achieve deep mathematical intuition for derivatives, gradients, vectors, matrices, and eigenvalues.",
        skills: ["Matrix Multiplication", "Partial Derivatives", "Gradient Descent Math", "Probability Distributions"],
        resources: [
          { title: "Mathematics for Machine Learning (Imperial College London)", type: "course", url: "https://www.coursera.org/specializations/mathematics-machine-learning" }
        ]
      },
      {
        id: "mlstep2",
        title: "Classical Machine Learning",
        description: "Master regression, classification, clustering, tree models, and statistical features preprocessing.",
        skills: ["Scikit-Learn", "Linear & Logistic Regression", "Random Forests / XGBoost", "Supervised/Unsupervised Learning"],
        resources: [
          { title: "Machine Learning Specialization by Andrew Ng", type: "course", url: "https://www.coursera.org/specializations/machine-learning-introduction" }
        ]
      },
      {
        id: "mlstep3",
        title: "Deep Learning Foundations",
        description: "Understand artificial neural networks, backpropagation, and training architectures.",
        skills: ["PyTorch / TensorFlow", "Multi-Layer Perceptrons", "Backpropagation Math", "Activation Functions (ReLU/Softmax)"],
        resources: [
          { title: "Deep Learning Specialization (DeepLearning.AI)", type: "course", url: "https://www.coursera.org/specializations/deep-learning" }
        ]
      },
      {
        id: "mlstep4",
        title: "Transformer & Generative NLP Architectures",
        description: "Deconstruct self-attention mechanics and program Transformers from scratch in PyTorch.",
        skills: ["Self-Attention Math", "Multi-Head Attention Layers", "Positional Encodings (RoPE)", "Causal and Masked LM Pretraining"],
        resources: [
          { title: "Andrej Karpathy's Neural Networks: Zero to Hero", type: "video", url: "https://karpathy.ai/zero-to-hero.html" },
          { title: "Attention Is All You Need Paper", type: "book", url: "https://arxiv.org/abs/1706.03762" }
        ]
      },
      {
        id: "mlstep5",
        title: "LLM Fine-Tuning, Alignment, & Merging",
        description: "Train open-weights models to adopt specific instructions and style profiles without destructive interference.",
        skills: ["Supervised Fine-Tuning (SFT)", "LoRA / QLoRA Matrices", "Direct Preference Optimization (DPO)", "Model Merging / Swarm Optimization"],
        resources: [
          { title: "Hugging Face Fine-Tuning Guides", type: "course", url: "https://huggingface.co/docs/peft/index" }
        ]
      }
    ]
  },
  {
    id: "data-scientist",
    title: "Data Scientist Roadmap",
    description: "Focus on data mining, exploratory analysis, hypothesis testing, visualization, and SQL databases.",
    duration: "8-12 Months",
    difficulty: "Beginner to Advanced",
    iconName: "BarChart3",
    steps: [
      {
        id: "dsstep1",
        title: "Data Manipulation Libraries",
        description: "Gain speed parsing, filtering, grouping, and cleaning tabular data files.",
        skills: ["Pandas", "NumPy", "Jupyter Notebooks", "Data Imputation"],
        resources: [
          { title: "Python for Data Analysis by Wes McKinney", type: "book", url: "https://wesmckinney.com/book/" }
        ]
      },
      {
        id: "dsstep2",
        title: "Exploratory Data Analysis (EDA) & Statistics",
        description: "Uncover patterns, check hypotheses, and model data distributions mathematically.",
        skills: ["Hypothesis Testing", "A/B Testing Experiments", "Confidence Intervals", "Seaborn / Matplotlib Visualizations"],
        resources: [
          { title: "Introduction to Modern Statistics (OpenIntro)", type: "book", url: "https://openintro-ims.netlify.app/" }
        ]
      },
      {
        id: "dsstep3",
        title: "Advanced SQL & Query Optimization",
        description: "Query and join massive databases through complex and clean SQL queries.",
        skills: ["Window Functions (PARTITION BY)", "Recursive CTEs", "Index Optimizations", "BigQuery / Snowflake Platforms"],
        resources: [
          { title: "Mode Analytics: SQL Training Guide", type: "course", url: "https://mode.com/sql-tutorial/" }
        ]
      },
      {
        id: "dsstep4",
        title: "Predictive Modeling & Explainability",
        description: "Build robust classification, forecasting, and regression pipelines that can be audited for feature importance.",
        skills: ["XGBoost / LightGBM", "Cross-Validation & GridSearch", "SHAP / LIME Explanations", "Time Series Forecasting (Prophet)"],
        resources: [
          { title: "Applied Predictive Modeling (Kuhn & Johnson)", type: "book", url: "http://appliedpredictivemodeling.com/" }
        ]
      }
    ]
  },
  {
    id: "prompt-engineer",
    title: "Prompt Engineer Roadmap",
    description: "Discover non-coding or low-coding systematic ways to design perfect instruction sets for complex objectives.",
    duration: "4-6 Months",
    difficulty: "Beginner",
    iconName: "PenTool",
    steps: [
      {
        id: "pestep1",
        title: "Advanced Prompt Strategies",
        description: "Go beyond unstructured prompts. Master systematic techniques that increase accuracy and safety.",
        skills: ["Few-Shot Prompting", "Chain-of-Thought (CoT)", "Self-Consistency", "System Prompt Security"],
        resources: [
          { title: "PromptingGuide.ai by DAIR.AI", type: "course", url: "https://www.promptingguide.ai/" }
        ]
      },
      {
        id: "pestep2",
        title: "Structured Output Constraints & Schemas",
        description: "Force models to format answers into valid program-readable formats like JSON and XML consistently.",
        skills: ["JSON Schema Specifications", "XML Tag Boundaries", "Pydantic State Declarations", "Few-Shot JSON Prompting"],
        resources: [
          { title: "Vercel AI SDK: Structured Outputs Guide", type: "course", url: "https://sdk.vercel.ai/docs/ai-sdk-core/generating-structured-data" }
        ]
      },
      {
        id: "pestep3",
        title: "Adversarial Red-Teaming & Guardrails",
        description: "Identify vulnerabilities in prompts and create defensive shields that block jailbreaks and leakages.",
        skills: ["Prompt Injection Prevention", "Indirect Injection Shielding", "Dual-LLM Guard Configurations", "Output Moderation APIs"],
        resources: [
          { title: "OWASP Top 10 for LLM Applications", type: "book", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/" }
        ]
      }
    ]
  },
  {
    id: "genai-architect",
    title: "Generative AI Architect Roadmap",
    description: "Design enterprise-grade AI backends focused on high scalability, low latency, custom caching, and extreme reliability.",
    duration: "14-20 Months",
    difficulty: "Super Advanced",
    iconName: "Network",
    steps: [
      {
        id: "archstep1",
        title: "Optimized Serving & Inference Pipelines",
        description: "Deploy and optimize foundation servers for maximum concurrent consumer bandwidth.",
        skills: ["vLLM / TensorRT-LLM Serving Engines", "Continuous Batching Math", "PagedAttention Algorithms", "Quantized Weights (AWQ/GGUF) Deployment"],
        resources: [
          { title: "vLLM Documentation & Scaling Guides", type: "course", url: "https://docs.vllm.ai/" }
        ]
      },
      {
        id: "archstep2",
        title: "Advanced Cognitive Flow Orchestration",
        description: "Develop robust multi-step agent graphs that recover safely when API targets time out.",
        skills: ["State Graph Design (LangGraph)", "Agentic Hand-offs", "Message History Caching", "Self-Correction & Refinement Loops"],
        resources: [
          { title: "LangGraph Academy Tutorials", type: "video", url: "https://academy.langchain.com/" }
        ]
      },
      {
        id: "archstep3",
        title: "AI Infrastructure Cost & Speed Analytics",
        description: "Reduce GPU bills by caching prompts semantically and routing requests to the cheapest capable model.",
        skills: ["Semantic Prompt Caching (GPTCache)", "Dynamic Model Routers", "Token Volume Rate Limiting", "GPU Memory Management"],
        resources: [
          { title: "FrugalGPT: Cost-Effective LLM Architectures", type: "book", url: "https://arxiv.org/abs/2305.05176" }
        ]
      }
    ]
  }
];
