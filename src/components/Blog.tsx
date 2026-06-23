import React, { useState, useEffect } from "react";
import { BookOpen, ArrowLeft, Calendar, User, Clock, ChevronRight, Share2, Star } from "lucide-react";
import { blogArticles } from "../data/blogs";
import { BlogArticle } from "../types";

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ["All", "RAG", "Agents", "LLMs", "Fine-Tuning"];

  const filteredArticles = blogArticles.filter((article) => {
    return selectedFilter === "All" || article.category.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {selectedArticle ? (
        /* Blog Detail Reading Layout */
        <div className="max-w-3xl mx-auto text-left space-y-6 pb-12 animate-fade-in">
          {/* Back button */}
          <button
            id="back-to-blogs-btn"
            onClick={() => {
              setSelectedArticle(null);
              window.scrollTo({ top: 0 });
            }}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition py-1 cursor-pointer select-none"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to all lessons</span>
          </button>

          {/* Title and metadata */}
          <div className="space-y-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {selectedArticle.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {selectedArticle.title}
            </h1>

            {/* Author and Read-time */}
            <div className="flex flex-wrap gap-4 items-center text-xs text-slate-400 font-semibold border-y border-slate-100 py-3">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4 text-slate-350" />
                <span>By {selectedArticle.author}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-slate-350" />
                <span>{selectedArticle.date}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-slate-350" />
                <span>{selectedArticle.readTime}</span>
              </span>
            </div>
          </div>

          {/* Actual Markdowns / Content text */}
          <article className="prose max-w-none text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-wrap select-text font-normal space-y-4 pt-2">
            {selectedArticle.content}
          </article>

          {/* Shared prompt footer helper */}
          <div className="border-t border-slate-100 pt-6 mt-8 p-5 bg-slate-50 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-xs font-bold text-slate-800">Was this article helper useful?</p>
              <p className="text-[11px] text-slate-400">Share or copy learning articles to help other developers.</p>
            </div>
            <button
              id="share-article-btn"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 2000);
              }}
              className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs border ${
                copiedLink
                  ? "text-emerald-600 bg-emerald-50 border-emerald-300"
                  : "text-blue-600 bg-white border-slate-205 hover:bg-slate-50"
              }`}
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>{copiedLink ? "Copied Link!" : "Copy Lesson Link"}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Blogs List directory Grid layout */
        <div className="space-y-8 text-left">
          {/* Header Title */}
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AIpedia Blog & Tutorials</h1>
            <p className="text-slate-500 text-sm">
              Practitioner blogs and deep cuts explaining LLM parameters, chunking systems, and efficient adapter deployments.
            </p>
          </div>

          {/* Filters category bar */}
          <div className="flex gap-2 border-b border-slate-100 pb-2">
            {categories.map((cat, idx) => (
              <button
                id={`blog-filter-btn-${idx}`}
                key={idx}
                onClick={() => setSelectedFilter(cat)}
                className={`text-xs px-3.5 py-1.8 font-bold rounded-lg transition cursor-pointer select-none ${
                  selectedFilter === cat
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards directory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => {
              return (
                <div
                  key={article.id}
                  onClick={() => {
                    setSelectedArticle(article);
                    window.scrollTo({ top: 0 });
                  }}
                  className="bg-white border border-slate-150 hover:border-blue-400 p-6 rounded-2xl transition hover:shadow-md cursor-pointer flex flex-col justify-between text-left group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded">
                        {article.category}
                      </span>
                      <span className="text-slate-400 font-semibold">{article.readTime}</span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-blue-600 transition leading-tight line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-50 flex justify-between items-center text-xs font-bold text-blue-600">
                    <span>Read tutorial</span>
                    <ChevronRight className="h-4 w-4 transform group-hover:translate-x-0.8 transition" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
