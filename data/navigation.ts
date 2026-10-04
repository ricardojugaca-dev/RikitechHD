// data/navigation.ts

export interface SubLink {
  name: string;
  href: string;
  description: string;
}

export interface NavItem {
  name: string;
  href: string;
  children?: SubLink[];
}

export const navigation: NavItem[] = [
  // ⭐ NUEVO: Inicio
  {
    name: "Inicio",
    href: "/",
  },

  // Software con submenú basado en categorías reales
  {
    name: "Software",
    href: "/software",
    children: [
      {
        name: "Todos",
        href: "/software",
        description: "Ver todos los programas disponibles",
      },
      {
        name: "Utilities",
        href: "/software?cat=Utilities",
        description: "Optimización, limpieza y herramientas del sistema",
      },
      {
        name: "Multimedia",
        href: "/software?cat=Multimedia",
        description: "Reproductores, editores de audio y video",
      },
      {
        name: "Drivers",
        href: "/software?cat=Drivers",
        description: "Controladores y actualizaciones de hardware",
      },
      {
        name: "Internet",
        href: "/software?cat=Internet",
        description: "Navegadores, gestores de descargas y redes",
      },
      {
        name: "Graphics & Design",
        href: "/software?cat=Graphics+%26+Design",
        description: "Diseño, modelado 3D y edición gráfica",
      },
      {
        name: "Office & Productivity",
        href: "/software?cat=Office+%26+Productivity",
        description: "Ofimática, notas y productividad",
      },
    ],
  },

  // ⭐ NUEVO: Contacto
  {
    name: "Contacto",
    href: "/contact",
  },

  // ==========================================
  // ENLACES COMENTADOS - Activar cuando las páginas estén listas
  // ==========================================
  // {
  //   name: "Drivers",
  //   href: "/drivers",
  //   children: [
  //     { name: "Tarjetas de video", href: "/drivers?cat=video", description: "NVIDIA, AMD e Intel Graphics" },
  //     { name: "Audio", href: "/drivers?cat=audio", description: "Realtek, Creative y controladoras USB" },
  //     { name: "Red", href: "/drivers?cat=red", description: "Wi-Fi, Ethernet y Bluetooth" },
  //     { name: "Placa base", href: "/drivers?cat=chipset", description: "Chipsets, BIOS y utilidades de placa" },
  //   ],
  // },
  // {
  //   name: "Blog",
  //   href: "/blog",
  //   children: [
  //     { name: "Guías", href: "/blog?tag=guias", description: "Tutoriales paso a paso y solucionarios" },
  //     { name: "Optimización", href: "/blog?tag=optimizacion", description: "Mejora el rendimiento de tu equipo" },
  //     { name: "Análisis", href: "/blog?tag=analisis", description: "Reseñas de hardware y software" },
  //     { name: "Noticias", href: "/blog?tag=noticias", description: "Lo último en tecnología e innovación" },
  //   ],
  // },
  // {
  //   name: "Categorías",
  //   href: "/categories",
  //   children: [
  //     { name: "Periféricos", href: "/categories/perifericos", description: "Teclados, ratones y monitores" },
  //     { name: "Componentes", href: "/categories/componentes", description: "CPU, RAM, GPU y almacenamiento" },
  //     { name: "Portátiles", href: "/categories/portatiles", description: "Laptops y equipos portátiles" },
  //     { name: "Accesorios", href: "/categories/accesorios", description: "Cables, fundas y complementos" },
  //   ],
  // },
];

// Cambia a 'false' si solo quieres ver el logo sin texto
export const SHOW_BRAND_TEXT = true;