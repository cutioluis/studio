
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpenText, ArrowRight } from 'lucide-react'; // Changed Newspaper to BookOpenText for better semantics

export function BlogTeaserSection() {
  return (
    <section id="blog-teaser" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block p-4 bg-primary/10 rounded-full mb-6 ring-2 ring-primary/20">
          <BookOpenText className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">
          Desde Nuestro <span className="text-accent">Blog de Belleza</span>
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-lg text-foreground/70 sm:text-xl">
          Descubre artículos frescos, consejos de expertas y las últimas tendencias en uñas, pestañas, automaquillaje y emprendimiento.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-3 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary">
            <Link href="/blog">
              Visitar el Blog
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
