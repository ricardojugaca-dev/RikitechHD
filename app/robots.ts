import type { MetadataRoute } from "next";

// 👇 AÑADE ESTA LÍNEA
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://rikitech-hd.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}