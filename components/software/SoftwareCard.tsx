import Image from "next/image";
import Link from "next/link";

import type { Software } from "@/data/software";

type SoftwareCardProps = {
  software: Software;
};

export default function SoftwareCard({
  software,
}: SoftwareCardProps) {
  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Image */}
      <Link
        href={`/software/${software.slug}`}
        className="block overflow-hidden"
      >
        <div className="relative aspect-[16/9] w-full min-w-0 overflow-hidden bg-black/5 dark:bg-white/5">

          <Image
            src={software.image}
            alt={software.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

        </div>
      </Link>

      {/* Content */}
      <div className="p-5">

        {/* Category */}
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          {software.category}
        </span>

        {/* Title */}
        <Link href={`/software/${software.slug}`}>
          <h3 className="mt-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-blue-500">
            {software.name}
          </h3>
        </Link>

        {/* Version */}
        <p className="mt-1 text-sm text-muted">
          Version {software.version}
        </p>

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
          {software.description}
        </p>

        {/* Link */}
        <Link
          href={`/software/${software.slug}`}
          className="mt-5 inline-flex items-center text-sm font-medium transition-colors hover:text-blue-500"
        >
          View details
          <span className="ml-1 transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>

      </div>
    </article>
  );
}