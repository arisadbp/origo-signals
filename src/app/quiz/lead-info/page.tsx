"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "../QuizProvider";
import { COPY } from "@/lib/copy";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FLOW_KEY = "origo-flow";

export default function LeadInfoPage() {
  const router = useRouter();
  const { answers, setAnswer } = useQuiz();
  const [errors, setErrors] = useState<Record<number, string>>({});

  useEffect(() => {
    const storedFlow = sessionStorage.getItem(FLOW_KEY);
    if (storedFlow === "contact") {
      router.replace("/quiz/8");
      return;
    }
    sessionStorage.setItem(FLOW_KEY, "quiz");
  }, [router]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<number, string> = {};

    // Validate required fields
    if (!answers[1] || answers[1].trim() === "") {
      newErrors[1] = "กรุณาระบุชื่อ-นามสกุล";
    }
    if (!answers[2] || answers[2].trim() === "") {
      newErrors[2] = "กรุณาระบุชื่อบริษัท";
    }
    if (!answers[3] || answers[3].trim() === "") {
      newErrors[3] = "กรุณาเลือกตำแหน่ง";
    }
    if (!answers[4] || answers[4].trim() === "") {
      newErrors[4] = "กรุณาเลือกจำนวนพนักงาน";
    }
    if (!answers[5] || answers[5].trim() === "") {
      newErrors[5] = "กรุณาเลือกอุตสาหกรรม";
    }
    if (!answers[7] || answers[7].trim() === "") {
      newErrors[7] = "กรุณาระบุอีเมล";
    } else if (!validateEmail(answers[7])) {
      newErrors[7] = "รูปแบบอีเมลไม่ถูกต้อง";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Navigate to first question (step 8)
    router.push("/quiz/8");
  };

  const step3 = COPY.quiz.steps[3];
  const step4 = COPY.quiz.steps[4];
  const step5 = COPY.quiz.steps[5];

  return (
    <section className="flex w-full flex-col gap-10">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
          เริ่มต้นด้วยข้อมูลของคุณ
        </h1>
        <p className="text-base text-white/70">
          ข้อมูลเหล่านี้จะช่วยเราให้คำแนะนำที่เหมาะสมกับธุรกิจของคุณ
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <FieldGroup className="gap-6">
          {/* Full Name */}
          <Field>
            <FieldLabel htmlFor="fullname" className="text-white">
              ชื่อ-นามสกุล <span className="text-[#ffb347]">*</span>
            </FieldLabel>
            <input
              id="fullname"
              type="text"
              data-testid="input-fullname"
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-base text-white outline-none ring-[#ffb347] focus:ring-2"
              value={answers[1] ?? ""}
              onChange={(e) => {
                setAnswer(1, e.target.value);
                if (errors[1]) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next[1];
                    return next;
                  });
                }
              }}
            />
            {errors[1] && <FieldError>{errors[1]}</FieldError>}
          </Field>

          {/* Company Name */}
          <Field>
            <FieldLabel htmlFor="company" className="text-white">
              ชื่อบริษัท <span className="text-[#ffb347]">*</span>
            </FieldLabel>
            <input
              id="company"
              type="text"
              data-testid="input-company"
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-base text-white outline-none ring-[#ffb347] focus:ring-2"
              value={answers[2] ?? ""}
              onChange={(e) => {
                setAnswer(2, e.target.value);
                if (errors[2]) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next[2];
                    return next;
                  });
                }
              }}
            />
            {errors[2] && <FieldError>{errors[2]}</FieldError>}
          </Field>

          {/* Position */}
          <Field>
            <FieldLabel htmlFor="position" className="text-white">
              ตำแหน่ง <span className="text-[#ffb347]">*</span>
            </FieldLabel>
            {"options" in step3 && (
              <Select
                value={answers[3] ?? ""}
                onValueChange={(value) => {
                  setAnswer(3, value);
                  if (errors[3]) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next[3];
                      return next;
                    });
                  }
                }}
              >
                <SelectTrigger
                  id="position"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-base text-white outline-none ring-[#ffb347] focus:ring-2"
                >
                  <SelectValue placeholder="เลือกตำแหน่ง" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/15 text-white">
                  {step3.options.map((option) => (
                    <SelectItem key={option} value={option} className="hover:bg-white/10 focus:bg-white/10">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {errors[3] && <FieldError>{errors[3]}</FieldError>}
          </Field>

          {/* Employee Count */}
          <Field>
            <FieldLabel htmlFor="employee-count" className="text-white">
              จำนวนพนักงาน <span className="text-[#ffb347]">*</span>
            </FieldLabel>
            {"options" in step4 && (
              <Select
                value={answers[4] ?? ""}
                onValueChange={(value) => {
                  setAnswer(4, value);
                  if (errors[4]) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next[4];
                      return next;
                    });
                  }
                }}
              >
                <SelectTrigger
                  id="employee-count"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-base text-white outline-none ring-[#ffb347] focus:ring-2"
                >
                  <SelectValue placeholder="เลือกจำนวนพนักงาน" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/15 text-white">
                  {step4.options.map((option) => (
                    <SelectItem key={option} value={option} className="hover:bg-white/10 focus:bg-white/10">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {errors[4] && <FieldError>{errors[4]}</FieldError>}
          </Field>

          {/* Industry */}
          <Field>
            <FieldLabel htmlFor="industry" className="text-white">
              อุตสาหกรรม <span className="text-[#ffb347]">*</span>
            </FieldLabel>
            {"options" in step5 && (
              <Select
                value={answers[5] ?? ""}
                onValueChange={(value) => {
                  setAnswer(5, value);
                  if (errors[5]) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next[5];
                      return next;
                    });
                  }
                }}
              >
                <SelectTrigger
                  id="industry"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-base text-white outline-none ring-[#ffb347] focus:ring-2"
                >
                  <SelectValue placeholder="เลือกอุตสาหกรรม" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/15 text-white max-h-[300px]">
                  {step5.options.map((option) => (
                    <SelectItem key={option} value={option} className="hover:bg-white/10 focus:bg-white/10">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {errors[5] && <FieldError>{errors[5]}</FieldError>}
          </Field>

          {/* Phone (Optional) */}
          <Field>
            <FieldLabel htmlFor="phone" className="text-white">
              เบอร์ติดต่อ <span className="text-white/50 text-sm">(ไม่บังคับ)</span>
            </FieldLabel>
            <input
              id="phone"
              type="tel"
              data-testid="input-phone"
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-base text-white outline-none ring-[#ffb347] focus:ring-2"
              value={answers[6] ?? ""}
              onChange={(e) => setAnswer(6, e.target.value)}
            />
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email" className="text-white">
              อีเมล <span className="text-[#ffb347]">*</span>
            </FieldLabel>
            <input
              id="email"
              type="email"
              data-testid="input-email"
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-base text-white outline-none ring-[#ffb347] focus:ring-2"
              value={answers[7] ?? ""}
              onChange={(e) => {
                setAnswer(7, e.target.value);
                if (errors[7]) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next[7];
                    return next;
                  });
                }
              }}
            />
            {errors[7] && <FieldError>{errors[7]}</FieldError>}
          </Field>
        </FieldGroup>

        <div className="flex justify-end mt-10">
          <button
            type="submit"
            data-testid="next"
            className="rounded-full bg-gradient-to-r from-[#ffb347] to-[#ffa500] px-8 py-4 text-base font-semibold text-black shadow-[0_0_20px_rgba(255,179,71,0.35)] hover:scale-105 transition-transform"
          >
            เริ่มทำแบบประเมิน
          </button>
        </div>
      </form>
    </section>
  );
}
