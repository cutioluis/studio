"use client";

import { useState, type ElementType } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Palette, Smartphone, Settings2, Zap } from "lucide-react";

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
    title: "Diseños Modernos", 
    description: "Aprende a crear uñas con estilos actuales y visualmente atractivos que cautivarán a tus clientas.", 
    imageUrl: "https://picsum.photos/800/600?random=nailart1",
    imageHint: "nail art modern",
    icon: Palette,
  },
  { 
    id: "2", 
    title: "Técnicas Profesionales", 
    description: "Domina las técnicas de aplicación, esculpido y decoración para resultados impecables.", 
    imageUrl: "https://picsum.photos/800/600?random=nailtech2",
    imageHint: "nail tools professional",
    icon: Settings2,
  },
  { 
    id: "3", 
    title: "Cuidado y Salud", 
    description: "Conoce todo sobre la salud de las uñas, higiene y productos seguros para ofrecer un servicio de calidad.", 
    imageUrl: "https://picsum.photos/800/600?random=nailcare3",
    imageHint: "nail health care",
    icon: Zap, 
  },
  { 
    id: "4", 
    title: "Creatividad sin Límites", 
    description: "Desarrolla tu creatividad con decoración avanzada, desde encapsulados hasta diseños 3D.", 
    imageUrl: "https://picsum.photos/800/600?random=naildesign4",
    imageHint: "creative nail design",
    icon: Palette, 
  },
];

export function InteractiveGallery() {
  const [activeItem, setActiveItem] = useState<GalleryItem>(galleryItems[0]);

  return (
    <section id="features" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">
            Descubre lo que Aprenderás en Nuestro <span className="text-accent">Curso de Uñas</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70 sm:text-xl">
            Explora las habilidades y conocimientos clave que te convertirán en una técnica de uñas experta.
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
                    alt={`${item.title} - Contenido del curso de técnico en uñas Landing Spark`}
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
