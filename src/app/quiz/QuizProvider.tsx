"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AnswerMap = Record<number, string>;

type QuizContextValue = {
  answers: AnswerMap;
  setAnswer: (step: number, value: string) => void;
  transitionStep: number | null;
  queueTransition: (step: number) => void;
  consumeTransition: (step: number) => void;
};

const QuizContext = createContext<QuizContextValue | null>(null);

const STORAGE_KEY = "origo-quiz-answers";

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [transitionStep, setTransitionStep] = useState<number | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object") {
        setAnswers(parsed as AnswerMap);
      }
    } catch {
      // Ignore storage parse errors.
    }
  }, []);

  const value = useMemo<QuizContextValue>(
    () => ({
      answers,
      setAnswer: (step, value) =>
        setAnswers((prev) => {
          const next = { ...prev, [step]: value };
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          return next;
        }),
      transitionStep,
      queueTransition: (step) => setTransitionStep(step),
      consumeTransition: (step) =>
        setTransitionStep((current) => (current === step ? null : current)),
    }),
    [answers, transitionStep],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error();
  }
  return context;
}
