import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ESTO ES OBLIGATORIO PARA CLOUDFLARE PAGES
  output: 'export',
  images: {
    unoptimized: true, // <-- Desactiva la optimización de imágenes de Next.js
  },
};

export default nextConfig;