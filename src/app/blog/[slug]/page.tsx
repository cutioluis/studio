
import { getPostData, getAllPostSlugs, type PostData } from '@/lib/posts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Metadata } from 'next';
import { CalendarDays, UserCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import WhatsAppIcon from '@/components/icons/whatsapp-icon';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/utils/json-ld';
import { blogPostingJsonLd, breadcrumbJsonLd } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostData(slug);
    const description = post.summary || `Lee el artículo "${post.title}" en el blog de ${siteConfig.name}.`;

    return {
      title: post.title,
      description,
      alternates: { canonical: `/blog/${post.slug}` },
      openGraph: {
        title: `${post.title} | ${siteConfig.name}`,
        description,
        url: `/blog/${post.slug}`,
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
        images: [{ url: siteConfig.ogImage, alt: post.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${post.title} | ${siteConfig.name}`,
        description,
      },
    };
  } catch {
    return {};
  }
}

// Only posts that exist at build time are served; any other slug returns a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs();
}

async function getPostOrNotFound(slug: string): Promise<PostData> {
  try {
    return await getPostData(slug);
  } catch {
    notFound();
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostOrNotFound(slug);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <JsonLd
        data={[
          blogPostingJsonLd(post),
          breadcrumbJsonLd([
            { name: 'Inicio', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
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
              <div className="flex items-center">
                <UserCircle className="mr-2 h-4 w-4 text-primary" />
                <span>Por: {post.author}</span>
              </div>
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
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" />
                Inscríbete por WhatsApp
              </a>
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
