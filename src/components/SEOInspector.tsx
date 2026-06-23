import React from "react";

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  url: string;
  schemaJson: string;
}

interface SEOInspectorProps {
  activeTab: string;
  detailId?: string;
  detailName?: string;
}

export default function SEOInspector({ activeTab, detailId, detailName }: SEOInspectorProps) {
  // Dynamically compute active SEO details based on current tab and content state
  const getSEOConfig = (): SEOData => {
    let title = "AIpedia | Learn AI, LLMs, RAG, Agents and Fine-Tuning Free";
    let description = "Understand concepts like Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), and LoRA explained in simple English. Perfect resource for developers, founders, and students.";
    let keywords = "AI Terms, AI Glossary, LLM dictionary, what is RAG, what is MCP, Learn AI roadmaps";
    let url = "https://aipedia.org/";

    if (activeTab === "terms") {
      if (detailId && detailName) {
        title = `${detailName} Explained Simply | AIpedia Terms`;
        description = `What is ${detailName}? Read custom definitions, conversational explanations, real-world use cases, simple diagrams, and interview prep on AIpedia.`;
        keywords = `${detailName}, what is ${detailName}, how does ${detailName} work, related terms, interview questions`;
        url = `https://aipedia.org/terms/${detailId}`;
      } else {
        title = "AI Terms Glossary | 1000+ AI Concepts Explained Simply - AIpedia";
        description = "Explore our master glossary dictionary of 1000+ Machine learning, LLM, and Agent concepts decoded in beginner terms. Filter by RAG, Agents, and Fine-Tuning.";
        keywords = "AI dictionary, Machine learning terms, NLP terms dictionary, AI terminology index";
        url = "https://aipedia.org/terms";
      }
    } else if (activeTab === "questions") {
      title = "AI Interview Questions Prep | Beginner to Advanced Detailed Answers - AIpedia";
      description = "Master your next technical AI, LLM, and prompt engineering interview. Browse Python, ML, RAG, and FastAPI questions with beginner, intermediate, and advanced answers.";
      keywords = "AI Interview preparation, LLM interview answers, Python code interview questions, Machine learning tests";
      url = "https://aipedia.org/interview-questions";
    } else if (activeTab === "roadmaps") {
      title = "Free Interactive AI Career Roadmaps 2026 - AIpedia";
      description = "Visual, step-by-step paths to become an AI Engineer, ML Engineer, Data Scientist, or Prompt Engineer. Check off learned items, view curated free courses, and monitor progress.";
      keywords = "AI Engineer Roadmap, ML Study Plan, Data Scientist roadmap, free Generative AI syllabus";
      url = "https://aipedia.org/roadmaps";
    } else if (activeTab === "cheatsheets") {
      title = "Developer Cheat Sheets for Data Science & AI - AIpedia";
      description = "Printable, instant developer reference guides for Python list comprehensions, NumPy dot products, Pandas query operations, FastAPI ASGI declarations, and LangChain LCEL.";
      keywords = "Python cheat sheet, NumPy vector cheat, Pandas data table reference, FastAPI routing script, LangChain code examples";
      url = "https://aipedia.org/cheat-sheets";
    } else if (activeTab === "models") {
      title = "AI Foundation Model Comparison Matrix 2026 - AIpedia";
      description = "Compare pricing per million tokens, reasoning scores, context sizes, vision support, and developer availability across Gemini, GPT-4o, Claude 3.5, and DeepSeek-R1.";
      keywords = "Claude vs GPT, Gemini pricing per million tokens, DeepSeek-R1 context window comparison, coding benchmarks";
      url = "https://aipedia.org/model-comparison";
    } else if (activeTab === "blog") {
      if (detailId && detailName) {
        title = `${detailName} | AIpedia Blog Article`;
        description = `Read our educational deep dive into ${detailName}. Written by industry practitioners with complete code blocks and architectural breakdowns.`;
        keywords = `${detailName} research, AIpedia educational posts, master guide ${detailName}`;
        url = `https://aipedia.org/blog/${detailId}`;
      } else {
        title = "AIpedia Blog | Deep Dives on Agentic AI, MCP, Vector Search, and LoRA";
        description = "Read comprehensive developer-focused tutorials and expert analyses on Vector Indexes, LLM benchmarks, LangGraph agents, and model fine-tuning best practices.";
        keywords = "AI development tutorials, learn vector databases, model training blogs, MCP client setup guides";
        url = "https://aipedia.org/blog";
      }
    } else if (activeTab === "quiz") {
      title = "Interactive AI Concept Quiz | Test Your Generative AI Skills - AIpedia";
      description = "Are you a junior or senior AI engineer? Play our fun interactive multiple-choice quiz on RAG, MCP, LoRA, and Transformers. Detailed solutions provided.";
      keywords = "AI trivia, test machine learning knowledge, ChatGPT quiz, RAG skills evaluation";
      url = "https://aipedia.org/quiz";
    } else if (activeTab === "resources") {
      title = "Syllabus, Hub & Resource Directory for AI Learners - AIpedia";
      description = "Curated collections of totally free tutorials, machine learning datasets on Kaggle, open-source GitHub repositories, original transformer research papers, and top YouTube teachers.";
      keywords = "Free AI courses, machine learning datasets repository, must-read transformer papers, top programming tutorials";
      url = "https://aipedia.org/resources";
    }

    // Generate dynamic JSON-LD Structured Data
    const schemaObj = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": url,
      "publisher": {
        "@type": "Organization",
        "name": "AIpedia",
        "logo": {
          "@type": "ImageObject",
          "url": "https://aipedia.org/logo.png"
        }
      },
      "inLanguage": "en-US",
      "mainEntity": activeTab === "terms" && detailId ? {
        "@type": "DefinedTerm",
        "name": detailName || detailId,
        "description": description
      } : undefined
    };

    return {
      title,
      description,
      keywords,
      url,
      schemaJson: JSON.stringify(schemaObj, null, 2)
    };
  };

  const seo = getSEOConfig();

  // Dynamically update document title, description, keywords, canonical, open-graph elements, and schema element on state change
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      // 1. Update Title
      document.title = seo.title;

      // 2. Update/Create Meta Description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", seo.description);

      // 3. Update/Create Meta Keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", seo.keywords);

      // 4. Update/Create Canonical Link
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", seo.url);

      // 5. Update/Create Open Graph Title
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement("meta");
        ogTitle.setAttribute("property", "og:title");
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute("content", seo.title);

      // 6. Update/Create Open Graph Description
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement("meta");
        ogDesc.setAttribute("property", "og:description");
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute("content", seo.description);

      // 7. Update/Create Open Graph URL
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement("meta");
        ogUrl.setAttribute("property", "og:url");
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute("content", seo.url);

      // 8. Update/Create JSON-LD Schema Script Tag
      let scriptSchema = document.getElementById("seo-json-ld");
      if (!scriptSchema) {
        scriptSchema = document.createElement("script");
        scriptSchema.setAttribute("id", "seo-json-ld");
        scriptSchema.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptSchema);
      }
      scriptSchema.textContent = seo.schemaJson;
    }
  }, [seo.title, seo.description, seo.keywords, seo.url, seo.schemaJson]);

  return null;
}
