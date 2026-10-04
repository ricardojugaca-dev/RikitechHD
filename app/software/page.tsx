// app/software/page.tsx
"use client";

import SoftwareGrid from "@/components/software/SoftwareGrid";

export default function SoftwarePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-blue-600 selection:text-white">
      <main className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Header de la página */}
        <div className="mb-8">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-400">
            Featured
          </span>
          <h1 className="mt-1.5 text-xl font-black tracking-tight text-foreground sm:text-2xl">
            Popular software
          </h1>
        </div>

        {/* Grid de software (usa el mismo componente que tu home) */}
        <SoftwareGrid />
      </main>
    </div>
  );
}