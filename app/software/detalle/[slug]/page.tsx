import { softwareList } from "@/data/software";
import SoftwareDetailClient from "./SoftwareDetailClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: 'index' }, // <-- Agrega esto para la ruta base
    ...softwareList.map((software) => ({
      slug: software.slug,
    })),
  ];
}

export default async function SoftwareDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;

  // Si el slug es 'index', mostramos un mensaje (o redirigimos)
  if (resolvedParams.slug === 'index') {
    return <div>Por favor selecciona un programa de la lista.</div>;
  }

  return <SoftwareDetailClient slug={resolvedParams.slug} />;
}