
"use client";

import { useState, type ElementType } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Gift, DollarSign, CalendarClock } from "lucide-react";
import WhatsAppIcon from "@/components/icons/whatsapp-icon"; // Import consolidated icon

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
    imageUrl: "/images/inscripcion.webp",
    imageHint: "student uniform beauty",
    icon: Gift,
  },
  { 
    id: "monthly", 
    title: "Pago Mensual Accesible", 
    description: "$80 al mes para una formación completa y de alta calidad en uñas, pestañas y automaquillaje.", 
    imageUrl: "/images/uniforme.webp",
    imageHint: "happy student learning",
    icon: DollarSign,
  },
  { 
    id: "duration", 
    title: "Formación Intensiva y Completa", 
    description: "Conviértete en una experta integral de la belleza en solo 5 meses con nuestro programa enfocado.", 
    imageUrl: "/images/intensiva.webp",
    imageHint: "graduation beauty course",
    icon: CalendarClock, 
  },
];

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
                  activeFeature.id !== feature.id && "opacity-60" 
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
              <WhatsAppIcon className="h-4 w-4" />
              ¡Inscríbete Ahora y Asegura tu Futuro!
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
