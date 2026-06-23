import React, { useState, useEffect } from "react";
import {
  Brain,
  Search,
  Github,
  Menu,
  X,
  BookOpen,
  HelpCircle,
  TrendingUp,
  FileCode,
  Sliders,
  Award,
  BookMarked,
  Sparkles,
  Info,
  GitPullRequest,
  Heart,
  ChevronDown
} from "lucide-react";

import Home from "./components/Home";
import Terms from "./components/Terms";
import Questions from "./components/Questions";
import Roadmaps from "./components/Roadmaps";
import CheatSheets from "./components/CheatSheets";
import ModelComparison from "./components/ModelComparison";
import Resources from "./components/Resources";
import Blog from "./components/Blog";
import Bookmarks from "./components/Bookmarks";
import Quiz from "./components/Quiz";
import AboutContact from "./components/AboutContact";
import SEOInspector from "./components/SEOInspector";

import { aiTerms } from "./data/terms";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  // States passed between nodes
  const [routingArgs, setRoutingArgs] = useState<{ id?: string; category?: string } | undefined>(undefined);

  // Autocomplete suggestions based on general index query
  const autocompleteSuggestions = aiTerms.filter((term) => {
    if (!globalSearchQuery.trim()) return false;
    return (
      term.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      term.category.toLowerCase().includes(globalSearchQuery.toLowerCase())
    );
  });

  // Calculate bookmark count on load & trigger
  const updateBookmarkCount = () => {
    const savedTerms = localStorage.getItem("aipedia_bookmarks_terms");
    const savedQs = localStorage.getItem("aipedia_bookmarks_questions");
    const countTerms = savedTerms ? JSON.parse(savedTerms).length : 0;
    const countQs = savedQs ? JSON.parse(savedQs).length : 0;
    setBookmarkCount(countTerms + countQs);
  };

  useEffect(() => {
    updateBookmarkCount();
    // Periodically sync bookmark counters
    const interval = setInterval(updateBookmarkCount, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (tab: string, arg?: { id?: string; category?: string }) => {
    setActiveTab(tab);
    setRoutingArgs(arg);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectSuggestion = (id: string) => {
    setGlobalSearchQuery("");
    setShowSearchDropdown(false);
    handleNavigate("terms", { id });
  };

  return (
    <div className="min-h-screen bg-slate-50/20 text-slate-800 flex flex-col font-sans select-none antialiased">
      {/* Dynamic SEO Inspector drawer */}
      <SEOInspector
        activeTab={activeTab}
        detailId={routingArgs?.id}
        detailName={
          routingArgs?.id
            ? aiTerms.find((t) => t.id === routingArgs.id)?.name || routingArgs.id
            : undefined
        }
      />

      {/* Global Navigation header matching requirements */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-150 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            {/* Left: Branding site logo */}
            <div
              onClick={() => handleNavigate("home")}
              className="flex items-center gap-2 cursor-pointer shrink-0 select-none group"
            >
              <div className="h-9 w-9 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/10 group-hover:scale-103 transition">
                <Brain className="h-5 w-5 animate-pulse" />
              </div>
              <div className="text-left">
                <span className="font-black text-xl tracking-tight text-slate-900 leading-none block">
                  AIpedia
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none block mt-0.5">
                  Learn AI Free
                </span>
              </div>
            </div>

            {/* Middle: Desktop Navigation links */}
            <nav className="hidden lg:flex items-center gap-1">
              {[
                { tabID: "terms", label: "AI Terms" },
                { tabID: "questions", label: "Interview Prep" },
                { tabID: "roadmaps", label: "Roadmaps" },
                { tabID: "cheatsheets", label: "Cheat Sheets" },
                { tabID: "models", label: "Model Matrix" },
                { tabID: "resources", label: "Resources" },
                { tabID: "blog", label: "Blog" },
                { tabID: "quiz", label: "Study Quiz" }
              ].map((item) => {
                const isActive = activeTab === item.tabID;
                return (
                  <button
                    id={`nav-link-header-${item.tabID}`}
                    key={item.tabID}
                    onClick={() => handleNavigate(item.tabID)}
                    className={`px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      isActive
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right: Search, Bookmarks index, GitHub Trigger */}
            <div className="hidden sm:flex items-center gap-2 max-w-sm flex-1 lg:max-w-xs relative">
              {/* Autocomplete Input */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ask AIpedia terms..."
                  value={globalSearchQuery}
                  onFocus={() => setShowSearchDropdown(true)}
                  onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                  onChange={(e) => setGlobalSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-205 text-slate-800 bg-slate-50/50 hover:bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white focus:border-blue-400 transition"
                />

                {/* Suggestions overlay */}
                {showSearchDropdown && autocompleteSuggestions.length > 0 && (
                  <div className="absolute top-11 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 animate-slide-in text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2 border-b">
                      Index Match Suggestions
                    </p>
                    <div className="max-h-56 overflow-y-auto">
                      {autocompleteSuggestions.map((term) => (
                        <button
                          id={`suggest-item-btn-${term.id}`}
                          key={term.id}
                          onMouseDown={() => selectSuggestion(term.id)}
                          className="w-full text-left px-3 py-2.5 hover:bg-slate-50 border-b border-slate-50 last:border-0 flex justify-between items-center transition"
                        >
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">
                              {term.name}
                            </span>
                            <span className="text-[10px] text-slate-400">{term.category}</span>
                          </div>
                          <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                            View
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Study bookmarks button */}
              <button
                id="bookmark-shortcut-btn"
                onClick={() => handleNavigate("bookmarks")}
                className={`p-2 rounded-lg border transition relative hover:bg-slate-50 shrink-0 cursor-pointer ${
                  activeTab === "bookmarks" ? "border-blue-500 bg-blue-50/10" : "border-slate-200"
                }`}
                title="Saved Study Checklist"
              >
                <BookMarked className={`h-4 w-4 ${activeTab === "bookmarks" ? "text-blue-600" : "text-slate-500"}`} />
                {bookmarkCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full text-[9px] font-extrabold h-4.5 w-4.5 flex items-center justify-center border-2 border-white animate-scale-in">
                    {bookmarkCount}
                  </span>
                )}
              </button>

              {/* GitHub Star key trigger button */}
              <a
                href="https://github.com/sharadwaje03/aipedia"
                onError={() => {}}
                target="_blank"
                rel="noreferrer"
                id="github-nav-trigger-btn"
                className="flex items-center gap-1.5 text-xs font-bold border border-slate-200 hover:border-slate-300 rounded-lg px-3 py-1.8 bg-white hover:bg-slate-50 transition shrink-0 hover:-translate-y-0.5 duration-150 block text-slate-700 font-semibold"
              >
                <Github className="h-4 w-4 text-slate-800" />
                <span>GitHub Repos</span>
              </a>
            </div>

            {/* Left: Mobile menu triggers */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                id="mobile-bookmark-shortcut-btn"
                onClick={() => handleNavigate("bookmarks")}
                className="p-2 border rounded-lg hover:bg-slate-50 relative shrink-0"
              >
                <BookMarked className="h-4 w-4 text-slate-600" />
                {bookmarkCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white font-bold rounded-full text-[8px] h-4 w-4 flex items-center justify-center">
                    {bookmarkCount}
                  </span>
                )}
              </button>

              <button
                id="mobile-menu-trigger-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 border rounded-lg hover:bg-slate-50"
              >
                {mobileMenuOpen ? <X className="h-5 w-5 text-slate-800" /> : <Menu className="h-5 w-5 text-slate-850" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel overlay drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white shadow-xl animate-slide-in text-left p-4 space-y-4">
            {/* Quick search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search AI terms..."
                value={globalSearchQuery}
                onFocus={() => setShowSearchDropdown(true)}
                onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
              />
              {showSearchDropdown && autocompleteSuggestions.length > 0 && (
                <div className="absolute top-11 left-0 right-0 bg-white border rounded-xl shadow-xl z-50">
                  {autocompleteSuggestions.slice(0, 4).map((term) => (
                    <button
                      id={`mobile-suggest-btn-${term.id}`}
                      key={term.id}
                      onMouseDown={() => selectSuggestion(term.id)}
                      className="w-full text-left px-3 py-2 border-b last:border-0 text-xs text-slate-800"
                    >
                      {term.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Menu Items loop */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { tabID: "home", label: "Home Base" },
                { tabID: "terms", label: "AI Terms Glossary" },
                { tabID: "questions", label: "Interview preparation" },
                { tabID: "roadmaps", label: "Syllabus Roadmaps" },
                { tabID: "cheatsheets", label: "Print Code sheets" },
                { tabID: "models", label: "Model Matrix" },
                { tabID: "resources", label: "Courses & Datasets" },
                { tabID: "blog", label: "Blogs & Guides" },
                { tabID: "quiz", label: "Active Challenges" },
                { tabID: "bookmarks", label: "Saved checklist" }
              ].map((item) => (
                <button
                  id={`mobile-nav-btn-${item.tabID}`}
                  key={item.tabID}
                  onClick={() => handleNavigate(item.tabID)}
                  className={`px-3 py-2.5 text-xs font-black rounded-xl text-left transition ${
                    activeTab === item.tabID ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Social details bottom */}
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
              <a
                href="https://github.com/sharadwaje03/aipedia"
                className="flex items-center gap-1 text-slate-705 font-bold"
              >
                <Github className="h-4 w-4" />
                <span>GitHub Repository</span>
              </a>
              <span>MIT Licensed</span>
            </div>
          </div>
        )}
      </header>

      {/* Main Container node */}
      <main className="flex-1 max-w-full">
        {activeTab === "home" && <Home onNavigate={handleNavigate} />}
        {activeTab === "terms" && (
          <Terms
            initialTermId={routingArgs?.id}
            initialCategory={routingArgs?.category}
            onBookmarkChanged={updateBookmarkCount}
          />
        )}
        {activeTab === "questions" && <Questions />}
        {activeTab === "roadmaps" && <Roadmaps initialRoadmapId={routingArgs?.id} />}
        {activeTab === "cheatsheets" && <CheatSheets />}
        {activeTab === "models" && <ModelComparison />}
        {activeTab === "resources" && <Resources />}
        {activeTab === "blog" && <Blog />}
        {activeTab === "bookmarks" && <Bookmarks onNavigateToTerm={(termId) => handleNavigate("terms", { id: termId })} />}
        {activeTab === "quiz" && <Quiz />}
      </main>

      {/* Structured compliant footer section */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12 text-left selection:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-12 gap-8 mb-12">
          {/* Logo & description column left */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight select-none">
                AIpedia
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs block font-semibold leading-relaxed">
              The free AI knowledge platform for students, developers and startup founders. Open-source curriculum designed for public study.
            </p>
            <div className="flex gap-4 text-slate-500 pt-1">
              <a href="https://github.com/sharadwaje03" target="_blank" rel="noreferrer" className="hover:text-white transition">
                <Github className="h-4.5 w-4.5" />
              </a>
              <span className="text-slate-700">|</span>
              <span className="text-[10px] text-slate-550 font-bold self-center">AdSense ready blueprint</span>
            </div>
          </div>

          {/* Nav groups */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider">Explore</h4>
            <div className="flex flex-col gap-2 text-xs">
              <button onClick={() => handleNavigate("terms")} className="hover:text-white transition text-left cursor-pointer">
                AI Terms
              </button>
              <button onClick={() => handleNavigate("roadmaps")} className="hover:text-white transition text-left cursor-pointer">
                AI Roadmaps
              </button>
              <button onClick={() => handleNavigate("cheatsheets")} className="hover:text-white transition text-left cursor-pointer">
                Cheat Sheets
              </button>
              <button onClick={() => handleNavigate("resources")} className="hover:text-white transition text-left cursor-pointer">
                Resources
              </button>
            </div>
          </div>

          {/* Learn groups */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider">Learn Concepts</h4>
            <div className="flex flex-col gap-2 text-xs">
              <button onClick={() => handleNavigate("questions")} className="hover:text-white transition text-left cursor-pointer">
                Interview Prep
              </button>
              <button onClick={() => handleNavigate("terms", { category: "RAG" })} className="hover:text-white transition text-left cursor-pointer">
                RAG Guides
              </button>
              <button onClick={() => handleNavigate("terms", { category: "Agents" })} className="hover:text-white transition text-left cursor-pointer">
                AI Agents
              </button>
              <button onClick={() => handleNavigate("quiz")} className="hover:text-white transition text-left cursor-pointer">
                Study Challenge
              </button>
            </div>
          </div>

          {/* Community groups */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider">Community</h4>
            <div className="flex flex-col gap-2 text-xs">
              <a href="https://github.com/sharadwaje03/aipedia" target="_blank" rel="noreferrer" className="hover:text-white transition">
                Contribute Term
              </a>
              <a href="https://github.com/sharadwaje03/aipedia/stargazers" target="_blank" rel="noreferrer" className="hover:text-white transition">
                GitHub Stargazers
              </a>
              <a href="https://github.com/sharadwaje03/aipedia/fork" target="_blank" rel="noreferrer" className="hover:text-white transition">
                Fork Repository
              </a>
              <span className="text-emerald-500 font-bold block">✔ Active build</span>
            </div>
          </div>

          {/* Legal groups */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider">Legal & Credits</h4>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <span className="block">Privacy Policy</span>
              <span className="block">Terms of Service</span>
              <span className="block">Disclaimer Code</span>
              <span className="block select-text">Contact: support@aipedia.org</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright alignment matching layouts */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-slate-500 font-semibold uppercase tracking-wider">
            Made with <Heart className="h-3 w-3 inline text-rose-600 fill-current" /> for the Global AI Community
          </p>
          <p className="text-slate-500 select-text">
            © 2026 AIpedia Platform. Open Source under the MIT license directive.
          </p>
        </div>
      </footer>
    </div>
  );
}
