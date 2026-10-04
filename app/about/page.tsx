import Link from "next/link";

export const metadata = {
  title: "Sobre Nosotros",
  description: "Conoce más sobre Rikitechhd, tu sitio de confianza para descargas de software.",
};

export default function AboutPage() {
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
            Sobre Nosotros
          </h1>
        </div>

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
                <strong>Catálogo de software:</strong> programas de utilidades,
                multimedia, drivers, ofimática y más.
              </li>
              <li>
                <strong>Guías de instalación:</strong> tutoriales paso a paso
                para cada programa.
              </li>
              <li>
                <strong>Análisis y comparativas:</strong> reseñas honestas
                sobre las herramientas que recomendamos.
              </li>
              <li>
                <strong>Enlaces verificados:</strong> solo enlazamos a fuentes
                oficiales o seguras.
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
                <strong>Seguridad:</strong> verificamos los enlaces para evitar
                malware y contenido malicioso.
              </li>
              <li>
                <strong>Transparencia:</strong> informamos claramente sobre el
                origen de cada descarga.
              </li>
              <li>
                <strong>Respeto a la propiedad intelectual:</strong> cumplimos
                con las leyes de derechos de autor y atendemos cualquier
                reporte DMCA.
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
              Nos encantaría escucharte. Si tienes ideas, quejas o sugerencias
              para mejorar el sitio, no dudes en escribirnos a través de
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
  );
}