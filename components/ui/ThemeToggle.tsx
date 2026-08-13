"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Cambiar tema"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md"
      />
    );
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      type="button"
      onClick={() =>
        setTheme(currentTheme === "dark" ? "light" : "dark")
      }
      aria-label={
        currentTheme === "dark"
          ? "Cambiar a modo claro"
          : "Cambiar a modo oscuro"
      }
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
    >
      {currentTheme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}