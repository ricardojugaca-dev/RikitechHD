"use client";

import { useState } from "react";

import { softwareList } from "@/data/software";
import SoftwareCard from "./SoftwareCard";

const ITEMS_PER_PAGE = 9;

export default function SoftwareGrid() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    softwareList.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const currentSoftware = softwareList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Software Grid */}
        <div className="grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {currentSoftware.map((software, index) => (
            <SoftwareCard
              key={software.id}
              software={software}
              priority={index < 3} // <-- Agregamos priority a los primeros 3 elementos
            />
          ))}
        </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Software pagination"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {/* Previous */}
          <button
            type="button"
            onClick={() =>
              goToPage(Math.max(1, currentPage - 1))
            }
            disabled={currentPage === 1}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-black/5 disabled:pointer-events-none disabled:opacity-40 dark:hover:bg-white/10"
          >
            ← Previous
          </button>

          {/* Page Numbers */}
          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              aria-current={
                currentPage === page
                  ? "page"
                  : undefined
              }
              className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-medium transition-colors ${
                currentPage === page
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:bg-black/5 dark:hover:bg-white/10"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            type="button"
            onClick={() =>
              goToPage(
                Math.min(
                  totalPages,
                  currentPage + 1
                )
              )
            }
            disabled={currentPage === totalPages}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-black/5 disabled:pointer-events-none disabled:opacity-40 dark:hover:bg-white/10"
          >
            Next →
          </button>
        </nav>
      )}
    </div>
  );
}