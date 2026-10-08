import Link from "next/link";
import CookieSettings from "@/components/CookieSettings";

export const metadata = {
  title: "Política de Cookies",
  description: "Conoce qué cookies usa Rikitechhd y cómo puedes gestionarlas.",
};

const sections = [
  { id: "que-son", title: "1. ¿Qué son las cookies?" },
  { id: "tipos", title: "2. Tipos de cookies" },
  { id: "terceros", title: "3. Cookies de terceros" },
  { id: "gestionar", title: "4. Cómo gestionarlas" },
  { id: "preferencias", title: "5. Cambiar tus preferencias" },
  { id: "cambios", title: "6. Cambios en esta política" },
  { id: "contacto", title: "7. Contacto" },
];

export default function CookiesPage() {
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
                Política de Cookies
              </h1>
              <p className="mt-3 text-sm text-muted">
                Última actualización: {lastUpdated}
              </p>
            </div>

            <div className="space-y-10 text-[15px] leading-7 text-foreground/85">
              <section id="que-son" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  1. ¿Qué son las cookies?
                </h2>
                <p>
                  Las cookies son pequeños archivos de texto que se almacenan en
                  tu dispositivo cuando visitas un sitio web. Permiten al sitio
                  recordar tus preferencias y mejorar tu experiencia de
                  navegación.
                </p>
              </section>

              <section id="tipos" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  2. Tipos de cookies que usamos
                </h2>
                <div className="mt-4 space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      🔧 Cookies esenciales
                    </h3>
                    <p>
                      Necesarias para el funcionamiento básico del sitio.
                      Incluyen la preferencia de tema (claro/oscuro) y la sesión
                      de usuario.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      📊 Cookies de análisis
                    </h3>
                    <p>
                      Nos ayudan a entender cómo los visitantes usan el sitio
                      (páginas más visitadas, tiempo de permanencia). Usamos
                      Google Analytics de forma anónima.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      ⚙️ Cookies de preferencias
                    </h3>
                    <p>
                      Recuerdan tus preferencias como el idioma, la región o el
                      tamaño de fuente.
                    </p>
                  </div>
                </div>
              </section>

              <section id="terceros" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  3. Cookies de terceros
                </h2>
                <p>
                  Algunos servicios externos que usamos pueden instalar cookies
                  en tu dispositivo:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    <strong>Google Analytics:</strong> estadísticas de tráfico.
                  </li>
                  <li>
                    <strong>Web3Forms:</strong> procesamiento del formulario de
                    contacto.
                  </li>
                  <li>
                    <strong>Vercel:</strong> hosting y análisis de rendimiento.
                  </li>
                </ul>
              </section>

              <section id="gestionar" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  4. Cómo gestionar las cookies
                </h2>
                <p>
                  Puedes controlar o eliminar cookies desde la configuración de
                  tu navegador:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    <strong>Chrome:</strong> Configuración → Privacidad y
                    seguridad → Cookies
                  </li>
                  <li>
                    <strong>Firefox:</strong> Opciones → Privacidad y seguridad
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferencias → Privacidad
                  </li>
                  <li>
                    <strong>Edge:</strong> Configuración → Cookies y permisos
                  </li>
                </ul>
                <p className="mt-3">
                  Ten en cuenta que deshabilitar cookies puede afectar la
                  funcionalidad del sitio.
                </p>
              </section>

              {/* ⭐ NUEVA SECCIÓN: Cambiar preferencias */}
              <section id="preferencias" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  5. Cambiar tus preferencias
                </h2>
                <p>
                  Puedes cambiar tus preferencias de cookies en cualquier momento
                  haciendo clic en{" "}
                  <CookieSettings>este enlace</CookieSettings>
                  . Se abrirá nuevamente el panel de configuración para que ajustes
                  tu elección.
                </p>
              </section>

              <section id="cambios" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  6. Cambios en esta política
                </h2>
                <p>
                  Podemos actualizar esta Política de Cookies ocasionalmente.
                  Los cambios se publicarán en esta página con la fecha
                  actualizada.
                </p>
              </section>

              <section id="contacto" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  7. Contacto
                </h2>
                <p>
                  Para preguntas sobre esta política, contáctanos a través de
                  nuestra{" "}
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
          </main>
        </div>
      </div>
    </div>
  );
}