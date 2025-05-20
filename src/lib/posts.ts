
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  author?: string;
  contentHtml?: string;
  [key: string]: any; // For other frontmatter fields
}

export function getSortedPostsData(): PostData[] {
  let fileNames: string[];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch (error) {
    console.warn('Could not read posts directory. Returning empty array. Error:', error);
    return []; // Return empty array if directory doesn't exist or is not readable
  }
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md')) // Ensure only markdown files are processed
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title || 'Post Sin Título',
        date: matterResult.data.date || new Date().toISOString(),
        summary: matterResult.data.summary || '',
        author: matterResult.data.author || 'Ceci Glam',
        ...matterResult.data,
      } as PostData;
    });

  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
   let fileNames: string[];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch (error) {
    return []; 
  }
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        slug: fileName.replace(/\.md$/, ''),
      };
    });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  let fileContents;
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    // You might want to throw a more specific error or handle it differently
    console.error(`Error reading post ${slug}:`, error);
    throw new Error(`Post with slug "${slug}" not found.`);
  }

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html, { sanitize: false }) // Consider security implications of sanitize: false
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: matterResult.data.title || 'Post Sin Título',
    date: matterResult.data.date || new Date().toISOString(),
    summary: matterResult.data.summary || '',
    author: matterResult.data.author || 'Ceci Glam',
    contentHtml,
    ...matterResult.data,
  };
}
