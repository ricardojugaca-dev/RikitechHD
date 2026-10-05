import Link from "next/link";
import Image from "next/image";
import { softwareList } from "@/data/software";

export const metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce más sobre Rikitechhd, tu sitio de confianza para descargas de software.",
};

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M19.6 7.2c-1.7 0-3.2-1-3.9-2.5-.2-.4-.3-.9-.3-1.4h-3.1v13.2c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .7.1 1 .2v-3.2c-.3 0-.7-.1-1-.1-3.2 0-5.8 2.6-5.8 5.8s2.6 5.8 5.8 5.8 5.8-2.6 5.8-5.8V10c1.2.9 2.7 1.4 4.2 1.4V8.3c0-.4 0-.7-.1-1.1Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@rikitechhd",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.8V8.2l6.5 3.8-6.5 3.8Z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.2-8.2L2.8 2h6.5l4.4 5.8L18.9 2Zm-1.1 17.9h1.7L8.3 4H6.5l11.3 15.9Z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    href: "https://t.me/rikitechhd",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.29c-.15.66-.54.82-1.09.51l-3.02-2.23-1.46 1.41c-.16.16-.3.3-.61.3l.22-3.08 5.61-5.07c.24-.22-.05-.34-.38-.13l-6.93 4.36-2.98-.93c-.65-.2-.66-.65.14-.96l11.66-4.49c.54-.2 1.01.13.82 1.02z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  const recentSoftware = softwareList.slice(0, 5);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-10">
          {/* Contenido principal */}
          <article className="min-w-0">
            <Link
              href="/"
              className="text-[13px] font-semibold text-blue-400 hover:text-blue-300 transition"
            >
              ← Volver al inicio
            </Link>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl mb-8">
              Sobre Nosotros
            </h1>

            <div className="space-y-8 text-[15px] leading-7 text-foreground/85">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  ¿Quiénes somos?
                </h2>
                <p>
                  <strong>Rikitechhd</strong> es un sitio web dedicado a la
                  divulgación y distribución de software, drivers, utilidades y
                  recursos tecnológicos para usuarios de Windows y otras
                  plataformas. Nuestro objetivo es ofrecer un catálogo curado y
                  confiable de las mejores herramientas disponibles.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Nuestra misión
                </h2>
                <p>
                  Facilitar el acceso a software de calidad para que puedas
                  optimizar tu equipo, resolver problemas técnicos y descubrir
                  nuevas herramientas que mejoren tu productividad.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  ¿Qué ofrecemos?
                </h2>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    <strong>Catálogo de software:</strong> programas de
                    utilidades, multimedia, drivers, ofimática y más.
                  </li>
                  <li>
                    <strong>Guías de instalación:</strong> tutoriales paso a
                    paso para cada programa.
                  </li>
                  <li>
                    <strong>Análisis y comparativas:</strong> reseñas honestas
                    sobre las herramientas que recomendamos.
                  </li>
                  <li>
                    <strong>Enlaces verificados:</strong> solo enlazamos a
                    fuentes oficiales o seguras.
                  </li>
                  <li>
                    <strong>Actualizaciones constantes:</strong> mantenemos el
                    catálogo actualizado con las últimas versiones.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Nuestro compromiso
                </h2>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    <strong>Seguridad:</strong> verificamos los enlaces para
                    evitar malware y contenido malicioso.
                  </li>
                  <li>
                    <strong>Transparencia:</strong> informamos claramente sobre
                    el origen de cada descarga.
                  </li>
                  <li>
                    <strong>Respeto a la propiedad intelectual:</strong>{" "}
                    cumplimos con las leyes de derechos de autor y atendemos
                    cualquier reporte DMCA.
                  </li>
                  <li>
                    <strong>Comunidad:</strong> escuchamos a nuestros usuarios y
                    tomamos en cuenta sus sugerencias.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  ¿Tienes alguna sugerencia?
                </h2>
                <p>
                  Nos encantaría escucharte. Si tienes ideas, quejas o
                  sugerencias para mejorar el sitio, no dudes en escribirnos a
                  través de nuestra{" "}
                  <Link
                    href="/contact"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    página de contacto
                  </Link>
                  .
                </p>
              </section>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            {/* Card del sitio */}
            <div className="overflow-hidden rounded-lg border border-border bg-card p-5 text-center shadow-lg">
              <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-white shadow-md">
                <Image
                  src="/software/Logo.png"
                  alt="Logo del sitio"
                  width={80}
                  height={80}
                  className="h-full w-full object-contain p-1"
                />
              </div>
              <p className="mt-4 text-xs text-foreground/80 leading-relaxed">
                Rikitechhd es tu sitio de confianza para descargar software,
                juegos y utilidades con guías paso a paso y enlaces verificados.
              </p>

              {/* Redes sociales */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 border-t border-border pt-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition hover:border-blue-500 hover:text-blue-400"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Últimas publicaciones */}
            <div className="overflow-hidden rounded-lg border border-border bg-card p-4 shadow-lg">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-card-foreground border-b border-border pb-2.5">
                Últimas Publicaciones
              </h4>
              <div className="mt-3 space-y-3">
                {recentSoftware.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/software/${item.slug}`}
                    className="group flex items-start gap-2.5 rounded-md p-2 transition hover:bg-muted-bg/60"
                  >
                    <div className="flex aspect-video w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-muted-bg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h5 className="text-[13px] font-bold text-card-foreground group-hover:text-blue-500 transition line-clamp-2 leading-snug">
                        {item.name} {item.version}
                      </h5>
                      <span className="mt-1 block text-[10.5px] font-semibold uppercase tracking-wider text-muted">
                        {item.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}