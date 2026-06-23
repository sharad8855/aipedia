import React, { useState } from "react";
import { Send, Heart, Mail, ExternalLink, Globe, MessageSquare, ShieldCheck, HeartCrack } from "lucide-react";

export default function AboutContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setName("");
        setEmail("");
        setMessage("");
        setSubmitted(false);
      }, 4000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 pb-16 text-left space-y-12 animate-fade-in">
      {/* 1. Header and Core Mission card */}
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">About AIpedia</h1>
        <div className="p-6 bg-slate-900 text-slate-100 rounded-3xl space-y-4 shadow-lg border border-slate-800">
          <p className="text-sm sm:text-base leading-relaxed">
            AIpedia was born out of a simple realization: **while Generative AI is exploding, explanations of its core mechanics are either overly simplistic marketing buzzwords or dense mathematical research papers.**
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-normal">
            Our mission is to bridge this gap. We translate complex parameters (like temperature, top-k scoring), orchestration pipelines (LCEL mapping, vector retrieval mechanics), and training layers (LoRA decomposed matrices, optimization gradients) into clear, standard English analogies so developers, students, and founders can build with intelligence safely.
          </p>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-blue-400 font-bold">
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-rose-500 fill-current animate-pulse" />
              <span>Free open-source platform — forever</span>
            </span>
            <span>No ads tracking</span>
          </div>
        </div>
      </div>

      {/* 2. Frequently Asked Questions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">FAQ Core Guidelines</h2>
        <div className="space-y-3">
          {[
            { q: "Is registration or signing up required?", a: "No. All terms, cheat sheets, interview questions, and curriculum roadmaps are completely open-access. We believe in barrier-free education." },
            { q: "How are explanations checked and verified?", a: "AIpedia definitions match standard production SDK guidelines (such as Google GenAI, LangChain LCEL protocols, and Hugging Face PEFT documentation). Each term is vetted by real practitioners prior to commit." },
            { q: "Can I copy the code for commercial projects?", a: "Yes. All code blocks and templates are MIT-Licensed. You can copy and execute our Python, FastAPI, and SQL scripts directly under standard commercial guidelines." },
            { q: "Do you support affiliate listings or AdSense?", a: "We run clean, affiliate-compliant listings of world-class courses (Andrew Ng's lectures, Kaggle directories) without annoying intrusive popups, ensuring high Core Web Vitals SEO loading performance." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border rounded-2xl p-4 sm:p-5 space-y-1.5 shadow-xs">
              <p className="text-xs font-black text-slate-800">Q: {item.q}</p>
              <p className="text-xs text-slate-550 leading-normal">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Feedback and Enquiries Form */}
      <div className="border border-slate-150 rounded-3xl p-6 sm:p-8 bg-white grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact info left */}
        <div className="md:col-span-4 space-y-4">
          <h2 className="text-lg font-bold text-slate-950">Write To Us</h2>
          <p className="text-xs text-slate-500 leading-normal">
            Have some core suggestions or want to contribute new study questions? Send us an inquiry message directly.
          </p>
          <div className="space-y-4.5 pt-2 text-xs font-semibold text-slate-650">
            <div className="flex items-center gap-2">
              <Mail className="h-4.5 w-4.5 text-blue-600" />
              <span>support@aipedia.org</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4.5 w-4.5 text-blue-600" />
              <span>github.com/sharadwaje03/aipedia</span>
            </div>
          </div>
        </div>

        {/* Form elements right */}
        <form onSubmit={handleSubmit} className="md:col-span-8 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wide">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name..."
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs border rounded-lg bg-white outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs border rounded-lg bg-white outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Message Area */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wide">Message details</label>
            <textarea
              placeholder="What technical terms or roadmaps would you like us to explain tomorrow?..."
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 text-xs border rounded-lg bg-white outline-none focus:ring-1 focus:ring-blue-500 resize-none font-semibold text-slate-700"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-xs cursor-pointer select-none"
            >
              <Send className="h-4 w-4" />
              <span>{submitted ? "Message Sent! ✔" : "Send Feedback"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
