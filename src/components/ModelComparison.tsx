import React, { useState } from "react";
import { Sliders, Search, DollarSign, Brain, FileCode2, Info, Check, X, ArrowUpDown, Award, Trophy } from "lucide-react";
import { aiModels } from "../data/models";
import { AIModel } from "../types";

export default function ModelComparison() {
  const [searchQuery, setSearchQuery] = useState("");
  const [visionOnly, setVisionOnly] = useState(false);
  const [selectedSort, setSelectedSort] = useState<"coding" | "reasoning" | "name">("coding");

  const sortedModels = [...aiModels]
    .filter((model) => {
      const matchesSearch =
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.bestFor.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesVision = !visionOnly || model.visionSupport;

      return matchesSearch && matchesVision;
    })
    .sort((a, b) => {
      if (selectedSort === "coding") return b.codingScore - a.codingScore;
      if (selectedSort === "reasoning") return b.reasoningScore - a.reasoningScore;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div className="text-left space-y-2 mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Model Comparison Matrix</h1>
        <p className="text-slate-500 text-sm">
          Up-to-date token pricing, context limits, and coding scores compiled from LMSYS and custom benchmark workflows.
        </p>
      </div>

      {/* Filter and control panel bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white border border-slate-150 p-4 rounded-2xl mb-6">
        <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
          {/* Search bar */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              placeholder="Search Google, OpenAI, Claude..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Toggle Vision Support */}
          <label className="flex items-center gap-2 text-xs text-slate-600 font-semibold select-none cursor-pointer">
            <input
              type="checkbox"
              checked={visionOnly}
              onChange={() => setVisionOnly(!visionOnly)}
              className="rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <span>Must Support Vision Analysis</span>
          </label>
        </div>

        {/* Sort triggers */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sort by:</span>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {["coding", "reasoning", "name"].map((sort, idx) => (
              <button
                id={`sort-model-btn-${idx}`}
                key={sort}
                onClick={() => setSelectedSort(sort as any)}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold capitalize transition cursor-pointer select-none ${
                  selectedSort === sort
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {sort}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table spec card layout */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden text-left mb-8">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] divide-y divide-slate-150 text-slate-850">
            <thead className="bg-slate-50 text-slate-600 text-xs font-black uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Model Name & Developer</th>
                <th className="px-6 py-4">Token Pricing (per 1M)</th>
                <th className="px-6 py-4">Context Window</th>
                <th className="px-6 py-4">Coding Score</th>
                <th className="px-6 py-4">Reasoning Score</th>
                <th className="px-6 py-4 text-center">Vision</th>
                <th className="px-6 py-4 text-center">API</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {sortedModels.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    <Info className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-sm">No models matched search parameters.</p>
                  </td>
                </tr>
              ) : (
                sortedModels.map((model, idx) => {
                  const isTopChoice = idx === 0;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                      {/* Name & Developer */}
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-slate-900 text-sm leading-tight">
                              {model.name}
                            </span>
                            {isTopChoice && (
                              <span className="bg-amber-100 text-amber-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded flex items-center gap-0.5 uppercase tracking-wide">
                                <Trophy className="h-2.5 w-2.5" /> High Score
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-semibold">{model.developer}</span>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 italic">{model.bestFor}</p>
                        </div>
                      </td>

                      {/* Pricing */}
                      <td className="px-6 py-4 font-mono font-medium text-slate-800">
                        {model.pricing}
                      </td>

                      {/* Context */}
                      <td className="px-6 py-4 font-mono text-slate-800 font-bold scale-100">
                        {model.contextWindow} tokens
                      </td>

                      {/* Coding */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden shrink-0">
                            <div
                              className="bg-blue-600 h-full rounded-full"
                              style={{ width: `${model.codingScore}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-800 font-mono">{model.codingScore}</span>
                        </div>
                      </td>

                      {/* Reasoning */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden shrink-0">
                            <div
                              className="bg-indigo-600 h-full rounded-full"
                              style={{ width: `${model.reasoningScore}%` }}
                            />
                          </div>
                          <span className="font-bold text-indigo-700 font-mono">{model.reasoningScore}</span>
                        </div>
                      </td>

                      {/* Vision */}
                      <td className="px-6 py-4 text-center">
                        {model.visionSupport ? (
                          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
                            ✔
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-slate-100 text-slate-400 text-[10px]">
                            ✕
                          </span>
                        )}
                      </td>

                      {/* API */}
                      <td className="px-6 py-4 text-center">
                        {model.apiAvailability ? (
                          <span className="inline-flex items-center justify-center bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wide border border-blue-100">
                            Available
                          </span>
                        ) : (
                          <span className="inline-block bg-slate-100 text-slate-400 font-medium px-2 py-0.5 rounded text-[9px]">
                            N/A
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Informational Guidelines card */}
      <div className="p-6 bg-slate-50 border rounded-2xl text-left grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-blue-500" />
            <span>Pricing Metrics explained</span>
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed mt-1">
            Input tokens represent sent queries, while Output tokens estimate written text replies. Google's Gemini 2.0 Flash represents the ultimate price-to-performance efficiency in modern deployments.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide flex items-center gap-1">
            <Brain className="h-4 w-4 text-indigo-500" />
            <span>Reasoning vs. standard LLMs</span>
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed mt-1">
            Reasoning models (like DeepSeek-R1) spend substantial internal computational cycles formulating safe, logical blueprints before displaying text results, causing higher accuracy at slightly slower visual outputs.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide flex items-center gap-1">
            <FileCode2 className="h-4 w-4 text-rose-500" />
            <span>Coding score guidelines</span>
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed mt-1">
            Scores represent benchmark tests like HumanEval (correct Python script completions). Models like Claude 3.5 Sonnet score highest due to extreme modular syntax optimization layers.
          </p>
        </div>
      </div>
    </div>
  );
}
