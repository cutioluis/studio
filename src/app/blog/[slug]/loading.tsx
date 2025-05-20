
import { Skeleton } from "@/components/ui/skeleton";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function PostLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-screen-md px-4 py-12 sm:px-6 lg:px-8">
        <article className="bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-xl my-8">
          <header className="mb-8 border-b border-border pb-6">
            <Skeleton className="h-9 w-36 mb-6" /> {/* Botón Volver */}
            <Skeleton className="h-10 w-full sm:h-12 md:h-14 mb-4" /> {/* Título */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <Skeleton className="h-5 w-40" /> {/* Fecha */}
              <Skeleton className="h-5 w-32" /> {/* Autor */}
            </div>
          </header>
          
          <div className="prose-styles">
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />

            <Skeleton className="h-6 w-3/4 mb-4 mt-6" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            
            <Skeleton className="h-4 w-full mb-2 mt-6" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
