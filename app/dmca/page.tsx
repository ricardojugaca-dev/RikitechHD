import Link from "next/link";

export const metadata = {
  title: "DMCA",
  description:
    "Información sobre cómo reportar contenido con derechos de autor en Rikitechhd.",
};

const sections = [
  { id: "compromiso", title: "Compromiso con derechos de autor" },
  { id: "naturaleza", title: "Naturaleza del sitio" },
  { id: "reportar", title: "Cómo reportar una infracción" },
  { id: "proceso", title: "Proceso de respuesta" },
  { id: "contranotificacion", title: "Contranotificación" },
  { id: "contacto", title: "Contacto" },
];

export default function DmcaPage() {
  const lastUpdated = "4 de octubre de 2026";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-16">
          {/* Tabla de contenidos */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-400 mb-4">
                En esta página
              </h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-[13px] text-muted hover:text-foreground transition-colors py-1.5 border-l-2 border-border pl-3 hover:border-blue-500"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Contenido principal */}
          <main className="max-w-3xl min-w-0">
            <div className="mb-12">
              <Link
                href="/"
                className="text-[13px] font-semibold text-blue-400 hover:text-blue-300 transition"
              >
                ← Volver al inicio
              </Link>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                DMCA
              </h1>
              <p className="mt-3 text-sm text-muted">
                Digital Millennium Copyright Act · Última actualización:{" "}
                {lastUpdated}
              </p>
            </div>

            <div className="space-y-10 text-[15px] leading-7 text-foreground/85">
              <section id="compromiso" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Compromiso con los derechos de autor
                </h2>
                <p>
                  En <strong>Rikitechhd</strong> respetamos los derechos de
                  propiedad intelectual y esperamos que nuestros usuarios hagan
                  lo mismo. Cumplimos con la Digital Millennium Copyright Act
                  (DMCA) y respondemos rápidamente a las reclamaciones válidas
                  de infracción de derechos de autor.
                </p>
              </section>

              <section id="naturaleza" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Naturaleza del sitio
                </h2>
                <p>
                  Rikitechhd <strong>no aloja archivos ni programas</strong> en
                  sus servidores. Somos un sitio informativo que recopila y
                  comparte enlaces a recursos disponibles públicamente en
                  internet (sitios oficiales de desarrolladores, tiendas de
                  aplicaciones, repositorios públicos, etc.).
                </p>
              </section>

              <section id="reportar" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Cómo reportar una infracción
                </h2>
                <p>
                  Si eres titular de derechos de autor y crees que tu contenido
                  ha sido publicado en Rikitechhd sin autorización, por favor
                  envíanos una notificación por escrito con la siguiente
                  información:
                </p>
                <ol className="list-decimal pl-6 mt-3 space-y-2">
                  <li>
                    <strong>Identificación del titular:</strong> nombre
                    completo, dirección, teléfono y correo electrónico.
                  </li>
                  <li>
                    <strong>Identificación del contenido:</strong> descripción
                    detallada del contenido protegido que consideras
                    infringido.
                  </li>
                  <li>
                    <strong>Ubicación:</strong> URL exacta en Rikitechhd donde
                    se encuentra el contenido reportado.
                  </li>
                  <li>
                    <strong>Declaración de buena fe:</strong> afirmación de que
                    el uso no está autorizado por el titular, su agente o la
                    ley.
                  </li>
                  <li>
                    <strong>Declaración de exactitud:</strong> afirmación de
                    que la información es precisa y que estás autorizado para
                    actuar en nombre del titular.
                  </li>
                  <li>
                    <strong>Firma:</strong> firma física o electrónica del
                    titular o su representante autorizado.
                  </li>
                </ol>
              </section>

              <section id="proceso" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Proceso de respuesta
                </h2>
                <p>Una vez recibida una notificación DMCA válida:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    Revisaremos el reporte en un plazo máximo de 72 horas.
                  </li>
                  <li>
                    Si es válido, eliminaremos o deshabilitaremos el contenido
                    señalado.
                  </li>
                  <li>
                    Notificaremos al usuario que publicó el contenido si aplica.
                  </li>
                  <li>
                    Tomaremos las medidas necesarias para evitar reincidencias.
                  </li>
                </ul>
              </section>

              <section id="contranotificacion" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Contranotificación
                </h2>
                <p>
                  Si crees que tu contenido fue eliminado por error, puedes
                  enviar una contranotificación con información similar a la
                  anterior, indicando por qué tu contenido no infringe derechos
                  de autor.
                </p>
              </section>

              <section id="contacto" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Contacto
                </h2>
                <p>
                  Para enviar una notificación DMCA, utiliza nuestra{" "}
                  <Link
                    href="/contact"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    página de contacto
                  </Link>{" "}
                  con el asunto &ldquo;DMCA Report&rdquo;.
                </p>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}