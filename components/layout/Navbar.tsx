"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

import ThemeToggle from "@/components/ui/ThemeToggle";

const navigation = [
  {
    name: "Software",
    href: "/software",
  },
  {
    name: "Drivers",
    href: "/drivers",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Categorías",
    href: "/categories",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">

      {/* Desktop / Main Navbar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
          onClick={closeMenu}
        >
          RIKITECH
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">

          {/* Search */}
          <Link
            href="/search"
            aria-label="Buscar"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
          >
            <Search className="h-5 w-5" />
          </Link>

          {/* Theme */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={
              isMenuOpen
                ? "Cerrar menú"
                : "Abrir menú"
            }
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10 md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">

          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">

            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-md px-3 py-3 text-sm font-medium text-muted transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
            >
              Inicio
            </Link>

            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-md px-3 py-3 text-sm font-medium text-muted transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
              >
                {item.name}
              </Link>
            ))}

          </nav>

        </div>
      )}

    </header>
  );
}