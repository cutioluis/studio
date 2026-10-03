import { siteConfig, socialLinks } from "@/config/site";
import type { Programa, WeekDay } from "@/features/catalog/domain/types";
import type { PostData } from "@/lib/posts";

const SCHEMA_DAYS: Record<WeekDay, string> = {
  1: "https://schema.org/Monday",
  2: "https://schema.org/Tuesday",
  3: "https://schema.org/Wednesday",
  4: "https://schema.org/Thursday",
  5: "https://schema.org/Friday",
  6: "https://schema.org/Saturday",
  7: "https://schema.org/Sunday",
};

const absoluteUrl = (path: string) => new URL(path, siteConfig.url).toString();

// "5 meses" -> "P5M" (ISO 8601 duration)
function toIsoDuration(duracion: string) {
  const months = Number.parseInt(duracion, 10);
  return Number.isNaN(months) ? undefined : `P${months}M`;
}

function postalAddress() {
  const { streetAddress, ...rest } = siteConfig.address;
  return { "@type": "PostalAddress", ...(streetAddress ? { streetAddress } : {}), ...rest };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${absoluteUrl("/")}#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl(siteConfig.logo),
    image: absoluteUrl(siteConfig.ogImage),
    address: postalAddress(),
    geo: { "@type": "GeoCoordinates", ...siteConfig.geo },
    ...(siteConfig.telephone ? { telephone: siteConfig.telephone } : {}),
    ...(socialLinks.length > 0 ? { sameAs: socialLinks.map(({ url }) => url) } : {}),
  };
}

export function courseJsonLd(programa: Programa) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: programa.nombre,
    description: programa.descripcion,
    url: absoluteUrl(`/programs/${programa.id}`),
    inLanguage: siteConfig.language,
    provider: { "@id": `${absoluteUrl("/")}#organization`, "@type": "EducationalOrganization", name: siteConfig.name },
    timeRequired: toIsoDuration(programa.duracion),
    teaches: programa.areas,
    hasCourseInstance: programa.horarios.map((horario) => ({
      "@type": "CourseInstance",
      name: `${programa.nombre} · ${horario.modalidad}`,
      courseMode: "Onsite",
      location: { "@type": "Place", name: siteConfig.name, address: postalAddress() },
      courseSchedule: {
        "@type": "Schedule",
        repeatFrequency: "P1W",
        byDay: horario.dias.map((dia) => SCHEMA_DAYS[dia]),
        startTime: horario.inicio,
        endTime: horario.fin,
        scheduleTimezone: siteConfig.timeZone,
      },
    })),
  };
}

export function blogPostingJsonLd(post: PostData) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    url: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl(siteConfig.ogImage),
    inLanguage: siteConfig.language,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@id": `${absoluteUrl("/")}#organization`, "@type": "Organization", name: siteConfig.name },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
