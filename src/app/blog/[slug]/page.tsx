
import { getPostData, getAllPostSlugs, type PostData } from '@/lib/posts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Metadata, ResolvingMetadata } from 'next';
import { CalendarDays, UserCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// Define WhatsAppIcon locally for this component
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.33 3.4 16.8L2 22L7.31 20.65C8.73 21.33 10.33 21.7 12.04 21.7C17.5 21.7 21.95 17.25 21.95 11.81C21.95 6.35 17.5 2 12.04 2ZM17.94 16.11C17.69 16.69 16.94 17.08 16.39 17.18C15.93 17.26 15.33 17.35 13.69 16.78C11.68 16.08 10.18 14.33 10.04 14.17C9.88 13.99 9.08 12.96 9.08 11.91C9.08 10.86 9.83 10.15 10.09 9.9C10.32 9.68 10.67 9.62 10.97 9.62C11.23 9.62 11.45 9.64 11.63 9.67C11.86 9.72 12.08 10.33 12.26 10.83C12.44 11.34 12.53 11.59 12.43 11.89C12.33 12.19 12.23 12.32 12.06 12.52C11.89 12.72 11.71 12.88 11.56 13.08C11.41 13.26 11.25 13.47 11.45 13.82C11.65 14.17 12.38 15.09 13.26 15.83C14.33 16.74 15.12 17.03 15.45 17.03C15.79 17.03 16.16 16.96 16.4 16.54C16.64 16.12 17.07 15.53 17.07 15.53C17.07 15.53 17.45 15.03 17.81 15.03C18.16 15.03 18.51 15.03 18.51 15.03L17.94 16.11Z"/>
  </svg>
);

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
          {
            url: `${siteUrl}/og-image-beauty-course-quito.jpg`, 
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
      },
    };
  } catch (error) {
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

          {/* Blog Post CTA Section */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              ¿Interesada en nuestros cursos de belleza?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Transforma tu pasión por las uñas, pestañas y el maquillaje en una profesión exitosa. ¡Contáctanos para más información e inscríbete hoy mismo!
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all transform hover:scale-105">
              <Link href="https://walink.co/bd3d37" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Inscríbete por WhatsApp
              </Link>
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
