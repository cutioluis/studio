import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getCareers } from "@/features/catalog/infrastructure/catalog-repository";
import { getSortedPostsData } from "@/lib/posts";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => new URL(path, siteConfig.url).toString();
  const posts = getSortedPostsData();
  const careers = await getCareers();

  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    ...careers.map((programa) => ({
      url: url(`/programs/${programa.id}`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: url("/blog"), lastModified: posts[0]?.date, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
