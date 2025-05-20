
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/icons/whatsapp-icon"; // Import consolidated icon

export function CallToActionSection() {
  return (
    <section id="cta" className="py-16 md:py-24 bg-primary text-primary-foreground transition-all duration-500 ease-in-out">
      <div className="container mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
          ¿Lista para Transformar tu Pasión por la Belleza en tu Profesión?
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-lg sm:text-xl opacity-90">
          No esperes más para convertir tu amor por las uñas, pestañas y el maquillaje en una carrera lucrativa. ¡Inscríbete hoy mismo y da el primer paso hacia tu futuro como experta en belleza certificada!
        </p>
        <div className="mt-10">
          <Button 
            asChild
            size="lg" 
            className="text-lg px-10 py-4 bg-background text-foreground hover:bg-secondary shadow-lg transform transition-transform hover:scale-105"
          >
            <a href="https://walink.co/bd3d37" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-5 w-5" />
              Inscríbete por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
