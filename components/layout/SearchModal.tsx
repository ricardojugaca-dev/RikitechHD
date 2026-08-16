"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { softwareList } from "@/data/software";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchModal({
  isOpen,
  onClose,
}: SearchModalProps) {
  const [query, setQuery] = useState("");

  // Close with Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

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

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Search
            </h2>

            <p className="mt-1 text-sm text-muted">
              Search software on RIKITECHHD.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

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
            autoFocus
            className="w-full rounded-xl border border-border bg-background py-4 pl-12 pr-4 text-base outline-none transition focus:border-black dark:focus:border-white"
          />
        </div>

        {/* Results */}
        <div className="mt-8 flex-1 overflow-y-auto pb-10">

          {query.trim() && (
            <p className="mb-6 text-sm text-muted">
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
                  onClick={onClose}
                  className="group overflow-hidden rounded-2xl border border-border bg-background transition hover:-translate-y-1 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                >
                  <div className="overflow-hidden border-b border-border">
                    <Image
                      src={software.image}
                      alt={`${software.name} ${software.version}`}
                      width={1280}
                      height={720}
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="block h-auto w-full transition duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                      {software.category}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold">
                      {software.name}
                    </h3>

                    <p className="mt-2 text-sm text-muted">
                      {software.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-muted">
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
              <h3 className="text-lg font-semibold">
                No software found
              </h3>

              <p className="mt-2 text-sm text-muted">
                No software matches your search for &quot;{query}&quot;.
              </p>
            </div>
          )}

          {/* Empty state */}
          {!query.trim() && (
            <div className="py-12 text-center">
              <Search className="mx-auto h-8 w-8 text-muted" />

              <p className="mt-4 text-sm text-muted">
                Start typing to search for software.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}