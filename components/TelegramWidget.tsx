"use client";

import { useState } from "react";
import TelegramFeed from "./TelegramFeed";


interface TelegramWidgetProps {
  apiUrl: string;
  channelUsername: string;
  channelName: string;
  joinUrl: string;
}

export default function TelegramWidget({
  apiUrl,
  channelUsername,
  channelName,
  joinUrl,
}: TelegramWidgetProps) {
  const [subscribers, setSubscribers] = useState<string>("...");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-lg">
      {/* Header tipo Telegram */}
      <div className="flex items-center justify-between border-b border-border bg-card p-3 gap-2">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center shadow-md shrink-0 overflow-hidden border border-[#253341]">
            <img
              src="/Logo.png"
              alt="Logo del canal"
              className="h-full w-full object-contain p-0.5"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h5 className="text-[12.5px] font-bold text-card-foreground truncate">
              {channelName}
            </h5>
            <span className="text-[10.5px] text-muted">{subscribers}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {/* Botón JOIN */}
          <a
            href={joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-[#2481cc] px-3 py-1.5 text-[11px] font-bold text-white shadow-sm hover:bg-[#1d6fa5] transition"
          >
            <TelegramIcon className="h-3.5 w-3.5 fill-white" />
            <span>JOIN</span>
          </a>

          {/* Lupa funcional */}
          <button
            type="button"
            onClick={() => {
              setIsSearchOpen((v) => !v);
              if (isSearchOpen) setSearchTerm("");
            }}
            title="Buscar en el canal"
            aria-label="Buscar en el canal"
            className={`h-8 w-8 flex items-center justify-center rounded-full transition shrink-0 ${
              isSearchOpen
                ? "bg-[#2b5278] text-white"
                : "text-muted hover:text-foreground hover:bg-muted-bg"
            }`}
          >
            <SearchIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Buscador desplegable */}
      {isSearchOpen && (
        <div className="border-b border-border bg-card p-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar en los posts cargados..."
                autoFocus
                className="w-full rounded-md bg-background border border-border pl-8 pr-8 py-1.5 text-[12px] text-foreground placeholder:text-muted focus:outline-none focus:border-[#2481cc]"
              />
            
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Limpiar búsqueda"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Contenedor del feed con el fondo de patrón */}
      <div className="telegram-wallpaper min-h-[400px]">
        <TelegramFeed
          apiUrl={apiUrl}
          channelUsername={channelUsername}
          onSubscribersLoaded={setSubscribers}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
      />
    </svg>
  );
}
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.29c-.15.66-.54.82-1.09.51l-3.02-2.23-1.46 1.41c-.16.16-.3.3-.61.3l.22-3.08 5.61-5.07c.24-.22-.05-.34-.38-.13l-6.93 4.36-2.98-.93c-.65-.2-.66-.65.14-.96l11.66-4.49c.54-.2 1.01.13.82 1.02z" />
    </svg>
  );
}