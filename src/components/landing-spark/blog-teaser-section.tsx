
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { IconSwap, ShineSweep } from '@/components/ui/button-effects';
import { BookOpenText } from 'lucide-react'; // Changed Newspaper to BookOpenText for better semantics

export function BlogTeaserSection() {
  return (
    <section id="blog-teaser" className="py-16 md:py-24 bg-secondary/50">
      <RevealGroup className="container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 text-center">
        <RevealItem variant="text">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-6 ring-2 ring-primary/20">
            <BookOpenText className="h-10 w-10 text-primary" />
          </div>
        </RevealItem>
        <RevealItem variant="text">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">
            Desde Nuestro <span className="text-accent">Blog de Belleza</span>
          </h2>
        </RevealItem>
        <RevealItem variant="text">
          <p className="mt-6 max-w-xl mx-auto text-lg text-foreground/70 sm:text-xl">
            Descubre artículos frescos, consejos de expertas y las últimas tendencias en uñas, pestañas, automaquillaje y emprendimiento.
          </p>
        </RevealItem>
        <RevealItem variant="text" className="mt-10">
          <Button asChild size="lg" variant="outline" className="group/btn relative overflow-hidden text-lg px-8 py-3 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary">
            <Link href="/blog">
              <ShineSweep className="via-primary/20" />
              <span className="relative">Visitar el Blog</span>
              <IconSwap direction="right" />
            </Link>
          </Button>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
