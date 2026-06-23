import React, { useState } from "react";
import { HelpCircle, Star, Award, CheckCircle, AlertCircle, RefreshCw, Trophy } from "lucide-react";
import { QuizQuestion } from "../types";
import { quizQuestions } from "../data/quiz";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions: QuizQuestion[] = quizQuestions;

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isSubmitted) return;

    if (selectedOption === questions[currentQuestionIndex].correctIndex) {
      setUserScore((prev) => prev + 1);
    }
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setUserScore(0);
    setQuizFinished(false);
  };

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-12 text-left">
      {/* Informational Header */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
          <Award className="h-8 w-8 text-blue-600 animate-pulse" />
          <span>AI Concept Challenge</span>
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Test your foundation engineering knowledge. Walk through 5 deep, conceptual questions on modern AI architecture layers.
        </p>
      </div>

      {quizFinished ? (
        /* Quiz Completed dashboard screen */
        <div className="bg-white border rounded-3xl p-8 shadow-md text-center space-y-6">
          <div className="inline-block bg-amber-50 rounded-full p-4 border border-amber-200">
            <Trophy className="h-10 w-10 text-amber-500 animate-bounce" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-black text-slate-900">Quiz Completed!</h2>
            <p className="text-xs text-slate-500">
              You scored <span className="text-blue-600 font-extrabold">{userScore}</span> out of{" "}
              <span className="font-bold">{questions.length}</span> correct.
            </p>
          </div>

          {/* Rating descriptors */}
          <div className="px-6 py-4 bg-slate-50 border rounded-2xl max-w-sm mx-auto">
            {userScore === 5 ? (
              <div>
                <p className="text-xs font-bold text-emerald-700">🏆 Certified Senior AI Architect</p>
                <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                  Absolute matrix fluency! You completely mastered context windows, MCP servers, PEFT rank equations, and sequential weights.
                </p>
              </div>
            ) : userScore >= 3 ? (
              <div>
                <p className="text-xs font-bold text-blue-700">⭐ Intermediate AI Practitioner</p>
                <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                  Excellent logic! Complete the roadmaps and tutorial blogs to reinforce final parameters edge-cases.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs font-bold text-rose-700">🌱 Aspiring Apprentice</p>
                <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                  A great starting attempt! Use the AI Terms directory and study cards list to study details before retrying.
                </p>
              </div>
            )}
          </div>

          <button
            id="restart-quiz-btn"
            onClick={handleRestartQuiz}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow transition"
          >
            <RefreshCw className="h-4.5 w-4.5" />
            <span>Try Challenge Again</span>
          </button>
        </div>
      ) : (
        /* Interactive Question play screen */
        <div className="bg-white border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress Indicators */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <div className="flex gap-1">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 w-6 rounded-full transition-colors ${
                    idx === currentQuestionIndex
                      ? "bg-blue-600"
                      : idx < currentQuestionIndex
                      ? "bg-emerald-500"
                      : "bg-slate-100"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Active Question Title text */}
          <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
            {currentQ.question}
          </h2>

          {/* Multiple choice options rows */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, oIdx) => {
              const belongsSelected = selectedOption === oIdx;
              const isCorrectTarget = currentQ.correctIndex === oIdx;

              let style = "border-slate-150 bg-white hover:border-slate-350 hover:bg-slate-50/50";
              if (belongsSelected) {
                style = "border-blue-500 bg-blue-50/25";
              }

              if (isSubmitted) {
                if (isCorrectTarget) {
                  style = "border-emerald-500 bg-emerald-50/30 text-emerald-900 font-medium";
                } else if (belongsSelected) {
                  style = "border-rose-500 bg-rose-50/20 text-rose-900";
                } else {
                  style = "border-slate-100 bg-white opacity-60";
                }
              }

              return (
                <button
                  id={`quiz-opt-${oIdx}`}
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`w-full text-xs sm:text-sm p-4 rounded-xl border text-left transition ${style} ${
                    !isSubmitted ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <div className="flex gap-3 items-start">
                    <span className="font-bold text-slate-400 mt-0.5 uppercase">
                      {"abcd"[oIdx]})
                    </span>
                    <span className="text-slate-800 leading-relaxed leading-normal">{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Solution Explanations pane */}
          {isSubmitted && (
            <div className="bg-slate-50 border p-4 rounded-xl space-y-1.5 animate-fade-in text-left">
              <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                {selectedOption === currentQ.correctIndex ? (
                  <span className="text-emerald-600 flex items-center gap-0.5">✔ Correct Response!</span>
                ) : (
                  <span className="text-rose-600 flex items-center gap-0.5">✕ Incorrect response</span>
                )}
              </p>
              <p className="text-[11px] text-slate-600 italic leading-relaxed">
                <span className="font-bold not-italic text-slate-705 block">Why it works:</span>
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Submits and Forward actions */}
          <div className="flex justify-end pt-3 border-t border-slate-100">
            {!isSubmitted ? (
              <button
                id="submit-quiz-ans-btn"
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="bg-blue-600 font-bold text-xs text-white px-5 py-3 rounded-lg hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer"
              >
                Submit Answer
              </button>
            ) : (
              <button
                id="next-quiz-q-btn"
                onClick={handleNextQuestion}
                className="bg-slate-900 font-bold text-xs text-white px-5 py-3 rounded-lg hover:bg-slate-800 transition select-none cursor-pointer"
              >
                {currentQuestionIndex === questions.length - 1 ? "Finish quiz" : "Next Question"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
