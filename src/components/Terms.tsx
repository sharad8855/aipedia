import React, { useState, useEffect } from "react";
import { Search, Bookmark, BookmarkCheck, ArrowRight, BookOpen, ExternalLink, HelpCircle, Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { aiTerms } from "../data/terms";
import { AITerm } from "../types";

interface TermsProps {
  initialTermId?: string;
  initialCategory?: string;
  onBookmarkChanged?: () => void;
}

export default function Terms({ initialTermId, initialCategory, onBookmarkChanged }: TermsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTerm, setSelectedTerm] = useState<AITerm | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Category options
  const categories = ["All", "RAG", "LLMs", "Agents", "AI Basics", "Fine-Tuning"];

  // Load bookmarks on initialize
  useEffect(() => {
    const saved = localStorage.getItem("aipedia_bookmarks_terms");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  // Update selected term on parent trigger
  useEffect(() => {
    if (initialTermId) {
      const match = aiTerms.find((t) => t.id === initialTermId);
      if (match) {
        setSelectedTerm(match);
        // Scroll detail panel into view if mobile
        const el = document.getElementById("detail-panel-anchor");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (initialCategory) {
      setSelectedCategory(initialCategory);
      setSelectedTerm(null);
    }
  }, [initialTermId, initialCategory]);

  const toggleBookmark = (id: string) => {
    let updated = [...bookmarks];
    if (updated.includes(id)) {
      updated = updated.filter((item) => item !== id);
    } else {
      updated.push(id);
    }
    setBookmarks(updated);
    localStorage.setItem("aipedia_bookmarks_terms", JSON.stringify(updated));
    if (onBookmarkChanged) onBookmarkChanged();
  };

  // Filter terms list
  const filteredTerms = aiTerms.filter((term) => {
    const matchesSearch =
      term.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.explanation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      term.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Always pre-fill a chosen term if none is selected
  const firstFilteredTermId = filteredTerms[0]?.id;
  useEffect(() => {
    if (!selectedTerm && firstFilteredTermId) {
      const match = aiTerms.find((t) => t.id === firstFilteredTermId);
      if (match) {
        setSelectedTerm(match);
      }
    }
  }, [firstFilteredTermId, selectedTerm === null]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div className="text-left space-y-2 mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Terms Glossary</h1>
        <p className="text-slate-500 text-sm">
          Deep-dive technical details of complex AI, Machine Learning, and Agent concepts broken down into simple English equations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Search + Lists Directory Column */}
        <div className="lg:col-span-4 space-y-4">
          {/* Instant Search Bar Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search terms, concepts, algorithms..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedTerm(null); // Reset detail preference behavior
              }}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-350 bg-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          {/* Categories Quick Filter Selector */}
          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat, idx) => (
              <button
                id={`cat-filter-btn-${idx}`}
                key={idx}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedTerm(null); // Reset detail preference behavior
                }}
                className={`text-xs px-3 py-1.5 font-semibold rounded-full transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Terms Count Badge */}
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold px-1">
            <span>Matches ({filteredTerms.length} terms)</span>
            <span>Click any card to read details</span>
          </div>

          {/* Terms Scrollable Cards container */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredTerms.length === 0 ? (
              <div className="p-8 bg-slate-50 rounded-xl text-center border">
                <p className="text-sm font-semibold text-slate-500">No matching concepts found</p>
                <p className="text-xs text-slate-400 mt-1">Try testing other keywords or clearing query searches.</p>
              </div>
            ) : (
              filteredTerms.map((term) => {
                const isBookmarked = bookmarks.includes(term.id);
                const isSelected = selectedTerm?.id === term.id;
                return (
                  <div
                    id={`term-card-select-${term.id}`}
                    key={term.id}
                    onClick={() => {
                      setSelectedTerm(term);
                      const el = document.getElementById("detail-panel-anchor");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`p-4 border rounded-xl text-left transition cursor-pointer select-none relative group ${
                      isSelected
                        ? "border-blue-500 bg-blue-50/20 shadow-xs"
                        : "border-slate-150 bg-white hover:border-slate-350 hover:bg-slate-50/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {term.category}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1.5">{term.name}</h4>
                      </div>
                      <button
                        id={`bookmark-ico-${term.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(term.id);
                        }}
                        className="text-slate-400 hover:text-blue-500 transition-colors p-1 rounded hover:bg-slate-100"
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 leading-normal line-clamp-2 mt-2">
                      {term.shortDesc}
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                      <span>Full documentation</span>
                      <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Deep-Dive Detail View Column */}
        <div id="detail-panel-anchor" className="lg:col-span-8 scroll-mt-6">
          {selectedTerm ? (
            <div className="bg-white border border-slate-150 rounded-2xl shadow-sm p-6 sm:p-8 text-left space-y-6">
              {/* Header Title node */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-100">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {selectedTerm.category}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">Indexed Term ID: {selectedTerm.id}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {selectedTerm.name}
                  </h2>
                </div>
                {/* Large toggle bookmark button */}
                <button
                  id="detail-bookmark-btn"
                  onClick={() => toggleBookmark(selectedTerm.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border transition cursor-pointer select-none ${
                    bookmarks.includes(selectedTerm.id)
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-350"
                  }`}
                >
                  {bookmarks.includes(selectedTerm.id) ? (
                    <>
                      <BookmarkCheck className="h-4 w-4 text-emerald-500" />
                      <span>Saved to study list</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4" />
                      <span>Bookmark for review</span>
                    </>
                  )}
                </button>
              </div>

              {/* 1. Dynamic Definition Block */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Definition</h3>
                <div className="bg-emerald-50/40 border-l-4 border-emerald-500 p-4 rounded-r-xl select-all">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic font-medium">
                    "{selectedTerm.definition}"
                  </p>
                </div>
              </div>

              {/* 2. Conversational Analogy / Simple Explanation */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  <span>Simple Explanation (No Jargon)</span>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap select-text">
                  {selectedTerm.explanation}
                </p>
              </div>

              {/* 3. Real World Example Case */}
              <div className="bg-blue-50/40 border border-blue-200/60 p-5 rounded-xl text-slate-800 space-y-2">
                <h4 className="font-bold text-blue-900 text-xs uppercase tracking-wider flex items-center gap-1">
                  <span>💡 Real World Analogy & Example</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {selectedTerm.example}
                </p>
              </div>

              {/* 4. Grid lists of Use cases */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Top Use Cases</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedTerm.useCases.map((use, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex items-start gap-2 text-xs">
                      <span className="bg-blue-600 text-white rounded-full font-bold h-4 w-4 flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-slate-700 font-medium">{use}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Advantages & Disadvantages Side by Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pros */}
                <div className="bg-emerald-50/20 border border-emerald-100 p-4 rounded-xl text-left space-y-3">
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    <ThumbsUp className="h-3 w-3" /> Pros / Advantages
                  </span>
                  <div className="space-y-2">
                    {selectedTerm.advantages.map((adv, idx) => (
                      <p key={idx} className="text-xs text-slate-600 leading-relaxed font-semibold">
                        ✔ {adv}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Cons */}
                <div className="bg-rose-50/20 border border-rose-100 p-4 rounded-xl text-left space-y-3">
                  <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    <ThumbsDown className="h-3 w-3" /> Cons / Disadvantages
                  </span>
                  <div className="space-y-2">
                    {selectedTerm.disadvantages.map((dis, idx) => (
                      <p key={idx} className="text-xs text-slate-600 leading-relaxed font-semibold">
                        ❌ {dis}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* 6. Typical Interview Questions Card */}
              {selectedTerm.interviewQuestions && selectedTerm.interviewQuestions.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="h-4 w-4 text-emerald-500" />
                    <span>Interview Quick prep</span>
                  </h3>
                  <div className="space-y-3">
                    {selectedTerm.interviewQuestions.map((q, idx) => (
                      <div key={idx} className="bg-slate-50 border p-4 rounded-xl space-y-2">
                        <p className="text-xs font-bold text-slate-800">Q: {q.question}</p>
                        <p className="text-xs text-slate-600 italic leading-relaxed">A: {q.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Related Concepts Quick Nodes */}
              {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Related Terms</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTerm.relatedTerms.map((tId) => {
                      const matchNode = aiTerms.find((term) => term.id === tId);
                      if (!matchNode) return null;
                      return (
                        <button
                          id={`nav-related-term-${tId}`}
                          key={tId}
                          onClick={() => {
                            setSelectedTerm(matchNode);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 border text-xs px-3 py-1 rounded-lg font-bold transition flex items-center gap-1"
                        >
                          <span>{matchNode.name}</span>
                          <ArrowRight className="h-3 w-3 uppercase" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 8. Reference Links */}
              {selectedTerm.references && selectedTerm.references.length > 0 && (
                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3 items-center text-[11px] text-slate-400">
                  <span className="font-bold uppercase tracking-wider">References:</span>
                  <div className="flex gap-4">
                    {selectedTerm.references.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center gap-1 font-semibold"
                      >
                        <span>{item.title}</span>
                        <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-16 bg-white border rounded-2xl text-center shadow-xs">
              <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-500">Pick an entry on the left column</p>
              <p className="text-xs text-slate-400 mt-1">Select any item to parse its detailed breakdown, analogy explanations, use cases and interview Qs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
