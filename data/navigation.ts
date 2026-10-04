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

  // Software con submenú
  {
    name: "Software",
    href: "/software",
    children: [
      {
        name: "Audio",
        href: "/software?cat=audio",
        description: "Editores, reproductores y herramientas de audio",
      },
      {
        name: "Video",
        href: "/software?cat=video",
        description: "Edición, conversión y reproducción de video",
      },
      {
        name: "Productividad",
        href: "/software?cat=productividad",
        description: "Ofimática, notas y gestión de tareas",
      },
      {
        name: "Seguridad",
        href: "/software?cat=seguridad",
        description: "Antivirus, VPN y protección del sistema",
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