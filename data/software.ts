export type Software = {
  id: string;
  name: string;
  slug: string;
  version: string;
  category: string;
  schemaCategory?: string;
  description: string;
  image: string;
  developer: string;
  operatingSystem: string;
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
    category: "Drivers",
    schemaCategory: "UtilitiesApplication",

    description:
      "Tool designed to detect and update outdated drivers on Windows.",

    image: "/software/Driver-Booster.png",

    developer: "IObit",
    operatingSystem: "Windows",
    license: "Freemium",
    size: "—",
    lastUpdated: "August 2026",

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
    category: "Multimedia",
    schemaCategory: "MultimediaApplication",

    description:
      "Free and open-source multimedia player for many audio and video formats.",

    image: "/software/Vlc-Media-Player.png",

    developer: "VideoLAN",
    operatingSystem: "Windows",
    license: "Open Source",
    size: "—",
    lastUpdated: "August 2026",

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
    category: "Utilities",
    schemaCategory: "UtilitiesApplication",

    description:
      "Popular file compression and archive management software.",

    image: "/software/Winrar.png",

    developer: "RARLAB",
    operatingSystem: "Windows",
    license: "Trial",
    size: "—",
    lastUpdated: "August 2026",

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
    category: "Utilities",
    schemaCategory: "UtilitiesApplication",

    description:
      "Utility software designed to help clean unnecessary files and manage certain aspects of Windows.",

    image: "/software/Ccleaner.png",

    developer: "Piriform",
    operatingSystem: "Windows",
    license: "Freemium",
    size: "—",
    lastUpdated: "August 2026",

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
    category: "Utilities",
    schemaCategory: "UtilitiesApplication",

    description:
      "Windows utility software designed to help optimize system performance and manage common maintenance tasks.",

    image: "/software/Advanced-System-Care.png",

    developer: "IObit",
    operatingSystem: "Windows",
    license: "Freemium",
    size: "—",
    lastUpdated: "August 2026",

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
    category: "Internet",
    schemaCategory: "UtilitiesApplication",

    description:
      "Download manager for Windows designed to organize and accelerate file downloads.",

    image: "/software/Internet-Download-Manager.png",

    developer: "Tonec",
    operatingSystem: "Windows",
    license: "Trial",
    size: "—",
    lastUpdated: "August 2026",

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
    category: "Multimedia",
    schemaCategory: "MultimediaApplication",

    description:
      "DJ software for mixing music, managing tracks and creating live mixes.",

    image: "/software/Virtual-DJ.png",

    developer: "Atomix Productions",
    operatingSystem: "Windows",
    license: "Freemium",
    size: "—",
    lastUpdated: "August 2026",

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
    category: "Utilities",
    schemaCategory: "UtilitiesApplication",

    description:
      "Disk optimization utility designed to help defragment and optimize storage drives on Windows.",

    image: "/software/Smart-Defrag.png",

    developer: "IObit",
    operatingSystem: "Windows",
    license: "Freemium",
    size: "—",
    lastUpdated: "August 2026",

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
    category: "Graphics & Design",
    schemaCategory: "MultimediaApplication",

    description:
      "Professional 3D modeling, animation, simulation and rendering software for creating digital content and visual effects.",

    image: "/software/Cinema-4D.png",

    developer: "Maxon",
    operatingSystem: "Windows",
    license: "Commercial",
    size: "—",
    lastUpdated: "August 2026",

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
    category: "Office & Productivity",
    schemaCategory: "BusinessApplication",

    description:
      "Productivity suite for Windows that includes applications for creating documents, spreadsheets, presentations and other professional work.",

    image: "/software/Microsoft-Office.png",

    developer: "Microsoft",
    operatingSystem: "Windows",
    license: "Commercial",
    size: "—",
    lastUpdated: "August 2026",

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