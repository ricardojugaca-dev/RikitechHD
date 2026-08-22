"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { useState } from "react";

import ThemeToggle from "@/components/ui/ThemeToggle";
import SearchModal from "@/components/layout/SearchModal";

interface SubLink {
  name: string;
  href: string;
  description: string;
}

interface NavItem {
  name: string;
  href: string;
  children?: SubLink[];
}

const navigation: NavItem[] = [
  {
    name: "Software",
    href: "/software",
    children: [
      { name: "Audio", href: "/software?cat=audio", description: "Editores, reproductores y herramientas de audio" },
      { name: "Video", href: "/software?cat=video", description: "Edición, conversión y reproducción de video" },
      { name: "Productividad", href: "/software?cat=productividad", description: "Ofimática, notas y gestión de tareas" },
      { name: "Seguridad", href: "/software?cat=seguridad", description: "Antivirus, VPN y protección del sistema" },
    ],
  },
  {
    name: "Drivers",
    href: "/drivers",
    children: [
      { name: "Tarjetas de video", href: "/drivers?cat=video", description: "NVIDIA, AMD e Intel Graphics" },
      { name: "Audio", href: "/drivers?cat=audio", description: "Realtek, Creative y controladoras USB" },
      { name: "Red", href: "/drivers?cat=red", description: "Wi-Fi, Ethernet y Bluetooth" },
      { name: "Placa base", href: "/drivers?cat=chipset", description: "Chipsets, BIOS y utilidades de placa" },
    ],
  },
  {
    name: "Blog",
    href: "/blog",
    children: [
      { name: "Guías", href: "/blog?tag=guias", description: "Tutoriales paso a paso y solucionarios" },
      { name: "Optimización", href: "/blog?tag=optimizacion", description: "Mejora el rendimiento de tu equipo" },
      { name: "Análisis", href: "/blog?tag=analisis", description: "Reseñas de hardware y software" },
      { name: "Noticias", href: "/blog?tag=noticias", description: "Lo último en tecnología e innovación" },
    ],
  },
  {
    name: "Categorías",
    href: "/categories",
    children: [
      { name: "Periféricos", href: "/categories/perifericos", description: "Teclados, ratones y monitores" },
      { name: "Componentes", href: "/categories/componentes", description: "CPU, RAM, GPU y almacenamiento" },
      { name: "Portátiles", href: "/categories/portatiles", description: "Laptops y equipos portátiles" },
      { name: "Accesorios", href: "/categories/accesorios", description: "Cables, fundas y complementos" },
    ],
  },
];
// Cambia a 'false' si solo quieres ver el logo sin texto
const SHOW_BRAND_TEXT = false;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        {/* Desktop / Main Navbar */}
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            onClick={closeMenu}
          >
            {/* Imagen de tu Logo */}
            <Image
              src="/software/Logo.png" // Cambia a la ruta de tu logo en /public (ej: /logo.svg)
              alt="RIKITECH Logo"
              width={48}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />

            {/* Texto condicional */}
            {SHOW_BRAND_TEXT && (
              <span className="text-xl font-bold tracking-tight text-foreground">
                RIKITECH
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-2 md:flex">
            {navigation.map((item) => (
              <div key={item.href} className="group relative">
                {/* Main navigation link */}
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>

                {/* Dropdown Desktop */}
                {item.children && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-[480px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-xl border border-border bg-background p-2 shadow-xl">
                      <div className="grid grid-cols-2 gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="rounded-lg p-4 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                          >
                            <div className="text-sm font-medium text-foreground">
                              {child.name}
                            </div>
                            <p className="mt-1 text-xs leading-5 text-muted">
                              {child.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Buscar"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Theme */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10 md:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
              {/* Inicio */}
              <Link
                href="/"
                onClick={closeMenu}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
              >
                Inicio
              </Link>

              {/* Navigation Items */}
              {navigation.map((item) => (
                <MobileNavItem key={item.href} item={item} closeMenu={closeMenu} />
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

// Subcomponente para cada item del menú móvil
function MobileNavItem({ item, closeMenu }: { item: NavItem; closeMenu: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between rounded-md px-3 py-1 hover:bg-black/5 dark:hover:bg-white/10">
        <Link
          href={item.href}
          onClick={closeMenu}
          className="flex-1 py-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          {item.name}
        </Link>
        {item.children && (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-muted transition-transform duration-200"
            aria-label={`Desplegar submenú de ${item.name}`}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* Sublinks desplegables */}
      {item.children && isOpen && (
        <div className="mb-2 ml-4 flex flex-col border-l border-border pl-3">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={closeMenu}
              className="rounded-md px-3 py-2 text-xs text-muted transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}