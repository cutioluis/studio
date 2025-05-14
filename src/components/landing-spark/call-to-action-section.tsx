
import { Button } from "@/components/ui/button";

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.33 3.4 16.8L2 22L7.31 20.65C8.73 21.33 10.33 21.7 12.04 21.7C17.5 21.7 21.95 17.25 21.95 11.81C21.95 6.35 17.5 2 12.04 2ZM17.94 16.11C17.69 16.69 16.94 17.08 16.39 17.18C15.93 17.26 15.33 17.35 13.69 16.78C11.68 16.08 10.18 14.33 10.04 14.17C9.88 13.99 9.08 12.96 9.08 11.91C9.08 10.86 9.83 10.15 10.09 9.9C10.32 9.68 10.67 9.62 10.97 9.62C11.23 9.62 11.45 9.64 11.63 9.67C11.86 9.72 12.08 10.33 12.26 10.83C12.44 11.34 12.53 11.59 12.43 11.89C12.33 12.19 12.23 12.32 12.06 12.52C11.89 12.72 11.71 12.88 11.56 13.08C11.41 13.26 11.25 13.47 11.45 13.82C11.65 14.17 12.38 15.09 13.26 15.83C14.33 16.74 15.12 17.03 15.45 17.03C15.79 17.03 16.16 16.96 16.4 16.54C16.64 16.12 17.07 15.53 17.07 15.53C17.07 15.53 17.45 15.03 17.81 15.03C18.16 15.03 18.51 15.03 18.51 15.03L17.94 16.11Z"/>
  </svg>
);

export function CallToActionSection() {
  return (
    <section id="cta" className="py-16 md:py-24 bg-primary text-primary-foreground transition-all duration-500 ease-in-out">
      <div className="container mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
          ¿Lista para Empezar tu Viaje en el Arte de las Uñas?
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-lg sm:text-xl opacity-90">
          No esperes más para convertir tu pasión en una profesión. ¡Inscríbete hoy mismo y da el primer paso hacia tu futuro como técnica de uñas certificada!
        </p>
        <div className="mt-10">
          <Button 
            asChild
            size="lg" 
            className="text-lg px-10 py-4 bg-background text-foreground hover:bg-secondary shadow-lg transform transition-transform hover:scale-105"
          >
            <a href="https://walink.co/bd3d37" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Inscríbete por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
