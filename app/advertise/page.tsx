import Link from "next/link";

export const metadata = {
  title: "Publicidad",
  description: "Anuncia tu producto o servicio en Rikitechhd.",
};

export default function AdvertisePage() {
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
            Publicidad
          </h1>
          <p className="mt-3 text-muted">
            Anuncia tu producto o servicio ante miles de usuarios tecnológicos.
          </p>
        </div>

        <div className="space-y-8 text-[15px] leading-7 text-foreground/85">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              ¿Por qué anunciar en Rikitechhd?
            </h2>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Audiencia especializada en tecnología y software.</li>
              <li>Tráfico constante y creciente.</li>
              <li>Formatos de publicidad flexibles (banner, artículo patrocinado, reseña).</li>
              <li>Espacios limitados para evitar saturación.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Formatos disponibles
            </h2>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Banner lateral:</strong> en el sidebar del sitio.</li>
              <li><strong>Banner superior:</strong> arriba del contenido principal.</li>
              <li><strong>Artículo patrocinado:</strong> contenido dedicado a tu producto.</li>
              <li><strong>Reseña profesional:</strong> análisis detallado de tu software.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Contacto comercial
            </h2>
            <p>
              Para conocer tarifas y disponibilidad, contáctanos a través de
              nuestra{" "}
              <Link
                href="/contact"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                página de contacto
              </Link>{" "}
              con el asunto "Publicidad".
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}