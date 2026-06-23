import React, { useState, useEffect } from "react";
import { Cpu, TrendingUp, BarChart3, PenTool, CheckCircle, ExternalLink, Calendar, HelpCircle, Star, Award, Trophy } from "lucide-react";
import { aiRoadmaps } from "../data/roadmaps";
import { AIRoadmap, RoadmapStep } from "../types";

interface RoadmapsProps {
  initialRoadmapId?: string;
}

export default function Roadmaps({ initialRoadmapId }: RoadmapsProps) {
  const [selectedRoadIndex, setSelectedRoadIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<string, string[]>>({}); // roadmapId -> stepIds[]

  // Handle parent trigger updates
  useEffect(() => {
    if (initialRoadmapId) {
      const matchIdx = aiRoadmaps.findIndex((r) => r.id === initialRoadmapId);
      if (matchIdx !== -1) {
        setSelectedRoadIndex(matchIdx);
      }
    }
  }, [initialRoadmapId]);

  // Load progress on initial mounts
  useEffect(() => {
    const saved = localStorage.getItem("aipedia_completed_steps");
    if (saved) {
      setCompletedSteps(JSON.parse(saved));
    }
  }, []);

  const activeRoadmap = aiRoadmaps[selectedRoadIndex] || aiRoadmaps[0];

  const handleToggleStep = (stepId: string) => {
    const updated = { ...completedSteps };
    const list = updated[activeRoadmap.id] || [];

    if (list.includes(stepId)) {
      updated[activeRoadmap.id] = list.filter((id) => id !== stepId);
    } else {
      updated[activeRoadmap.id] = [...list, stepId];
    }

    setCompletedSteps(updated);
    localStorage.setItem("aipedia_completed_steps", JSON.stringify(updated));
  };

  // Compute stats progress percent
  const totalSteps = activeRoadmap.steps.length;
  const finishedList = completedSteps[activeRoadmap.id] || [];
  const finishedCount = finishedList.length;
  const progressPercent = totalSteps > 0 ? Math.round((finishedCount / totalSteps) * 100) : 0;

  // Render correct icon
  const getRoadmapIcon = (name: string) => {
    switch (name) {
      case "Cpu":
        return <Cpu className="h-5 w-5 text-blue-600" />;
      case "TrendingUp":
        return <TrendingUp className="h-5 w-5 text-rose-600" />;
      case "BarChart3":
        return <BarChart3 className="h-5 w-5 text-emerald-600" />;
      case "PenTool":
        return <PenTool className="h-5 w-5 text-amber-600" />;
      default:
        return <Cpu className="h-5 w-5 text-indigo-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {/* Header title */}
      <div className="text-left space-y-2 mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Career Roadmaps</h1>
        <p className="text-slate-500 text-sm">
          Plan, track, and complete step-by-step curricula. Check off topics as you finish them to visualize your career progress.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Select Path Panel */}
        <div className="lg:col-span-3 space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-left px-1">Curated Paths</p>
          <div className="space-y-2 text-left">
            {aiRoadmaps.map((road, idx) => {
              const active = idx === selectedRoadIndex;
              const roadmapIcon = getRoadmapIcon(road.iconName);
              const individualProgress =
                road.steps.length > 0
                  ? Math.round(((completedSteps[road.id] || []).length / road.steps.length) * 100)
                  : 0;

              return (
                <button
                  id={`roadmap-path-btn-${road.id}`}
                  key={road.id}
                  onClick={() => setSelectedRoadIndex(idx)}
                  className={`w-full p-4 border rounded-xl transition text-left relative group cursor-pointer ${
                    active
                      ? "border-blue-500 bg-blue-50/20 shadow-xs"
                      : "border-slate-150 bg-white hover:border-slate-350 hover:bg-slate-50/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white border border-slate-100`}>
                      {roadmapIcon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{road.title}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold">{road.duration}</p>
                    </div>
                  </div>

                  {/* Tiny progress status inline */}
                  <div className="mt-3.5 space-y-1">
                    <div className="flex justify-between items-center text-[9px] font-bold text-slate-400">
                      <span>Progress</span>
                      <span className="text-blue-600">{individualProgress}%</span>
                    </div>
                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
                        style={{ width: `${individualProgress}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Timeline Steps List */}
        <div className="lg:col-span-9 space-y-6">
          {/* Path overview card panel */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-blue-600/10 rounded-full blur-2xl" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">{activeRoadmap.title}</h2>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">{activeRoadmap.description}</p>
                <div className="flex flex-wrap gap-2.5 pt-1 text-[11px] font-semibold text-slate-300">
                  <span className="bg-white/10 px-2.5 py-0.5 rounded border border-white/5">
                    ⏱ {activeRoadmap.duration} Study Scale
                  </span>
                  <span className="bg-white/10 px-2.5 py-0.5 rounded border border-white/5">
                    ⚙ Level: {activeRoadmap.difficulty}
                  </span>
                </div>
              </div>

              {/* Progress status circle graphic */}
              <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-xl flex items-center gap-3.5 shrink-0">
                <div className="relative h-14 w-14 rounded-full flex items-center justify-center border-4 border-slate-700">
                  <div
                    className="absolute inset-0 rounded-full border-4 border-emerald-500 transition-all duration-300"
                    style={{
                      clipPath: `inset(0px 0px 0px 0px)`
                    }}
                  />
                  <span className="text-xs font-black text-emerald-400">{progressPercent}%</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Completed Matrix</p>
                  <p className="text-xs text-white font-bold">{finishedCount} / {totalSteps} steps completed</p>
                  {progressPercent === 100 && (
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5 mt-0.5">
                      <Trophy className="h-3 w-3 animate-bounce" /> Complete! Certificate Ready
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline steps render lists */}
          <div className="relative border-l-2 border-slate-250 ml-3.5 pl-6 sm:pl-8 space-y-8 text-left">
            {activeRoadmap.steps.map((step, idx) => {
              const checked = finishedList.includes(step.id);
              return (
                <div key={step.id} className="relative group">
                  {/* Floating index flag pin on the timeline */}
                  <button
                    id={`toggle-step-marker-${step.id}`}
                    onClick={() => handleToggleStep(step.id)}
                    className={`absolute -left-[37px] sm:-left-[45px] top-1.5 h-7 w-7 rounded-full border-2 flex items-center justify-center cursor-pointer select-none transition-all duration-200 outline-none hover:scale-105 active:scale-95 ${
                      checked
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "bg-white border-slate-250 text-slate-400 hover:border-blue-400"
                    }`}
                  >
                    {checked ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-[11px] font-bold">{idx + 1}</span>
                    )}
                  </button>

                  {/* Card step block */}
                  <div
                    className={`bg-white border p-5 sm:p-6 rounded-2xl transition hover:shadow-xs ${
                      checked ? "border-emerald-250/80 bg-emerald-50/5" : "border-slate-150 bg-white"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="space-y-1">
                        <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                          {step.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                          {step.description}
                        </p>
                      </div>

                      {/* Click step completion button */}
                      <button
                        id={`step-check-btn-${step.id}`}
                        onClick={() => handleToggleStep(step.id)}
                        className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition ${
                          checked
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-bold"
                            : "bg-slate-50 border-slate-205 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {checked ? "✔ Done" : "Mark Complete"}
                      </button>
                    </div>

                    {/* Core skill sets to acquire */}
                    <div className="mt-4 pt-3 border-t border-slate-100/70 space-y-2">
                      <h4 className="text-[10px] font-black text-slate-405 uppercase tracking-wider">Required Skills to Master</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {step.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.8 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Curated Resources blocks links */}
                    {step.resources && step.resources.length > 0 && (
                      <div className="mt-4 pt-3.5 border-t border-slate-100/70 space-y-1.5">
                        <h4 className="text-[10px] font-black text-slate-405 uppercase tracking-wider">Curated Learn Materials</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {step.resources.map((res, rIdx) => (
                            <a
                              key={rIdx}
                              href={res.url}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-slate-50 border hover:border-blue-400 p-2.5 rounded-xl text-left hover:bg-white transition flex justify-between items-center"
                            >
                              <div>
                                <span className="text-[9px] uppercase font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded mr-1.5">
                                  {res.type}
                                </span>
                                <span className="text-[11px] font-bold text-slate-800 tracking-tight line-clamp-1 truncate inline-block max-w-[200px]">
                                  {res.title}
                                </span>
                              </div>
                              <ExternalLink className="h-3 w-3 text-slate-400 select-none shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
