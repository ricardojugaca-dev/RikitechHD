import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { softwareList } from "@/data/software";
import CTA from "@/components/layout/CTA";

type SoftwarePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: SoftwarePageProps): Promise<Metadata> {
  const { slug } = await params;

  const software = softwareList.find(
    (item) => item.slug === slug
  );

  if (!software) {
    return {
      title: "Software not found | RIKITECHHD",
      description: "The requested software could not be found.",
    };
  }

  return {
    title: `${software.name} ${software.version} - Download for Windows`,
    description: software.description,

    alternates: {
      canonical: `https://rikitech-hd.vercel.app/software/${software.slug}`,
    },

    openGraph: {
      title: `${software.name} ${software.version} - Download for Windows`,
      description: software.description,
      url: `https://rikitech-hd.vercel.app/software/${software.slug}`,
      siteName: "RIKITECHHD",
      type: "website",
      images: [
        {
          url: `https://rikitech-hd.vercel.app${software.image}`,
          width: 1280,
          height: 720,
          alt: `${software.name} - RIKITECHHD`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${software.name} ${software.version} - Download for Windows`,
      description: software.description,
      images: [
        `https://rikitech-hd.vercel.app${software.image}`,
      ],
    },
  };
}

export default async function SoftwarePage({
  params,
}: SoftwarePageProps) {
  const { slug } = await params;

  const software = softwareList.find(
    (item) => item.slug === slug
  );

  if (!software) {
    notFound();
  }

  /*
   * ==========================================================
   * RELATED SOFTWARE
   * ==========================================================
   *
   * Primero buscamos software de la misma categoría.
   * Si no hay suficientes, completamos con otras categorías.
   */

  const relatedSoftware = [
    ...softwareList.filter(
      (item) =>
        item.slug !== software.slug &&
        item.category === software.category
    ),

    ...softwareList.filter(
      (item) =>
        item.slug !== software.slug &&
        item.category !== software.category
    ),
  ].slice(0, 3);

  /*
   * ==========================================================
   * JSON-LD
   * ==========================================================
   */

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",

    name: software.name,
    description: software.description,

    image: `https://rikitech-hd.vercel.app${software.image}`,

    version: software.version,

    operatingSystem: software.operatingSystem,

    applicationCategory:
      software.schemaCategory ?? software.category,

    author: {
      "@type": "Organization",
      name: software.developer,
    },
  };

  return (
    <>
      {/* ================================================== */}
      {/* STRUCTURED DATA / JSON-LD */}
      {/* ================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main className="w-full flex-1">

        {/* ================================================== */}
        {/* PAGE CONTAINER */}
        {/* ================================================== */}

        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

          {/* ================================================== */}
          {/* BREADCRUMB */}
          {/* ================================================== */}

          <nav
            aria-label="Breadcrumb"
            className="mb-8 text-sm text-black/50 dark:text-white/50"
          >
            <span>Home</span>

            <span className="mx-2">/</span>

            <span>Software</span>

            <span className="mx-2">/</span>

            <span className="text-black dark:text-white">
              {software.name}
            </span>
          </nav>

          {/* ================================================== */}
          {/* TWO COLUMN LAYOUT */}
          {/* ================================================== */}

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">

            {/* ================================================== */}
            {/* MAIN ARTICLE */}
            {/* ================================================== */}

            <article className="min-w-0">

              {/* ================================================== */}
              {/* MAIN IMAGE */}
              {/* ================================================== */}

              <div className="overflow-hidden rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
                <Image
                  src={software.image}
                  alt={`${software.name} ${software.version}`}
                  width={1280}
                  height={720}
                  priority
                  sizes="(max-width: 1023px) 100vw, 900px"
                  className="block h-auto w-full"
                />
              </div>

              {/* ================================================== */}
              {/* ARTICLE HEADER */}
              {/* ================================================== */}

              <header className="mt-10">

                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                  {software.category}
                </p>

                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  {software.name} {software.version}
                </h1>

                <p className="mt-5 max-w-3xl text-lg leading-8 text-black/60 dark:text-white/60">
                  {software.description}
                </p>

                {/* Tags */}

                <div className="mt-6 flex flex-wrap gap-3">

                  <span className="rounded-full bg-black/5 px-4 py-2 text-sm dark:bg-white/10">
                    Version {software.version}
                  </span>

                  <span className="rounded-full bg-black/5 px-4 py-2 text-sm dark:bg-white/10">
                    {software.operatingSystem}
                  </span>

                  <span className="rounded-full bg-black/5 px-4 py-2 text-sm dark:bg-white/10">
                    {software.license}
                  </span>

                  <span className="rounded-full bg-black/5 px-4 py-2 text-sm dark:bg-white/10">
                    Updated {software.lastUpdated}
                  </span>

                </div>

              </header>

              {/* ================================================== */}
              {/* SOFTWARE INFORMATION */}
              {/* ================================================== */}

              <section className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">

                <h2 className="text-2xl font-bold">
                  Software Information
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  <InfoItem
                    label="Version"
                    value={software.version}
                  />

                  <InfoItem
                    label="Developer"
                    value={software.developer}
                  />

                  <InfoItem
                    label="Operating System"
                    value={software.operatingSystem}
                  />

                  <InfoItem
                    label="License"
                    value={software.license}
                  />

                  <InfoItem
                    label="Category"
                    value={software.category}
                  />

                  <InfoItem
                    label="Size"
                    value={software.size}
                  />

                </div>

              </section>

              {/* ================================================== */}
              {/* ABOUT */}
              {/* ================================================== */}

              <section className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">

                <h2 className="text-2xl font-bold">
                  About {software.name}
                </h2>

                <div className="mt-5 max-w-4xl space-y-5 leading-8 text-black/60 dark:text-white/60">

                  <p>
                    {software.description}
                  </p>

                  <p>
                    {software.name} is developed by{" "}
                    <strong className="font-semibold text-black dark:text-white">
                      {software.developer}
                    </strong>{" "}
                    and is designed for{" "}
                    <strong className="font-semibold text-black dark:text-white">
                      {software.operatingSystem}
                    </strong>.
                  </p>

                </div>

              </section>

              {/* ================================================== */}
              {/* WHAT'S NEW */}
              {/* ================================================== */}

              {software.whatsNew.length > 0 && (
                <section className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">

                  <h2 className="text-2xl font-bold">
                    What&apos;s New in Version {software.version}
                  </h2>

                  <ul className="mt-6 space-y-3">

                    {software.whatsNew.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-black/70 dark:text-white/70"
                      >
                        <span className="mt-1 text-blue-600 dark:text-blue-400">
                          ✓
                        </span>

                        <span>
                          {item}
                        </span>
                      </li>
                    ))}

                  </ul>

                </section>
              )}

              {/* ================================================== */}
              {/* VERSION HIGHLIGHTS */}
              {/* ================================================== */}

              {software.versionHighlights.length > 0 && (
                <section className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">

                  <h2 className="text-2xl font-bold">
                    Version Highlights
                  </h2>

                  <ul className="mt-6 space-y-3">

                    {software.versionHighlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-black/70 dark:text-white/70"
                      >
                        <span className="mt-1 text-blue-600 dark:text-blue-400">
                          •
                        </span>

                        <span>
                          {highlight}
                        </span>
                      </li>
                    ))}

                  </ul>

                </section>
              )}

              {/* ================================================== */}
              {/* FEATURES */}
              {/* ================================================== */}

              {software.features.length > 0 && (
                <section className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">

                  <h2 className="text-2xl font-bold">
                    Features
                  </h2>

                  <ul className="mt-6 space-y-3">

                    {software.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-black/70 dark:text-white/70"
                      >
                        <span className="mt-1 text-blue-600 dark:text-blue-400">
                          ✓
                        </span>

                        <span>
                          {feature}
                        </span>
                      </li>
                    ))}

                  </ul>

                </section>
              )}

              {/* ================================================== */}
              {/* SYSTEM REQUIREMENTS */}
              {/* ================================================== */}

              {software.systemRequirements.length > 0 && (
                <section className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">

                  <h2 className="text-2xl font-bold">
                    System Requirements
                  </h2>

                  <ul className="mt-6 space-y-3">

                    {software.systemRequirements.map((requirement) => (
                      <li
                        key={requirement}
                        className="flex items-start gap-3 text-black/70 dark:text-white/70"
                      >
                        <span className="mt-1 text-blue-600 dark:text-blue-400">
                          •
                        </span>

                        <span>
                          {requirement}
                        </span>
                      </li>
                    ))}

                  </ul>

                </section>
              )}

              {/* ================================================== */}
              {/* PROS AND CONS */}
              {/* ================================================== */}

              {(software.pros.length > 0 || software.cons.length > 0) && (
                <section className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">

                  <h2 className="text-2xl font-bold">
                    Pros &amp; Cons
                  </h2>

                  <div className="mt-6 grid gap-8 md:grid-cols-2">

                    {/* Pros */}

                    {software.pros.length > 0 && (
                      <div>

                        <h3 className="text-lg font-semibold">
                          Pros
                        </h3>

                        <ul className="mt-4 space-y-3">

                          {software.pros.map((pro) => (
                            <li
                              key={pro}
                              className="flex items-start gap-3 text-black/70 dark:text-white/70"
                            >
                              <span className="text-green-600 dark:text-green-400">
                                ✓
                              </span>

                              <span>
                                {pro}
                              </span>
                            </li>
                          ))}

                        </ul>

                      </div>
                    )}

                    {/* Cons */}

                    {software.cons.length > 0 && (
                      <div>

                        <h3 className="text-lg font-semibold">
                          Cons
                        </h3>

                        <ul className="mt-4 space-y-3">

                          {software.cons.map((con) => (
                            <li
                              key={con}
                              className="flex items-start gap-3 text-black/70 dark:text-white/70"
                            >
                              <span className="text-red-500 dark:text-red-400">
                                ×
                              </span>

                              <span>
                                {con}
                              </span>
                            </li>
                          ))}

                        </ul>

                      </div>
                    )}

                  </div>

                </section>
              )}

              {/* ================================================== */}
              {/* SCREENSHOTS */}
              {/* ================================================== */}

              {software.screenshots.length > 0 && (
                <section className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">

                  <h2 className="text-2xl font-bold">
                    Screenshots
                  </h2>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">

                    {software.screenshots.map(
                      (screenshot, index) => (
                        <div
                          key={screenshot}
                          className="overflow-hidden rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5"
                        >
                          <Image
                            src={screenshot}
                            alt={`${software.name} screenshot ${index + 1}`}
                            width={1280}
                            height={720}
                            sizes="(max-width: 639px) 100vw, 50vw"
                            className="block h-auto w-full"
                          />
                        </div>
                      )
                    )}

                  </div>

                </section>
              )}

              {/* ================================================== */}
              {/* DOWNLOAD */}
              {/* ================================================== */}

              <section className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">

                <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-6 text-center dark:border-white/10 dark:bg-white/[0.02] sm:p-8">

                  <h2 className="text-2xl font-bold">
                    Download {software.name}
                  </h2>

                  <p className="mx-auto mt-3 max-w-xl text-black/60 dark:text-white/60">
                    Download {software.name} for{" "}
                    {software.operatingSystem}.
                  </p>

                  <a
                    href="https://rikitech.infinityfree.me/"
                    className="mt-6 inline-block rounded-xl bg-black px-8 py-3.5 font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                  >
                    Download
                  </a>

                </div>

              </section>

              {/* ================================================== */}
              {/* RELATED SOFTWARE */}
              {/* ================================================== */}

              {relatedSoftware.length > 0 && (
                <section className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">

                  <h2 className="text-2xl font-bold">
                    Related Software
                  </h2>

                  <p className="mt-3 text-black/60 dark:text-white/60">
                    You may also be interested in these software programs.
                  </p>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    {relatedSoftware.map((item) => (
                      <a
                        key={item.slug}
                        href={`/software/${item.slug}`}
                        className="group overflow-hidden rounded-2xl border border-black/10 bg-black/[0.02] transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/[0.02]"
                      >

                        <div className="overflow-hidden">

                          <Image
                            src={item.image}
                            alt={`${item.name} ${item.version}`}
                            width={1280}
                            height={720}
                            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                            className="block h-auto w-full transition duration-300 group-hover:scale-[1.02]"
                          />

                        </div>

                        <div className="p-5">

                          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                            {item.category}
                          </p>

                          <h3 className="mt-2 text-lg font-bold">
                            {item.name}
                          </h3>

                          <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                            Version {item.version}
                          </p>

                          <span className="mt-4 inline-block text-sm font-semibold">
                            View software →
                          </span>

                        </div>

                      </a>
                    ))}

                  </div>

                </section>
              )}

              {/* ================================================== */}
              {/* SHARE */}
              {/* ================================================== */}

              <section className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">

                <div className="text-center">

                  <h2 className="text-xl font-bold">
                    Share this article
                  </h2>

                  <p className="mt-2 text-sm text-black/50 dark:text-white/50">
                    Share {software.name} with others.
                  </p>

                  <div className="mt-5 flex justify-center gap-3">

                    <button
                      type="button"
                      className="rounded-xl border border-black/10 px-4 py-2 text-sm transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                    >
                      Facebook
                    </button>

                    <button
                      type="button"
                      className="rounded-xl border border-black/10 px-4 py-2 text-sm transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                    >
                      X
                    </button>

                    <button
                      type="button"
                      className="rounded-xl border border-black/10 px-4 py-2 text-sm transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                    >
                      Copy link
                    </button>

                  </div>

                </div>

              </section>

              {/* ================================================== */}
              {/* COMMENTS */}
              {/* ================================================== */}

              <section className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">

                <h2 className="text-2xl font-bold">
                  Comments
                </h2>

                <div className="mt-6 rounded-2xl border border-black/10 bg-black/[0.02] p-6 dark:border-white/10 dark:bg-white/[0.02] sm:p-8">

                  <p className="text-black/60 dark:text-white/60">
                    Have something to say about {software.name}?
                    Leave a comment below.
                  </p>

                  <div className="mt-5">

                    <p className="text-sm text-black/50 dark:text-white/50">
                      Comments system will be added here.
                    </p>

                  </div>

                </div>

              </section>

              <CTA />

            </article>

            {/* ================================================== */}
            {/* SIDEBAR */}
            {/* ================================================== */}

            <aside className="lg:sticky lg:top-24">

              <div className="space-y-6">

                {/* Social Media Card */}

                <section className="rounded-2xl border border-black/10 bg-black/[0.02] p-6 dark:border-white/10 dark:bg-white/[0.02]">

                  <h2 className="text-lg font-bold">
                    Follow Us
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-black/60 dark:text-white/60">
                    Stay connected and follow us on social media for updates.
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-3">

                    {/* Facebook */}
                    <a
                      href="https://facebook.com/tu-pagina"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="flex h-14 items-center justify-center rounded-xl border border-black/10 bg-white transition hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-blue-600 dark:hover:border-blue-600"
                    >
                      <FacebookIcon className="h-5 w-5" />
                    </a>

                    {/* X / Twitter */}
                    <a
                      href="https://x.com/tu-usuario"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X (Twitter)"
                      className="flex h-14 items-center justify-center rounded-xl border border-black/10 bg-white transition hover:bg-black hover:border-black hover:text-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white dark:hover:border-white dark:hover:text-black"
                    >
                      <XTwitterIcon className="h-5 w-5" />
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://instagram.com/tu-usuario"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="flex h-14 items-center justify-center rounded-xl border border-black/10 bg-white transition hover:bg-pink-600 hover:border-pink-600 hover:text-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-pink-600 dark:hover:border-pink-600"
                    >
                      <InstagramIcon className="h-5 w-5" />
                    </a>

                    {/* YouTube */}
                    <a
                      href="https://youtube.com/@tu-canal"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="flex h-14 items-center justify-center rounded-xl border border-black/10 bg-white transition hover:bg-red-600 hover:border-red-600 hover:text-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-red-600 dark:hover:border-red-600"
                    >
                      <YoutubeIcon className="h-5 w-5" />
                    </a>

                    {/* GitHub */}
                    <a
                      href="https://github.com/tu-usuario"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="flex h-14 items-center justify-center rounded-xl border border-black/10 bg-white transition hover:bg-gray-800 hover:border-gray-800 hover:text-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white dark:hover:border-white dark:hover:text-black"
                    >
                      <GithubIcon className="h-5 w-5" />
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com/in/tu-usuario"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="flex h-14 items-center justify-center rounded-xl border border-black/10 bg-white transition hover:bg-blue-700 hover:border-blue-700 hover:text-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-blue-700 dark:hover:border-blue-700"
                    >
                      <LinkedinIcon className="h-5 w-5" />
                    </a>

                  </div>

                </section>

                {/* Download Card */}

                <section className="rounded-2xl border border-black/10 bg-black/[0.02] p-6 dark:border-white/10 dark:bg-white/[0.02]">

                  <h2 className="text-lg font-bold">
                    Download
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-black/60 dark:text-white/60">
                    Download {software.name} for{" "}
                    {software.operatingSystem}.
                  </p>

                  <a
                    href="https://rikitech.infinityfree.me/"
                    className="mt-5 block w-full rounded-xl bg-black px-5 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                  >
                    Download
                  </a>

                </section>

                {/* Related Software Sidebar */}

                {relatedSoftware.length > 0 && (
                  <section className="rounded-2xl border border-black/10 bg-black/[0.02] p-6 dark:border-white/10 dark:bg-white/[0.02]">

                    <h2 className="text-lg font-bold">
                      Related Software
                    </h2>

                    <div className="mt-5 space-y-4">

                      {relatedSoftware.map((item) => (
                        <a
                          key={item.slug}
                          href={`/software/${item.slug}`}
                          className="group flex gap-3"
                        >

                          <div className="w-20 shrink-0 overflow-hidden rounded-lg border border-black/10 dark:border-white/10">

                            <Image
                              src={item.image}
                              alt={`${item.name} ${item.version}`}
                              width={1280}
                              height={720}
                              sizes="80px"
                              className="block aspect-video h-auto w-full object-cover transition duration-300 group-hover:scale-105"
                            />

                          </div>

                          <div className="min-w-0">

                            <h3 className="line-clamp-2 text-sm font-semibold group-hover:underline">
                              {item.name}
                            </h3>

                            <p className="mt-1 text-xs text-black/50 dark:text-white/50">
                              Version {item.version}
                            </p>

                          </div>

                        </a>
                      ))}

                    </div>

                  </section>
                )}

              </div>

            </aside>

          </div>

        </div>

      </main>
    </>
  );
}

/* ==========================================================
 * SOCIAL ICONS (SVG Inline)
 * ========================================================== */

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
    </svg>
  );
}

function XTwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}



/* ==========================================================
 * INFO ITEM
 * ========================================================== */

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-black/10 p-5 dark:border-white/10">

      <p className="text-sm text-black/50 dark:text-white/50">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>

    </div>
  );
}

/* ==========================================================
 * SIDEBAR ITEM
 * ========================================================== */

function SidebarItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-black/10 pb-3 last:border-0 last:pb-0 dark:border-white/10">

      <p className="text-xs uppercase tracking-wide text-black/50 dark:text-white/50">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold">
        {value}
      </p>

    </div>
  );
}