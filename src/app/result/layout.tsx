export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-12 mobile-shell">
        {children}
      </main>
    </div>
  );
}
