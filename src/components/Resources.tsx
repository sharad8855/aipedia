import React, { useState } from "react";
import { Search, ExternalLink, BookmarkCheck, Star, Award, BookOpen, DownloadCloud, Github, FileText, Youtube } from "lucide-react";
import { resourceItems } from "../data/resources";
import { ResourceItem } from "../types";

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Assets", icon: BookOpen },
    { id: "course", label: "Free Courses", icon: Award },
    { id: "dataset", label: "Datasets", icon: DownloadCloud },
    { id: "github", label: "GitHub Repos", icon: Github },
    { id: "paper", label: "Research Papers", icon: FileText }
  ];

  const filteredResources = resourceItems.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || res.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div className="text-left space-y-2 mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Resource Directory</h1>
        <p className="text-slate-500 text-sm">
          A hand-picked, verified catalog of totally free courses, model datasets, active programming libraries, and foundational research papers.
        </p>
      </div>

      {/* Filter and search bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white border border-slate-150 p-4 rounded-2xl mb-8">
        {/* Category triggers */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const active = selectedCategory === cat.id;
            return (
              <button
                id={`res-cat-btn-${idx}`}
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-3 py-1.8 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer select-none ${
                  active
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Input */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tags, Hugging Face lists..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Resource Cards Grid render */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {filteredResources.length === 0 ? (
          <div className="md:col-span-2 p-16 bg-white border rounded-2xl text-center">
            <BookOpen className="h-10 w-10 text-slate-350 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-550">No resources found matching keywords</p>
          </div>
        ) : (
          filteredResources.map((res, idx) => {
            return (
              <div
                key={idx}
                className="bg-white border border-slate-150 rounded-2xl p-5 hover:shadow-md transition duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[10px] font-extrabold uppercase bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded">
                      {res.category}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                      {res.cost && <span>{res.cost}</span>}
                      {res.rating && (
                        <span className="text-amber-500 flex items-center gap-0.5">
                          ★ {res.rating}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-extrabold text-slate-950 text-sm sm:text-base leading-snug">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    {res.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {res.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-slate-100 text-[10px] font-bold text-slate-550 px-2 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-semibold block">Curated Hub Asset</span>
                  <a
                    href={res.url}
                    onError={() => {}}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-500 hover:underline shrink-0"
                  >
                    <span>Visit resource</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
