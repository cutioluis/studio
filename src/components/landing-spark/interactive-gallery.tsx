
"use client";

import { useState, type ElementType } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Palette, Eye, Paintbrush, Briefcase, Wand } from "lucide-react"; // Corrected PaintBrush to Paintbrush

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  icon: ElementType;
}

const galleryItems: GalleryItem[] = [
  { 
    id: "1", 
    title: "Arte en Uñas Avanzado", 
    description: "Desde manicura básica hasta las últimas tendencias en acrílico, gel, polygel y diseños 3D. ¡Tus manos serán lienzos!", 
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "advanced nail art",
    icon: Palette,
  },
  { 
    id: "2", 
    title: "Experta en Pestañas (Lashista)", 
    description: "Aprende aplicación de extensiones clásicas, volumen ruso, lifting, tinte y diseño de cejas para miradas que cautivan.", 
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "eyelash extensions model",
    icon: Eye,
  },
  { 
    id: "3", 
    title: "Maquillaje Profesional y Automaquillaje", 
    description: "Domina técnicas de automaquillaje para el día a día y looks profesionales para eventos. ¡Realza la belleza!", 
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "makeup artist working",
    icon: Paintbrush, 
  },
  { 
    id: "4", 
    title: "Emprendimiento y Gestión de Salón", 
    description: "Adquiere herramientas para iniciar y gestionar tu negocio de belleza, marketing, atención al cliente y finanzas.", 
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "beauty salon interior",
    icon: Briefcase, 
  },
];

export function InteractiveGallery() {
  const [activeItem, setActiveItem] = useState<GalleryItem>(galleryItems[0]);

  return (
    <section id="features" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">
            Un Mundo de Belleza te Espera: <span className="text-accent">¿Qué Aprenderás?</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70 sm:text-xl">
            Explora las habilidades y conocimientos clave que te convertirán en una profesional integral de la belleza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 space-y-4">
            {galleryItems.map((item) => (
              <Card
                key={item.id}
                onMouseEnter={() => setActiveItem(item)}
                className={cn(
                  "cursor-pointer transition-all duration-300 ease-in-out shadow-md",
                  activeItem.id === item.id 
                    ? "bg-accent text-accent-foreground ring-2 ring-accent" 
                    : "bg-card hover:opacity-100 hover:shadow-xl", 
                  activeItem.id !== item.id && "opacity-70"
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <item.icon className={cn(
                        "h-7 w-7 mr-3", 
                        activeItem.id === item.id ? "text-accent-foreground" : "text-accent"
                      )} 
                    />
                    <h3 className={cn(
                      "text-xl font-semibold flex items-center justify-between flex-grow",
                       activeItem.id === item.id ? "text-accent-foreground" : "text-foreground"
                    )}>
                      {item.title}
                      {activeItem.id === item.id && <ArrowRight className="h-5 w-5 transition-transform duration-300 transform" />}
                    </h3>
                  </div>
                  <p className={cn(
                     "text-sm",
                     activeItem.id === item.id ? "text-accent-foreground/80" : "text-foreground/70"
                  )}>
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="md:col-span-8 sticky top-24">
            <Card className="overflow-hidden shadow-xl rounded-lg">
              <div className="aspect-w-16 aspect-h-9 relative w-full h-[450px] md:h-[550px]">
                {galleryItems.map((item) => (
                  <Image
                    key={item.id}
                    src={item.imageUrl}
                    alt={`${item.title} - Contenido del curso integral de belleza Landing Spark`}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={item.imageHint}
                    className={cn(
                      "transition-opacity duration-500 ease-in-out rounded-lg",
                      activeItem.id === item.id ? "opacity-100" : "opacity-0"
                    )}
                    priority={item.id === galleryItems[0].id}
                  />
                ))}
              </div>
            </Card>
             <p className="mt-2 text-sm text-center text-foreground/60">
                Actualmente viendo: <span className="font-semibold text-accent">{activeItem.title}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
