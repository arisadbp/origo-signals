"use client";

import { QuizProvider } from "./QuizProvider";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QuizProvider>
      <div className="min-h-screen bg-[#050505] text-white">
        <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-5 py-10 mobile-shell">
          {children}
        </main>
      </div>
    </QuizProvider>
  );
}
