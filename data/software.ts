export type Software = {
  id: string;
  name: string;
  slug: string;
  version: string;
  category: string;
  description: string;
  image: string;
  developer: string;
  operatingSystem: string;
  license: string;
  size: string;
};

export const softwareList: Software[] = [
  {
    id: "driver-booster",
    name: "Driver Booster",
    slug: "driver-booster",
    version: "13.6",
    category: "Drivers",
    description:
      "Tool designed to detect and update outdated drivers on Windows.",
    image: "/software/Driver-Booster.png",
    developer: "IObit",
    operatingSystem: "Windows",
    license: "Freemium",
    size: "Approx. 30 MB",
  },
  {
    id: "vlc",
    name: "VLC Media Player",
    slug: "vlc",
    version: "3.0",
    category: "Multimedia",
    description:
      "Free and open-source multimedia player for many audio and video formats.",
    image: "/software/Ccleaner.png",
    developer: "VideoLAN",
    operatingSystem: "Windows",
    license: "Free & Open Source",
    size: "Approx. 40 MB",
  },
  {
    id: "winrar",
    name: "WinRAR",
    slug: "winrar",
    version: "7.x",
    category: "Utilities",
    description:
      "Popular file compression and archive management software.",
    image: "/software/Advanced-System-Care.png",
    developer: "RARLAB",
    operatingSystem: "Windows",
    license: "Trialware",
    size: "Approx. 3 MB",
  },
];