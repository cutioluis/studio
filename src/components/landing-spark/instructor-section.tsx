
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Star } from "lucide-react";

export function InstructorSection() {
  const instructorName = "[Nombre de la Instructora]"; // Placeholder for instructor's name

  return (
    <section id="instructor" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">
            Conoce a tu <span className="text-accent">Instructora Experta</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70 sm:text-xl">
            Aprende de una profesional apasionada por el arte de la belleza integral y dedicada a tu éxito.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2 relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl group mx-auto lg:mx-0 w-full max-w-md lg:max-w-none">
            <Image
              src="https://placehold.co/600x800.png"
              alt={`${instructorName}, instructora experta del curso integral de belleza en Landing Spark`}
              layout="fill"
              objectFit="cover"
              data-ai-hint="female instructor professional beauty"
              className="transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold">{instructorName}</h3>
                <p className="text-primary text-sm font-semibold">Beauty Artist & Educator</p>
            </div>
          </div>
          
          <div className="lg:col-span-3 space-y-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card rounded-xl">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-accent">¡Hola! Soy {instructorName}</CardTitle>
                <CardDescription className="text-md text-foreground/75 pt-1">Tu guía en el fascinante mundo de la belleza integral.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground/80">
                <p className="text-lg">
                  Con más de <strong>10 años de experiencia</strong> transformando y realzando la belleza a través de uñas, pestañas y maquillaje, y con una pasión inmensa por enseñar, estoy aquí para ayudarte a desatar tu potencial creativo y convertirte en una profesional de la belleza exitosa y reconocida.
                </p>
                <p>
                  Mi metodología se enfoca en la <strong className="text-accent">práctica intensiva</strong>, el dominio de las <strong className="text-accent">últimas tendencias en múltiples disciplinas</strong> (uñas, pestañas, maquillaje) y el desarrollo de una <strong className="text-accent">visión empresarial</strong>. Juntas, haremos que tus sueños en el mundo de la belleza se hagan realidad.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-start space-x-3">
                        <Star className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-foreground">Experiencia Comprobada</h4>
                            <p className="text-sm text-foreground/70">Más de una década en la industria de la belleza y cientos de alumnas certificadas.</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-foreground">Técnicas de Vanguardia</h4>
                            <p className="text-sm text-foreground/70">Dominio de las últimas innovaciones en uñas, pestañas y maquillaje.</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                         <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-foreground">Enfoque Personalizado</h4>
                            <p className="text-sm text-foreground/70">Atención y seguimiento para asegurar tu aprendizaje y confianza.</p>
                        </div>
                    </div>
                     <div className="flex items-start space-x-3">
                        <Star className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-foreground">Pasión por Enseñar</h4>
                            <p className="text-sm text-foreground/70">Comprometida con tu desarrollo y éxito profesional en la belleza.</p>
                        </div>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
