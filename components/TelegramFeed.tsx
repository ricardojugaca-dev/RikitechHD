"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";

interface TelegramReaction {
  emoji: string;
  count: string;
}

interface TelegramPost {
  id: string;
  htmlText: string;
  date: string;
  views: string | null;
  reactions: TelegramReaction[];
  image: string | null;
}

interface TelegramFeedProps {
  apiUrl: string;
  channelUsername: string;
  onSubscribersLoaded?: (subscribers: string) => void;
  searchTerm?: string;
}

export default function TelegramFeed({
  apiUrl,
  channelUsername,
  onSubscribersLoaded,
  searchTerm = "",
}: TelegramFeedProps) {
  const [posts, setPosts] = useState<TelegramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const postsData = Array.isArray(data) ? data : data.posts || [];
        setPosts(postsData);
        if (postsData.length === 0) setHasMore(false);

        if (data.subscribers && onSubscribersLoaded) {
          onSubscribersLoaded(data.subscribers);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [apiUrl, onSubscribersLoaded]);

  useLayoutEffect(() => {
    if (!loading && posts.length > 0 && isInitialLoad.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      isInitialLoad.current = false;
    }
  }, [loading, posts.length]);

  const loadMore = async () => {
    if (loadingMore || !hasMore || posts.length === 0) return;
    setLoadingMore(true);
    const oldestPostId = posts[0].id;

    try {
      const res = await fetch(`${apiUrl}?before=${oldestPostId}`);
      const data = await res.json();
      const newPosts = Array.isArray(data) ? data : data.posts || [];

      if (newPosts.length > 0) {
        const el = scrollRef.current;
        const prevScrollHeight = el?.scrollHeight || 0;
        setPosts((prev) => [...newPosts, ...prev]);
        requestAnimationFrame(() => {
          if (el) el.scrollTop = el.scrollHeight - prevScrollHeight;
        });
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop <= 50) loadMore();
  };

  const formatTime = (isoDate: string) => {
    try {
      const d = new Date(isoDate);
      return d.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoDate;
    }
  };

  // ⭐ Filtro local por búsqueda
  const filteredPosts = posts.filter((post) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const cleanText = post.htmlText.replace(/<[^>]*>/g, "").toLowerCase();
    return cleanText.includes(term);
  });

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="max-h-[400px] overflow-y-auto p-2 space-y-2 telegram-wallpaper"
    >
      {loadingMore && (
        <div className="text-center text-[10px] text-zinc-400 py-2">
          Cargando mensajes anteriores...
        </div>
      )}

      {!hasMore && posts.length > 0 && !searchTerm && (
        <div className="text-center text-[10px] text-zinc-400 py-2">
          No hay más publicaciones
        </div>
      )}

      {loading && (
        <div className="text-center text-xs text-zinc-300 py-4">
          Cargando publicaciones...
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center text-xs text-zinc-300 py-4">
          No hay publicaciones todavía.
        </div>
      )}

      {/* Mensaje cuando la búsqueda no tiene resultados */}
      {!loading && searchTerm && filteredPosts.length === 0 && (
        <div className="text-center text-xs text-zinc-300 py-4">
          No se encontraron posts con &quot;{searchTerm}&quot;
        </div>
      )}

      {filteredPosts.map((post) => (
        <div
          key={post.id}
          className="rounded-lg bg-card/95 border border-border shadow-sm overflow-hidden"
        >
          {post.image && (
            <a
              href={`https://t.me/${channelUsername}/${post.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full overflow-hidden"
            >
              <img
                src={post.image}
                alt=""
                loading="lazy"
                className="w-full h-auto object-cover max-h-72"
              />
            </a>
          )}

          {post.htmlText && post.htmlText.trim() && (
            <div className="px-2.5 pt-1.5 pb-0.5">
              <div
                className="telegram-text text-[12.5px] text-foreground leading-[1.5] break-words whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: post.htmlText }}
              />
            </div>
          )}

          <div className="flex items-center justify-between gap-2 px-3 py-1.5">
            {/* Reacciones (izquierda) */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {post.reactions.length > 0 &&
                post.reactions.map((r, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-full bg-[#2b5278] px-2.5 py-1 text-[12.5px] text-white"
                  >
                    <span>{r.emoji}</span>
                    <span className="font-semibold">{r.count}</span>
                  </span>
                ))}
            </div>

            {/* Vistas y hora (derecha) */}
            <div className="flex items-center gap-3 text-[12.5px] text-muted shrink-0">
              {post.views && (
                <span className="inline-flex items-center gap-1.5">
                  <span>{post.views}</span>
                  <EyeIcon className="h-4 w-4 text-zinc-400" />
                </span>
              )}
              <span className="tabular-nums">{formatTime(post.date)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EyeIcon({ className }: { className?: string }) {
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
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}