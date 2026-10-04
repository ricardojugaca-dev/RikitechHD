import Link from "next/link";

export const metadata = {
  title: "Términos y Condiciones",
  description: "Lee los términos y condiciones de uso del sitio Rikitechhd.",
};

export default function TermsPage() {
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
            Términos y Condiciones
          </h1>
          <p className="mt-3 text-sm text-muted">
            Última actualización: {lastUpdated}
          </p>
        </div>

        <div className="space-y-8 text-[15px] leading-7 text-foreground/85">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              1. Aceptación de los términos
            </h2>
            <p>
              Al acceder y usar <strong>Rikitechhd</strong> aceptas cumplir con
              estos Términos y Condiciones. Si no estás de acuerdo con alguna
              parte, te pedimos que no utilices el sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              2. Uso del sitio
            </h2>
            <p>Te comprometes a usar este sitio únicamente con fines legales. No podrás:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Usar el sitio para actividades ilegales o no autorizadas.</li>
              <li>Intentar acceder a áreas restringidas del servidor.</li>
              <li>Descargar o distribuir contenido sin autorización.</li>
              <li>Introducir virus, malware o código dañino.</li>
              <li>Automatizar el acceso mediante bots o scrapers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              3. Propiedad intelectual
            </h2>
            <p>
              Todo el contenido original de este sitio (textos, diseño, logotipo,
              código) es propiedad de <strong>Rikitechhd</strong> y está
              protegido por derechos de autor.
            </p>
            <p className="mt-3">
              Los programas, juegos, drivers y utilidades que se muestran en
              este sitio son propiedad de sus respectivos desarrolladores. En
              Rikitechhd únicamente facilitamos enlaces a descargas oficiales o
              recursos públicos disponibles en internet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              4. Enlaces de descarga
            </h2>
            <p>
              Los enlaces de descarga que ofrecemos apuntan a servidores
              externos. No alojamos archivos en nuestros servidores. No nos
              hacemos responsables de la disponibilidad, seguridad o contenido
              de dichos enlaces.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              5. Limitación de responsabilidad
            </h2>
            <p>
              Rikitechhd se proporciona "tal cual" sin garantías de ningún tipo.
              No nos hacemos responsables de:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Daños directos o indirectos derivados del uso del sitio.</li>
              <li>Pérdida de datos o interrupciones del servicio.</li>
              <li>Problemas causados por programas descargados.</li>
              <li>Contenido de sitios externos enlazados.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              6. Comentarios de usuarios
            </h2>
            <p>
              Al publicar comentarios, otorgas a Rikitechhd una licencia no
              exclusiva para mostrar, moderar y eliminar dichos comentarios. Nos
              reservamos el derecho de eliminar cualquier comentario que:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Contenga lenguaje ofensivo o discriminatorio.</li>
              <li>Promocione productos o servicios no relacionados.</li>
              <li>Incluya enlaces maliciosos o spam.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              7. Modificaciones
            </h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en
              cualquier momento. Los cambios entrarán en vigor al publicarse en
              esta página.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              8. Ley aplicable
            </h2>
            <p>
              Estos términos se rigen por las leyes del país donde opera
              Rikitechhd. Cualquier disputa se resolverá en los tribunales
              competentes de dicha jurisdicción.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              9. Contacto
            </h2>
            <p>
              Si tienes dudas sobre estos términos, contáctanos en nuestra{" "}
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