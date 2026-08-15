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

    screenshots: [],

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

    screenshots: [],

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
      "/software/driver-booster-ejemplo-1.png",
      "/software/driver-booster-ejemplo-2.png",
      "/software/driver-booster-ejemplo-3.jpg",
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
];