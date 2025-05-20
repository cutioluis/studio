
import Link from 'next/link';
import { getSortedPostsData, type PostData } from '@/lib/posts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: 'Blog de Belleza y Emprendimiento | Ceci Glam',
  description: 'Artículos, consejos y novedades sobre uñas, pestañas, automaquillaje y emprendimiento en el mundo de la belleza por Ceci Glam.',
  openGraph: {
    title: 'Blog de Belleza y Emprendimiento | Ceci Glam',
    description: 'Descubre artículos y consejos sobre belleza y emprendimiento.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    siteName: 'Ceci Glam',
    type: 'website',
     images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image-beauty-course-quito.jpg`,
        width: 1200,
        height: 630,
        alt: 'Blog de Ceci Glam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog de Belleza y Emprendimiento | Ceci Glam',
    description: 'Consejos y tendencias del mundo de la belleza.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/twitter-image-beauty-course-quito.jpg`],
  },
};

export default function BlogPage() {
  const allPosts = getSortedPostsData();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-screen-lg px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center pt-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Nuestro <span className="text-accent">Blog</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70 sm:text-xl">
            Consejos, tendencias y todo lo que necesitas saber sobre el mundo de la belleza y el emprendimiento.
          </p>
        </header>

        {allPosts.length === 0 ? (
          <p className="text-center text-lg text-foreground/70">No hay publicaciones aún. ¡Vuelve pronto!</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map(({ slug, title, date, summary }) => (
              <Card key={slug} className="flex flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl bg-card hover:border-accent/50 border-transparent border-2">
                <CardHeader>
                  <Link href={`/blog/${slug}`} className="hover:text-accent transition-colors">
                    <CardTitle className="text-2xl font-semibold line-clamp-2">{title}</CardTitle>
                  </Link>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <time dateTime={date}>{format(new Date(date), 'dd MMMM, yyyy', { locale: es })}</time>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="line-clamp-3">{summary || 'Lee más para descubrir...'}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button asChild variant="link" className="px-0 text-accent hover:text-accent/80 font-semibold">
                    <Link href={`/blog/${slug}`}>
                      Leer más <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
