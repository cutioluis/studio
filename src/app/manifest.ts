import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Ceciglam",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0F0F12",
    theme_color: "#0F0F12",
    lang: siteConfig.language,
    // Install-time icons; the per-page favicon (app/icon.png) stays small.
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
