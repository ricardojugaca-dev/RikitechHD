"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { softwareList } from "@/data/software";

const MAX_RESULTS = 9;

export default function SearchBar() {
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

  const hasMoreResults = results.length > MAX_RESULTS;

  const visibleResults = results.slice(0, MAX_RESULTS);

  return (
    <div className="relative mx-auto mt-10 w-full max-w-2xl">

      {/* Search Input */}
      <div className="flex items-center rounded-xl border border-border bg-card px-4 shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-foreground/10">

        <Search className="mr-3 h-5 w-5 shrink-0 text-muted" />

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search software, drivers and tutorials..."
          aria-label="Search software"
          className="h-14 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
        />

      </div>

      {/* Search Results */}
      {query.trim() && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-background shadow-2xl">

          {visibleResults.length > 0 ? (
            <>

              {/* Results */}
              <div
                className={
                  hasMoreResults
                    ? "max-h-[70vh] overflow-y-auto"
                    : ""
                }
              >

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-2 lg:grid-cols-3">

                  {visibleResults.map((software) => (
                    <Link
                      key={software.slug}
                      href={`/software/${software.slug}`}
                      onClick={() => setQuery("")}
                      className="group flex min-w-0 items-center gap-3 rounded-lg p-3 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                    >

                      {/* Image */}
                      <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md bg-black/5 dark:bg-white/5">

                        <Image
                          src={software.image}
                          alt={software.name}
                          fill
                          sizes="80px"
                          className="object-cover transition-transform duration-200 group-hover:scale-105"
                        />

                      </div>

                      {/* Information */}
                      <div className="min-w-0">

                        <h3 className="truncate text-sm font-semibold">
                          {software.name}
                        </h3>

                        <p className="mt-1 truncate text-xs text-muted">
                          {software.category} · Version {software.version}
                        </p>

                      </div>

                    </Link>
                  ))}

                </div>

              </div>

              {/* View All */}
              {hasMoreResults && (
                <div className="border-t border-border px-4 py-3">

                  <Link
                    href={`/search?query=${encodeURIComponent(query)}`}
                    onClick={() => setQuery("")}
                    className="flex items-center justify-center text-sm font-semibold transition-colors hover:text-blue-500"
                  >
                    View all results
                    <span className="ml-1">
                      →
                    </span>
                  </Link>

                </div>
              )}

            </>
          ) : (
            /* No Results */
            <div className="p-6 text-center">

              <p className="font-medium">
                No results found
              </p>

              <p className="mt-1 text-sm text-muted">
                No software matches &quot;{query}&quot;.
              </p>

            </div>
          )}

        </div>
      )}

    </div>
  );
}