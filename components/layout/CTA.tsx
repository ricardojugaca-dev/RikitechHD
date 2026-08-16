import Link from "next/link";

export default function CTA() {
  return (
    <section className="mt-16 border-t border-border pt-10">
      <div className="rounded-2xl border border-border bg-background p-8 text-center sm:p-10">
        <h2 className="text-2xl font-bold">
          Discover more software
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-black/60 dark:text-white/60">
          Explore more software and useful technology resources on RIKITECHHD.
        </p>

        <Link
          href="/software"
          className="mt-6 inline-flex rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
        >
          Browse Software →
        </Link>
      </div>
    </section>
  );
}