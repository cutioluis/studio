import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

// Rendered on the server (refreshed by the layout's revalidate) to avoid hydration mismatches.
function getCurrentMonth(): string {
  return new Intl.DateTimeFormat("es-EC", { month: "long", timeZone: siteConfig.timeZone }).format(new Date());
}

export function AnnouncementBanner() {
  const currentMonth = getCurrentMonth();

  return (
    <div className="relative border-b border-white/[0.08] bg-card py-4 md:py-5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-deep to-transparent" />
      <div className="container mx-auto flex max-w-screen-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 sm:px-6 lg:px-8">
        {/* Inscripciones abiertas */}
        <div className="hidden items-center gap-3 sm:flex">
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
          <span className="font-mono text-sm uppercase tracking-[0.3em] md:text-base text-primary">
            Inscripciones abiertas
          </span>
        </div>

        <span className="hidden h-8 w-px bg-white/[0.12] sm:block" />

        {/* Plazas limitadas + mes automático */}
        <p className="flex flex-wrap items-baseline justify-center gap-x-2 text-center text-muted-foreground">
          <span className="font-serif text-xl italic text-white md:text-2xl">Plazas limitadas</span>
          <span className="text-sm md:text-base">
            hasta finales de{" "}
            <span className="text-lg font-semibold text-white md:text-xl">{currentMonth}</span>
          </span>
        </p>

        <span className="hidden h-8 w-px bg-white/[0.12] md:block" />

        {/* CTA WhatsApp */}
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 border-b border-primary/70 pb-0.5 text-sm text-primary transition-colors hover:border-primary hover:text-white md:text-base"
        >
          Asegura tu cupo
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
