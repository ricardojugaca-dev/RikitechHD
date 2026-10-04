// app/software/page.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SoftwareGrid from "@/components/software/SoftwareGrid";

// ⭐ Componente interno que usa useSearchParams
function SoftwarePageContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("cat");

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-blue-600 selection:text-white">
      <main className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Header de la página */}
        <div className="mb-8">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-400">
            {categoryFilter ? "Categoría" : "Featured"}
          </span>
          <h1 className="mt-1.5 text-xl font-black tracking-tight text-foreground sm:text-2xl">
            {categoryFilter
              ? categoryFilter.replace(/\+/g, " ").replace(/%26/g, "&")
              : "Popular software"}
          </h1>
          {categoryFilter && (
            <Link
              href="/software"
              className="mt-2 inline-block text-[13px] font-semibold text-blue-400 hover:text-blue-300 transition"
            >
              ← Ver todos los programas
            </Link>
          )}
        </div>

        {/* Grid de software (usa el mismo componente que tu home) */}
        <SoftwareGrid categoryFilter={categoryFilter} />
      </main>
    </div>
  );
}

// ⭐ Componente principal que envuelve todo en Suspense
export default function SoftwarePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background text-foreground font-sans flex items-center justify-center">
          <p className="text-muted">Cargando programas...</p>
        </div>
      }
    >
      <SoftwarePageContent />
    </Suspense>
  );
}