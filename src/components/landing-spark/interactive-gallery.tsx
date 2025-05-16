
"use client";

import { useState, type ElementType } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ArrowRight, Palette, Eye, Paintbrush, Briefcase } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  icon: ElementType;
  temario?: string[];
}

const galleryItems: GalleryItem[] = [
  { 
    id: "1", 
    title: "Arte en Uñas Avanzado", 
    description: "Desde manicura básica hasta las últimas tendencias en acrílico, gel, polygel y diseños 3D. ¡Tus manos serán lienzos!", 
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "advanced nail art",
    icon: Palette,
    temario: [
      "💅 Curso de UÑAS",
      "1. Manicura y Pedicura:",
      "\t•\tManicura clásica",
      "\t•\tManicura spa",
      "\t•\tManicura combinada",
      "\t•\tPedicura spa",
      "2. Nivelación y Construcción:",
      "\t•\tBuilder gel + gel UV",
      "\t•\tTip con polygel",
      "\t•\tDual System",
      "\t•\tExtensiones con Dual System",
      "3. Decoración y Arte:",
      "\t•\tArte en gel",
      "\t•\tSofgel",
      "\t•\tEncapsulados en polygel",
      "\t•\tTipos y calibración de perlas",
      "\t•\t3D básico",
      "4. Efectos Especiales:",
      "\t•\tBaby boomer",
      "\t•\tBaby glitter ✨",
      "\t•\tBaby glam",
      "\t•\tMármoleados",
      "5. Tipos de Puntas:",
      "\t•\tCoffin ☕",
      "\t•\tAlmond",
      "\t•\tSquare ⬜",
      "\t•\tStiletto",
      "6. Uñas Esculpidas"
    ]
  },
  { 
    id: "2", 
    title: "Experta en Pestañas (Lashista)", 
    description: "Aprende aplicación de extensiones clásicas, volumen ruso, lifting, tinte y diseño de cejas para miradas que cautivan.", 
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "eyelash extensions model",
    icon: Eye,
    temario: [
      "✨ Curso de CEJAS Y PESTAÑAS",
      "1. Diseño de Cejas:",
      "\t•\tVisajismo según el rostro",
      "\t•\tDiseño y depilación",
      "\t•\tMaquillaje de cejas",
      "\t•\tEfecto maquillaje y orgánico",
      "2. Aplicación de Pestañas Punto a Punto:",
      "\t•\tPunto a punto",
      "\t•\tFoxy eyes",
      "\t•\tEstilo muñeca",
      "\t•\tCon color",
      "3. Henna y Tratamientos:",
      "\t•\tHenna efecto maquillaje degradé",
      "\t•\tLaminado de cejas",
      "\t•\tLaminado + tinte",
      "\t•\tLifting y rizado de pestañas",
      "4. Depilación Facial y Corporal:",
      "\t•\tCejas y bozo",
      "\t•\tAxilas",
      "\t•\tMedia pierna",
      "\t•\tPierna completa"
    ]
  },
  { 
    id: "3", 
    title: "Maquillaje Profesional y Automaquillaje", 
    description: "Domina técnicas de automaquillaje para el día a día y looks profesionales para eventos. ¡Realza la belleza!", 
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "makeup artist working",
    icon: Paintbrush, 
    temario: [
      "💄 Curso de AUTOMAQUILLAJE",
      "\t•\tPreparación de piel",
      "\t•\tBase, correctores y contornos",
      "\t•\tMaquillaje de ojos (día/noche)",
      "\t•\tCejas con maquillaje",
      "\t•\tTipos de depilado (pinza, cera, navaja)",
      "\t•\tPestañas en banda",
      "\t•\tLabios",
      "\t•\tFace chart – práctica en papel"
    ]
  },
  { 
    id: "4", 
    title: "Emprendimiento y Gestión de Salón", 
    description: "Adquiere herramientas para iniciar y gestionar tu negocio de belleza, marketing, atención al cliente y finanzas.", 
    imageUrl: "https://placehold.co/800x600.png",
    imageHint: "beauty salon interior",
    icon: Briefcase, 
    temario: undefined
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

          <div className="md:col-span-8 sticky top-24 space-y-6">
            <Card className="overflow-hidden shadow-xl rounded-lg">
              <div className="aspect-w-16 aspect-h-9 relative w-full h-[400px] md:h-[450px]">
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
             <p className="text-sm text-center text-foreground/60">
                Actualmente viendo: <span className="font-semibold text-accent">{activeItem.title}</span>
            </p>

            {/* Temario Section - Appears in the right column if temario exists */}
            {activeItem.temario && activeItem.temario.length > 0 && (
              <Card className="shadow-xl rounded-lg bg-card border border-border/60">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-accent">
                    Temario: {activeItem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] w-full pr-3 text-sm">
                    <ul className="space-y-1.5 whitespace-pre-line text-sm">
                      {activeItem.temario.map((point, index) => {
                        const cleanedPoint = point.replace(/^\t•\t/, '• ');
                        const isMainEmojiHeading = point.startsWith("💅") || point.startsWith("✨") || point.startsWith("💄");
                        const isNumberedHeading = /^\d+\./.test(point);

                        if (isMainEmojiHeading) {
                          return (
                            <li key={index}>
                               <h4 className="text-base font-medium text-accent mt-2 mb-1">{cleanedPoint}</h4>
                            </li>
                          );
                        } else if (isNumberedHeading) {
                          return (
                            <li key={index}>
                               <h5 className="text-sm font-semibold text-foreground mt-1.5 mb-0.5">{cleanedPoint}</h5>
                            </li>
                          );
                        } else { 
                          return (
                            <li key={index} className="flex items-start ml-4 text-foreground/80">
                              {cleanedPoint.startsWith('• ') ? (
                                <>
                                  <span className="text-accent mr-2 mt-0.5 shrink-0">•</span>
                                  <span className="flex-grow">{cleanedPoint.substring(2)}</span>
                                </>
                              ) : (
                                <span className="flex-grow">{cleanedPoint}</span>
                              )}
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

