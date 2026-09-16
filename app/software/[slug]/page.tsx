// app/software/[slug]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { softwareList } from "@/data/software";
import TelegramFeed from "@/components/TelegramFeed";
import TelegramWidget from "@/components/TelegramWidget";
import { supabase } from "@/lib/supabase";


interface SoftwarePageProps {
  params: Promise<{ slug: string }>;
}

export default function SoftwareDetailPage({ params }: { params: { slug: string } } | any) {
  // Soporte para Next.js 14 y 15
  const resolvedParams = React.use(params) as { slug: string };
  const currentSlug = resolvedParams?.slug || "";

  const software = softwareList.find((item) => item.slug === currentSlug) || softwareList[0];

  if (!software) {
    return notFound();
  }

  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  // Estado del formulario de comentarios
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentWebsite, setCommentWebsite] = useState("");
  const [commentText, setCommentText] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [commentsList, setCommentsList] = useState<
  {
    id: number;
    name: string;
    email?: string | null;
    website?: string | null;
    text: string;
    created_at: string;
    post_slug: string;
    parent_id: number | null;   // ⭐ NUEVA LÍNEA
  }[]
>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

     // Cargar comentarios SOLO del post actual
    useEffect(() => {
      async function loadComments() {
        setCommentsLoading(true);
        const { data, error } = await supabase
          .from("comments")
          .select("*")
          .eq("post_slug", currentSlug)   // ⭐ Filtro por slug del post
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error cargando comentarios:", error);
        } else if (data) {
          setCommentsList(data);
        }
        setCommentsLoading(false);
      }

      loadComments();
    }, [currentSlug]);   // ⭐ Se recarga si cambia el slug

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const handleCopyPassword = () => {
    const pwd = (software as any).password || "www.descargaspcpro.net";
    navigator.clipboard.writeText(pwd);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
  };

  // Estado para el texto de las respuestas inline
const [replyText, setReplyText] = useState("");
const [replyName, setReplyName] = useState("");       // ⭐ NUEVO
const [replyEmail, setReplyEmail] = useState("");     // ⭐ NUEVO

// Función para publicar una respuesta a un comentario específico
const handleReplySubmit = async (parentId: number) => {
  if (!replyText.trim() || !replyName.trim()) {
    alert("Necesitas escribir tu nombre y la respuesta");
    return;
  }

  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        name: replyName,          // ⭐ Usa replyName
        email: replyEmail || null, // ⭐ Usa replyEmail
        website: null,
        text: replyText,
        post_slug: currentSlug,
        parent_id: parentId,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error al publicar respuesta:", error);
    return;
  }

  if (data) {
    setCommentsList([...commentsList, data]);
  }

  // Limpiar SOLO los campos de la respuesta (no los del formulario principal)
  setReplyText("");
  setReplyName("");
  setReplyEmail("");
  setReplyingTo(null);
  setCommentSuccess(true);
  setTimeout(() => setCommentSuccess(false), 4000);
};

// Función original para comentarios principales (sin parent_id)
const handleCommentSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!commentText.trim() || !commentName.trim()) return;

  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        name: commentName,
        email: commentEmail || null,
        website: commentWebsite || null,
        text: commentText,
        post_slug: currentSlug,
        parent_id: null,   // ⭐ Es un comentario principal
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error al publicar comentario:", error);
    return;
  }

  if (data) {
    setCommentsList([...commentsList, data]);
  }

  setCommentText("");
  setCommentSuccess(true);
  setTimeout(() => setCommentSuccess(false), 4000);
};
  // Formatear fecha como "19 de agosto de 2026" o "19 DE AGOSTO DE 2026"
  const formatDateLong = (dateStr: string | undefined) => {
    if (!dateStr) return "FECHA DESCONOCIDA";
    
    // Si ya viene en formato texto (ej. "18 DE AGOSTO DE 2026"), lo devolvemos tal cual
    if (isNaN(Date.parse(dateStr))) return dateStr.toUpperCase();
    
    try {
      const d = new Date(dateStr);
      const day = d.getDate();
      const months = [
        "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
        "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
      ];
      const month = months[d.getMonth()];
      const year = d.getFullYear();
      return `${day} DE ${month} DE ${year}`;
    } catch {
      return dateStr.toUpperCase();
    }
  };
  // Formatear fecha como tiempo relativo: "HACE 5 HORAS", "HACE 2 DÍAS", etc.
  const formatTimeAgo = (dateStr: string | undefined) => {
    if (!dateStr) return "FECHA DESCONOCIDA";
    
    try {
      const d = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffMin = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      
      if (diffMin < 1) return "AHORA MISMO";
      if (diffMin < 60) return `HACE ${diffMin} MINUTO${diffMin !== 1 ? "S" : ""}`;
      if (diffHours < 24) return `HACE ${diffHours} HORA${diffHours !== 1 ? "S" : ""}`;
      if (diffDays < 7) return `HACE ${diffDays} DÍA${diffDays !== 1 ? "S" : ""}`;
      if (diffDays < 30) return `HACE ${Math.floor(diffDays / 7)} SEMANA${Math.floor(diffDays / 7) !== 1 ? "S" : ""}`;
      if (diffDays < 365) return `HACE ${Math.floor(diffDays / 30)} MES${Math.floor(diffDays / 30) !== 1 ? "ES" : ""}`;
      return `HACE ${Math.floor(diffDays / 365)} AÑO${Math.floor(diffDays / 365) !== 1 ? "S" : ""}`;
    } catch {
      return dateStr.toUpperCase();
    }
  };
  // Función recursiva para renderizar comentarios con sus respuestas
const renderComment = (
  comment: typeof commentsList[0],
  allComments: typeof commentsList,
  depth: number = 0
): React.ReactNode => {
  // Buscar todas las respuestas a este comentario
  const replies = allComments.filter((c) => c.parent_id === comment.id);

  return (
    <div key={comment.id} style={{ marginLeft: depth > 0 ? "2rem" : "0" }}>
      <div className="flex gap-3 mb-3">
        {/* Avatar */}
        <img
          src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(comment.name)}&size=40`}
          alt={comment.name}
          className="h-10 w-10 rounded-full shrink-0 bg-muted-bg"
        />

        <div className="flex-1 min-w-0">
          {/* Header: nombre + botón responder */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-bold text-card-foreground text-sm">
              {comment.name}
            </span>
            <button
              type="button"
              onClick={() =>
                setReplyingTo(replyingTo === comment.id ? null : comment.id)
              }
              className="text-[10px] font-bold uppercase tracking-wider text-blue-500 hover:text-blue-400 transition"
            >
              ↩ Responder
            </button>
          </div>

          {/* Fecha relativa */}
          <span className="text-[10px] text-muted font-semibold uppercase tracking-wider block mt-0.5">
            {formatTimeAgo(comment.created_at)}
          </span>

          {/* Texto del comentario */}
          <p className="mt-2 text-xs text-foreground/90 leading-relaxed">
            {comment.text}
          </p>

          <p className="mt-1 text-[10px] text-muted italic">
            Your comment is awaiting moderation.
          </p>

          {/* Formulario de respuesta inline */}
          {replyingTo === comment.id && (
            <div className="mt-3 pl-2 border-l-2 border-blue-500/30 space-y-2">
              {/* Inputs de nombre y email para la respuesta */}
              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="Tu nombre *"
                  value={replyName}
                  onChange={(e) => setReplyName(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted focus:border-blue-600 focus:outline-hidden"
                />
                <input
                  type="email"
                  placeholder="Tu email (opcional)"
                  value={replyEmail}
                  onChange={(e) => setReplyEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted focus:border-blue-600 focus:outline-hidden"
                />
              </div>

              {/* Textarea de la respuesta */}
              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Responder a ${comment.name}...`}
                className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground placeholder:text-muted focus:border-blue-600 focus:outline-hidden resize-y"
              />

              {/* Botones */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleReplySubmit(comment.id)}
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-blue-500 transition"
                >
                  Enviar respuesta
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyText("");
                    setReplyName("");
                    setReplyEmail("");
                  }}
                  className="rounded-lg border border-border px-3 py-1.5 text-[11px] font-bold text-muted hover:text-foreground transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Renderizar respuestas recursivamente */}
      {replies.length > 0 && (
        <div className="ml-6 border-l-2 border-border/30 pl-3">
          {replies.map((reply) =>
            renderComment(reply, allComments, depth + 1)
          )}
        </div>
      )}
    </div>
  );
};

  const relatedSoftware = softwareList.filter((s) => s.slug !== software.slug).slice(0, 4);
  const recentSoftware = softwareList.filter((s) => s.slug !== software.slug).slice(0, 5);
  const author = (software as any).authorName || "DESCARGASPCPRO";
  const postDate = (software as any).authorDate || software.lastUpdated || "18 DE AGOSTO DE 2026";
  const password = (software as any).password || "www.descargaspcpro.net";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. BARRA FLOTANTE DE REDES (Izquierda en Desktop) */}
      <aside className="fixed left-3 top-48 z-40 hidden flex-col items-center gap-2.5 xl:flex">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted [writing-mode:vertical-lr] rotate-180 mb-1 select-none">
          Compartir
        </span>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-md transition hover:scale-110">
          <FacebookIcon className="h-4 w-4 fill-white" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="X (Twitter)" className="flex h-9 w-9 items-center justify-center rounded-full bg-black border border-border text-white shadow-md transition hover:scale-110">
          <XIcon className="h-3.5 w-3.5 fill-white" />
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" title="Pinterest" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E60023] text-white shadow-md transition hover:scale-110">
          <PinterestIcon className="h-4 w-4 fill-white" />
        </a>
        <a href="mailto:soporte@tudominio.com" title="Correo" className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-700 text-white shadow-md transition hover:scale-110">
          <EmailIcon className="h-4 w-4 fill-white" />
        </a>
        <a href="https://t.me" target="_blank" rel="noopener noreferrer" title="Telegram" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#24A1DE] text-white shadow-md transition hover:scale-110">
          <TelegramIcon className="h-4 w-4 fill-white" />
        </a>
        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition hover:scale-110">
          <WhatsAppIcon className="h-4 w-4 fill-white" />
        </a>
      </aside>

      {/* 2. CONTENEDOR PRINCIPAL DE 2 COLUMNAS (1240px) */}
      <main className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-10">

          {/* COLUMNA IZQUIERDA: CONTENIDO */}
          <article className="min-w-0 space-y-6">
            <div>
              <span className="inline-block rounded-xs bg-foreground px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-background border border-border">
                {software.category || "SOFTWARE"}
              </span>
            </div>

            <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-[34px] lg:leading-[1.2]">
              {software.name} {software.version} {(software as any).subtitleEdition || "Pre-Activado, Diseño gráfico"}
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
              <span>BY</span>
              <span className="text-[#2b88ff] font-bold">{author}</span>
              <span className="text-muted/60">·</span>
              <span className="text-muted">{postDate}</span>
            </div>

            {/* Caja 3D Mockup */}
            <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center overflow-hidden rounded-md border border-border bg-gradient-to-b from-muted-bg to-card p-6 sm:p-10 shadow-2xl">
              <div className="relative z-10 flex flex-col items-center">
                <img
                  src={(software as any).boxImage || software.image}
                  alt={software.name + " 3D Box"}
                  className="max-h-[360px] w-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)] rounded-xs transition-transform duration-300 hover:scale-105"
                />
                <div className="mt-3 text-center">
                  <span className="inline-block rounded-xs bg-blue-600/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-500 border border-blue-500/30 dark:text-blue-400">
                    {software.version} • {software.license}
                  </span>
                </div>
              </div>
            </div>

            {/* Textos */}
            <div className="space-y-4 text-[14px] leading-relaxed text-foreground/90">
              <p>{software.description}</p>
              <p>
                {(software as any).fullOverview || "En lo que respecta a este software, se confirma que es la herramienta lider para optimizar tus tareas diarias con maxima productividad y herramientas intuitivas."}
              </p>
            </div>

            {/* Funciones */}
            <div className="pt-2 space-y-4">
              <h2 className="text-lg font-bold text-foreground sm:text-xl">Funciones de {software.name}</h2>
              <ul className="space-y-2.5 text-[13.5px] leading-relaxed text-foreground/90">
                {software.features && software.features.length > 0 ? (
                  software.features.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-muted font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start gap-2.5">
                    <span className="text-muted font-bold">•</span>
                    <span>Herramientas avanzadas integradas y optimizadas para Windows de 64 bits.</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Nuevas Funciones */}
            <div className="pt-2 space-y-4">
              <h2 className="text-lg font-bold text-foreground sm:text-xl">Nuevas funciones en {software.name} {software.version}:</h2>
              <ul className="space-y-3 text-[13.5px] leading-relaxed text-foreground/90">
                {software.whatsNew && software.whatsNew.length > 0 ? (
                  software.whatsNew.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-muted font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start gap-2.5">
                    <span className="text-muted font-bold">•</span>
                    <span>Rendimiento acelerado y parches de compatibilidad para Windows 11.</span>
                  </li>
                )}
              </ul>
            </div>

            {/* BOTÓN AZUL ANCHO: CAPTURAS */}
            <div className="pt-4">
              <div className="flex w-full items-center justify-center gap-2 rounded-xs bg-[#0052ff] py-3 px-4 text-center text-xs font-black uppercase tracking-wider text-white shadow-md">
                <span>📷 CAPTURAS DEL PROGRAMA</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-xs border border-border bg-card shadow-xl">
              <img
                src={(software as any).programScreenshot || software.screenshots[0] || software.image}
                alt={"Captura de " + software.name}
                className="w-full object-cover max-h-[460px]"
              />
              <div className="bg-muted-bg p-2 text-center text-[11px] text-muted border-t border-border">
                Interfaz de trabajo de {software.name}
              </div>
            </div>

            {/* BOTÓN AZUL ANCHO: DATOS TÉCNICOS */}
            <div className="pt-2">
              <div className="flex w-full items-center justify-center gap-2 rounded-xs bg-[#0052ff] py-3 px-4 text-center text-xs font-black uppercase tracking-wider text-white shadow-md">
                <span>ℹ️ DATOS TÉCNICOS</span>
              </div>
            </div>

            <div className="rounded-xs border border-border bg-card p-5 text-center text-[13px] leading-relaxed text-foreground/90">
              <p className="font-bold text-card-foreground text-sm mb-1">{software.name}</p>
              <p className="text-muted font-mono text-xs sm:text-[13px]">
                {(software as any).technicalSummary || ("Idioma: " + ((software as any).language || "Multilenguaje") + " | Peso: " + software.size + " | OS: " + software.operatingSystem + " | Licencia: " + software.license + " | Version: " + software.version + " | +Instrucciones")}
              </p>
            </div>

            {/* BOTÓN AZUL ANCHO: ZONA DE DESCARGA */}
            <div id="descargar" className="pt-2 scroll-mt-24">
              <div className="flex w-full items-center justify-center gap-2 rounded-xs bg-[#0052ff] py-3 px-4 text-center text-xs font-black uppercase tracking-wider text-white shadow-md">
                <span>⬇️ ZONA DE DESCARGA</span>
              </div>
            </div>

            {/* TABLA DE DESCARGAS */}
            <div className="overflow-hidden rounded-xs border border-border bg-card">
              <div className="grid grid-cols-12 bg-muted-bg px-4 py-2.5 text-xs font-bold text-foreground border-b border-border">
                <div className="col-span-5 sm:col-span-6">Servidor</div>
                <div className="col-span-4 sm:col-span-3 text-center">Fecha de actualización</div>
                <div className="col-span-3 text-right">Enlace</div>
              </div>

              {/* Enlace Público */}
              <div className="grid grid-cols-12 items-center px-4 py-3.5 border-b border-border hover:bg-muted-bg/60 text-xs">
                <div className="col-span-5 sm:col-span-6">
                  <span className="font-black text-rose-500 uppercase tracking-wide">ENLACE PUBLICO</span>
                </div>
                <div className="col-span-4 sm:col-span-3 text-center text-muted font-mono">
                  {software.lastUpdated || "18-08-2026"}
                </div>
                <div className="col-span-3 text-right">
                  <a href={software.downloadUrl || "#"} target="_blank" rel="noopener noreferrer" className="inline-block rounded-xs bg-foreground px-3 py-1 text-[11px] font-bold text-background hover:opacity-90 transition">
                    Download
                  </a>
                </div>
              </div>

              {/* Enlace VIP */}
              <div className="grid grid-cols-12 items-center px-4 py-3.5 border-b border-border hover:bg-muted-bg/60 text-xs">
                <div className="col-span-5 sm:col-span-6">
                  <span className="font-black text-cyan-500 uppercase tracking-wide dark:text-cyan-400">ENLACE VIP</span>
                </div>
                <div className="col-span-4 sm:col-span-3 text-center text-muted font-mono">
                  {software.lastUpdated || "18-08-2026"}
                </div>
                <div className="col-span-3 text-right">
                  <a href={software.downloadUrl || "#"} target="_blank" rel="noopener noreferrer" className="inline-block rounded-xs bg-foreground px-3 py-1 text-[11px] font-bold text-background hover:opacity-90 transition">
                    Download
                  </a>
                </div>
              </div>

              <div className="p-2 text-center text-[11px] text-muted bg-muted-bg">
                {password}
              </div>
            </div>

            {/* Nota de Tutorial */}
            <div className="text-center text-xs italic text-muted">
              ¿No sabes como descargar? Te dejamos un tutorial súper explicado para seguir el método{" "}
              <a href="#tutorial" className="text-cyan-500 font-bold underline hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300">[ Clic Aquí ]</a>
            </div>

            {/* Contraseña */}
            <div className="text-center py-1">
              <button
                type="button"
                onClick={handleCopyPassword}
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300 transition"
              >
                <span>CONTRASEÑA/PASSWORD: <span className="underline">{password}</span></span>
                {copiedPassword ? (
                  <span className="text-[10px] text-emerald-500 font-normal">¡Copiado!</span>
                ) : (
                  <span className="text-[10px] opacity-70 underline">Copiar</span>
                )}
              </button>
            </div>

            {/* Botón Telegram Pill */}
            <div className="flex justify-center pt-1">
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0078f2] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#0066d1]"
              >
                <span>✈️ ÚNETE A NUESTRO CANAL DE TELEGRAM</span>
              </a>
            </div>

            {/* Banner Miembro VIP */}
            <div className="overflow-hidden rounded-xs border border-blue-500/40 bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-100 p-4 text-foreground shadow-lg dark:from-blue-950/80 dark:via-indigo-950/80 dark:to-blue-950/80 dark:text-white">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">👑</span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground dark:text-white">
                      SÉ UN MIEMBRO VIP - DESCARGA SIN ANUNCIOS
                    </h4>
                    <p className="text-[11px] text-blue-800 dark:text-blue-200">
                      Descargas a máxima velocidad garantizadas sin redirecciones.
                    </p>
                  </div>
                </div>
                <a href="#vip" className="rounded-xs bg-amber-500 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-black shadow-sm hover:bg-amber-400 transition">
                  MÁS INFORMACIÓN
                </a>
              </div>
            </div>

            {/* Tarjeta del Autor */}
            <div className="flex items-center gap-4 rounded-xs border border-border bg-card p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-700 text-white font-black text-lg shadow-md">
                <span>D</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-card-foreground">{author}</h3>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  {author} es un sitio web de software y noticias de tecnología, con guías completas de instalación para Windows, Juegos y Utilidades.
                </p>
              </div>
            </div>

            {/* Publicaciones Relacionadas (2x2) */}
            <div className="pt-4">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <span className="relative bg-background px-4 text-xs font-bold uppercase tracking-wider text-foreground">
                  Publicaciones relacionadas
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {relatedSoftware.map((item: any) => (
                  <Link
                    key={item.slug}
                    href={"/software/" + item.slug}
                    className="group overflow-hidden rounded-lg border border-border bg-card transition hover:bg-card-hover"
                  >
                    {/* Imagen 16:9 expandida al 100% */}
                    <div className="aspect-video w-full overflow-hidden bg-muted-bg">
                      <img
                        src={item.boxImage || item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Texto con formato de fecha largo */}
                    <div className="p-3.5">
                      <h4 className="text-xs font-bold text-card-foreground group-hover:text-blue-500 transition line-clamp-2 leading-snug dark:group-hover:text-blue-400">
                        {item.name} {item.version}, {item.subtitleEdition || item.description.slice(0, 40)}
                      </h4>
                      <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                        {formatDateLong(item.authorDate || item.lastUpdated)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Formulario de Comentarios */}
            <div className="pt-6">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <span className="relative bg-background px-4 text-xs font-bold uppercase tracking-wider text-foreground">
                  Escribe un comentario
                </span>
              </div>

                {commentsLoading ? (
                    <div className="text-center text-xs text-muted py-4">
                      Cargando comentarios...
                    </div>
                  ) : commentsList.length > 0 ? (
                    <div className="mt-6 space-y-4">
                      {/* Mostrar solo comentarios principales (parent_id === null) */}
                      {commentsList
                        .filter((c) => c.parent_id === null)
                        .map((comment) => renderComment(comment, commentsList))}
                    </div>
                  ) : (
                    <div className="text-center text-xs text-muted py-4">
                      No hay comentarios todavía. ¡Sé el primero!
                    </div>
                  )}

              <form onSubmit={handleCommentSubmit} className="mt-6 space-y-4">
                {commentSuccess && (
                  <div className="rounded-lg bg-emerald-100 border border-emerald-300 p-3 text-xs text-emerald-800 dark:bg-emerald-950/60 dark:border-emerald-800/60 dark:text-emerald-300">
                    ¡Comentario publicado exitosamente!
                  </div>
                )}
                <div className="grid gap-3 sm:grid-cols-3">
                  <input
                    type="text"
                    required
                    placeholder="Nombre *"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-xs text-foreground placeholder:text-muted focus:border-blue-600 focus:outline-hidden"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-xs text-foreground placeholder:text-muted focus:border-blue-600 focus:outline-hidden"
                  />
                  <input
                    type="url"
                    placeholder="Sitio web"
                    value={commentWebsite}
                    onChange={(e) => setCommentWebsite(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-xs text-foreground placeholder:text-muted focus:border-blue-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <textarea
                    rows={5}
                    required
                    placeholder="Escribe tu comentario aquí..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background p-3.5 text-xs text-foreground placeholder:text-muted focus:border-blue-600 focus:outline-hidden resize-y"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-foreground border border-border px-6 py-2.5 text-xs font-black uppercase tracking-wider text-background shadow-md hover:opacity-90 transition"
                >
                  PUBLICAR COMENTARIO
                </button>
              </form>
            </div>
          </article>



          {/* COLUMNA DERECHA: SIDEBAR STICKY */}
            <aside className="space-y-6 lg:sticky lg:top-8">
              {/* Avatar del sitio */}
              <div className="overflow-hidden rounded-lg border border-border bg-card p-5 text-center shadow-lg">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md border-2 border-border overflow-hidden">
                  <img
                    src="/Logo.png"
                    alt="Logo del sitio"
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <p className="mt-4 text-xs text-foreground/80 leading-relaxed">
                  Descargaspcpro es un sitio web de software y noticias de tecnología, con guías completas de instalación.
                </p>

                {/* Iconos de Redes Sociales */}
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2 border-t border-border pt-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    aria-label="Facebook"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm transition hover:scale-110"
                  >
                    <FacebookIcon className="h-3.5 w-3.5 fill-white" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="X (Twitter)"
                    aria-label="X (Twitter)"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white shadow-sm transition hover:scale-110 dark:border dark:border-border"
                  >
                    <XIcon className="h-3 w-3 fill-white" />
                  </a>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Pinterest"
                    aria-label="Pinterest"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E60023] text-white shadow-sm transition hover:scale-110"
                  >
                    <PinterestIcon className="h-3.5 w-3.5 fill-white" />
                  </a>
                  <a
                    href="https://t.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Telegram"
                    aria-label="Telegram"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#24A1DE] text-white shadow-sm transition hover:scale-110"
                  >
                    <TelegramIcon className="h-3.5 w-3.5 fill-white" />
                  </a>
                  <a
                    href="https://whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    aria-label="WhatsApp"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition hover:scale-110"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5 fill-white" />
                  </a>
                  <a
                    href="mailto:soporte@tudominio.com"
                    title="Correo"
                    aria-label="Correo"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-white shadow-sm transition hover:scale-110"
                  >
                    <EmailIcon className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

            {/* Últimas Publicaciones */}
            <div className="overflow-hidden rounded-lg border border-border bg-card p-4 shadow-lg">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-card-foreground border-b border-border pb-2.5">
                Últimas Publicaciones
              </h4>
              <div className="mt-3 space-y-3">
              {recentSoftware.map((item: any) => (
                <Link
                  key={item.slug}
                  href={"/software/" + item.slug}
                  className="group flex items-start gap-2.5 rounded-md p-2 transition hover:bg-muted-bg/60"
                >
                  {/* Imagen un poco más grande */}
                  <div className="aspect-video w-20 shrink-0 overflow-hidden rounded-md bg-muted-bg border border-border flex items-center justify-center">
                    <img
                      src={item.icon || item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Texto */}
                  <div className="min-w-0 flex-1">
                    <h5 className="text-[13px] font-bold text-card-foreground group-hover:text-blue-500 transition line-clamp-2 leading-snug dark:group-hover:text-blue-400">
                      {item.name} {item.version}
                    </h5>
                    <span className="text-[10.5px] text-muted font-semibold uppercase tracking-wider block mt-1">
                      {formatDateLong(item.authorDate || item.lastUpdated)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            </div>

            {/* Widget Telegram - Feed en vivo */}
            <TelegramWidget
              apiUrl="https://telegram-feed-api.rikiteach10.workers.dev/"
              channelUsername="rikitechhd"
              channelName="rikitechhd"
              joinUrl="https://t.me/rikitechhd"
            />

                       
          </aside>
        </div>
      </main>
    </div>
  );
}

                        

            

              

function FacebookIcon({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" /></svg>);
}
function XIcon({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>);
}
function PinterestIcon({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" /></svg>);
}
function EmailIcon({ className }: { className?: string }) {
  return (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>);
}
function TelegramIcon({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.29c-.15.66-.54.82-1.09.51l-3.02-2.23-1.46 1.41c-.16.16-.3.3-.61.3l.22-3.08 5.61-5.07c.24-.22-.05-.34-.38-.13l-6.93 4.36-2.98-.93c-.65-.2-.66-.65.14-.96l11.66-4.49c.54-.2 1.01.13.82 1.02z" /></svg>);
}
function WhatsAppIcon({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.122.554 4.188 1.608 6.012L.07 24l6.129-1.57c1.761.961 3.753 1.47 5.832 1.47 6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm0 22.023c-1.848 0-3.619-.497-5.163-1.428l-.37-.22-3.837.982 1.024-3.74-.241-.383c-1.024-1.63-1.564-3.518-1.564-5.464 0-5.541 4.509-10.05 10.051-10.05 5.542 0 10.05 4.509 10.05 10.05 0 5.541-4.508 10.05-10.05 10.05z" /></svg>);
}