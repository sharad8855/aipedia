import React, { useState, useEffect } from "react";
import { Search, HelpCircle, Shield, Award, CheckCircle2, Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, Sliders } from "lucide-react";
import { interviewQuestions } from "../data/questions";
import { InterviewQuestion } from "../types";

export default function Questions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [activeTabs, setActiveTabs] = useState<Record<string, "beginner" | "intermediate" | "advanced">>({});
  const [bookmarkedQs, setBookmarkedQs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedDifficulty, itemsPerPage]);

  // Categories list
  const categories = [
    "All",
    "Python",
    "Machine Learning",
    "Deep Learning",
    "LLM",
    "LangChain",
    "LangGraph",
    "RAG",
    "MCP",
    "FASTAPI",
    "SQL",
    "Agents",
    "Vector Databases",
    "Evaluation",
    "Security"
  ];

  // Initialize bookmarks
  useEffect(() => {
    const saved = localStorage.getItem("aipedia_bookmarks_questions");
    if (saved) {
      setBookmarkedQs(JSON.parse(saved));
    }
  }, []);

  const toggleBookmark = (id: string) => {
    let updated = [...bookmarkedQs];
    if (updated.includes(id)) {
      updated = updated.filter((item) => item !== id);
    } else {
      updated.push(id);
    }
    setBookmarkedQs(updated);
    localStorage.setItem("aipedia_bookmarks_questions", JSON.stringify(updated));
  };

  const changeCardLevel = (qId: string, lvl: "beginner" | "intermediate" | "advanced") => {
    setActiveTabs((prev) => ({
      ...prev,
      [qId]: lvl
    }));
  };

  // Filter lists
  const filteredQuestions = interviewQuestions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.beginnerAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.intermediateAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.advancedAnswer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || q.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesDifficulty =
      selectedDifficulty === "All" || q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {/* Title */}
      <div className="text-left space-y-2 mb-8 animate-fade-in">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Interview prep</h1>
        <p className="text-slate-500 text-sm">
          Master junior to senior level AI engineering roles. Study questions equipped with three gradings of answers depending on your target depth.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Topic Filters */}
        <div className="lg:col-span-3 space-y-3 text-left">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Categories Directory</p>
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat, idx) => (
              <button
                id={`q-cat-tab-${idx}`}
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-4 py-2.5 rounded-xl font-semibold text-left transition shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-50 hover:border-slate-350"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 hidden lg:block">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1 mb-2">Difficulty Scale</p>
            <div className="space-y-1.5">
              {["All", "Beginner", "Intermediate", "Advanced"].map((diff, idx) => (
                <button
                  id={`q-diff-btn-${idx}`}
                  key={idx}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`w-full text-xs px-3 py-2 rounded-lg font-semibold text-left transition flex items-center justify-between ${
                    selectedDifficulty === diff
                      ? "bg-slate-900 text-white"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{diff} Questions</span>
                  <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.2 rounded font-bold">
                    {diff === "All"
                      ? interviewQuestions.length
                      : interviewQuestions.filter((q) => q.difficulty === diff).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Search Results List */}
        <div className="lg:col-span-9 space-y-6">
          {/* Dynamic Top bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white border border-slate-150 p-4 rounded-2xl">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-450" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search code keywords, Python, SQL logic..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Counter info */}
            <div className="text-xs text-slate-500 font-semibold self-center">
              Filtered matches: <span className="text-blue-600 font-bold">{filteredQuestions.length} questions</span>
            </div>
          </div>

          {/* Questions Render Loop */}
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="p-16 bg-white border border-slate-150 rounded-2xl text-center">
                <HelpCircle className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 text-sm">No interview questions matched</h3>
                <p className="text-xs text-slate-400 mt-1">Try testing simpler keywords or changing search options.</p>
              </div>
            ) : (
              (() => {
                const totalQuestions = filteredQuestions.length;
                const totalPages = Math.ceil(totalQuestions / itemsPerPage) || 1;
                // Guard dynamic bounds
                const activePage = Math.min(currentPage, totalPages);
                const displayedQuestions = filteredQuestions.slice(
                  (activePage - 1) * itemsPerPage,
                  activePage * itemsPerPage
                );

                return displayedQuestions.map((q) => {
                  const isBookmarked = bookmarkedQs.includes(q.id);
                  const activeLevel = activeTabs[q.id] || "beginner";

                  // Generate level specific text content
                  let answerText = q.beginnerAnswer;
                  let badgeStyle = "bg-blue-100 text-blue-800";

                  if (activeLevel === "intermediate") {
                    answerText = q.intermediateAnswer;
                    badgeStyle = "bg-indigo-100 text-indigo-800";
                  } else if (activeLevel === "advanced") {
                    answerText = q.advancedAnswer;
                    badgeStyle = "bg-rose-100 text-rose-800";
                  }

                  return (
                    <div
                      key={q.id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 text-left space-y-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Header info */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-[10px] font-extrabold uppercase bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md">
                              {q.category}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeStyle}`}>
                              Difficulty: {q.difficulty}
                            </span>
                          </div>
                          <h3 className="font-black text-slate-900 text-base sm:text-lg leading-tight select-text">
                            {q.question}
                          </h3>
                        </div>

                        {/* Bookmark button */}
                        <button
                          id={`q-bookmark-btn-${q.id}`}
                          onClick={() => toggleBookmark(q.id)}
                          className="text-slate-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-slate-50 transition shrink-0 animate-scale-in"
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="h-5 w-5 text-emerald-500" />
                          ) : (
                            <Bookmark className="h-5 w-5" />
                          )}
                        </button>
                      </div>

                      {/* Multi-tier Answer Switcher tab segment */}
                      <div className="flex border-b border-slate-100 pb-1">
                        {[
                          { level: "beginner", label: "Beginner", desc: "No jargon / Analogy" },
                          { level: "intermediate", label: "Intermediate", desc: "Standard concepts" },
                          { level: "advanced", label: "Advanced", desc: "Engineering / Math" }
                        ].map((btn) => {
                          const isActive = activeLevel === btn.level;
                          return (
                            <button
                              id={`tab-btn-${q.id}-${btn.level}`}
                              key={btn.level}
                              onClick={() => changeCardLevel(q.id, btn.level as any)}
                              className={`flex-1 pb-2.5 text-center px-1 border-b-2 transition cursor-pointer select-none ${
                                isActive
                                  ? "border-blue-600 text-blue-700 font-bold"
                                  : "border-transparent text-slate-400 hover:text-slate-600 font-medium"
                              }`}
                            >
                              <span className="block text-xs">{btn.label}</span>
                              <span className="hidden sm:block text-[9px] text-slate-400 font-normal mt-0.5">
                                {btn.desc}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Display Segment Text details */}
                      <div className="px-4 py-4 rounded-xl bg-slate-50/50 border border-slate-100/60 leading-relaxed text-sm text-slate-700 select-text whitespace-pre-line font-medium min-h-[100px]">
                        {answerText}
                      </div>

                      {/* Bottom action bar */}
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-405 italic pt-1">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                          <span>Formatted for technical grading checklists</span>
                        </span>
                        <span>Verified Answer</span>
                      </div>
                    </div>
                  );
                });
              })()
            )}
          </div>

          {/* Pagination Controls */}
          {filteredQuestions.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-150 p-4 rounded-2xl shadow-xs mt-6 select-none text-left">
              {/* Pagination text info */}
              <div className="text-xs text-slate-500 font-semibold">
                Showing{" "}
                <span className="font-extrabold text-slate-800">
                  {Math.min((currentPage - 1) * itemsPerPage + 1, filteredQuestions.length)}
                </span>{" "}
                to{" "}
                <span className="font-extrabold text-slate-800">
                  {Math.min(currentPage * itemsPerPage, filteredQuestions.length)}
                </span>{" "}
                of <span className="font-extrabold text-slate-800">{filteredQuestions.length}</span> questions
              </div>

              {/* Items Per Page Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-450 font-bold uppercase tracking-wider text-[10px]">Per page:</span>
                <div className="flex gap-1">
                  {[5, 10, 20, 50].map((option) => (
                    <button
                      id={`items-per-page-${option}`}
                      key={option}
                      onClick={() => {
                        setItemsPerPage(option);
                        setCurrentPage(1);
                      }}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                        itemsPerPage === option
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Page Nav Buttons */}
              <div className="flex items-center gap-1">
                <button
                  id="prev-page-btn"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border text-slate-600 transition flex items-center justify-center ${
                    currentPage === 1
                      ? "opacity-30 cursor-not-allowed bg-slate-50 border-slate-100"
                      : "bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 cursor-pointer"
                  }`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-1 max-w-[12rem] overflow-x-auto sm:max-w-none scrollbar-none">
                  {(() => {
                    const totalP = Math.ceil(filteredQuestions.length / itemsPerPage) || 1;
                    return Array.from({ length: totalP }).map((_, i) => {
                      const pageNo = i + 1;
                      const isWithinRange = Math.abs(pageNo - currentPage) <= 1 || pageNo === 1 || pageNo === totalP;

                      if (!isWithinRange) {
                        if (pageNo === 2 || pageNo === totalP - 1) {
                          return (
                            <span key={`dots-${pageNo}`} className="text-xs text-slate-400 px-1 font-bold">
                              ...
                            </span>
                          );
                        }
                        return null;
                      }

                      return (
                        <button
                          id={`page-btn-${pageNo}`}
                          key={pageNo}
                          onClick={() => setCurrentPage(pageNo)}
                          className={`min-w-8 h-8 px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center justify-center cursor-pointer ${
                            currentPage === pageNo
                              ? "bg-blue-600 text-white shadow-xs"
                              : "bg-white text-slate-600 border border-slate-250 hover:bg-slate-50 hover:border-slate-300"
                          }`}
                        >
                          {pageNo}
                        </button>
                      );
                    });
                  })()}
                </div>

                <button
                  id="next-page-btn"
                  onClick={() => {
                    const totalP = Math.ceil(filteredQuestions.length / itemsPerPage) || 1;
                    setCurrentPage((p) => Math.min(totalP, p + 1));
                  }}
                  disabled={currentPage === (Math.ceil(filteredQuestions.length / itemsPerPage) || 1)}
                  className={`p-2 rounded-lg border text-slate-600 transition flex items-center justify-center ${
                    currentPage === (Math.ceil(filteredQuestions.length / itemsPerPage) || 1)
                      ? "opacity-30 cursor-not-allowed bg-slate-50 border-slate-100"
                      : "bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 cursor-pointer"
                  }`}
                  aria-label="Next Page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
