import React, { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck, Search, BookOpen, Trash2, HelpCircle, ChevronRight, GraduationCap } from "lucide-react";
import { aiTerms } from "../data/terms";
import { interviewQuestions } from "../data/questions";
import { AITerm, InterviewQuestion } from "../types";

interface BookmarksProps {
  onNavigateToTerm: (termId: string) => void;
}

export default function Bookmarks({ onNavigateToTerm }: BookmarksProps) {
  const [bookmarkedTerms, setBookmarkedTerms] = useState<AITerm[]>([]);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<InterviewQuestion[]>([]);
  const [activeTab, setActiveTab] = useState<"terms" | "questions">("terms");

  const loadBookmarks = () => {
    // Load terms
    const savedTerms = localStorage.getItem("aipedia_bookmarks_terms");
    if (savedTerms) {
      const ids: string[] = JSON.parse(savedTerms);
      setBookmarkedTerms(aiTerms.filter((t) => ids.includes(t.id)));
    } else {
      setBookmarkedTerms([]);
    }

    // Load questions
    const savedQs = localStorage.getItem("aipedia_bookmarks_questions");
    if (savedQs) {
      const ids: string[] = JSON.parse(savedQs);
      setBookmarkedQuestions(interviewQuestions.filter((q) => ids.includes(q.id)));
    } else {
      setBookmarkedQuestions([]);
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  const handleClearTermBookmark = (id: string) => {
    const saved = localStorage.getItem("aipedia_bookmarks_terms");
    if (saved) {
      let ids: string[] = JSON.parse(saved);
      ids = ids.filter((item) => item !== id);
      localStorage.setItem("aipedia_bookmarks_terms", JSON.stringify(ids));
      loadBookmarks();
    }
  };

  const handleClearQuestionBookmark = (id: string) => {
    const saved = localStorage.getItem("aipedia_bookmarks_questions");
    if (saved) {
      let ids: string[] = JSON.parse(saved);
      ids = ids.filter((item) => item !== id);
      localStorage.setItem("aipedia_bookmarks_questions", JSON.stringify(ids));
      loadBookmarks();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div className="text-left space-y-2 mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <span>My Study Checklist</span>
        </h1>
        <p className="text-slate-500 text-sm">
          A personalized syllabus directory of your saved cards. Review definitions, analogies, and questions before tests.
        </p>
      </div>

      {/* Switch between terms and questions */}
      <div className="flex border-b border-erase mb-8">
        <button
          id="bookmark-terms-tab-btn"
          onClick={() => setActiveTab("terms")}
          className={`pb-3 text-sm px-6 font-bold cursor-pointer select-none transition border-b-2 ${
            activeTab === "terms"
              ? "border-blue-600 text-blue-700"
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          Saved Terms ({bookmarkedTerms.length})
        </button>
        <button
          id="bookmark-questions-tab-btn"
          onClick={() => setActiveTab("questions")}
          className={`pb-3 text-sm px-6 font-bold cursor-pointer select-none transition border-b-2 ${
            activeTab === "questions"
              ? "border-blue-600 text-blue-700"
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          Interview Questions ({bookmarkedQuestions.length})
        </button>
      </div>

      {/* Content directory */}
      <div className="text-left">
        {activeTab === "terms" ? (
          /* Terms Bookmarks */
          <div>
            {bookmarkedTerms.length === 0 ? (
              <div className="p-16 bg-white border border-slate-150 rounded-2xl text-center max-w-xl mx-auto">
                <Bookmark className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 text-sm">Your study glossary is empty</h3>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  Click 'Bookmark card' inside any AI term on the Terms page to populate your study checklist.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedTerms.map((term) => (
                  <div
                    key={term.id}
                    className="p-5 bg-white border border-slate-150 rounded-2xl flex flex-col justify-between shadow-xs relative group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-extrabold uppercase bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded">
                          {term.category}
                        </span>
                        <button
                          id={`erase-bookmark-term-${term.id}`}
                          onClick={() => handleClearTermBookmark(term.id)}
                          className="text-slate-400 hover:text-rose-600 transition p-1 rounded hover:bg-slate-50 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <h4 className="font-bold text-slate-950 text-sm sm:text-base leading-tight">
                        {term.name}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mt-2">
                        {term.shortDesc}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-50 flex justify-between items-center text-xs font-bold text-blue-600">
                      <button
                        id={`read-term-details-bookmark-${term.id}`}
                        onClick={() => onNavigateToTerm(term.id)}
                        className="flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <span>Full deep dive</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Questions Bookmarks */
          <div className="space-y-4 max-w-3xl mx-auto">
            {bookmarkedQuestions.length === 0 ? (
              <div className="p-16 bg-white border border-slate-150 rounded-2xl text-center">
                <HelpCircle className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 text-sm">No interview questions saved</h3>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  Click the bookmark icon beside custom interview cards to append your study lists!
                </p>
              </div>
            ) : (
              bookmarkedQuestions.map((q) => (
                <div
                  key={q.id}
                  className="bg-white border rounded-2xl p-5 shadow-xs space-y-3 relative text-left"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {q.category}
                        </span>
                        <span className="text-[10px] text-indigo-600 font-bold">Difficulty: {q.difficulty}</span>
                      </div>
                      <h4 className="font-bold text-slate-950 text-sm sm:text-base leading-tight">
                        {q.question}
                      </h4>
                    </div>
                    <button
                      id={`erase-bookmark-question-${q.id}`}
                      onClick={() => handleClearQuestionBookmark(q.id)}
                      className="text-slate-450 hover:text-rose-600 p-1.5 transition rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>

                  <div className="bg-slate-50/55 p-3.5 rounded-lg border text-xs text-slate-600 leading-normal whitespace-pre-wrap italic">
                    {/* Display beginner version in study checklist directly */}
                    <span className="font-bold text-slate-700 block not-italic mb-1">Quick Analogy recap:</span>
                    "{q.beginnerAnswer}"
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
