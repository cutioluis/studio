
import { getPostData, getAllPostSlugs, type PostData } from '@/lib/posts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Metadata, ResolvingMetadata } from 'next';
import { CalendarDays, UserCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const post = await getPostData(params.slug);
    const parentOpenGraph = await parent;
    const previousImages = parentOpenGraph.openGraph?.images || [];
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

    return {
      title: `${post.title} | Blog Ceci Glam`,
      description: post.summary || `Lee el artículo "${post.title}" en el blog de Ceci Glam.`,
      openGraph: {
        title: `${post.title} | Ceci Glam`,
        description: post.summary || `Un artículo del blog de Ceci Glam sobre ${post.title}.`,
        url: `${siteUrl}/blog/${post.slug}`,
        siteName: 'Ceci Glam',
        type: 'article',
        publishedTime: new Date(post.date).toISOString(),
        authors: post.author ? [post.author] : ['Ceci Glam'],
        images: [
          // You can add logic here to find a specific image for the post
          // For now, using the default site OG image as a fallback
          {
            url: `${siteUrl}/og-image-beauty-course-quito.jpg`, // Default OG image
            width: 1200,
            height: 630,
            alt: post.title,
          },
          ...previousImages,
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${post.title} | Ceci Glam`,
        description: post.summary,
        // images: [`${siteUrl}/twitter-image-blog-${post.slug}.jpg`], // Example for specific Twitter image
      },
    };
  } catch (error) {
    // Fallback metadata if post is not found or there's an error
    return {
      title: "Artículo no encontrado | Blog Ceci Glam",
      description: "El artículo que buscas no pudo ser encontrado.",
    }
  }
}

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map(path => ({ slug: path.slug }));
}

export default async function PostPage({ params }: Props) {
  let post: PostData;
  try {
    post = await getPostData(params.slug);
  } catch (error) {
    // Ideally, you'd render a custom 404 page here or use Next.js notFound()
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-grow container mx-auto max-w-screen-md px-4 py-12 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mt-10">Artículo no encontrado</h1>
          <p className="mt-4 text-lg">El post que estás buscando no existe o ha sido movido.</p>
          <Button asChild className="mt-8">
            <Link href="/blog">Volver al Blog</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-screen-md px-4 py-12 sm:px-6 lg:px-8">
        <article className="bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-xl my-8">
          <header className="mb-8 border-b border-border pb-6">
            <Button asChild variant="outline" size="sm" className="mb-6 hover:bg-accent hover:text-accent-foreground">
              <Link href="/blog">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver al Blog
              </Link>
            </Button>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4 text-primary" />
                <time dateTime={post.date}>{format(new Date(post.date), 'dd MMMM, yyyy', { locale: es })}</time>
              </div>
              {post.author && (
                <div className="flex items-center">
                  <UserCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Por: {post.author}</span>
                </div>
              )}
            </div>
          </header>
          
          <div
            className="prose-styles"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
