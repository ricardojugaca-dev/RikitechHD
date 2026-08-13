"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="mx-auto mt-10 w-full max-w-2xl">
      <div className="flex items-center rounded-xl border border-border bg-card px-4 shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-foreground/10">

        <Search className="mr-3 h-5 w-5 shrink-0 text-muted" />

        <input
          type="search"
          placeholder="Search software, drivers and tutorials..."
          className="h-14 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
        />

      </div>
    </div>
  );
}