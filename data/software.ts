export type Software = {
  id: string;
  name: string;
  slug: string;
  version: string;
  category: string;
  description: string;
  image: string;
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
  },
];