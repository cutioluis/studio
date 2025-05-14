import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.33 3.4 16.8L2 22L7.31 20.65C8.73 21.33 10.33 21.7 12.04 21.7C17.5 21.7 21.95 17.25 21.95 11.81C21.95 6.35 17.5 2 12.04 2ZM17.94 16.11C17.69 16.69 16.94 17.08 16.39 17.18C15.93 17.26 15.33 17.35 13.69 16.78C11.68 16.08 10.18 14.33 10.04 14.17C9.88 13.99 9.08 12.96 9.08 11.91C9.08 10.86 9.83 10.15 10.09 9.9C10.32 9.68 10.67 9.62 10.97 9.62C11.23 9.62 11.45 9.64 11.63 9.67C11.86 9.72 12.08 10.33 12.26 10.83C12.44 11.34 12.53 11.59 12.43 11.89C12.33 12.19 12.23 12.32 12.06 12.52C11.89 12.72 11.71 12.88 11.56 13.08C11.41 13.26 11.25 13.47 11.45 13.82C11.65 14.17 12.38 15.09 13.26 15.83C14.33 16.74 15.12 17.03 15.45 17.03C15.79 17.03 16.16 16.96 16.4 16.54C16.64 16.12 17.07 15.53 17.07 15.53C17.07 15.53 17.45 15.03 17.81 15.03C18.16 15.03 18.51 15.03 18.51 15.03L17.94 16.11Z"/>
  </svg>
);

export function CoverSection() {
  return (
    <section 
      className="relative py-20 md:py-32 bg-gradient-to-b from-primary/20 via-primary/5 to-background/80 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://picsum.photos/1920/1080?random=cover-background')",
      }}
      data-ai-hint="nail polish bottles"
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div> {/* Overlay for better text readability */}
      <div className="container relative z-10 mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-6 w-full">
              <div className="flex -space-x-4 rtl:space-x-reverse mr-3">
                <Avatar className="h-10 w-10 border-2 border-background shadow-md">
                  <AvatarImage src="https://picsum.photos/40/40?random=avatar1" alt="Alumna satisfecha del curso de uñas 1" data-ai-hint="person face" />
                  <AvatarFallback>A1</AvatarFallback>
                </Avatar>
                <Avatar className="h-10 w-10 border-2 border-background shadow-md">
                  <AvatarImage src="https://picsum.photos/40/40?random=avatar2" alt="Alumna satisfecha del curso de uñas 2" data-ai-hint="person face" />
                  <AvatarFallback>A2</AvatarFallback>
                </Avatar>
                <Avatar className="h-10 w-10 border-2 border-background shadow-md">
                  <AvatarImage src="https://picsum.photos/40/40?random=avatar3" alt="Alumna satisfecha del curso de uñas 3" data-ai-hint="person face" />
                  <AvatarFallback>A3</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-sm font-medium text-background/90"> {/* Adjusted text color for better contrast */}
                +50 alumnos activos
              </p>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-background sm:text-5xl md:text-6xl lg:text-7xl"> {/* Adjusted text color */}
              Tecnico en Uñas <span className="text-accent">Profesional</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-background/90 sm:text-xl md:text-2xl"> {/* Adjusted text color */}
              Conviértete en profesional, incluye certificado.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground shadow-lg"
              >
                <WhatsAppIcon />
                Contáctanos por WhatsApp
              </Button>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="https://picsum.photos/1200/900?random=hero"
              alt="Manos con uñas artísticas detalladas, demostrando técnicas aprendidas en el curso de Landing Spark"
              layout="fill"
              objectFit="cover"
              data-ai-hint="nail art design"
              className="transform transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
