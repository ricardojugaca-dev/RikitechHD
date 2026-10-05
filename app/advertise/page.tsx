import Link from "next/link";
import Image from "next/image";
import { softwareList } from "@/data/software";

export const metadata = {
  title: "Publicidad",
  description: "Anuncia tu producto o servicio en Rikitechhd.",
};

export default function AdvertisePage() {
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
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl mb-3">
              Publicidad
            </h1>
            <p className="mb-8 text-muted">
              Anuncia tu producto o servicio ante miles de usuarios tecnológicos.
            </p>

            <div className="space-y-10 text-[15px] leading-7 text-foreground/85">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  ¿Por qué anunciar en Rikitechhd?
                </h2>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    <strong>Audiencia especializada:</strong> usuarios
                    interesados en tecnología, software y optimización.
                  </li>
                  <li>
                    <strong>Tráfico constante:</strong> visitas diarias de
                    personas que buscan descargar software confiable.
                  </li>
                  <li>
                    <strong>Formatos flexibles:</strong> banner, artículo
                    patrocinado, reseña profesional.
                  </li>
                  <li>
                    <strong>Espacios limitados:</strong> evitamos la saturación
                    publicitaria para mantener la calidad del sitio.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Formatos disponibles
                </h2>
                <div className="mt-4 space-y-5">
                  <div className="rounded-lg border border-border bg-card p-4">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      🖼️ Banner lateral
                    </h3>
                    <p className="text-sm text-muted">
                      Espacio publicitario en el sidebar del sitio. Ideal para
                      visibilidad constante mientras el usuario navega.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      📰 Banner superior
                    </h3>
                    <p className="text-sm text-muted">
                      Ubicación premium arriba del contenido principal. Máxima
                      visibilidad en cada página.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      ✍️ Artículo patrocinado
                    </h3>
                    <p className="text-sm text-muted">
                      Contenido dedicado a tu producto o servicio con total
                      libertad editorial (marcado como "Patrocinado").
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      ⭐ Reseña profesional
                    </h3>
                    <p className="text-sm text-muted">
                      Análisis detallado y honesto de tu software, con capturas
                      de pantalla, pros y contras.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Nuestros números
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-border bg-card p-4 text-center">
                    <p className="text-2xl font-black text-blue-400">+10K</p>
                    <p className="mt-1 text-xs text-muted">Visitas/mes</p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4 text-center">
                    <p className="text-2xl font-black text-blue-400">+50</p>
                    <p className="mt-1 text-xs text-muted">Artículos</p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4 text-center">
                    <p className="text-2xl font-black text-blue-400">+5K</p>
                    <p className="mt-1 text-xs text-muted">Descargas</p>
                  </div>
                </div>
                <p className="mt-3 text-xs italic text-muted">
                  * Cifras aproximadas. Solicita estadísticas detalladas al
                  contactarnos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Contacto comercial
                </h2>
                <p>
                  Para conocer tarifas, disponibilidad y formatos
                  personalizados, contáctanos a través de nuestra{" "}
                  <Link
                    href="/contact"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    página de contacto
                  </Link>{" "}
                  con el asunto <strong>"Publicidad"</strong>.
                </p>
              </section>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            {/* Card CTA */}
            <div className="overflow-hidden rounded-lg border border-border bg-card p-5 shadow-lg">
              <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-white shadow-md">
                <Image
                  src="/software/Logo.png"
                  alt="Logo del sitio"
                  width={80}
                  height={80}
                  className="h-full w-full object-contain p-1"
                />
              </div>
              <h3 className="mt-4 text-center text-sm font-bold text-foreground">
                ¿Listo para anunciar?
              </h3>
              <p className="mt-2 text-center text-xs text-muted leading-relaxed">
                Contáctanos y te enviaremos un paquete con tarifas y
                disponibilidad.
              </p>
              <Link
                href="/contact"
                className="mt-4 block w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-[13px] font-bold text-white transition hover:bg-blue-500"
              >
                Contactar ahora
              </Link>
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