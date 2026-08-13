import Image from "next/image";
import { notFound } from "next/navigation";
import { softwareList } from "@/data/software";

type SoftwarePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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

  return (
    <main className="w-full flex-1">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-black/50 dark:text-white/50">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>Software</span>
          <span className="mx-2">/</span>
          <span className="text-black dark:text-white">
            {software.name}
          </span>
        </nav>

        {/* Main software information */}
        <div className="grid items-start gap-10 lg:grid-cols-[420px_1fr] xl:grid-cols-[480px_1fr]">
          
          {/* Image */}
          <div className="w-full overflow-hidden rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
            <Image
                src={software.image}
                alt={`${software.name} logo`}
                width={1280}
                height={720}
                priority
                sizes="(max-width: 1023px) 100vw, 480px"
                className="block h-auto w-full"
            />
            </div>

          {/* Information */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
              {software.category}
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {software.name}
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
            </div>

            {/* Download button */}
            <button
              type="button"
              className="mt-8 rounded-xl bg-black px-7 py-3.5 font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
            >
              Download
            </button>
          </div>
        </div>

        {/* Software information */}
        <section className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">
          <h2 className="text-2xl font-bold">
            Software Information
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            
            <div className="rounded-xl border border-black/10 p-5 dark:border-white/10">
              <p className="text-sm text-black/50 dark:text-white/50">
                Version
              </p>
              <p className="mt-1 font-semibold">
                {software.version}
              </p>
            </div>

            <div className="rounded-xl border border-black/10 p-5 dark:border-white/10">
              <p className="text-sm text-black/50 dark:text-white/50">
                Developer
              </p>
              <p className="mt-1 font-semibold">
                {software.developer}
              </p>
            </div>

            <div className="rounded-xl border border-black/10 p-5 dark:border-white/10">
              <p className="text-sm text-black/50 dark:text-white/50">
                Operating System
              </p>
              <p className="mt-1 font-semibold">
                {software.operatingSystem}
              </p>
            </div>

            <div className="rounded-xl border border-black/10 p-5 dark:border-white/10">
              <p className="text-sm text-black/50 dark:text-white/50">
                Size
              </p>
              <p className="mt-1 font-semibold">
                {software.size}
              </p>
            </div>

          </div>
        </section>

        {/* Description */}
        <section className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">
          <h2 className="text-2xl font-bold">
            About {software.name}
          </h2>

          <p className="mt-4 max-w-4xl leading-8 text-black/60 dark:text-white/60">
            {software.description}
          </p>
        </section>

      </section>
    </main>
  );
}