
"use client";

import { useState, type ElementType } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Gift, DollarSign, CalendarClock, BadgePercent } from "lucide-react";

interface PricingFeature {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  icon: ElementType;
}

const pricingFeatures: PricingFeature[] = [
  { 
    id: "inscription", 
    title: "Inscripción Inteligente", 
    description: "Solo $30 y recibe tu uniforme profesional para empezar con todo.", 
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "student uniform beauty",
    icon: Gift,
  },
  { 
    id: "monthly", 
    title: "Pago Mensual Accesible", 
    description: "$80 al mes para una formación completa y de alta calidad en uñas, pestañas y automaquillaje.", 
    imageUrl: "/images/uniforme-rs.webp",
    imageHint: "happy student learning",
    icon: DollarSign,
  },
  { 
    id: "duration", 
    title: "Formación Intensiva y Completa", 
    description: "Conviértete en una experta integral de la belleza en solo 5 meses con nuestro programa enfocado.", 
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "graduation beauty course",
    icon: CalendarClock, 
  },
];

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.33 3.4 16.8L2 22L7.31 20.65C8.73 21.33 10.33 21.7 12.04 21.7C17.5 21.7 21.95 17.25 21.95 11.81C21.95 6.35 17.5 2 12.04 2ZM17.94 16.11C17.69 16.69 16.94 17.08 16.39 17.18C15.93 17.26 15.33 17.35 13.69 16.78C11.68 16.08 10.18 14.33 10.04 14.17C9.88 13.99 9.08 12.96 9.08 11.91C9.08 10.86 9.83 10.15 10.09 9.9C10.32 9.68 10.67 9.62 10.97 9.62C11.23 9.62 11.45 9.64 11.63 9.67C11.86 9.72 12.08 10.33 12.26 10.83C12.44 11.34 12.53 11.59 12.43 11.89C12.33 12.19 12.23 12.32 12.06 12.52C11.89 12.72 11.71 12.88 11.56 13.08C11.41 13.26 11.25 13.47 11.45 13.82C11.65 14.17 12.38 15.09 13.26 15.83C14.33 16.74 15.12 17.03 15.45 17.03C15.79 17.03 16.16 16.96 16.4 16.54C16.64 16.12 17.07 15.53 17.07 15.53C17.07 15.53 17.45 15.03 17.81 15.03C18.16 15.03 18.51 15.03 18.51 15.03L17.94 16.11Z"/>
  </svg>
);


export function PricingSection() {
  const [activeFeature, setActiveFeature] = useState<PricingFeature>(pricingFeatures[0]);

  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">
            Invierte en Tu Futuro: Tu Camino a <span className="text-accent">Profesional de Belleza</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70 sm:text-xl">
            Una estructura de precios clara y accesible para tu formación integral.
          </p>
        </div>

        <Card className="shadow-xl rounded-xl overflow-hidden mb-12 bg-card">
          <CardContent className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-primary/10 rounded-lg">
                <Gift className="h-12 w-12 mx-auto text-accent mb-3" />
                <h3 className="text-xl font-semibold text-foreground">Inscripción Única</h3>
                <p className="text-3xl font-bold text-accent my-2">$30</p>
                <p className="text-foreground/70">Incluye uniforme profesional</p>
              </div>
              <div className="p-6 bg-primary/10 rounded-lg">
                <DollarSign className="h-12 w-12 mx-auto text-accent mb-3" />
                <h3 className="text-xl font-semibold text-foreground">Mensualidad</h3>
                <p className="text-3xl font-bold text-accent my-2">$80</p>
                <p className="text-foreground/70">Acceso completo al programa</p>
              </div>
              <div className="p-6 bg-primary/10 rounded-lg">
                <CalendarClock className="h-12 w-12 mx-auto text-accent mb-3" />
                <h3 className="text-xl font-semibold text-foreground">Duración Total</h3>
                <p className="text-3xl font-bold text-accent my-2">5 Meses</p>
                <p className="text-foreground/70">Formación intensiva y práctica</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 space-y-4">
            {pricingFeatures.map((feature) => (
              <Card
                key={feature.id}
                onMouseEnter={() => setActiveFeature(feature)}
                className={cn(
                  "cursor-pointer transition-all duration-300 ease-in-out shadow-md",
                  activeFeature.id === feature.id 
                    ? "bg-accent text-accent-foreground ring-2 ring-accent" 
                    : "bg-card hover:opacity-100 hover:shadow-xl", 
                  activeFeature.id !== feature.id && "opacity-70"
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <feature.icon className={cn(
                        "h-7 w-7 mr-3", 
                        activeFeature.id === feature.id ? "text-accent-foreground" : "text-accent"
                      )} 
                    />
                    <h3 className={cn(
                      "text-xl font-semibold flex items-center justify-between flex-grow",
                       activeFeature.id === feature.id ? "text-accent-foreground" : "text-foreground"
                    )}>
                      {feature.title}
                      {activeFeature.id === feature.id && <ArrowRight className="h-5 w-5 transition-transform duration-300 transform" />}
                    </h3>
                  </div>
                  <p className={cn(
                     "text-sm",
                     activeFeature.id === feature.id ? "text-accent-foreground/80" : "text-foreground/70"
                  )}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="md:col-span-8 sticky top-24">
            <Card className="overflow-hidden shadow-xl rounded-lg">
              <div className="aspect-w-16 aspect-h-9 relative w-full h-[400px] md:h-[500px]">
                {pricingFeatures.map((feature) => (
                  <Image
                    key={feature.id}
                    src={feature.imageUrl}
                    alt={`${feature.title} - Beneficio del curso de belleza Landing Spark`}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={feature.imageHint}
                    className={cn(
                      "transition-opacity duration-500 ease-in-out rounded-lg",
                      activeFeature.id === feature.id ? "opacity-100" : "opacity-0"
                    )}
                    priority={feature.id === pricingFeatures[0].id}
                  />
                ))}
              </div>
            </Card>
             <p className="mt-2 text-sm text-center text-foreground/60">
                Descubre más sobre: <span className="font-semibold text-accent">{activeFeature.title}</span>
            </p>
          </div>
        </div>
         <div className="mt-12 text-center">
          <Button 
            asChild
            size="lg" 
            className="text-lg px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transform transition-transform hover:scale-105"
          >
            <a href="https://walink.co/bd3d37" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              ¡Inscríbete Ahora y Asegura tu Futuro!
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
