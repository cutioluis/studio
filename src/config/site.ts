export const siteConfig = {
  name: "Ceciglam Academia",
  // Variants people search for; listed in structured data so Google links them to the brand.
  alternateName: ["Ceciglam", "Ceci Glam", "Ceciglam Academy"],
  description:
    "Academia de belleza en Quito. Estudia uñas, pestañas, maquillaje, colorimetría, barbería y emprendimiento con práctica real y certificación.",
  // Inlined at build time; the Cloudflare deploy sets https://ceciglam.com.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:9002",
  locale: "es_EC",
  language: "es-EC",
  whatsappUrl: `https://wa.me/593979390630?text=${encodeURIComponent("Quiero más información sobre los cursos de Ceciglam Academia")}`,
  calendlyUrl: "https://calendly.com/cutioluis",
  ogImage: "/images/lobyCeciGlam.jpg",
  logo: "/images/logo-ceciglam.png",
  timeZone: "America/Guayaquil",
  // NAP data used by structured data (local SEO). Fill in phone and street address when available.
  address: {
    streetAddress: "",
    addressLocality: "Quito",
    addressRegion: "Pichincha",
    addressCountry: "EC",
  },
  geo: { latitude: -0.147463, longitude: -78.493432 },
  telephone: "+593979390630",
  // Only links with a value are rendered in the footer and listed as `sameAs`.
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },
} as const;

export const socialLinks = Object.entries(siteConfig.social)
  .filter(([, url]) => url !== "")
  .map(([network, url]) => ({ network, url }));
