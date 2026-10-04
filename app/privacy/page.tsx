import Link from "next/link";

export const metadata = {
  title: "Política de Privacidad",
  description: "Conoce cómo Rikitechhd recopila, usa y protege tu información personal.",
};

export default function PrivacyPage() {
  const lastUpdated = "4 de octubre de 2026";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link
            href="/"
            className="text-[13px] font-semibold text-blue-400 hover:text-blue-300 transition"
          >
            ← Volver al inicio
          </Link>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Política de Privacidad
          </h1>
          <p className="mt-3 text-sm text-muted">
            Última actualización: {lastUpdated}
          </p>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-[15px] leading-7 text-foreground/85">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              1. Información que recopilamos
            </h2>
            <p>
              En <strong>Rikitechhd</strong> respetamos tu privacidad. Recopilamos
              únicamente la información necesaria para brindarte un servicio
              óptimo. Esto puede incluir:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Datos de navegación:</strong> dirección IP, tipo de
                navegador, sistema operativo, páginas visitadas y tiempo de
                permanencia.
              </li>
              <li>
                <strong>Datos proporcionados por ti:</strong> nombre y correo
                electrónico cuando envías un comentario o usas el formulario de
                contacto.
              </li>
              <li>
                <strong>Cookies:</strong> pequeños archivos que almacenan
                preferencias de navegación y estadísticas anónimas.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              2. Cómo usamos tu información
            </h2>
            <p>Utilizamos los datos recopilados para:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Mejorar la experiencia de navegación en el sitio.</li>
              <li>Responder a consultas enviadas por el formulario de contacto.</li>
              <li>Analizar estadísticas de uso para optimizar el contenido.</li>
              <li>Prevenir fraudes, spam y actividades maliciosas.</li>
              <li>Cumplir con obligaciones legales aplicables.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              3. Compartir información con terceros
            </h2>
            <p>
              <strong>No vendemos ni alquilamos tus datos personales.</strong>{" "}
              Únicamente compartimos información con:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Servicios de análisis:</strong> como Google Analytics,
                para medir el tráfico del sitio de forma anónima.
              </li>
              <li>
                <strong>Servicios de formularios:</strong> como Web3Forms, para
                procesar los mensajes del formulario de contacto.
              </li>
              <li>
                <strong>Autoridades legales:</strong> cuando sea requerido por
                ley.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              4. Seguridad de tus datos
            </h2>
            <p>
              Implementamos medidas técnicas y organizativas razonables para
              proteger tu información contra accesos no autorizados, pérdida o
              alteración. Sin embargo, ningún sistema es 100% seguro, por lo que
              no podemos garantizar seguridad absoluta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              5. Tus derechos
            </h2>
            <p>Tienes derecho a:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Acceder a los datos personales que tenemos sobre ti.</li>
              <li>Solicitar la corrección de datos incorrectos.</li>
              <li>Solicitar la eliminación de tus datos.</li>
              <li>Oponerte al procesamiento de tus datos.</li>
              <li>Retirar tu consentimiento en cualquier momento.</li>
            </ul>
            <p className="mt-3">
              Para ejercer estos derechos, contáctanos a través de nuestra{" "}
              <Link
                href="/contact"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                página de contacto
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              6. Menores de edad
            </h2>
            <p>
              Este sitio no está dirigido a menores de 13 años. No recopilamos
              conscientemente información de niños. Si eres padre o tutor y
              crees que tu hijo nos ha proporcionado datos, contáctanos para
              eliminarlos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              7. Cambios en esta política
            </h2>
            <p>
              Podemos actualizar esta Política de Privacidad ocasionalmente.
              Te notificaremos cualquier cambio publicando la nueva versión en
              esta página con la fecha de actualización.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              8. Contacto
            </h2>
            <p>
              Si tienes preguntas sobre esta política, puedes contactarnos a
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
      </main>
    </div>
  );
}