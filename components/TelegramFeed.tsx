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
          className="rounded-lg bg-[#182533]/95 border border-[#253341] shadow-md overflow-hidden"
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
                className="telegram-text text-[12.5px] text-zinc-100 leading-[1.5] break-words whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: post.htmlText }}
              />
            </div>
          )}

          <div className="flex items-center justify-between gap-2 px-2.5 py-1">
            <div className="flex items-center gap-1 flex-wrap">
              {post.reactions.length > 0 &&
                post.reactions.map((r, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-full bg-[#2b5278] px-2 py-0.5 text-[10.5px] text-white"
                  >
                    <span>{r.emoji}</span>
                    <span className="font-medium">{r.count}</span>
                  </span>
                ))}
            </div>

            <div className="flex items-center gap-2 text-[10.5px] text-zinc-400 shrink-0">
              {post.views && (
                <span className="inline-flex items-center gap-1">
                  <span>👁</span>
                  <span>{post.views}</span>
                </span>
              )}
              <span>{formatTime(post.date)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}