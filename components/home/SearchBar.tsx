"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { softwareList } from "@/data/software";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [hasScroll, setHasScroll] = useState(false);

  const resultsContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const element = resultsContainerRef.current;

    if (!element) {
      setHasScroll(false);
      return;
    }

    const checkScroll = () => {
      setHasScroll(element.scrollHeight > element.clientHeight);
    };

    checkScroll();

    window.addEventListener("resize", checkScroll);

    return () => {
      window.removeEventListener("resize", checkScroll);
    };
  }, [results]);

  return (
    <div className="relative mx-auto mt-10 w-full max-w-2xl">

      {/* Search input */}
      <div className="flex items-center rounded-xl border border-border bg-card px-4 shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-foreground/10">

        <Search className="mr-3 h-5 w-5 shrink-0 text-muted" />

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search software, drivers and tutorials..."
          className="h-14 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
        />

      </div>

      {/* Search results */}
      {query.trim() && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-xl border border-border bg-background shadow-xl">

          {results.length > 0 ? (
            <>
              {/* Results list */}
              <div
                ref={resultsContainerRef}
                className="max-h-[360px] overflow-y-auto"
              >
                {results.map((software) => (
                  <Link
                    key={software.slug}
                    href={`/software/${software.slug}`}
                    onClick={() => setQuery("")}
                    className="flex gap-4 border-b border-border p-4 transition-colors last:border-b-0 hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    {/* Image */}
                    <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={software.image}
                        alt={`${software.name} ${software.version}`}
                        width={1280}
                        height={720}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Information */}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                        {software.category}
                      </p>

                      <h3 className="mt-1 truncate font-semibold">
                        {software.name}
                      </h3>

                      <p className="mt-1 text-sm text-muted">
                        Version {software.version}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Scroll indicator */}
              {hasScroll && (
                <div className="border-t border-border px-4 py-3 text-center text-xs text-muted">
                  Scroll for more results ↓
                </div>
              )}
            </>
          ) : (
            /* No results */
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