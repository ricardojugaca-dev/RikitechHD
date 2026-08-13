import SoftwareGrid from "@/components/software/SoftwareGrid";
import Link from "next/link";

export default function FeaturedSoftware() {
  return (
    <section className="w-full border-b border-border py-16 sm:py-20">

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10 flex items-end justify-between gap-4">

          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              Featured
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Popular software
            </h2>
          </div>

          <Link
            href="/software"
            className="hidden text-sm font-medium transition-colors hover:text-blue-500 sm:inline-flex"
          >
            View all →
          </Link>

        </div>

        <SoftwareGrid />

      </div>

    </section>
  );
}