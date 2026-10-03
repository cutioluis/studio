import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { siteConfig } from '@/config/site';

const postsDirectory = path.join(process.cwd(), 'posts');
const MARKDOWN_EXTENSION = /\.md$/;

export interface PostData {
  slug: string;
  title: string;
  date: string;
  summary: string;
  author: string;
  contentHtml?: string;
}

function getPostFileNames(): string[] {
  try {
    return fs.readdirSync(postsDirectory).filter((fileName) => MARKDOWN_EXTENSION.test(fileName));
  } catch (error) {
    console.warn('Could not read posts directory:', error);
    return [];
  }
}

function readPost(slug: string) {
  const fileContents = fs.readFileSync(path.join(postsDirectory, `${slug}.md`), 'utf8');
  return matter(fileContents);
}

// gray-matter parses YAML dates into Date objects; normalize to an ISO string.
function toPostData(slug: string, data: Record<string, unknown>): PostData {
  const date = data.date instanceof Date ? data.date.toISOString() : String(data.date ?? new Date().toISOString());

  return {
    slug,
    title: typeof data.title === 'string' ? data.title : 'Post Sin Título',
    date,
    summary: typeof data.summary === 'string' ? data.summary : '',
    author: typeof data.author === 'string' ? data.author : siteConfig.name,
  };
}

export function getAllPostSlugs(): { slug: string }[] {
  return getPostFileNames().map((fileName) => ({ slug: fileName.replace(MARKDOWN_EXTENSION, '') }));
}

export function getSortedPostsData(): PostData[] {
  return getAllPostSlugs()
    .map(({ slug }) => toPostData(slug, readPost(slug).data))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostData(slug: string): Promise<PostData> {
  let post: matter.GrayMatterFile<string>;
  try {
    post = readPost(slug);
  } catch {
    throw new Error(`Post with slug "${slug}" not found.`);
  }

  // Sanitized so raw HTML or scripts inside a post can never reach the page.
  const processedContent = await remark().use(html, { sanitize: true }).process(post.content);

  return { ...toPostData(slug, post.data), contentHtml: processedContent.toString() };
}
