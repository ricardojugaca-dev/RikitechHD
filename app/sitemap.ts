// app/sitemap.ts
import type { MetadataRoute } from "next";
import { softwareList } from "@/data/software";

// ESTO ES OBLIGATORIO PARA CLOUDFLARE PAGES
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rikitech-hd.vercel.app"; // Recuerda actualizar esto cuando tengas tu dominio propio

  const softwarePages = softwareList.map((software) => ({
    url: `${baseUrl}/software/detalle/${software.slug}`, // <-- RUTA CORREGIDA
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    ...softwarePages,
  ];
}