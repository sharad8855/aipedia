import React, { useState } from "react";
import { Copy, Check, FileCode, ShieldCheck } from "lucide-react";
import { cheatSheets } from "../data/cheatsheets";

export default function CheatSheets() {
  const [selectedSheetIndex, setSelectedSheetIndex] = useState(0);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const currentSheet = cheatSheets[selectedSheetIndex] || cheatSheets[0];

  const handleCopyToClipboard = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedStates((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {/* Informational Header */}
      <div className="text-left space-y-2 mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Code Cheat Sheets</h1>
        <p className="text-slate-500 text-sm">
          Copy-paste ready, production grade CLI commands and code snippets in Python, NumPy, Pandas, FastAPI, and LangChain.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left selector directory */}
        <div className="lg:col-span-3 space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-left px-1">Cheat Sheets Directory</p>
          <div className="space-y-1 text-left">
            {cheatSheets.map((sheet, idx) => {
              const active = idx === selectedSheetIndex;
              return (
                <button
                   id={`cheatsheet-btn-${sheet.id}`}
                   key={sheet.id}
                   onClick={() => setSelectedSheetIndex(idx)}
                   className={`w-full p-3.5 rounded-xl font-bold text-xs text-left transition cursor-pointer select-none border ${
                     active
                       ? "bg-slate-900 text-white border-transparent"
                       : "bg-white text-slate-650 border-slate-150 hover:bg-slate-50 hover:border-slate-350"
                   }`}
                >
                  <div className="flex items-center gap-2">
                    <FileCode className={`h-4 w-4 ${active ? "text-blue-400" : "text-slate-400"}`} />
                    <div className="truncate">
                      <span>{sheet.title}</span>
                      <span className="block text-[10px] text-slate-450 font-medium mt-0.5">{sheet.category}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right detailed sheet block */}
        <div className="lg:col-span-9 space-y-6">
          {/* Header overview box */}
          <div className="p-5 bg-white border border-slate-150 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
            <div>
              <span className="text-[10px] uppercase font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                Category: {currentSheet.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">{currentSheet.title}</h2>
              <p className="text-xs text-slate-500 mt-1">{currentSheet.description}</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-lg border border-emerald-150 font-bold shrink-0">
              <ShieldCheck className="h-4 w-4" />
              <span>Production Validated Code</span>
            </div>
          </div>

          {/* Render Sections */}
          <div className="space-y-6">
            {currentSheet.sections.map((sec, secIdx) => (
              <div key={secIdx} className="bg-white border rounded-2xl p-5 sm:p-6 text-left space-y-4 shadow-sm">
                <h3 className="font-extrabold text-slate-800 text-sm tracking-tight border-b border-rose-100 pb-2">
                  🛡 {sec.title}
                </h3>

                <div className="space-y-4">
                  {sec.items.map((item, idx) => {
                    const blockId = `${currentSheet.id}-${secIdx}-${idx}`;
                    const isCopied = copiedStates[blockId] || false;
                    const cleanCode = item.code || item.command || "";

                    return (
                      <div key={idx} className="space-y-2">
                        {/* Title and copy controls */}
                        <div className="flex justify-between items-start gap-3">
                          <p className="text-xs font-bold text-slate-700">{item.desc}</p>
                          <div className="flex gap-2 shrink-0">
                            {/* Copy button */}
                            <button
                              id={`copy-snippet-btn-${blockId}`}
                              onClick={() => handleCopyToClipboard(blockId, cleanCode)}
                              className="flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded transition select-none cursor-pointer"
                            >
                              {isCopied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                              <span>{isCopied ? "Copied" : "Copy"}</span>
                            </button>
                          </div>
                        </div>

                        {/* Real code output block styled beautifully in dark Slate */}
                        <div className="relative">
                          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-left overflow-x-auto text-[11px] sm:text-xs font-mono text-slate-100 leading-relaxed font-medium shadow-inner flex flex-col justify-between">
                            <span className="select-all block whitespace-pre-wrap">{cleanCode}</span>
                          </pre>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
