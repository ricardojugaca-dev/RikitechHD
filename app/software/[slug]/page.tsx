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
    const pwd = (software as any).password || "www.rikitechhd.net";
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
  // Formatear fecha como "18 DE AGOSTO DE 2026"
const formatDateLong = (dateStr: string | undefined) => {
  if (!dateStr) return "FECHA DESCONOCIDA";
  
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
    
    if (day === 1) {
      return `${month} DE ${year}`;
    }
    
    return `${day} DE ${month} DE ${year}`;
  } catch {
    return dateStr.toUpperCase();
  }
};
  // Calcular tiempo de lectura basado en el contenido
  const calculateReadTime = (software: any): number => {
    // Concatenar todo el texto del artículo
    const allText = [
      software.description || "",
      software.fullOverview || "",
      ...(software.features || []),
      ...(software.whatsNew || []),
      ...(software.versionHighlights || []),
      ...(software.systemRequirements || []),
    ].join(" ");

    // Contar palabras (promedio de lectura: 200 palabras/minuto)
    const wordCount = allText.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);

    // Mínimo 1 minuto
    return Math.max(1, minutes);
  };
  // Formatear fecha como tiempo relativo: "HACE 5 HORAS", "HACE 2 DÍAS", etc.
  const formatTimeAgo = (dateStr: string | undefined) => {
  if (!dateStr) return "Fecha desconocida";
  
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMin < 1) return "Ahora mismo";
    if (diffMin < 60) return `Hace ${diffMin} minuto${diffMin !== 1 ? "s" : ""}`;
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours !== 1 ? "s" : ""}`;
    if (diffDays < 7) return `Hace ${diffDays} día${diffDays !== 1 ? "s" : ""}`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) !== 1 ? "s" : ""}`;
    if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} mes${Math.floor(diffDays / 30) !== 1 ? "es" : ""}`;
    return `Hace ${Math.floor(diffDays / 365)} año${Math.floor(diffDays / 365) !== 1 ? "s" : ""}`;
  } catch {
    return dateStr;
  }
};
  // Función recursiva para renderizar comentarios con sus respuestas
const renderComment = (
  comment: typeof commentsList[0],
  allComments: typeof commentsList,
  depth: number = 0
): React.ReactNode => {
  const replies = allComments.filter((c) => c.parent_id === comment.id);

  // Iniciales del nombre (ej. "Juan Díaz" → "JD")
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Color del avatar basado en el nombre
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500/20 text-blue-400",
      "bg-emerald-500/20 text-emerald-400",
      "bg-purple-500/20 text-purple-400",
      "bg-amber-500/20 text-amber-400",
      "bg-rose-500/20 text-rose-400",
      "bg-cyan-500/20 text-cyan-400",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div key={comment.id} style={{ marginLeft: depth > 0 ? "2.5rem" : "0" }}>
      <div className="flex gap-3 mb-4">
        {/* Avatar con iniciales */}
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold shrink-0 ${getAvatarColor(comment.name)}`}
        >
          {getInitials(comment.name)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header: nombre + fecha */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-foreground text-[14px]">
              {comment.name}
            </span>
            <span className="text-[12px] text-muted">
              {formatTimeAgo(comment.created_at)}
            </span>
          </div>

          {/* Texto del comentario */}
          <p className="mt-1.5 text-[14px] text-foreground/85 leading-relaxed">
            {comment.text}
          </p>

          {/* Botón responder */}
          <button
            type="button"
            onClick={() =>
              setReplyingTo(replyingTo === comment.id ? null : comment.id)
            }
            className="mt-1.5 text-[12px] font-bold text-blue-500 hover:text-blue-400 transition"
          >
            {replyingTo === comment.id ? "Cancelar" : "Responder"}
          </button>

          {/* Formulario de respuesta inline */}
          {replyingTo === comment.id && (
            <div className="mt-3 space-y-2">
              <input
                type="text"
                required
                placeholder="Tu nombre *"
                value={replyName}
                onChange={(e) => setReplyName(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted focus:border-blue-600 focus:outline-hidden"
              />
              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Responder a ${comment.name}...`}
                className="w-full rounded-lg border border-border bg-background p-3 text-[13px] text-foreground placeholder:text-muted focus:border-blue-600 focus:outline-hidden resize-y"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleReplySubmit(comment.id)}
                  className="rounded-lg bg-blue-600 px-4 py-1.5 text-[12px] font-bold text-white hover:bg-blue-500 transition"
                >
                  Publicar respuesta
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyText("");
                    setReplyName("");
                    setReplyEmail("");
                  }}
                  className="rounded-lg border border-border px-4 py-1.5 text-[12px] font-bold text-muted hover:text-foreground transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Respuestas anidadas */}
      {replies.length > 0 && (
        <div className="ml-3 border-l-2 border-border/40 pl-4">
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
  const password = (software as any).password || "www.rikitechhd.net";

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
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs text-muted">
                <Link href="/" className="hover:text-foreground transition">
                  Inicio
                </Link>
                <span className="text-muted/50">/</span>
                <Link href="/software" className="hover:text-foreground transition">
                  Software
                </Link>
                <span className="text-muted/50">/</span>
                <span className="text-foreground font-medium">{software.name}</span>
              </nav>

              {/* Categoría + tiempo de lectura */}
              <div className="flex flex-wrap items-center gap-5 text-xs">
                <span className="font-extrabold uppercase tracking-wider text-blue-400">
                  {software.category || "SOFTWARE"}
                </span>

                <div className="flex items-center gap-1.5 text-muted uppercase tracking-wider font-semibold">
                  <ClockIcon className="h-3.5 w-3.5" />
                  <span>{calculateReadTime(software)} min de lectura</span>
                </div>
              </div>

             <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-[34px] lg:leading-[1.2]">
                {software.name} {software.version}
                {software.subtitleEdition && (
                  <> - {software.subtitleEdition}</>
                )}
              </h1>

                {/* Descripción corta */}
                <p className="text-[15px] text-muted leading-7 max-w-2xl">
                  {software.description}
                </p>

                {/* Línea superior */}
              <div className="border-t border-border" />

              {/* Metadata con iconos + iniciales + corazón */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted py-2">
                {/* Grupo izquierdo: iniciales + autor + fecha + comentarios */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Iniciales RT */}
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-950 text-[12px] font-bold text-blue-400 shrink-0">
                      RT
                    </div>
                    <span className="font-semibold text-foreground">RikiTech</span>
                  </div>

                  {/* Fecha */}
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    <span>{formatDateLong(postDate)}</span>
                  </div>

                  {/* Comentarios */}
                  <div className="flex items-center gap-1.5">
                    <CommentIcon className="h-3.5 w-3.5" />
                    <span>{commentsList.length} comentarios</span>
                  </div>
                </div>

                {/* Grupo derecho: corazón con contador */}
                <button
                  type="button"
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 transition ${
                    hasLiked ? "text-red-500" : "text-muted hover:text-red-500"
                  }`}
                  aria-label={hasLiked ? "Quitar like" : "Dar like"}
                >
                  <HeartIcon className="h-4 w-4" filled={hasLiked} />
                  <span className="font-semibold">{likes}</span>
                </button>
              </div>

              {/* Línea inferior */}
              <div className="border-t border-border" />

            {/* Caja 3D Mockup */}
            {/* Imagen principal expandida */}
                {/* Imagen principal expandida */}
                  <div className="relative w-full overflow-hidden rounded-lg border border-border bg-muted-bg shadow-xl">
                    <div className="aspect-video w-full">
                      <img
                        src={(software as any).boxImage || software.image}
                        alt={software.name + " 3D Box"}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>

            {/* Texto de introducción */}
                <div className="space-y-5 text-[15px] leading-8 text-foreground/80">
                  <p>
                     {software.fullOverview ||
                      `${software.name} es una de las herramientas más prácticas para mantener tu equipo optimizado. Su sistema analiza tu ordenador, identifica los componentes que necesitan atención y propone una instalación sencilla.`}
                  </p>
                  <p>
                    Esta edición incluye una experiencia sin límites, mayor velocidad de descarga y funciones pensadas para que tu equipo se mantenga estable.
                  </p>
                </div>

                {/* ===== SECCIÓN: LO QUE INCLUYE ===== */}
                <div className="pt-6">
                  {/* Encabezado de la sección */}
                  <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-blue-400">
                    <BoltIcon className="h-3.5 w-3.5" />
                    <span>Lo que incluye</span>
                  </div>

                  <h2 className="mt-1.5 text-2xl font-black tracking-tight text-foreground sm:text-[26px]">
                    Funciones principales
                  </h2>

                  {/* Lista de funciones en 2 columnas */}
                  <div className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 border-t border-border pt-5">
                    {software.features && software.features.length > 0 ? (
                      software.features.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckIcon className="h-4 w-4 shrink-0 mt-0.5 text-blue-500" />
                          <span className="text-[14px] text-foreground/85 leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-start gap-2.5">
                        <CheckIcon className="h-4 w-4 shrink-0 mt-0.5 text-blue-500" />
                        <span className="text-[14px] text-foreground/85">
                          Herramientas avanzadas integradas para Windows de 64 bits.
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ===== SECCIÓN: NOVEDADES ===== */}
                <div className="pt-10">
                  {/* Encabezado de la sección */}
                  <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-blue-400">
                    <StarIcon className="h-3.5 w-3.5" />
                    <span>Novedades</span>
                  </div>

                  <h2 className="mt-1.5 text-2xl font-black tracking-tight text-foreground sm:text-[26px]">
                    Qué hay de nuevo en la versión {software.version}
                  </h2>

                  {/* Lista de novedades numeradas */}
                  <div className="mt-5 border-t border-border">
                    {software.whatsNew && software.whatsNew.length > 0 ? (
                      software.whatsNew.map((item: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 py-3.5 border-b border-border/60"
                        >
                          <span className="text-[13px] font-bold text-blue-400 shrink-0 tabular-nums">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[14px] text-foreground/85 leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-start gap-4 py-3.5">
                        <span className="text-[13px] font-bold text-blue-400 shrink-0">01</span>
                        <span className="text-[14px] text-foreground/85">
                          Rendimiento acelerado y parches de compatibilidad para Windows 11.
                        </span>
                      </div>
                    )}
                  </div>
                </div>

            {/* ===== SECCIÓN: VISTA PREVIA ===== */}
                <div className="pt-10">
                  {/* Encabezado de la sección */}
                  <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-blue-400">
                    <MonitorIcon className="h-3.5 w-3.5" />
                    <span>Vista previa</span>
                  </div>

                  <h2 className="mt-1.5 text-2xl font-black tracking-tight text-foreground sm:text-[26px]">
                    Así se ve el programa
                  </h2>

                  {/* Mockup estilo ventana de navegador */}
                  <div className="mt-5 border-t border-border pt-5">
                    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                      {/* Barra superior estilo navegador */}
                      <div className="flex items-center gap-2 border-b border-border bg-muted-bg/40 px-4 py-3">
                        {/* Botones de ventana (macOS style) */}
                        <div className="flex items-center gap-1.5">
                          <span className="h-3 w-3 rounded-full bg-red-500/80"></span>
                          <span className="h-3 w-3 rounded-full bg-yellow-500/80"></span>
                          <span className="h-3 w-3 rounded-full bg-green-500/80"></span>
                        </div>
                        {/* Título de la ventana */}
                        <span className="ml-3 text-[11px] font-medium text-muted">
                          {software.name} Pro
                        </span>
                      </div>

                      {/* Contenido de la captura */}
                      <div className="bg-[#0a0a0c]">
                        <img
                          src={(software as any).programScreenshot || software.screenshots[0] || software.image}
                          alt={"Captura de " + software.name}
                          className="w-full object-cover max-h-[460px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pie de imagen */}
                  <p className="mt-3 text-center text-[11px] text-muted">
                    Interfaz principal de {software.name} {software.version}
                  </p>
                </div>

                {/* ===== SECCIÓN: DATOS TÉCNICOS ===== */}
                      <div className="pt-10">
                        {/* Encabezado de la sección */}
                        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-blue-400">
                          <InfoIcon className="h-3.5 w-3.5" />
                          <span>Información</span>
                        </div>

                        <h2 className="mt-1.5 text-2xl font-black tracking-tight text-foreground sm:text-[26px]">
                          Datos técnicos
                        </h2>

                        {/* Tabla de especificaciones en 2 columnas */}
                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 overflow-hidden rounded-xl border border-border bg-card">
                          {/* Versión */}
                          <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:border-r">
                            <span className="text-[13px] text-muted">Versión</span>
                            <span className="text-[13px] font-bold text-foreground">
                              {software.version}
                            </span>
                          </div>

                          {/* Sistema */}
                          <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
                            <span className="text-[13px] text-muted">Sistema</span>
                            <span className="text-[13px] font-bold text-foreground">
                              {software.operatingSystem}
                            </span>
                          </div>

                          {/* Arquitectura */}
                          <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:border-r">
                            <span className="text-[13px] text-muted">Arquitectura</span>
                            <span className="text-[13px] font-bold text-foreground">
                              {software.architecture || "64 bits"}
                            </span>
                          </div>

                          {/* Idioma */}
                          <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
                            <span className="text-[13px] text-muted">Idioma</span>
                            <span className="text-[13px] font-bold text-foreground">
                              {software.language || "Español / Multi"}
                            </span>
                          </div>

                          {/* Tamaño - SIN border-b en móvil y SIN sm:border-r en desktop */}
                          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:border-r sm:border-b-0 border-b border-border sm:border-b-0">
                            <span className="text-[13px] text-muted">Tamaño</span>
                            <span className="text-[13px] font-bold text-foreground">
                              {software.size}
                            </span>
                          </div>

                          {/* Licencia */}
                          <div className="flex items-center justify-between gap-4 px-5 py-4">
                            <span className="text-[13px] text-muted">Licencia</span>
                            <span className="text-[13px] font-bold text-foreground">
                              {software.license}
                            </span>
                          </div>
                        </div>
                      </div>

                  {/* ===== SECCIÓN: ZONA DE DESCARGA ===== */}
                  <div id="descargar" className="pt-10 scroll-mt-24">
                    {/* Encabezado de la sección */}
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-blue-400">
                          <DownloadIcon className="h-3.5 w-3.5" />
                          <span>Descarga segura</span>
                        </div>
                        <h2 className="mt-1.5 text-2xl font-black tracking-tight text-foreground sm:text-[26px]">
                          Elige tu enlace
                        </h2>
                      </div>

                      {/* Badge Verificado */}
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-500">
                        <ShieldCheckIcon className="h-3.5 w-3.5" />
                        <span>Verificado</span>
                      </div>
                    </div>

                    {/* Tarjeta contenedora de enlaces */}
                    <div className="overflow-hidden rounded-xl border border-border bg-card">
                      {/* Enlace Público */}
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-5">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
                            <GlobeIcon className="h-4.5 w-4.5" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-[15px] font-bold text-foreground">Enlace público</h3>
                            <p className="text-[12.5px] text-muted mt-0.5">
                              Descarga estándar · {software.size}
                            </p>
                          </div>
                        </div>
                        <a
                          href={software.downloadUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-[13px] font-bold text-white shadow-sm hover:bg-blue-500 transition shrink-0"
                        >
                          <DownloadIcon className="h-4 w-4" />
                          <span>Descargar</span>
                        </a>
                      </div>

                      {/* Enlace VIP */}
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-5">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                            <LockIcon className="h-4.5 w-4.5" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-[15px] font-bold text-foreground">Enlace VIP</h3>
                            <p className="text-[12.5px] text-muted mt-0.5">
                              Sin anuncios · Máxima velocidad
                            </p>
                          </div>
                        </div>
                        <a
                          href={software.downloadUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/40 px-4 py-2 text-[13px] font-bold text-amber-500 hover:bg-amber-500/20 transition shrink-0"
                        >
                          <ZapIcon className="h-4 w-4" />
                          <span>Descargar</span>
                        </a>
                      </div>

                      {/* Barra de contraseña */}
                      <div className="flex flex-wrap items-center justify-between gap-4 bg-muted-bg/40 px-5 py-3">
                        <div className="flex items-center gap-2 text-[12.5px] text-muted min-w-0">
                          <span>Contraseña:</span>
                          <span className="font-mono font-semibold text-foreground truncate">
                            {password}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyPassword}
                          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-blue-400 hover:text-blue-300 transition shrink-0"
                        >
                          {copiedPassword ? (
                            <>
                              <CheckIcon className="h-3.5 w-3.5" />
                              <span>¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <CopyIcon className="h-3.5 w-3.5" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Tarjeta: Recibe nuevas publicaciones - FONDO AZUL */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-blue-500 bg-blue-600 p-5 text-white">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white shrink-0">
                          <SendIcon className="h-4.5 w-4.5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-[15px] font-bold text-white">
                            Recibe nuevas publicaciones
                          </h3>
                          <p className="text-[12.5px] text-blue-100 mt-0.5">
                            Únete al canal y no te pierdas ninguna herramienta.
                          </p>
                        </div>
                      </div>
                      <a
                        href="https://t.me/rikitechhd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-[13px] font-bold text-blue-600 shadow-sm hover:bg-blue-50 transition shrink-0"
                      >
                        Unirme al canal
                      </a>
                    </div>
                  </div>

            {/* Nota de Tutorial */}
            <div className="text-center text-xs italic text-muted">
              ¿No sabes como descargar? Te dejamos un tutorial súper explicado para seguir el método{" "}
              <a href="#tutorial" className="text-cyan-500 font-bold underline hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300">[ Clic Aquí ]</a>
            </div>

            


                {false && (
                  <>
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
                  </>
                )}

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

            {/* ===== SECCIÓN: COMENTARIOS ===== */}
              <div className="pt-10">
                {/* Encabezado: Comentarios + contador + filtro */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black tracking-tight text-foreground">
                      Comentarios
                    </h2>
                    <span className="text-[15px] text-muted">
                      ({commentsList.length})
                    </span>
                  </div>

                  {/* Filtro "Más recientes" (visual) */}
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-[13px] font-semibold text-blue-400 hover:text-blue-300 transition"
                  >
                    <span>Más recientes</span>
                    <ChevronDownIcon className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Lista de comentarios */}
                <div className="border-t border-border pt-6">
                  {commentsLoading ? (
                    <div className="text-center text-xs text-muted py-4">
                      Cargando comentarios...
                    </div>
                  ) : commentsList.length > 0 ? (
                    <div className="space-y-6">
                      {commentsList
                        .filter((c) => c.parent_id === null)
                        .map((comment) => renderComment(comment, commentsList))}
                    </div>
                  ) : (
                    <div className="text-center text-xs text-muted py-4">
                      No hay comentarios todavía. ¡Sé el primero!
                    </div>
                  )}
                </div>

                {/* Formulario de comentario */}
                <form onSubmit={handleCommentSubmit} className="mt-8">
                  {commentSuccess && (
                    <div className="mb-4 rounded-lg bg-emerald-100 border border-emerald-300 p-3 text-xs text-emerald-800 dark:bg-emerald-950/60 dark:border-emerald-800/60 dark:text-emerald-300">
                      ¡Comentario publicado exitosamente!
                    </div>
                  )}

                  {/* Caja del formulario */}
                  <div className="overflow-hidden rounded-xl border border-border bg-card">
                    {/* Textarea principal */}
                    <textarea
                      rows={4}
                      required
                      placeholder="Escribe un comentario..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full bg-transparent px-5 py-4 text-[14px] text-foreground placeholder:text-muted focus:outline-hidden resize-y border-b border-border"
                    />

                    {/* Barra inferior: nota + botón publicar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
                      <p className="text-[12px] text-muted">
                        Tu comentario será moderado antes de publicarse.
                      </p>
                      <button
                        type="submit"
                        className="rounded-lg bg-white px-5 py-2 text-[13px] font-bold text-black shadow-sm hover:bg-zinc-100 transition shrink-0"
                      >
                        Publicar
                      </button>
                    </div>
                  </div>

                  {/* Campos adicionales (opcionales) */}
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <input
                      type="text"
                      required
                      placeholder="Nombre *"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] text-foreground placeholder:text-muted focus:border-blue-600 focus:outline-hidden"
                    />
                    <input
                      type="email"
                      placeholder="Email (opcional)"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] text-foreground placeholder:text-muted focus:border-blue-600 focus:outline-hidden"
                    />
                    <input
                      type="url"
                      placeholder="Sitio web (opcional)"
                      value={commentWebsite}
                      onChange={(e) => setCommentWebsite(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] text-foreground placeholder:text-muted focus:border-blue-600 focus:outline-hidden"
                    />
                  </div>
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


function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function CommentIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function HeartIcon({ className, filled = false }: { className?: string; filled?: boolean }) {
  return (
    <svg
      className={className}
      fill={filled ? "currentColor" : "none"}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function BoltIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
      <line x1="9" y1="13" x2="9.01" y2="13" />
      <line x1="15" y1="13" x2="15.01" y2="13" />
      <line x1="9" y1="17" x2="9.01" y2="17" />
      <line x1="15" y1="17" x2="15.01" y2="17" />
    </svg>
  );
}
function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}