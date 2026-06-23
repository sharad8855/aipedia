import React, { useState } from "react";
import {
  BookOpen,
  ArrowRight,
  TrendingUp,
  Cpu,
  BarChart3,
  PenTool,
  Network,
  Database,
  Brain,
  Sliders,
  Sparkles,
  Check,
  ChevronRight,
  Bookmark,
  Users,
  Award,
  Zap,
  Globe,
  GitPullRequest
} from "lucide-react";
import { aiTerms } from "../data/terms";

interface HomeProps {
  onNavigate: (tab: string, arg?: { id?: string; category?: string }) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail("");
        setNewsletterSubscribed(false);
      }, 4000);
    }
  };

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content Left */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-blue-700 shadow-xs animate-fade-in">
              <Sparkles className="h-4 w-4 text-amber-500 animate-spin" />
              <span>🚀 1000+ AI Terms Explained Simply</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Learn AI Faster With <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r bg-blue-600 to-indigo-600">
                The Free AI Knowledge Platform
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Master AI, LLMs, RAG, MCP, Agents, Prompt Engineering, Fine-Tuning, LangChain, Vector Databases and more with beginner-friendly, jargon-free explanations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="hero-explore-terms-btn"
                onClick={() => onNavigate("terms")}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 duration-200 cursor-pointer"
              >
                <span>Explore Terms</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                id="hero-start-learning-btn"
                onClick={() => onNavigate("roadmaps")}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-blue-700 border border-slate-200 hover:border-slate-300 font-semibold px-6 py-3.5 rounded-xl shadow-xs transition-all hover:-translate-y-0.5 duration-200 cursor-pointer"
              >
                <span>Start Learning</span>
                <ChevronRight className="h-4 w-4 text-blue-500" />
              </button>
            </div>

            {/* Testimonial Pile */}
            <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
              <div className="flex -space-x-3 overflow-hidden">
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  alt="Ananya Sharma"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  alt="Rohit Verma"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                  alt="Neha Patil"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt="Avi"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex text-amber-400 text-sm">★★★★★</div>
                <p className="text-xs text-slate-500 font-medium">Trusted by Students, Developers, and AI Engineers</p>
              </div>
            </div>
          </div>

          {/* Hero Column Right - Dynamic concepts mindmap */}
          <div className="lg:col-span-5 relative w-full h-[400px] border border-slate-100 bg-linear-to-b from-slate-50 to-white shadow-xl rounded-2xl p-6 flex flex-col justify-between overflow-hidden">
            {/* Mindmap header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Popular Concepts</span>
              </div>
              <div className="bg-slate-200/50 text-[10px] uppercase font-bold text-slate-600 px-2 py-0.5 rounded">
                Interactive Map
              </div>
            </div>

            {/* Central Circle layout */}
            <div className="relative flex-1 flex items-center justify-center">
              {/* Center Brain Node */}
              <div className="relative z-10 bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-4 rounded-full shadow-lg">
                <Brain className="h-8 w-8 animate-pulse" />
              </div>

              {/* Connecting orbit rings */}
              <div className="absolute w-[240px] h-[240px] border border-dashed border-indigo-200/60 rounded-full animate-spin [animation-duration:40s]" />
              <div className="absolute w-[140px] h-[140px] border border-dashed border-indigo-100 rounded-full" />

              {/* Outside clickable node cards */}
              {/* RAG Node */}
              <button
                id="mindmap-rag-btn"
                onClick={() => onNavigate("terms", { id: "rag" })}
                className="absolute -translate-y-24 -translate-x-16 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl p-2.5 shadow-sm text-left hover:scale-105 active:scale-95 transition-all w-[110px]"
              >
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>RAG</span>
                </div>
                <p className="text-[9px] text-slate-500 leading-tight">Retrieval Augmented Generation</p>
              </button>

              {/* MCP Node */}
              <button
                id="mindmap-mcp-btn"
                onClick={() => onNavigate("terms", { id: "mcp" })}
                className="absolute -translate-y-24 translate-x-16 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl p-2.5 shadow-sm text-left hover:scale-105 active:scale-95 transition-all w-[110px]"
              >
                <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span>MCP</span>
                </div>
                <p className="text-[9px] text-slate-500 leading-tight">Model Context Protocol</p>
              </button>

              {/* LoRA Node */}
              <button
                id="mindmap-lora-btn"
                onClick={() => onNavigate("terms", { id: "lora" })}
                className="absolute translate-y-16 -translate-x-24 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl p-2.5 shadow-sm text-left hover:scale-105 active:scale-95 transition-all w-[110px]"
              >
                <div className="flex items-center gap-1 text-[10px] font-bold text-violet-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                  <span>LoRA</span>
                </div>
                <p className="text-[9px] text-slate-500 leading-tight">Low-Rank Adaptation</p>
              </button>

              {/* Agent Node */}
              <button
                id="mindmap-agent-btn"
                onClick={() => onNavigate("terms", { id: "agent" })}
                className="absolute translate-y-16 translate-x-24 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl p-2.5 shadow-sm text-left hover:scale-105 active:scale-95 transition-all w-[110px]"
              >
                <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span>Agent</span>
                </div>
                <p className="text-[9px] text-slate-500 leading-tight">Autonomous AI Systems</p>
              </button>

              {/* RLHF Node */}
              <button
                id="mindmap-rlhf-btn"
                onClick={() => onNavigate("terms", { id: "rlhf" })}
                className="absolute -translate-y-0 translate-y-24 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl p-2.5 shadow-sm text-left hover:scale-105 active:scale-95 transition-all w-[130px] mx-auto"
              >
                <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <span>RLHF</span>
                </div>
                <p className="text-[9px] text-slate-500 leading-tight">Learning from human reward</p>
              </button>
            </div>

            {/* Bottom search helper */}
            <div className="bg-slate-900 text-slate-300 p-2 text-center rounded-lg text-[11px] font-medium border border-slate-800">
              ⚡ Click any concept block to read its breakdown instantly
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 1: START WITH POPULAR AI CONCEPTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Start With Popular AI Concepts
            </h2>
            <p className="text-slate-500 text-sm mt-1">Get immediate definitions of the most in-demand acronyms.</p>
          </div>
          <button
            id="view-all-terms-btn"
            onClick={() => onNavigate("terms")}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-500 flex items-center gap-1 group cursor-pointer"
          >
            <span>View all terms</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {[
            { id: "rag", tag: "RAG", title: "Retrieval Augmented" },
            { id: "mcp", tag: "MCP", title: "Model Context Standard" },
            { id: "agent", tag: "Agent", title: "Autonomous Helper" },
            { id: "embedding", tag: "Vector", title: "Embeddings Models" },
            { id: "vector_database", tag: "Vector DB", title: "Pinecone / Qdrant" },
            { id: "fine_tuning", tag: "Fine-Tune", title: "Weight Tuning" },
            { id: "lora", tag: "LoRA", title: "Efficient PEFT" },
            { id: "rlhf", tag: "RLHF", title: "Human Preferences" }
          ].map((item, idx) => (
            <button
              id={`popular-term-${item.id}`}
              key={idx}
              onClick={() => onNavigate("terms", { id: item.id })}
              className="bg-white border border-slate-150 hover:border-blue-400 p-4 rounded-xl text-left hover:shadow-md hover:-translate-y-1 active:translate-y-0 transition-all duration-200 flex flex-col justify-between h-28"
            >
              <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                {idx + 1}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs tracking-tight mt-2">{item.tag}</h4>
                <p className="text-[10px] text-slate-400 truncate tracking-tight">{item.title}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. SECTION 2: BROWSE BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50/50 py-12 rounded-3xl border border-slate-100">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Browse By Category
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Organized directories designed specifically for continuous academic studies and interview prep campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { tag: "AI Basics", count: "120+ Terms", desc: "Foundational architectures, weights, inputs.", color: "bg-emerald-50 text-emerald-700", icon: BookOpen },
            { tag: "LLMs", count: "150+ Terms", desc: "Attention layers, decoding parameters, decoding weights.", color: "bg-blue-50 text-blue-700", icon: Brain },
            { tag: "RAG", count: "80+ Terms", desc: "Chunking, vector indexing, dense coordinate search.", color: "bg-violet-50 text-violet-700", icon: Database },
            { tag: "Agents", count: "70+ Terms", desc: "ReAct loops, autonomous tools, model connections.", color: "bg-amber-50 text-amber-700", icon: Network },
            { tag: "Machine Learning", count: "200+ Terms", desc: "Classifications, gradients, regression paths.", color: "bg-rose-50 text-rose-700", icon: Sliders }
          ].map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <button
                id={`category-card-${idx}`}
                key={idx}
                onClick={() => onNavigate("terms", { category: cat.tag })}
                className="bg-white border border-slate-150 p-5 rounded-2xl text-left hover:shadow-lg hover:border-blue-400 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between h-48"
              >
                <div className="space-y-3">
                  <div className={`h-10 w-10 rounded-xl ${cat.color} flex items-center justify-center`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{cat.tag}</h3>
                    <p className="text-[11px] text-slate-400">{cat.count}</p>
                  </div>
                  <p className="text-xs text-slate-500 leading-tight">{cat.desc}</p>
                </div>
                <div className="text-[10px] text-blue-600 font-semibold flex items-center gap-1 pt-2 border-t border-slate-50">
                  <span>Browse Index</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. CHOOSE YOUR AI CAREER PATH (and Why AIpedia) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Why AIpedia column left */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              Why AIpedia?
            </h2>
            <p className="text-slate-500 text-sm">
              Your all-in-one open curriculum to study, master, and test modern generative intelligence without paywalls or logins.
            </p>

            <div className="space-y-3 pt-2">
              {[
                "Simple explanations with real analogies",
                "Interview questions with difficulty gradings",
                "Interactive career-specific roadmaps",
                "Instant, copyable CLI cheat sheets",
                "Zero sign-up or accounts required",
                "100% open-source for public support"
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <div className="bg-emerald-100 text-emerald-700 p-0.5 rounded-full mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-medium">{bullet}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-2xl flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2.5 rounded-lg">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-blue-900">AdSense Friendly & Clean</p>
                <p className="text-[10px] text-blue-700 leading-tight">Fast loadtimes engineered for performance.</p>
              </div>
            </div>
          </div>

          {/* Roadmaps paths right column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Choose Your AI Career Path
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Visual step-by-step syllabus layouts curated with the absolute best free courses.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: "ai-engineer", title: "AI Engineer Roadmap", desc: "LLMs, fine-tuning, RAG, tool APIs.", duration: "12-18 Months", diff: "Intermediate", icon: Cpu, style: "border-blue-200 bg-blue-50/20 text-blue-600" },
                { id: "ml-engineer", title: "ML Engineer Roadmap", desc: "Statistics, neural networks, calculus.", duration: "10-14 Months", diff: "Advanced", icon: TrendingUp, style: "border-rose-100 bg-rose-50/10 text-rose-600" },
                { id: "data-scientist", title: "Data Scientist Roadmap", desc: "Pandas tables, NumPy coordinates, datasets.", duration: "8-12 Months", diff: "Beginner to Pro", icon: BarChart3, style: "border-emerald-100 bg-emerald-50/10 text-emerald-600" },
                { id: "prompt-engineer", title: "Prompt Engineer Roadmap", desc: "CoT prompting, prompt hacks, safety rules.", duration: "4-6 Months", diff: "Beginner", icon: PenTool, style: "border-amber-100 bg-amber-50/10 text-amber-600" }
              ].map((road, idx) => {
                const RoadIcon = road.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 bg-white border border-slate-150 rounded-2xl flex items-start gap-4 hover:shadow-lg transition-all"
                  >
                    <div className={`p-3 rounded-xl border ${road.style}`}>
                      <RoadIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 text-left space-y-1">
                      <h3 className="font-bold text-slate-900 text-sm">{road.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-1">{road.desc}</p>
                      <div className="flex items-center gap-2 pt-1 text-[10px] font-semibold text-slate-400">
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{road.duration}</span>
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{road.diff}</span>
                      </div>
                      <button
                        id={`on-navigate-roadmaps-${road.id}`}
                        onClick={() => onNavigate("roadmaps", { id: road.id })}
                        className="text-xs font-bold text-blue-600 hover:text-blue-500 pt-2 flex items-center gap-1 transition"
                      >
                        <span>Start Roadmap</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. TOP RESOURCES & STATS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Resource recommendation cards left */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Top Resources Catalogue</h2>
              <p className="text-slate-500 text-sm">Hand-picked external platforms widely used by engineers globally.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://www.deeplearning.ai/short-courses/"
                onError={() => {}}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-slate-50 border border-slate-150 rounded-xl hover:border-blue-400 transition hover:bg-white text-left block"
              >
                <div className="inline-block bg-amber-100 text-amber-800 font-bold text-[9px] uppercase px-2 py-0.5 rounded mb-2">
                  Top Courses
                </div>
                <h4 className="font-bold text-slate-900 text-xs">DeepLearning.AI Short Lectures</h4>
                <p className="text-[11px] text-slate-500 leading-tight mt-1">Andrew Ng's fast micro-lessons on LCEL, agent networks, and vector indexing.</p>
              </a>

              <a
                href="https://huggingface.co/datasets"
                onError={() => {}}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-slate-50 border border-slate-150 rounded-xl hover:border-blue-400 transition hover:bg-white text-left block"
              >
                <div className="inline-block bg-blue-100 text-blue-800 font-bold text-[9px] uppercase px-2 py-0.5 rounded mb-2">
                  Clean Datasets
                </div>
                <h4 className="font-bold text-slate-900 text-xs">HuggingFace Open Directories</h4>
                <p className="text-[11px] text-slate-500 leading-tight mt-1">Excellent pre-formatted Q&A and chat sequences for LoRA fine-tuning preparation.</p>
              </a>
            </div>

            <button
              id="navigate-resources-from-home-btn"
              onClick={() => onNavigate("resources")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-500 flex items-center gap-1"
            >
              <span>Explore Resource Hub</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Quick stats callout node right */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-8 flex flex-col justify-between text-left shadow-xl">
            <div className="space-y-6">
              <span className="bg-white/10 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/10">
                AIpedia Index Census
              </span>
              <div className="grid grid-cols-2 gap-6 pt-2">
                <div>
                  <h4 className="text-4xl font-extrabold text-white">1000+</h4>
                  <p className="text-xs text-blue-200 mt-1 font-medium">AI terms explained</p>
                </div>
                <div>
                  <h4 className="text-4xl font-extrabold text-white">500+</h4>
                  <p className="text-xs text-blue-200 mt-1 font-medium">Interview Questions</p>
                </div>
                <div>
                  <h4 className="text-4xl font-extrabold text-white">50+</h4>
                  <p className="text-xs text-blue-200 mt-1 font-medium">Syllabus Node Roadmaps</p>
                </div>
                <div>
                  <h4 className="text-4xl font-extrabold text-white">20+</h4>
                  <p className="text-xs text-blue-200 mt-1 font-medium">Language Cheat Sheets</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[13px] font-semibold text-blue-100">
              <span className="flex items-center gap-1">
                <span>❤ 100% Free Forever</span>
              </span>
              <span>No sign-up demanded</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BUILT IN PUBLIC. OPEN SOURCE FOREVER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden text-left border border-slate-800 shadow-2xl">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-[200px] h-[200px] bg-emerald-500/10 rounded-full blur-2xl" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="bg-emerald-500/20 text-emerald-400 font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border border-emerald-500/30">
              Community Supported
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built In Public. <br />Open Source Forever.
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              AIpedia is a community-driven repository. Anyone can request corrections, commit new terms, upload roadmap guides, or draft interview study cards on GitHub.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-1">
              <a
                href="https://github.com/sharadwaje03/aipedia"
                target="_blank"
                rel="noreferrer"
                id="footer-github-star-btn"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-lg hover:bg-slate-100 transition active:scale-98"
              >
                <GitPullRequest className="h-4 w-4" />
                <span>Star on GitHub</span>
              </a>
              <div className="flex items-center gap-2 text-xs text-slate-400 self-center">
                <Users className="h-4 w-4 text-emerald-400" />
                <span>Join 500+ active repository members</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHAT OUR USERS SAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">What Our Users Say</h2>
          <p className="text-slate-500 text-sm mt-2">Hear from global students and engineers building with our guides.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Ananya Sharma", role: "AI/ML Student", comment: "AIpedia completely demystified RAG systems for my college projects. The analogies are exceptionally simple to digest before tests!", score: "★★★★★", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop" },
            { name: "Rohit Verma", role: "AI Engineer", comment: "The Model Context Protocol guide matches the standard exactly. It has become my default scratchpad during architecture layouts.", score: "★★★★★", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop" },
            { name: "Neha Patil", role: "Data Scientist", comment: "The Python and Pandas cheat sheets are extremely handy on dual screens. Clicking copy takes 1 second. Highly recommend!", score: "★★★★★", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop" }
          ].map((user, idx) => (
            <div key={idx} className="p-6 bg-white border border-slate-150 rounded-2xl shadow-xs text-left flex flex-col justify-between">
              <p className="text-xs text-slate-600 line-clamp-4 leading-relaxed mb-4 italic">"{user.comment}"</p>
              <div className="flex items-center gap-3">
                <img className="h-10 w-10 rounded-full border border-slate-100" src={user.avatar} alt={user.name} referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{user.name}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold">{user.role}</p>
                  <span className="text-[10px] text-amber-500 block">{user.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. NEWSLETTER FOOTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-3xl p-8 sm:p-10 text-white text-center sm:flex items-center justify-between gap-6">
          <div className="text-left space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold">Stay Updated With New AI Concepts</h3>
            <p className="text-xs sm:text-sm text-blue-100">Get the latest terms, interactive interview questions, and cheat sheets sent directly to your inbox.</p>
          </div>

          <form onSubmit={handleSubscribe} className="mt-4 sm:mt-0 flex w-full sm:max-w-md bg-white p-1 rounded-xl shadow-xs border border-blue-500">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="flex-1 px-4 py-2.5 text-xs text-slate-800 bg-transparent border-none outline-none focus:ring-0 placeholder-slate-400"
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg shrink-0 transition"
            >
              {newsletterSubscribed ? "Subscribed! ✔" : "Subscribe"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
