"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!mounted || !isVisible) {
    return null;
  }

  return createPortal(
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="
        fixed
        bottom-4
        right-4
        z-[2147483647]
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        border
        border-border
        bg-background
        text-foreground
        shadow-md
        transition
        hover:bg-black/5
        dark:hover:bg-white/10
        sm:bottom-6
        sm:right-6
        lg:bottom-8
        lg:right-8
      "
    >
      <ArrowUp className="h-5 w-5" />
    </button>,
    document.body
  );
}