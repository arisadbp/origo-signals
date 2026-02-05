"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { COPY } from "@/lib/copy";
import { useQuiz } from "../QuizProvider";

const TOTAL_STEPS = 22; // Keep original step numbering for COPY reference
const FLOW_KEY = "origo-flow";
const BOOKING_KEY = "origo-booking";

const transitionMap: Record<number, number> = {
  11: 1, // After step 10, before step 11 → Market Intelligence
  15: 2, // After step 14, before step 15 → Marketing Waste
  19: 3, // After step 18, before step 19 → Data-Driven vs Intuition
};

export default function QuizStepPage() {
  const params = useParams<{ step: string }>();
  const router = useRouter();
  const [formStartedAt] = useState(() => Date.now());
  const [honeypot] = useState("");
  const stepNumber = Number(params.step);
  const { answers, setAnswer, transitionStep, queueTransition, consumeTransition } =
    useQuiz();
  const autoNextTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Allow step 19 for the final transition card
  const isValidStep =
    Number.isInteger(stepNumber) &&
    stepNumber >= 1 &&
    stepNumber <= TOTAL_STEPS; // Steps 1-22 (including transition cards at 11, 15, 19)

  useEffect(() => {
    if (!isValidStep) {
      router.replace("/quiz/lead-info");
    }
  }, [isValidStep, router]);

  // Cleanup auto-next timer on unmount
  useEffect(() => {
    return () => {
      if (autoNextTimerRef.current) {
        clearTimeout(autoNextTimerRef.current);
      }
    };
  }, []);

  if (!isValidStep) {
    return null;
  }

  // Check if this is a transition step
  const activeTransition = transitionMap[stepNumber];
  const shouldShowTransition =
    activeTransition !== undefined && transitionStep === stepNumber;

  // For transition steps, we don't need stepData
  const steps = COPY.quiz.steps as Record<
    string,
    (typeof COPY.quiz.steps)[keyof typeof COPY.quiz.steps]
  >;
  const stepKey = String(stepNumber);

  // Skip stepData check for transition steps
  if (!shouldShowTransition && !(stepKey in steps)) {
    notFound();
  }
  const stepData = shouldShowTransition ? null : steps[stepKey];

  const promptText = stepData
    ? "question" in stepData ? stepData.question : stepData.label
    : "";

  const showProgress = stepNumber >= 8;
  const showStepLabel = stepNumber <= 7 && stepData && "label" in stepData;
  const showPromptHeading = !showStepLabel;

  const progressPercent = useMemo(() => {
    if (!showProgress) return 0;
    const progress =
      30 + ((stepNumber - 8) / (TOTAL_STEPS - 8)) * 70;
    return Math.round(progress);
  }, [showProgress, stepNumber]);

  const handleNext = (skipValidation = false) => {
    if (stepNumber >= TOTAL_STEPS) return;

    // Validation: all fields required except phone (step 6)
    if (!skipValidation) {
      const currentAnswer = answers[stepNumber];
      const isPhoneStep = stepNumber === 6;

      if (!isPhoneStep && (!currentAnswer || currentAnswer.trim() === "")) {
        // Don't allow advancing if required field is empty
        return;
      }
    }

    // Show transition cards after specific steps
    if (stepNumber === 10) {
      queueTransition(11);
      router.push("/quiz/11");
      return;
    }
    if (stepNumber === 14) {
      queueTransition(15);
      router.push("/quiz/15");
      return;
    }
    if (stepNumber === 18) {
      queueTransition(19);
      router.push("/quiz/19");
      return;
    }
    router.push(`/quiz/${stepNumber + 1}`);
  };

  const handleBack = () => {
    if (stepNumber <= 1) return;
    router.push(`/quiz/${stepNumber - 1}`);
  };

  const handleOptionSelect = (option: string) => {
    setAnswer(stepNumber, option);

    // Clear any existing timer to prevent multiple auto-advances
    if (autoNextTimerRef.current) {
      clearTimeout(autoNextTimerRef.current);
    }

    // Auto-advance after selecting an option with a smooth delay
    autoNextTimerRef.current = setTimeout(() => {
      handleNext(true); // Skip validation since we know the answer was just set
      autoNextTimerRef.current = null;
    }, 250);
  };

  const transitionCard = useMemo(() => {
    if (activeTransition === undefined) return null;
    return COPY.transitionCards.find((card) => card.id === activeTransition) ?? null;
  }, [activeTransition]);

  const inputTestIdMap: Record<number, string> = {
    1: "input-fullname",
    2: "input-company",
    6: "input-phone",
    7: "input-email",
  };

  const buildContact = () => ({
    full_name: answers[1] ?? "",
    company_name: answers[2] ?? "",
    role: answers[3] ?? "",
    employee_count: answers[4] ?? "",
    industry: answers[5] ?? "",
    phone: answers[6] ?? "",
    email: answers[7] ?? "",
  });

  const getUtmParams = () => {
    if (typeof window === "undefined") return undefined;
    const params = new URLSearchParams(window.location.search);
    const utmKeys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ];
    const utm = utmKeys.reduce<Record<string, string>>((acc, key) => {
      const value = params.get(key);
      if (value) acc[key] = value;
      return acc;
    }, {});
    return Object.keys(utm).length ? utm : undefined;
  };

  const getDeviceInfo = () => {
    if (typeof navigator === "undefined") return undefined;
    return {
      user_agent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
    };
  };

  const handleSubmit = async () => {
    const payload = {
      contact: buildContact(),
      answers,
      utm: getUtmParams(),
      device: getDeviceInfo(),
      honeypot,
      formStartedAt,
    };

    try {
      const flowType =
        typeof window === "undefined"
          ? "quiz"
          : sessionStorage.getItem(FLOW_KEY) === "contact"
            ? "contact"
            : "quiz";
      if (flowType === "contact") {
        const storedBooking = sessionStorage.getItem(BOOKING_KEY);
        if (!storedBooking) return;
        let booking: { start?: string; end?: string } | null = null;
        try {
          booking = JSON.parse(storedBooking) as { start?: string; end?: string };
        } catch {
          booking = null;
        }
        if (!booking?.start) return;

        await fetch("/api/submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            appointment: { startTime: booking.start, timezone: "Asia/Bangkok" },
            source: "contact-flow",
            metadata: {
              userAgent: navigator.userAgent,
              referrer: document.referrer || null,
              path: window.location.pathname,
              flow: "contact",
            },
          }),
        });
      }
    } catch {
      // Swallow submit errors so the result page still loads.
    }

    router.push("/result");
  };

  if (shouldShowTransition && transitionCard) {
    const handleTransitionNext = () => {
      consumeTransition(stepNumber);
      // Transition cards just consume and show the quiz step at the same URL
      // Submission happens after step 22 completes normally
    };

    return (
      <section className="flex w-full flex-col items-center gap-10 text-center animate-fade-in-up">
        <div
          className="relative flex w-full flex-col gap-6 rounded-3xl border border-[#ffb347]/20 bg-gradient-to-br from-white/10 to-white/5 p-10 shadow-[0_0_40px_rgba(255,179,71,0.15)] backdrop-blur-sm hover:shadow-[0_0_60px_rgba(255,179,71,0.25)] transition-all duration-500"
          data-testid={`transition-${activeTransition}`}
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#ffb347] to-[#ffa500] shadow-[0_0_20px_rgba(255,179,71,0.5)]">
            <svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-xl text-white/90 leading-relaxed font-light mt-4">{transitionCard.content}</p>
        </div>
        <button
          type="button"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#ffb347] to-[#ffa500] text-black shadow-[0_0_30px_rgba(255,179,71,0.4)] hover:scale-110 hover:shadow-[0_0_40px_rgba(255,179,71,0.6)] transition-all duration-300 animate-pulse-glow"
          data-testid="next"
          onClick={handleTransitionNext}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col gap-10 animate-fade-in-up">
      <div className="flex flex-col gap-6">
        {showStepLabel ? (
          <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {stepData.label}
          </h1>
        ) : null}
        {showProgress ? (
          <div className="flex flex-col gap-3">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ffb347] via-[#ffa500] to-[#ffb347] shadow-[0_0_10px_rgba(255,179,71,0.5)] transition-all duration-500 ease-out"
                style={{
                  width: `${progressPercent}%`,
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s linear infinite'
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-white/50">
              <span>ความคืบหน้า</span>
              <span className="font-semibold text-[#ffb347]">{progressPercent}%</span>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-8">
        {showPromptHeading ? (
          <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {promptText}
          </h1>
        ) : null}

        {stepData && "options" in stepData ? (
          <div key={`options-${stepNumber}`} className="flex flex-col gap-4">
            {stepData.options.map((option, index) => {
              const isSelected = answers[stepNumber] === option;
              return (
                <button
                  key={`${stepNumber}-${option}`}
                  type="button"
                  onClick={() => handleOptionSelect(option)}
                  data-testid={`option-${stepNumber}-${index}`}
                  className={`rounded-2xl border px-5 py-4 text-left text-base transition-colors duration-150 ${
                    isSelected
                      ? "border-[#ffb347] bg-[#ffb347] text-black shadow-[0_0_20px_rgba(255,179,71,0.3)]"
                      : "border-white/15 bg-white/5 text-white/80 hover:border-[#ffb347]/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        ) : stepData && "type" in stepData ? (
          <textarea
            className="min-h-[160px] w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-base text-white outline-none ring-[#ffb347] focus:ring-2 transition-all duration-300 hover:border-white/25 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(255,179,71,0.1)]"
            data-testid={stepNumber === 22 ? "textarea-final" : undefined}
            value={answers[stepNumber] ?? ""}
            onChange={(event) => setAnswer(stepNumber, event.target.value)}
            placeholder="พิมพ์คำตอบของคุณที่นี่..."
          />
        ) : (
          <input
            type={stepNumber === 7 ? "email" : stepNumber === 6 ? "tel" : "text"}
            data-testid={inputTestIdMap[stepNumber]}
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-base text-white outline-none ring-[#ffb347] focus:ring-2 transition-all duration-300 hover:border-white/25 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(255,179,71,0.1)]"
            value={answers[stepNumber] ?? ""}
            onChange={(event) => setAnswer(stepNumber, event.target.value)}
            placeholder={stepNumber === 7 ? "email@example.com" : stepNumber === 6 ? "0xx-xxx-xxxx" : ""}
          />
        )}
      </div>

      {stepNumber < TOTAL_STEPS ? (
        <div className="flex justify-between items-center">
          {/* Back button - only show if not on first step */}
          {stepNumber > 1 && (
            <button
              type="button"
              data-testid="back"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 hover:border-[#ffb347]/50 hover:text-white transition-all duration-300 hover:scale-110"
              onClick={handleBack}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
          )}

          {/* Next button - only show for input/textarea fields */}
          {stepData && !("options" in stepData) && (
            <button
              type="button"
              data-testid="next"
              className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#ffb347] to-[#ffa500] text-black shadow-[0_0_20px_rgba(255,179,71,0.35)] hover:scale-110 transition-transform duration-300"
              onClick={() => handleNext()}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      ) : (
        <div className="flex justify-between items-center">
          {/* Back button for last step */}
          {stepNumber > 1 && (
            <button
              type="button"
              data-testid="back"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 hover:border-[#ffb347]/50 hover:text-white transition-all duration-300 hover:scale-110"
              onClick={handleBack}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
          )}

          <button
            type="button"
            data-testid="submit"
            className="ml-auto rounded-full bg-gradient-to-r from-[#ffb347] to-[#ffa500] px-6 py-3 text-base font-semibold text-black shadow-[0_0_20px_rgba(255,179,71,0.35)] hover:scale-105 transition-transform duration-300"
            onClick={handleSubmit}
          >
            ดูผลลัพธ์
          </button>
        </div>
      )}
    </section>
  );
}
