
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import WhatsAppIcon from "@/components/icons/whatsapp-icon"; // Import consolidated icon
import Image from "next/image";

export function CoverSection() {
  return (
    <section 
      className="relative py-20 md:py-32 bg-gradient-to-b from-primary/20 via-primary/5 to-background/80 bg-cover bg-center transition-all duration-500 ease-in-out"
      style={{  
        backgroundImage: "url('/images/1-rs.webp')",
      }}
      data-ai-hint="beauty salon background"
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div> 
      <div className="container relative z-10 mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-6 w-full">
              <div className="flex -space-x-4 rtl:space-x-reverse mr-3">
                <Avatar className="h-10 w-10 border-2 border-background shadow-md">
                  <AvatarImage src="https://placehold.co/40x40.png" alt="Alumna satisfecha del curso 1" data-ai-hint="person face" />
                  <AvatarFallback>A1</AvatarFallback>
                </Avatar>
                <Avatar className="h-10 w-10 border-2 border-background shadow-md">
                  <AvatarImage src="https://placehold.co/40x40.png" alt="Alumna satisfecha del curso 2" data-ai-hint="person face" />
                  <AvatarFallback>A2</AvatarFallback>
                </Avatar>
                <Avatar className="h-10 w-10 border-2 border-background shadow-md">
                  <AvatarImage src="https://placehold.co/40x40.png" alt="Alumna satisfecha del curso 3" data-ai-hint="person face" />
                  <AvatarFallback>A3</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-sm font-medium text-background/90"> 
                +100 Alumas Certificadas
              </p>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-background sm:text-5xl md:text-6xl lg:text-7xl"> 
              Domina Uñas, Pestañas y Automaquillaje <span className="text-accent">Profesional</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-background/90 sm:text-xl md:text-2xl"> 
              Conviértete en una experta integral de la belleza. ¡Certifícate y emprende!
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Button 
                asChild
                size="lg" 
                className="text-lg px-8 py-4 bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground shadow-lg transform transition-transform hover:scale-105"
              >
                <a href="https://walink.co/bd3d37" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-4 w-4" />
                  Contáctanos por WhatsApp
                </a>
              </Button>
            </div>
          </div>
           <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
            <Image
                src="https://placehold.co/1200x900.png" 
                alt="Profesional de belleza aplicando técnicas de uñas, pestañas o maquillaje aprendidas en el curso de Landing Spark"
                layout="fill"
                objectFit="cover"
                data-ai-hint="beauty techniques application"
                className="transform transition-transform duration-500 hover:scale-105"
                priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
