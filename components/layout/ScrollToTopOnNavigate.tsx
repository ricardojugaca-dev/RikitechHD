"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTopOnNavigate() {
  const pathname = usePathname();

  useEffect(() => {
    // Pequeño delay para que la nueva página se monte primero
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}