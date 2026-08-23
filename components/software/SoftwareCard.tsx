"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Software } from "@/data/software";

type SoftwareCardProps = {
  software: Software;
  priority?: boolean;
};

export default function SoftwareCard({
  software,
  priority = false,
}: SoftwareCardProps) {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    // Garantiza que la URL se arme en el navegador sin discrepancias de SSR
    setShareUrl(`${window.location.origin}/software/${software.slug}`);
  }, [software.slug]);

  const shareTitle = `Descarga ${software.name} - Version ${software.version}`;

  const shareLinks = [
    {
      name: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`,
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
        </svg>
      ),
      hoverColor: "hover:text-green-500 hover:bg-green-500/10",
    },
    {
      name: "Telegram",
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.941z"/>
        </svg>
      ),
      hoverColor: "hover:text-sky-500 hover:bg-sky-500/10",
    },
    {
      name: "X (Twitter)",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      hoverColor: "hover:bg-black/5 dark:hover:bg-white/10",
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      hoverColor: "hover:text-blue-600 hover:bg-blue-600/10",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      hoverColor: "hover:text-blue-500 hover:bg-blue-500/10",
    },
    {
      name: "Reddit",
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`,
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.249 1.249 1.249.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z"/>
        </svg>
      ),
      hoverColor: "hover:text-orange-500 hover:bg-orange-500/10",
    },
    {
      name: "Pinterest",
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareTitle)}`,
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
        </svg>
      ),
      hoverColor: "hover:text-red-500 hover:bg-red-500/10",
    },
  ];

  const handleCopyLink = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="group relative min-w-0 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Link href={`/software/${software.slug}`} className="block">
          <div className="relative aspect-[16/9] w-full min-w-0 overflow-hidden bg-black/5 dark:bg-white/5">
            <Image
              src={software.image}
              alt={software.name}
              fill
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>

        {/* Minimal Floating Share Toggle Button */}
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          aria-label="Compartir"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/60 active:scale-95"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 0 0-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 0 0-5.368-2.684z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          {software.category}
        </span>

        <Link href={`/software/${software.slug}`}>
          <h3 className="mt-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-blue-500">
            {software.name}
          </h3>
        </Link>

        <p className="mt-1 text-sm text-muted">
          Version {software.version}
        </p>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
          {software.description}
        </p>

        {/* Footer Actions */}
        <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4">
          <Link
            href={`/software/${software.slug}`}
            className="inline-flex items-center text-sm font-medium transition-colors hover:text-blue-500"
          >
            View details
            <span className="ml-1 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>

          {/* Minimalist Inline Social Icons */}
          <div className="flex items-center gap-1">
            {shareLinks.slice(0, 3).map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Compartir en ${social.name}`}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-all duration-200 hover:-translate-y-1 ${social.hoverColor}`}
              >
                {social.icon}
              </a>
            ))}
            
            <button
              onClick={handleCopyLink}
              title="Copiar enlace"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-all duration-200 hover:-translate-y-1 hover:bg-blue-500/10 hover:text-blue-500"
            >
              {copied ? (
                <span className="text-xs font-bold text-green-500">✓</span>
              ) : (
                <svg className="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Share Overlay Panel for 8 Platforms */}
      {showShareMenu && (
        <div className="absolute inset-0 z-20 flex flex-col justify-between bg-card/95 p-5 backdrop-blur-md transition-all animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <p className="text-sm font-semibold">Compartir {software.name}</p>
            <button
              onClick={() => setShowShareMenu(false)}
              className="rounded-lg p-1 text-muted hover:bg-muted/20"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 my-auto">
            {shareLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2.5 text-xs text-muted transition-all hover:scale-105 ${social.hoverColor}`}
              >
                {social.icon}
                <span className="text-[10px] truncate max-w-full">{social.name}</span>
              </a>
            ))}

            <button
              onClick={handleCopyLink}
              className="flex flex-col items-center justify-center gap-1 rounded-xl p-2.5 text-xs text-muted transition-all hover:scale-105 hover:bg-blue-500/10 hover:text-blue-500"
            >
              <svg className="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="text-[10px]">{copied ? "¡Copiado!" : "Copiar"}</span>
            </button>
          </div>

          <button
            onClick={() => setShowShareMenu(false)}
            className="w-full rounded-xl border border-border py-2 text-xs font-medium text-muted hover:bg-muted/10"
          >
            Cerrar
          </button>
        </div>
      )}
    </article>
  );
}