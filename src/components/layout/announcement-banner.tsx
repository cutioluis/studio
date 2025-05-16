
import { Sparkles, CalendarClock } from 'lucide-react';

export function AnnouncementBanner() {
  return (
    <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-3 text-center shadow-md">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 flex items-center justify-center space-x-3">
        <CalendarClock className="h-6 w-6 text-primary-foreground/90 flex-shrink-0" />
        <p className="text-sm md:text-base font-medium">
          <span className="font-bold">¡Inscripciones Abiertas!</span> 💅👁️💄✨ Asegura tu cupo para el Curso Integral de Belleza: Uñas, Pestañas y Automaquillaje. 
          ¡Plazas limitadas hasta <span className="underline font-semibold">finales de Junio</span>!
        </p>
        <Sparkles className="h-5 w-5 text-primary-foreground/80 hidden md:block flex-shrink-0" />
      </div>
    </div>
  );
}

