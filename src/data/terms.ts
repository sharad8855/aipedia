import { AITerm } from "../types";

export const aiTerms: AITerm[] = [
  {
    id: "rag",
    name: "Retrieval-Augmented Generation (RAG)",
    category: "RAG",
    shortDesc: "Primes an LLM with relevant knowledge retrieved from an external database before generating responses.",
    definition: "Retrieval-Augmented Generation (RAG) is a technique that combines an information retrieval system with a generative large language model. By fetching relevant data from a vector search database containing private or domain-specific documents, RAG injects specific facts or context dynamically into the prompt to ground the LLM's answers.",
    explanation: "Think of an LLM as a student going into an open-book exam. In a closed-book style (standard LLM), the student relies solely on memory. If you ask about something they never studied (or happened post-training), they might guess incorrectly (hallucinate). With RAG, when you ask a question, an assistant runs to the library first, pulls out 3 relevant pages of documents, places them in front of the student, and says: 'Read these three pages to answer the question.' The student (LLM) reads the precise pages and writes a highly accurate, citation-backed answer. This keeps the LLM's answer grounded and up-to-date without expensive re-training.",
    example: "A customer support bot for a new smartphone. Instead of retuning deep neural networks to learn the phone's manual, the smartphone manual is split into chunks, embedded into a vector database, and when a user asks 'How do I insert the SIM card?', the backend searches the database for 'SIM card insertion' passages, sends the extracted manual paragraphs to Gemini, and Gemini outputs a clear, correct instruction.",
    useCases: [
      "Enterprise Private Knowledge Search (answering internal policy questions)",
      "Customer Support Systems (answering troubleshooting queries with user manuals)",
      "Legal and Compliance Document Analysis (finding case laws and legal summaries)",
      "Financial Report Analysis (extracting real-time statistics from SEC filings)"
    ],
    advantages: [
      "Prevents Hallucinations: Grounds statements in actual private reference files.",
      "Cost-Efficient: Hundreds of times cheaper than continuous fine-tuning or full model training.",
      "Immediate Updates: Just delete or add new documents to the database to update the bot's knowledge instantly.",
      "Citations Support: Allows the model to point to specific sources (e.g., 'Source: Page 14 of Manual')."
    ],
    disadvantages: [
      "Latency Overhead: Adds a retrieval search step before the LLM can begin writing, which can slow down real-time chat.",
      "Chunking Sensitivity: Badly segmented text chunks can lead to missing context or jagged, incomplete answers.",
      "Embedding Model Dependence: If the search embedding model cannot find the right context, the generation step gets bad context."
    ],
    interviewQuestions: [
      {
        question: "How does RAG differ from Fine-Tuning?",
        answer: "RAG is like an open-book exam; it injects factual context into the prompt dynamically without changing the model's weights. Fine-tuning is like studying for a closed-book exam; it alters the model's internal weights to adapt the style, tone, task behavior, or specialize in domain-specific terminology."
      },
      {
        question: "What is 'lost in the middle' in the context of RAG?",
        answer: "LLMs tend to pay more attention to the very beginning and very end of their input context window. If you retrieve and pack a large number of context documents (e.g., 20 documents) into a prompt, the most relevant information might end up in the middle of the prompt, and the model might overlook it. This is solved by using Rerankers to prioritize high-relevance chunks."
      }
    ],
    relatedTerms: ["vector_database", "embedding", "llm"],
    references: [
      { title: "Meta AI's original RAG Research Paper (Lewis et al.)", url: "https://arxiv.org/abs/2005.11401" },
      { title: "Pinecone's Learning Hub on RAG Systems", url: "https://www.pinecone.io/learn/retrieval-augmented-generation/" }
    ]
  },
  {
    id: "mcp",
    name: "Model Context Protocol (MCP)",
    category: "Agents",
    shortDesc: "An open standard that connects LLMs to external data sources, developer tools, and APIs securely.",
    definition: "Model Context Protocol (MCP) is an open-standard architecture initiated by Anthropic that provides a uniform way for client applications (like IDEs or AI Assistants) to expose secure data sources, tools, and prompts to generative models.",
    explanation: "Before MCP, if you wanted an AI assistant to check your local files, query a Postgres database, edit GitHub repositories, or search Slack, developers had to write custom, ad-hoc integrations for every single API. It was messy and duplicated. MCP introduces a standard client-server architecture. An AI app acts as the client, and various local or remote servers expose data/tools via a standardized JSON-RPC protocol over stdio or SSE. Now, any AI model that supports MCP can universally access any database, environment, or web tool that possesses an MCP connector, acting as a universal USB plug for artificial intelligence.",
    example: "An engineer using cursor or Claude Desktop wants the AI to read a Postgres database schema. Instead of writing custom SQL connectors inside Claude Desktop, a Postgres MCP server is started. The client connects to it, and Claude automatically discovers tools like 'run-query', 'list-tables', and 'get-schema' and can query the database directly in plain English.",
    useCases: [
      "Connecting local IDE AI assistants directly to local Git terminal tools and folder compilers.",
      "Letting chatbots parse browser tabs, bookmark databases, or run local shell scripts safely through sandboxed servers.",
      "Standardizing third-party APIs (Slack, Google Drive, Jira) so an AI can utilize them out-of-the-box."
    ],
    advantages: [
      "Universal Integration: Implement a connector once, use it on any LLM/IDE client that respects MCP.",
      "Clear Security Boundaries: Servers run locally or on explicitly defined configurations, giving developers control over what the AI can read/write.",
      "Discoverability: The LLM client automatically queries the MCP server features is dynamically told what tools are available."
    ],
    disadvantages: [
      "Pioneer Phase: Relative newness means not all models or platforms support the standard native protocols yet.",
      "Config Complexity: Setting up local JSON configuration servers might feel daunting for non-technical users.",
      "Connection Latency: Communication across intermediate JSON-RPC wrappers can add minor overhead."
    ],
    interviewQuestions: [
      {
        question: "Explain the role of Client and Server in MCP architecture.",
        answer: "The MCP Server connects to the actual resource (like a database, filesystem, or web API) and exposes standard capabilities: Prompts, Resources (read-only documents), and Tools (executable functions). The MCP Client is the AI application (e.g., Claude Desktop, IDE) that discovers these capabilities and prompts the LLM to write payloads or call tools based on user inputs."
      }
    ],
    relatedTerms: ["agent", "llm"],
    references: [
      { title: "Anthropic Model Context Protocol Documentation", url: "https://modelcontextprotocol.org/" },
      { title: "GitHub Repository for MCP SDKs", url: "https://github.com/modelcontextprotocol" }
    ]
  },
  {
    id: "embedding",
    name: "Vector Embeddings",
    category: "AI Basics",
    shortDesc: "Numerical representations of words, images, or documents that capture their semantic meaning.",
    definition: "Vector Embeddings are dense, low-dimensional mathematically structured arrays of real numbers generated by neural networks. They map high-dimensional contextual descriptions onto a continuous vector space where items with similar meanings are positioned close to one another.",
    explanation: "Computers do not understand the word 'King' or 'Queen' the way humans do. They need numbers. An embedding transforms a concept into a list of numbers (e.g., [0.23, -0.89, 0.45, ...]) in a space that can have hundreds or thousands of dimensions. Each dimension represents some learned abstract feature (like 'royalty', 'masculinity', or 'food-type'). For example, because a 'dog' and a 'puppy' are semantically similar, their respective list of numbers (vectors) will point in almost the exact same direction in this multi-dimensional space, whereas the word 'banana' will point somewhere else completely. This allows developers to use mathematical measures (like Cosine Similarity) to calculate semantic similarity.",
    example: "The famous semantic arithmetic equation: 'Vector(King) - Vector(Man) + Vector(Woman) ≈ Vector(Queen)'. The math matches our linguistic logic because the vectors represent core conceptual dimensions.",
    useCases: [
      "Semantic Search (finding documents that are relevant to a concept, even if they don't match exact keywords)",
      "Recommendation Systems (suggesting movies or songs whose vector coordinates align with the user's favorites)",
      "Anomaly Detection (detecting unusual user transactions whose vector profiles lie far away from clusters of standard users)"
    ],
    advantages: [
      "Semantic Understanding: Moves search beyond archaic exact keyword matching.",
      "Fuzzy Search Matching: Successfully answers synonyms, translations, or typos easily.",
      "Dimensionality Reduction: Compresses high-dimensional natural language contexts into dense vectors."
    ],
    disadvantages: [
      "Opaque Dimensions: The exact meaning of individual vector dimensions is black-box and hard for humans to audit directly.",
      "Model Upgrades Break Indexes: If you update your embedding model, you must re-generate vectors for all documents inside your Vector Database from scratch because the dimensions lose cross-compatibility."
    ],
    interviewQuestions: [
      {
        question: "What is Cosine Similarity and how represents semantic closeness?",
        answer: "Cosine Similarity measures the cosine of the angle between two multi-dimensional vectors in a vector space. It ranges from -1 to 1. A value close to 1 means the angle is near 0 degrees, pointing in the exact same direction and showing very high semantic relatedness, regardless of document length."
      }
    ],
    relatedTerms: ["vector_database", "rag"],
    references: [
      { title: "Hugging Face Course: Introduction to Embeddings", url: "https://huggingface.co/blog/getting-started-with-embeddings" }
    ]
  },
  {
    id: "lora",
    name: "Low-Rank Adaptation (LoRA)",
    category: "Fine-Tuning",
    shortDesc: "A parameter-efficient fine-tuning technique that injects small, trainable rank decomposition matrices into LLMs.",
    definition: "Low-Rank Adaptation (LoRA) is an exceptionally popular Parameter-Efficient Fine-Tuning (PEFT) method. Instead of updating all millions/billions of parameters in a large foundation model, LoRA freezes the original model weights and inserts small, low-rank mathematical adapters into the attention layers to drastically reduce GPU memory requirements.",
    explanation: "Imagine you have a heavyweight 500-page encyclopedia. You want to modify it to answer medical questions specifically. If you write edits on all 500 pages, it is extremely tedious, heavy, and consumes vast space (full fine-tuning). Instead, you keep the original volume absolutely frozen. You insert a thin transparent sheet of notes on top of just some pages where you write customized corrections on specific words. The encyclopedia remains untouched, but when someone reads through, they apply your transparency overlays. LoRA does this mathematically by splitting immense high-dimensional updates into two tiny matrix paths (A and B side-by-side). This reduces the parameter footprint by 99%, making model customization accessible on mid-tier consumer hardware.",
    example: "Adapting a Llama 3 8B model to speak like a pirate. By training a LoRA adapter (which is only ~50MB instead of a full 16GB model file), you can swap pirate mode on/off instantly or host 10 different specialized persona bots under the same single frozen server.",
    useCases: [
      "Resource-Constrained Fine-Tuning (tuning models on a single consumer GPU instead of a server cluster)",
      "Multi-Tenant AI Services (sharing one base model in memory and loading user-specific adapter weights dynamically)",
      "Style and Persona Customization for Stable Diffusion or LLM engines."
    ],
    advantages: [
      "GPU RAM Reduction: Cuts training GPU memory requirements by up to 300%.",
      "No Inference Latency: Adapters can be mathematically merged back into the base LLM weights prior to deployment to run at full original speed.",
      "Extremely Portable: Adapter weights are tiny (usually 10MB - 100MB) compared to gigabyte-heavy models, making uploads/sharing fast."
    ],
    disadvantages: [
      "Slight Accuracy Cap: In rare deep-specialization scenarios, LoRA can sometimes underperform compared to massive, expensive full parameter fine-tuning.",
      "Complex Implementation: Demands specialized libraries (like PEFT) and matrix manipulation knowledge to write successfully."
    ],
    interviewQuestions: [
      {
        question: "How does LoRA save parameters mathematically using Rank?",
        answer: "Instead of training an update matrix ΔW of size [d x k] (which is massive), LoRA factorizes it into two low-rank matrices B [d x r] and A [r x k], where the rank 'r' is extremely small (e.g., 4 or 8). The total parameters drop from (d * k) to r * (d + k). This saves 99% of variables to optimize!"
      }
    ],
    relatedTerms: ["fine_tuning", "llm"],
    references: [
      { title: "Original LoRA Research Paper (Hu et al.)", url: "https://arxiv.org/abs/2106.09685" }
    ]
  },
  {
    id: "rlhf",
    name: "Reinforcement Learning from Human Feedback (RLHF)",
    category: "LLMs",
    shortDesc: "Aligns an LLM with human preferences so it is helpful, honest, and harmless.",
    definition: "Reinforcement Learning from Human Feedback (RLHF) is a method that uses human evaluations to optimize a machine learning model's behavior, aligning generative outputs with human values, instructions, and safety preferences.",
    explanation: "When an LLM is first trained (pre-training), it simply learns to guess the next word in a sequence. If you type 'How do I rob a bank?', a raw pre-trained LLM might literally finish the sentence with detailed instructions because it's just repeating text correlations it read on the web. It doesn't know what is 'good', 'bad', or 'helpful'. RLHF trains a secondary model called a **Reward Model** to behave like a human judge. Humans look at multiple generated answers and rank them (e.g. 'Answer A is polite and helpful; Answer B is toxic and tells me to build a bomb'). The Reward Model learns this preference schema, and then a reinforcement learning algorithm (PPO) iteratively fine-tunes the LLM to generate responses that scored maximum points on the Reward Model's rubric.",
    example: "The difference between GPT-3 (base pre-trained text completer) and ChatGPT (instruct-aligned model that refuses dangerous inputs and answers in structured bullet points).",
    useCases: [
      "Alignment of AI safety (ensuring models do not spit out hate speech or malicious instructions)",
      "Formatting adjustments (guiding models to output helpful markdown, structured items, or summaries instead of long-form stream of consciousness)"
    ],
    advantages: [
      "Safety Guardrails: Ensures models act appropriately under delicate subjects.",
      "Instruction Following: Drastically boosts the usability of models for conversational systems."
    ],
    disadvantages: [
      "Human Evaluator Bias: Models can internalize political, social, or cultural biases based on who was hired to grade the answers.",
      "Reward Hacking: The LLM sometimes learns to write overly apologetic or flowery answers that 'sound' safe to the Reward Model but contain uselessly verbose content."
    ],
    interviewQuestions: [
      {
        question: "Describe the three core steps of implementing RLHF.",
        answer: "Step 1: Supervised Fine-Tuning (SFT) representing demonstrations of high-quality human prompts. Step 2: Training a Reward Model (RM) by feeding prompts, generating multiple outputs, letting humans rank them, and teaching a classification model to output safety scores. Step 3: Optimizing the SFT model using Reinforcement Learning (PPO) to maximize reward outputs."
      }
    ],
    relatedTerms: ["agent", "llm"],
    references: [
      { title: "OpenAI Blog on RLHF Alignment", url: "https://openai.com/research/instruction-following" },
      { title: "Hugging Face Deep RL Course", url: "https://huggingface.co/blog/rlhf" }
    ]
  },
  {
    id: "agent",
    name: "AI Agents (Agentic Systems)",
    category: "Agents",
    shortDesc: "Autonomous AI systems that perceive goals, make decisions, plan workflows, and execute tools without constant guidance.",
    definition: "An AI Agent is an autonomous system powered by a core Large Language Model that can observe virtual environments, maintain long-term scratchpad memory, dynamically break down complex tasks, select appropriate software tools, and run recursive self-correction loops to execute commands.",
    explanation: "Standard LLMs are passive: you ask a question, they answer, and shut off. AI Agents are active. If you tell an AI Agent: 'Find the top 5 trending tech stocks, write a PDF summarizing their performance, and draft an email to my manager', it doesn't just write a mock response. It executes a step-by-step workflow: first, it uses a search tool to check stocks. It reads the data, decides it needs a calculator tool, performs math, writes content to a PDF generator API, checks the output, and executes an SMTP email tool to deliver it. If any step fails (e.g. an API times out), the agent detects the error and retries with a backup plan. It can plan, decide, and act on its own accord.",
    example: "AutoGPT, CrewAI setups, or Devin (the autonomous AI software engineer), executing terminal run-and-compile scripts, checking errors, and editing files iteratively until the project passes validation tests.",
    useCases: [
      "Autonomous Research Agents (fetching, compiling, and summarizing broad web materials for hours)",
      "Automated Developer Bots (analyzing codebases, refactoring, compiling, and testing code automatically)",
      "Multi-Agent Teams (specializing one bot as a product manager, another as a coder, and a third as QA to refine code)"
    ],
    advantages: [
      "Hands-Free Workflows: Solves multi-step procedures that span hours and multiple physical interfaces.",
      "Self-Correction: Can read its own errors, rethink its strategy, and execute a fix independently."
    ],
    disadvantages: [
      "Infinite Loops & Co$t: A bug can cause an agent to run around calling expensive API requests thousands of times in a loop, racking up bills overnight.",
      "Unpredictable Actions: Agents with permission to run code or call shell scripts can accidentally delete files or send spam emails if their prompt parameters are poorly constrained."
    ],
    interviewQuestions: [
      {
        question: "What is ReAct (Reasoning and Acting) prompt engineering pattern in Agent design?",
        answer: "ReAct combines reasoning (thinking about what to do) and acting (executing tool calls) in an iterative loop: Thought -> Action -> Observation -> Repeat. This helps the agent make analytical, logical steps instead of guessing blindly."
      }
    ],
    relatedTerms: ["mcp", "prompt_engineering"],
    references: [
      { title: "Lilian Weng's famous post on LLM-powered Autonomous Agents (OpenAI)", url: "https://lilianweng.github.io/posts/2023-06-23-agent/" }
    ]
  },
  {
    id: "fine_tuning",
    name: "Fine-Tuning",
    category: "Fine-Tuning",
    shortDesc: "Adapting a pre-trained large foundation model to run custom tasks, specialized vocabularies, or particular styles.",
    definition: "Fine-Tuning is the process of taking a pre-existing, massive neural network model (already trained on broad datasets) and training its weights further on a specialized, smaller, high-fidelity dataset to optimize its performance for specific output tasks.",
    explanation: "Imagine hiring a highly educated college graduate who knows how to read, write, and think broadly (Pre-trained LLM). To make them a legal expert at your specific law firm, you don't teach them the alphabet or grammar all over again. Instead, you put them through a highly concentrated 2-week training course filled with your specific legal templates, contract structures, and previous legal disputes. This specialized education is Fine-Tuning. It modifies the model's inner weights slightly to lock-in the precise formatting, style, tone, and specific domain-knowledge you require.",
    example: "Taking a general Llama 3 model and fine-tuning it with millions of structured Medical Q&A transcripts so it speaks exactly in the professional tone of a physician and correctly formats diagnostic logs.",
    useCases: [
      "Adapting models to output extremely specific JSON structures or API schemas consistently.",
      "Teaching models proprietary jargon, niche enterprise terminologies, or uncommon languages.",
      "Customizing a unique, consistent brand voice for virtual customer relations characters."
    ],
    advantages: [
      "Aesthetic and Style Consistency: Drastically outperforms prompting when it comes to matching abstract tones, lengths, or complex formatting rules.",
      "Saves Prompt Space: No need to paste 20 examples inside every single chat prompt (Few-Shot Prompting); the model already knows the task, cutting down token bills and latency."
    ],
    disadvantages: [
      "Expensive Setup: Demands curated high-quality datasets (typically 1,000 to 100,000 examples) and massive GPU compute power for training.",
      "Catastrophic Forgetting: Fine-tuning a model too deeply on a narrow task can sometimes cause it to lose its general intelligence, making it unable to perform basic logic or math it previously knew."
    ],
    interviewQuestions: [
      {
        question: "When should you use Fine-Tuning vs RAG?",
        answer: "Use RAG if you need up-to-date facts, dynamic external data lookup, or need to cite sources. Use Fine-Tuning when you need to change the model's behavior, style, format, or train it to understand extremely narrow specialized vocabulary that basic prompts cannot dictate."
      }
    ],
    relatedTerms: ["lora", "llm"],
    references: [
      { title: "Anyscale: Fine-Tuning LLMs Guide and Best Practices", url: "https://www.anyscale.com/blog/fine-tuning-llms" }
    ]
  },
  {
    id: "vector_database",
    name: "Vector Database",
    category: "RAG",
    shortDesc: "A database system designed specifically to store, index, and conduct high-speed semantic searches over Vector Embeddings.",
    definition: "A Vector Database is a storage engine designed to store large lists of multi-dimensional vector embeddings and handle high-performance mathematical queries (using algorithms like HNSW or IVF) to locate nearest neighbors within fraction of a millisecond.",
    explanation: "Traditional relational databases (like Postgres or MySQL) search for structured rows matching exact constraints (e.g., 'WHERE Age = 25' or 'WHERE name LIKE %John%'). They fail at searching context like 'Show me stories about emotional breakups' because there are no direct keywords. Vector Databases (like Pinecone, Qdrant, Chroma, or Milvus) store the vector embeddings of documents. When you query 'emotional breakups', the database calculates the vector coordinate of your query, and immediately searches its physical index to return the text snippets whose coordinates lie closest to yours. It allows computers to search by ideas, context, and meaning rather than exact strings.",
    example: "Pinecone, Chroma, or Qdrant storing 100,000 corporate documents for an enterprise RAG assistant, returning the top 5 matching paragraphs in under 5 milliseconds.",
    useCases: [
      "Standard indexing layer for RAG systems.",
      "Storing conversation history vectors for long-term semantic user memory logs.",
      "Reverse Image Search (upload a photograph, embed it, search vector database for similar photo vectors)."
    ],
    advantages: [
      "Sub-Millisecond Search: Find matching coordinates out of billions of entries instantly.",
      "Native Indexing Algorithms: Employs efficient Approximate Nearest Neighbor (ANN) indexes (e.g. HNSW, ScaNN) optimized heavily for machine learning pipelines."
    ],
    disadvantages: [
      "High RAM Consumption: To make ANN indexing fast, vector indexes must predominantly reside in the server's working memory, which can lead to expensive infrastructure bills.",
      "No Relational Joins: You cannot easily perform complex SQL joins, which usually forces developers to combine relational metadata back into their app logic."
    ],
    interviewQuestions: [
      {
        question: "Explain the difference between Flat retrieval and HNSW indexing.",
        answer: "Flat indexing calculates precise cosine distance between the query and EVERY single vector in the database (exact, but extremely slow at scale). HNSW (Hierarchical Navigable Small World) structures vectors into a multi-layered graph similar to skip-lists, skipping massive portions of the database to find approximate matches in O(log N) time."
      }
    ],
    relatedTerms: ["embedding", "rag"],
    references: [
      { title: "Qdrant Vector Database Documentation and Concepts", url: "https://qdrant.tech/documentation/concepts/" }
    ]
  },
  {
    id: "dpo",
    name: "Direct Preference Optimization (DPO)",
    category: "Fine-Tuning",
    shortDesc: "A simple, stable stable reinforcement-learning alternative that aligns LLMs directly on pairwise human choice preferences without a separate reward-model.",
    definition: "Direct Preference Optimization (DPO) is an alignment algorithm that simplifies reinforcement learning from human feedback (RLHF). By mathematically demonstrating that the training objective can be solved using a closed-form substitution, DPO optimizes the LLM's policy directly on pairwise human preferences (preferred vs dispreferred outputs) using a simple cross-entropy loss, bypassing the need to train an intermediate reward model or execute unstable reinforcement learning steps like PPO.",
    explanation: "Standard RLHF is like teaching a dog to roll over using a clicker. First, you have to train the clicker to sound exactly when the action is right (Reward Model), and then you use the clicker to iteratively teach the dog (PPO policy training). PPO is terribly unstable and can randomly fail or exceed memory. DPO is like showing the dog two video recordings side-by-side: one where a dog rolls over beautifully (Acceptable/Chosen path) and one where the dog barks and runs away (Dispreferred/Rejected path), then optimizing the dog's habits directly. This makes the math incredibly robust and allows training on standard supervised fine-tuning hardware.",
    example: "Training a customer service LLM to prefer short, highly informative bullet points over long-winded paragraphs. You provide pairs of (chosen_short_answer, rejected_verbose_answer), and the policy is fine-tuned directly on this dataset using a reference model to prevent the model from drifting too far from its original intelligence.",
    useCases: [
      "Aligning chatbot personas (e.g., matching friendly tone, strict instructions, or format layout constraints).",
      "Replacing unstable RLHF / PPO pipelines in production model alignments.",
      "Training specialized coding models to prioritize secure, fully-typed code structures over insecure workarounds."
    ],
    advantages: [
      "Simplified Pipeline: No separate reward model training or complex PPO policy-value gradient syncing required.",
      "Resource Protection: Demands significantly less memory and compute, reducing alignment projects from cluster-scale to single-gpu configurations.",
      "Exceptional Stability: Avoids the hyperparameter sensitivity, reward-hacking, and divergent failures typical of PPO loops."
    ],
    disadvantages: [
      "Reference Model Dependence: Requires keeping a copy of the base model in GPU RAM to calculate relative probabilities, doubling effective training memory.",
      "Sensitivity to Overfitting: DPO can overfit paired data quickly, causing the model to lose generic conversational flexibility if trained for too many epochs."
    ],
    interviewQuestions: [
      {
        question: "How does DPO's mathematical loss bypass the reward model?",
        answer: "DPO exploits an analytical relationship which proves that the optimal reward function can be expressed purely in terms of the ratio between the policy model's probability and the frozen reference model's probability. By substituting this relationship directly into the maximum-likelihood goal, the loss only targets the policy, removing the need for a separate reward estimator."
      }
    ],
    relatedTerms: ["rlhf", "fine_tuning"],
    references: [
      { title: "Stanford's Original DPO Research Paper (Rafailov et al.)", url: "https://arxiv.org/abs/2305.18290" }
    ]
  },
  {
    id: "speculative_decoding",
    name: "Speculative Decoding",
    category: "LLMs",
    shortDesc: "An acceleration technique where a tiny, lightweight draft assistant guesses tokens ahead, which are verified in parallel by the target LLM.",
    definition: "Speculative Decoding is an inference acceleration algorithm that improves the generation speed of large language models. A smaller, lightning-fast draft model generates a batch of candidate tokens (e.g., 4-6 tokens ahead). The massive parent model then evaluates those tokens simultaneously in a single compute pass (parallelized feed-forward step). Any accepted draft tokens are saved instantly, and rejected tokens are corrected, decreasing latency without modifying output distributions.",
    explanation: "LLM generation is highly memory-bound. To write a single word, the giant model must load all of its billions of weights from memory (HBM) to execution cores. For a 100-word sentence, it repeats this load cycle 100 times. Speculative Decoding works like a master novelist paired with a junior writer. The junior writer (the draft model) guesses the next 5 words rapidly: 'The cat sat on the'. The master novelist (large model) looks at all 5 words at once. In one split-second scan, the master thinks: 'Yes, 'The cat sat on the' is perfect.' It accepts all of them instantly. Instead of reloading its gigantic memory banks 5 times, it did it just once! If the junior writer got a word wrong (e.g., guessed 'carpet' instead of 'mat'), the master corrects it immediately and continues.",
    example: "Using Llama-3-8B as a speedy draft assistant to accelerate Llama-3-70B. In high-concurrency enterprise settings, this can boost inference speeds up to 2x to 3x, yielding substantial savings.",
    useCases: [
      "Ultra-low latency real-time autocomplete editors.",
      "Increasing throughput for mass backend document processing systems.",
      "Enabling smooth voice-agent interactions requires sub-200ms audio generation loops."
    ],
    advantages: [
      "Strict Distribution Preservation: The output is mathematically identical to running the huge parent model directly—zero loss in reply precision.",
      "Major Speed Acceleration: Yields up to 2.5x speedups depending on the draft model's validation accuracy.",
      "Standard Hardware Compatibility: Works out-of-the-box on standard Nvidia/AMD servers without model modifications."
    ],
    disadvantages: [
      "Draft Model Synchronization: Requires matching the tokenizer structures of the draft and target models exactly.",
      "Low Accept-Rate Overhead: If the draft model is highly inaccurate for a specific subject (e.g., complex legal terms), draft tokens are constantly rejected, which introduces minor parallel verify latency."
    ],
    interviewQuestions: [
      {
        question: "Under what conditions does Speculative Decoding fail to provide acceleration?",
        answer: "It fails if the draft model's choice alignment drops below ~30%. At low acceptance rates, the target model rejects draft proposals and must fall back on sequential decoding, creating an overall slowdown due to the overhead of drafting and rejecting."
      }
    ],
    relatedTerms: ["llm"],
    references: [
      { title: "Google Research Paper on Speculative Decoding", url: "https://arxiv.org/abs/2211.17115" }
    ]
  },
  {
    id: "quantization",
    name: "Model Quantization",
    category: "AI Basics",
    shortDesc: "Compresses LLMs by mapping high-precision floating point parameters onto low-bit representations.",
    definition: "Model Quantization is a model compression method that reduces the numerical hardware precision of neural network weights—usually transitioning from FP16 or FP32 (16 or 32-bit floats) to INT8, INT4, or lower precision scales. This significantly shrinks disk space and GPU memory needs while maintaining model coherence.",
    explanation: "Weights in a model are stored as highly precise decimals, like 0.7493231. Storing one 16-bit float takes 2 bytes. For an 8-billion parameter model, that's 16 gigabytes of RAM. Quantization is like rounding or bucket-sorting these decimals. Instead of storing every exact individual fractional number, we group them into a finite number of slots (like rounding to the nearest whole integer between -127 and 127 for 8-bit quantization). While this sounds like it would ruin accuracy, modern deep neural networks have redundant scales that tolerate minor precision loss extremely well. By converting weights to 4-bit numbers (like GGUF or AWQ formats), that 16GB model compresses to just 4GB, allowing you to run it locally on an everyday laptop or smartphone.",
    example: "Deploying a Llama 3 8B model. Unquantized FP16 requires a high-end enterprise GPU (~$10k). Quantizing it to INT4 reduces memory down to ~4.5GB, allowing it to run smoothly on a standard MacBook Air or high-end smartphone with zero internet connection.",
    useCases: [
      "Local offline AI execution on consumer platforms (Laptops, Mobile devices, Raspberry Pi).",
      "Maximizing model concurrency densities in production cloud servers.",
      "Reducing storage and transport loads for distributed edge clusters."
    ],
    advantages: [
      "Dramatic Portability: Cuts file sizes and active memory demands by 70% to 80%.",
      "Substantial Inference Speed: Execution is accelerated because low-precision integers can be transferred between memory blocks much faster than floats.",
      "Minimal Quality Degradation: Modern post-training quantization algorithms (e.g., AWQ, GPTQ) maintain language fluency with barely measurable drops."
    ],
    disadvantages: [
      "Perplexity Penalty: The lower the quantization bit (e.g., 2-bit), the higher the perplexity (loss of vocabulary detail and logical clarity).",
      "Under-The-Hood Compute Mismatch: Quantized weights sometimes require real-time on-the-fly dequantization on older GPUs, which can cause unexpectedly slow processing."
    ],
    interviewQuestions: [
      {
        question: "Explain Post-Training Quantization (PTQ) vs Quantization-Aware Training (QAT).",
        answer: "PTQ quantizes weights after the model has completed full training (easy, requires no retraining data, but suffers minor accuracy loss). QAT models precision limits during actual training, allowing the model to adapt weights to the low-bit limits, yielding maximum accuracy but requiring massive retraining compute."
      }
    ],
    relatedTerms: ["lora", "llm"],
    references: [
      { title: "Hugging Face Guide: Introduction to Model Quantization", url: "https://huggingface.co/blog/introduction-to-weight-quantization" }
    ]
  },
  {
    id: "agentic_rag",
    name: "Agentic RAG",
    category: "RAG",
    shortDesc: "Elevates standard RAG by adding autonomous agent loops that can format, analyze, critique, and self-correct retrieval queries.",
    definition: "Agentic RAG is an active information retrieval style that replaces simple single-pass search queries with multi-step autonomous loops. Using an LLM agentic controller, it dynamically formulates search queries, evaluates the quality/relevance of retrieved documents, performs recursive query reformulation, and merges findings from multiple disparate databases to construct structured answers.",
    explanation: "Standard RAG is like asking a librarian: 'Find me books on wood stoves' and accepting whatever top 3 books are slapped on the counter, even if they aren't what you need. Agentic RAG is like hiring a dedicated researcher. First, they search 'wood stoves'. They read the summaries, realize they are outdated, decide to reformulate the query to 'high-efficiency modern wood stove safety standards', and search again. If they find conflicting reports, they open a separate database of technical fire hazards to verify. They critique and double-check their own findings before finishing. It replaces passive vector searches with active, iterative, analytical research workflows.",
    example: "An enterprise financial research assistant. When asked 'Did company X make more profit in 2024 than 2023?', the agent first retrieves 2024 SEC files. It parses the files, writes down numbers, notices that EBITDA is defined differently in the 2023 reports, fires a new focused search for '2023 EBITDA definitions', performs calculation math, and validates the output before replying.",
    useCases: [
      "Complex cross-document comparative analysis (e.g., finding contradictions in 20 contracts).",
      "Automatic data-gathering pipelines over fragmented database silos.",
      "High-precision answering systems that must execute verification sweeps before returning answers."
    ],
    advantages: [
      "Substantially Higher Precision: Drastically cuts hallucinated numbers by cross-checking sources.",
      "Handling Multistep Logic: Can solve complex, analytical, and comparative prompts that standard RAG fails to understand.",
      "Dynamic Routing: Can decide which database (e.g., Web search vs Vector Store vs SQL Database) is best suited for each step of a question."
    ],
    disadvantages: [
      "Major Compute and API Host Bills: An agentic loop may execute 10 LLM prompts and database sweeps for a single user query, raising token costs tenfold.",
      "High Latency: A complete multi-step agent verification loop can take 15-30 seconds, making it poorly suited for fast real-time chat widgets."
    ],
    interviewQuestions: [
      {
        question: "Explain how Self-RAG improves over simple RAG setups.",
        answer: "Self-RAG trains AI controllers to generate special 'utility tokens' that assess whether retrieval is necessary, score whether retrieved passages are relevant, and evaluate if the generated response contains factual hallucinations, enabling systematic self-correction loops."
      }
    ],
    relatedTerms: ["rag", "agent", "vector_database"],
    references: [
      { title: "LlamaIndex Deep Dive: Building Agentic RAG", url: "https://docs.llamaindex.ai/en/stable/use_cases/agentic_rag/" }
    ]
  },
  {
    id: "rope",
    name: "Rotary Position Embedding (RoPE)",
    category: "LLMs",
    shortDesc: "A modern position encoding technique that encodes relative token distances using rotational vector mathematics.",
    definition: "Rotary Position Embedding (RoPE) is a relative positional encoding method that encodes absolute positions with a rotation matrix, and naturally incorporates relative position dependency in the self-attention formulation. It is the gold standard for state-of-the-art models like Llama, Claude, and Mistral.",
    explanation: "LLMs deal with sequences of tokens, but self-attention has no inherent concept of word order. Without position tags, 'dog bites man' and 'man bites dog' look identical to the self-attention formula. Standard models previously used static absolute position vectors added directly to token embeddings. However, absolute vectors struggle to generalise when prompts are longer than the original training limit. RoPE solves this elegantly. Instead of adding a vector, it applies a rotational shift to components of the Query and Key vectors in 2D vector slices. If two words are separated by 3 tokens, their vectors are rotated 3 times relative to each other. This captures the relative distance between words in an elegant, mathematically stable way, enabling context window extensions of up to millions of tokens without retraining from scratch.",
    example: "Extending Llama-3's context window from 8k to 128k tokens. By scaling the base frequency parameter of the RoPE rotations (a technique known as RoPE Scaling or YaRN), developers can scale context windows dramatically with minimal fine-tuning.",
    useCases: [
      "Enabling ultra-long context windows in modern foundation models.",
      "Developing applications that ingest entire technical codebases or full novels.",
      "Stabilizing relative attention weights in high-performance Transformers."
    ],
    advantages: [
      "Elegant Relative Distance Decay: Attention scores naturally decrease between words that are far apart, mimicking how humans read.",
      "Extensible Limits: Easily scaled up using simple frequency math to accommodate larger prompts without expensive parameter updates."
    ],
    disadvantages: [
      "Compute Complexity: Demands complex trigonometric operations on Query/Key tensors during the attention sequence.",
      "Hardware Alignment Overhead: Requires specialized CUDA kernels (such as FlashAttention) to minimize performance overhead on GPUs."
    ],
    interviewQuestions: [
      {
        question: "Why does RoPE perform better than older absolute position encodings when expanding context windows?",
        answer: "Older absolute positional encodings are tied to specific hardcoded training positions. If a model was trained on 2,000 tokens, it literally has no vector tags for token 2,050, leading to a crash in quality. RoPE uses relative rotations, meaning relative distances are calculated consistently regardless of absolute indexes, allowing stable extrapolation."
      }
    ],
    relatedTerms: ["llm"],
    references: [
      { title: "RoFormer Research Paper: Rotary Position Embedding", url: "https://arxiv.org/abs/2104.09864" }
    ]
  }
];
