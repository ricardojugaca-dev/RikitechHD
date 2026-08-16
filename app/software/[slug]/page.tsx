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
      {/* Structured data / JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main className="w-full flex-1">
        <article className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

          {/* Breadcrumb */}
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

          {/* Main image */}
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
            <Image
              src={software.image}
              alt={`${software.name} ${software.version}`}
              width={1280}
              height={720}
              priority
              sizes="(max-width: 1023px) 100vw, 1024px"
              className="block h-auto w-full"
            />
          </div>

          {/* Article header */}
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
              <p>{software.description}</p>

              <p>
                {software.name} is developed by{" "}
                <strong className="font-semibold text-black dark:text-white">
                  {software.developer}
                </strong>{" "}
                and is designed for{" "}
                <strong className="font-semibold text-black dark:text-white">
                  {software.operatingSystem}
                </strong>
                .
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

                    <span>{item}</span>
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

                    <span>{highlight}</span>
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

                    <span>{feature}</span>
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

                    <span>{requirement}</span>
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

                          <span>{pro}</span>
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

                          <span>{con}</span>
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
                        alt={`${software.name} screenshot ${
                          index + 1
                        }`}
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
          {/* Related Software */}
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
      </main>
    </>
  );
}

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