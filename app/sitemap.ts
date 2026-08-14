import type { MetadataRoute } from "next";
import { softwareList } from "@/data/software";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rikitech-hd.vercel.app";

  const softwarePages = softwareList.map((software) => ({
    url: `${baseUrl}/software/${software.slug}`,
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