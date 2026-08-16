"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { softwareList } from "@/data/software";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return [];
    }

    return softwareList.filter((software) => {
      return (
        software.name.toLowerCase().includes(search) ||
        software.category.toLowerCase().includes(search) ||
        software.description.toLowerCase().includes(search) ||
        software.developer.toLowerCase().includes(search) ||
        software.operatingSystem.toLowerCase().includes(search)
      );
    });
  }, [query]);

  return (
    <main className="w-full flex-1">
      <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Search
          </h1>

          <p className="mt-3 text-black/60 dark:text-white/60">
            Search for software on RIKITECHHD.
          </p>
        </header>

        {/* Search input */}
        <div className="relative mt-8">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40 dark:text-white/40"
          />

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search software..."
            aria-label="Search software"
            className="w-full rounded-xl border border-border bg-background py-3.5 pl-12 pr-4 text-base outline-none transition focus:border-black dark:focus:border-white"
          />
        </div>

        {/* Results */}
        <div className="mt-10">

          {query.trim() && (
            <p className="mb-6 text-sm text-black/50 dark:text-white/50">
              {results.length}{" "}
              {results.length === 1 ? "result" : "results"} found
            </p>
          )}

          {results.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((software) => (
                <Link
                  key={software.slug}
                  href={`/software/${software.slug}`}
                  className="group overflow-hidden rounded-2xl border border-black/10 bg-black/[0.02] transition hover:-translate-y-1 hover:bg-black/[0.04] dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.04]"
                >
                  {/* Image */}
                  <div className="overflow-hidden border-b border-black/10 dark:border-white/10">
                    <Image
                      src={software.image}
                      alt={`${software.name} ${software.version}`}
                      width={1280}
                      height={720}
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="block h-auto w-full transition duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Information */}
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                      {software.category}
                    </p>

                    <h2 className="mt-2 text-lg font-semibold">
                      {software.name}
                    </h2>

                    <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                      {software.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-black/50 dark:text-white/50">
                        Version {software.version}
                      </span>

                      <span className="font-medium group-hover:underline">
                        View software →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* No results */}
          {query.trim() && results.length === 0 && (
            <div className="rounded-2xl border border-border p-8 text-center">
              <h2 className="text-lg font-semibold">
                No software found
              </h2>

              <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                No software matches your search for &quot;{query}&quot;.
              </p>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}