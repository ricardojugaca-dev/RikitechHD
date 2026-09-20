export type Software = {
  id: string;
  name: string;
  slug: string;
  version: string;
  subtitleEdition?: string;
  category: string;
  schemaCategory?: string;
  description: string;
  fullOverview?: string;
  image: string;
  developer: string;
  operatingSystem: string;
  architecture?: string;   // ⭐ NUEVA LÍNEA
  language?: string;       // ⭐ NUEVA LÍNEA
  license: string;
  size: string;
  lastUpdated: string;

  features: string[];
  pros: string[];
  cons: string[];
  whatsNew: string[];
  versionHighlights: string[];
  systemRequirements: string[];
  screenshots: string[];

  officialUrl?: string;
  downloadUrl?: string;
};

export const softwareList: Software[] = [
  {
    id: "driver-booster",
    name: "Driver Booster",
    slug: "driver-booster",
    version: "13.6",
    subtitleEdition: "Actualizador de controladores",  // ← Añade esto
    category: "Drivers",
    schemaCategory: "UtilitiesApplication",

    description:
      "Mantén tu PC funcionando al máximo con una herramienta rápida, segura y sencilla para encontrar e instalar los controladores más recientes.",

    fullOverview: "Driver Booster es una de las herramientas más prácticas para mantener los controladores de tu equipo actualizados. Su sistema analiza tu ordenador, identifica los componentes que necesitan atención y propone una instalación sencilla. Esta edición incluye una experiencia sin límites, mayor velocidad de descarga y funciones pensadas para que tu equipo se mantenga estable.",  // ⭐ Añadir

    image: "/software/Driver-Booster.png",

    developer: "IObit",
    operatingSystem: "Windows",
    architecture: "64 bits",
    language: "Español / Multi",
    license: "Freemium",
    size: "28.4 MB",
    lastUpdated: "2026-08-15",

    whatsNew: [
      "Updated driver detection and update capabilities",
      "Improved compatibility with newer Windows systems",
      "Improved overall stability and performance",
    ],

    versionHighlights: [
      "Driver detection and update improvements",
      "Improved Windows compatibility",
      "General stability improvements",
    ],

    systemRequirements: [
      "Windows operating system",
      "Internet connection for driver downloads",
    ],

    screenshots: [
      "/software/driver-booster-ejemplo-1.png",
      "/software/driver-booster-ejemplo-2.png",
      "/software/driver-booster-ejemplo-3.jpg",
    ],


    features: [
      "Automatically detects outdated drivers",
      "Helps keep Windows drivers up to date",
      "Supports driver backup and restore",
      "Provides information about available driver updates",
      "Designed for Windows systems",
    ],

    pros: [
      "Easy to use",
      "Automatic driver scanning",
      "Simple interface",
      "Driver backup and restore features",
    ],

    cons: [
      "Some features require the Pro version",
      "Windows only",
    ],
  },

  {
    id: "vlc",
    name: "VLC Media Player",
    slug: "vlc",
    version: "3.0",
    subtitleEdition: "Reproductor multimedia",  // ⭐ Añadir
    category: "Multimedia",
    schemaCategory: "MultimediaApplication",

    description:
      "Free and open-source multimedia player for many audio and video formats.",

    fullOverview: "VLC Media Player es un reproductor multimedia gratuito y de código abierto que soporta prácticamente todos los formatos de audio y video existentes. No necesita códecs adicionales y funciona en múltiples plataformas. Es una herramienta ligera, versátil y sin publicidad que se ha convertido en el estándar para reproducir cualquier archivo multimedia.",  // ⭐ Añadir

    image: "/software/Vlc-Media-Player.png",

    developer: "VideoLAN",
    operatingSystem: "Windows",
    architecture: "64 bits",
    language: "Español / Multi",
    license: "Open Source",
    size: "42.6 MB",
    lastUpdated: "2026-08-10",

    whatsNew: [
      "Continued improvements to media playback",
      "Improved compatibility with different media formats",
      "Bug fixes and general stability improvements",
    ],

    versionHighlights: [
      "Media playback improvements",
      "Compatibility improvements",
      "General bug fixes and stability improvements",
    ],

    systemRequirements: [
      "Windows operating system",
      "Compatible audio and video hardware",
    ],

    screenshots: [
      "/software/vlc-media-player-ejemplo-1.jpg",
      "/software/vlc-media-player-ejemplo-2.png",
      "/software/vlc-media-player-ejemplo-3.png",
    ],


    features: [
      "Supports many audio and video formats",
      "Free and open-source",
      "Supports subtitles",
      "Supports multiple media protocols",
      "Available for different operating systems",
    ],

    pros: [
      "Free and open-source",
      "Supports many media formats",
      "No subscription required",
      "Lightweight and versatile",
    ],

    cons: [
      "Interface may look dated to some users",
      "Some advanced features require configuration",
    ],
  },

  {
    id: "winrar",
    name: "WinRAR",
    slug: "winrar",
    version: "7.x",
    subtitleEdition: "Compresor de archivos",  // ⭐ Añadir
    category: "Utilities",
    schemaCategory: "UtilitiesApplication",

    description:
      "Popular file compression and archive management software.",

    fullOverview: "WinRAR es uno de los compresores de archivos más utilizados en Windows. Permite crear y extraer archivos en múltiples formatos (RAR, ZIP, 7z, etc.), dividir archivos grandes en volúmenes y protegerlos con contraseña. Su integración con el explorador de Windows y su capacidad de recuperar archivos dañados lo convierten en una herramienta indispensable.",  // ⭐ Añadir

    image: "/software/Winrar.png",

    developer: "RARLAB",
    operatingSystem: "Windows",
    architecture: "64 bits",
    language: "Español / Multi",
    license: "Trial",
    size: "3.8 MB",
    lastUpdated: "2026-08-08",

    whatsNew: [
      "Improved archive management capabilities",
      "Continued improvements to compression and extraction",
      "Bug fixes and general stability improvements",
    ],

    versionHighlights: [
      "Archive management improvements",
      "Compression and extraction improvements",
      "General stability improvements",
    ],

    systemRequirements: [
      "Windows operating system",
      "Sufficient storage space for archives and extracted files",
    ],

    screenshots: [
      "/software/winrar-ejemplo-1.png",
      "/software/winrar-ejemplo-2.png",
      "/software/winrar-ejemplo-3.png",
    ],

    features: [
      "Create compressed archives",
      "Extract compressed files",
      "Supports multiple archive formats",
      "Can split archives into multiple volumes",
      "Provides password protection for archives",
    ],

    pros: [
      "Powerful archive management",
      "Supports many archive formats",
      "Password protection",
      "Easy to integrate into Windows workflows",
    ],

    cons: [
      "Commercial software",
      "Some features are intended for licensed users",
    ],
  },
    {
    id: "ccleaner",
    name: "CCleaner",
    slug: "ccleaner",
    version: "6.x",
    subtitleEdition: "Limpiador de PC",  // ⭐ Añadir
    category: "Utilities",
    schemaCategory: "UtilitiesApplication",

    description:
      "Utility software designed to help clean unnecessary files and manage certain aspects of Windows.",

    fullOverview: "CCleaner es una herramienta que ayuda a eliminar archivos innecesarios, limpiar el registro de Windows y proteger tu privacidad. Su sistema analiza tu equipo, identifica archivos temporales, cachés y datos residuales que ocupan espacio, y los elimina de forma segura. Es ideal para mantener tu PC rápida y libre de basura digital.",  // ⭐ Añadir

    image: "/software/Ccleaner.png",

    developer: "Piriform",
    operatingSystem: "Windows",
    architecture: "64 bits",
    language: "Español / Multi",
    license: "Freemium",
    size: "30.2 MB",
    lastUpdated: "2026-08-05",

    whatsNew: [
      "Performance and stability improvements",
      "Updated cleaning capabilities",
      "General bug fixes and improvements",
    ],

    versionHighlights: [
      "Improved system cleaning",
      "Performance improvements",
      "General stability improvements",
    ],

    systemRequirements: [
      "Windows operating system",
      "Internet connection for certain features",
    ],

    screenshots: [
      "/software/ccleaner-ejemplo-1.png",
      "/software/ccleaner-ejemplo-2.png",
      "/software/ccleaner-ejemplo-3.png",
    ],

    features: [
      "Helps remove unnecessary files",
      "Provides system cleaning tools",
      "Includes privacy-related cleaning features",
      "Provides system management utilities",
    ],

    pros: [
      "Easy to use",
      "Simple interface",
      "Multiple cleaning utilities",
    ],

    cons: [
      "Some features require the paid version",
      "Some cleaning options require user configuration",
    ],
  },
    {
    id: "advanced-systemcare",
    name: "Advanced SystemCare",
    slug: "advanced-systemcare",
    version: "18.x",
    subtitleEdition: "Optimizador de sistema",  // ⭐ Añadir
    category: "Utilities",
    schemaCategory: "UtilitiesApplication",

    description:
      "Windows utility software designed to help optimize system performance and manage common maintenance tasks.",

    fullOverview: "Advanced SystemCare es una suite completa de optimización para Windows. Incluye herramientas para limpiar el sistema, optimizar el rendimiento, proteger la privacidad y monitorear el equipo en tiempo real. Su interfaz intuitiva permite a cualquier usuario mantener su PC en óptimas condiciones con un solo clic.",  // ⭐ Añadir

    image: "/software/Advanced-System-Care.png",

    developer: "IObit",
    operatingSystem: "Windows",
    architecture: "64 bits",
    language: "Español / Multi",
    license: "Freemium",
    size: "52.1 MB",
    lastUpdated: "2026-08-12",

    whatsNew: [
      "Improved system optimization",
      "Updated Windows compatibility",
      "General performance and stability improvements",
    ],

    versionHighlights: [
      "System optimization improvements",
      "Windows compatibility improvements",
      "General stability improvements",
    ],

    systemRequirements: [
      "Windows operating system",
      "Internet connection for certain features",
    ],

    screenshots: [
      "/software/advanced-systemcare-ejemplo-1.png",
      "/software/advanced-systemcare-ejemplo-2.png",
      "/software/advanced-systemcare-ejemplo-3.png",
    ],

    features: [
      "System optimization tools",
      "Windows maintenance utilities",
      "Privacy and security-related tools",
      "Performance monitoring features",
    ],

    pros: [
      "Easy to use",
      "Includes multiple maintenance tools",
      "Simple interface",
    ],

    cons: [
      "Some features require the Pro version",
      "Windows focused",
    ],
  },
    {
    id: "internet-download-manager",
    name: "Internet Download Manager",
    slug: "internet-download-manager",
    version: "6.x",
    subtitleEdition: "Gestor de descargas",  // ⭐ Añadir
    category: "Internet",
    schemaCategory: "UtilitiesApplication",

    description:
      "Download manager for Windows designed to organize and accelerate file downloads.",

    fullOverview: "Internet Download Manager (IDM) es un gestor de descargas que acelera las transferencias hasta 5 veces. Se integra con los principales navegadores, permite reanudar descargas interrumpidas, programar descargas y organizar archivos automáticamente por categorías. Es una herramienta esencial para quienes descargan archivos grandes con frecuencia.",  // ⭐ Añadir

    image: "/software/Internet-Download-Manager.png",

    developer: "Tonec",
    operatingSystem: "Windows",
    architecture: "64 bits",
    language: "Español / Multi",
    license: "Trial",
    size: "12.5 MB",
    lastUpdated: "2026-08-18",

    whatsNew: [
      "Download performance improvements",
      "Improved browser integration",
      "General bug fixes and stability improvements",
    ],

    versionHighlights: [
      "Improved download management",
      "Browser integration improvements",
      "General stability improvements",
    ],

    systemRequirements: [
      "Windows operating system",
      "Internet connection",
    ],

    screenshots: [
      "/software/internet-download-manager-ejemplo-1.png",
      "/software/internet-download-manager-ejemplo-2.png",
      "/software/internet-download-manager-ejemplo-3.png",
    ],

    features: [
      "Organizes file downloads",
      "Supports download resuming",
      "Browser integration",
      "Download scheduling",
    ],

    pros: [
      "Easy download management",
      "Browser integration",
      "Resume support",
      "Simple interface",
    ],

    cons: [
      "Trial-based software",
      "Windows focused",
    ],
  },
    {
    id: "virtualdj",
    name: "VirtualDJ",
    slug: "virtualdj",
    version: "2026",
    subtitleEdition: "Software de DJ",  // ⭐ Añadir
    category: "Multimedia",
    schemaCategory: "MultimediaApplication",

    description:
      "DJ software for mixing music, managing tracks and creating live mixes.",

    fullOverview: "VirtualDJ es un software profesional para DJ que permite mezclar música, gestionar pistas y crear mezclas en vivo. Incluye efectos de audio, samplers, loops y soporte para controladores MIDI. Es utilizado tanto por DJs principiantes como profesionales por su potencia y flexibilidad.",  // ⭐ Añadir

    image: "/software/Virtual-DJ.png",

    developer: "Atomix Productions",
    operatingSystem: "Windows",
    architecture: "64 bits",
    language: "Español / Multi",
    license: "Freemium",
    size: "185 MB",
    lastUpdated: "2026-08-20",

    whatsNew: [
      "Performance improvements",
      "New and improved DJ features",
      "General stability improvements",
    ],

    versionHighlights: [
      "Mixing improvements",
      "Performance improvements",
      "General stability improvements",
    ],

    systemRequirements: [
      "Windows operating system",
      "Compatible audio hardware",
    ],

    screenshots: [
      "/software/virtualdj-ejemplo-1.png",
      "/software/virtualdj-ejemplo-2.png",
      "/software/virtualdj-ejemplo-3.png",
    ],

    features: [
      "Music mixing",
      "Track management",
      "Audio effects",
      "DJ performance tools",
      "Supports multiple audio formats",
    ],

    pros: [
      "Powerful mixing tools",
      "Suitable for different DJ workflows",
      "Large feature set",
    ],

    cons: [
      "Some features depend on the license",
      "Can require additional hardware for advanced setups",
    ],
  },
    {
    id: "smart-defrag",
    name: "Smart Defrag",
    slug: "smart-defrag",
    version: "10.x",
    subtitleEdition: "Desfragmentador de disco",  // ⭐ Añadir
    category: "Utilities",
    schemaCategory: "UtilitiesApplication",

    description:
      "Disk optimization utility designed to help defragment and optimize storage drives on Windows.",

      
    fullOverview: "Smart Defrag es una herramienta de optimización de discos que desfragmenta y organiza los archivos de tu equipo para mejorar la velocidad de lectura y escritura. Su sistema de optimización automática mantiene tus discos en buen estado sin intervención manual, prolongando la vida útil del hardware.",  // ⭐ Añadir

    image: "/software/Smart-Defrag.png",

    developer: "IObit",
    operatingSystem: "Windows",
    architecture: "64 bits",
    language: "Español / Multi",
    license: "Freemium",
    size: "18.7 MB",
    lastUpdated: "2026-08-14",

    whatsNew: [
      "Improved disk optimization capabilities",
      "Improved compatibility with newer Windows systems",
      "General performance and stability improvements",
    ],

    versionHighlights: [
      "Disk optimization improvements",
      "Improved Windows compatibility",
      "General stability improvements",
    ],

    systemRequirements: [
      "Windows operating system",
      "Sufficient free disk space",
    ],

    screenshots: [
      "/software/smart-defrag-ejemplo-1.png",
      "/software/smart-defrag-ejemplo-2.png",
      "/software/smart-defrag-ejemplo-3.png",
    ],

    features: [
      "Disk defragmentation",
      "Disk optimization tools",
      "Automatic optimization options",
      "Supports different storage drives",
      "Designed for Windows systems",
    ],

    pros: [
      "Easy to use",
      "Simple interface",
      "Provides multiple disk optimization options",
    ],

    cons: [
      "Some features require the Pro version",
      "Windows focused",
    ],
  },
    {
    id: "cinema-4d",
    name: "Cinema 4D",
    slug: "cinema-4d",
    version: "2026",
    subtitleEdition: "Modelado y animación 3D",  // ⭐ Añadir
    category: "Graphics & Design",
    schemaCategory: "MultimediaApplication",

    description:
      "Professional 3D modeling, animation, simulation and rendering software for creating digital content and visual effects.",

    fullOverview: "Cinema 4D es una de las herramientas de modelado, animación y renderizado 3D más utilizadas en la industria del diseño y los efectos visuales. Su interfaz intuitiva y su potente motor de renderizado lo hacen ideal para motion graphics, publicidad y producción audiovisual. Es utilizado por estudios y artistas de todo el mundo.",  // ⭐ Añadir

    image: "/software/Cinema-4D.png",

    developer: "Maxon",
    operatingSystem: "Windows",
    architecture: "64 bits",
    language: "Español / Multi",
    license: "Commercial",
    size: "1.2 GB",
    lastUpdated: "2026-08-22",

    whatsNew: [
      "Improvements to 3D modeling and animation workflows",
      "Rendering and performance improvements",
      "General stability and workflow improvements",
    ],

    versionHighlights: [
      "3D modeling improvements",
      "Animation and rendering improvements",
      "Performance and stability improvements",
    ],

    systemRequirements: [
      "Windows operating system",
      "Compatible graphics hardware",
      "Sufficient storage space for installation and project files",
    ],

    screenshots: [
      "/software/cinema-4d-ejemplo-1.png",
      "/software/cinema-4d-ejemplo-2.png",
      "/software/cinema-4d-ejemplo-3.png",
    ],

    features: [
      "3D modeling",
      "Animation tools",
      "3D rendering",
      "Motion graphics",
      "Simulation tools",
      "Professional content creation workflow",
    ],

    pros: [
      "Powerful 3D creation tools",
      "Professional animation and rendering capabilities",
      "Suitable for motion graphics and visual effects",
      "Extensive creative workflow",
    ],

    cons: [
      "Commercial software",
      "Requires relatively powerful hardware",
      "Can have a steep learning curve for beginners",
    ],
  },
    {
    id: "microsoft-office-2024",
    name: "Microsoft Office 2024",
    slug: "microsoft-office-2024",
    version: "2024",
    subtitleEdition: "Suite de productividad",  // ⭐ Añadir
    category: "Office & Productivity",
    schemaCategory: "BusinessApplication",

    description:
      "Productivity suite for Windows that includes applications for creating documents, spreadsheets, presentations and other professional work.",

    fullOverview: "Microsoft Office 2024 es la suite de productividad más utilizada del mundo. Incluye Word para documentos, Excel para hojas de cálculo, PowerPoint para presentaciones y otras herramientas esenciales para el trabajo profesional y personal. Su compatibilidad con formatos estándar y su integración con la nube la convierten en la opción preferida por empresas y usuarios.",  // ⭐ Añadir

    image: "/software/Microsoft-Office.png",

    developer: "Microsoft",
    operatingSystem: "Windows",
    architecture: "64 bits",
    language: "Español / Multi",
    license: "Commercial",
    size: "4.5 GB",
    lastUpdated: "2026-08-01",

    whatsNew: [
      "Improved productivity features",
      "Performance and stability improvements",
      "Updated accessibility features",
      "Improved compatibility with modern Windows systems",
    ],

    versionHighlights: [
      "Word for document creation",
      "Excel for spreadsheets and data analysis",
      "PowerPoint for presentations",
      "Improved performance and compatibility",
    ],

    systemRequirements: [
      "Windows 10 or later",
      "Compatible processor",
      "Sufficient RAM and storage space",
      "Internet connection may be required for activation",
    ],

    screenshots: [
      "/software/microsoft-office-2024-ejemplo-1.png",
      "/software/microsoft-office-2024-ejemplo-2.png",
      "/software/microsoft-office-2024-ejemplo-3.png",
    ],

    features: [
      "Create and edit documents with Word",
      "Create and manage spreadsheets with Excel",
      "Create presentations with PowerPoint",
      "Tools for professional and personal productivity",
      "Compatibility with common Office document formats",
    ],

    pros: [
      "Widely used productivity suite",
      "Comprehensive office applications",
      "Good compatibility with common document formats",
      "Suitable for personal and professional use",
    ],

    cons: [
      "Commercial software",
      "Some features depend on the specific edition",
      "Activation is required",
    ],
  },
];