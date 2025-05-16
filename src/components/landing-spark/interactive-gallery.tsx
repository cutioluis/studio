
"use client";

import React, { useState, useEffect, type ElementType } from "react";
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

interface GroupedTemarioItem {
  type: 'main' | 'section' | 'raw';
  content?: string; // For main and raw
  title?: string; // For section
  items?: string[]; // For section
}

const processTemario = (temario?: string[]): GroupedTemarioItem[] => {
  if (!temario) return [];

  const grouped: GroupedTemarioItem[] = [];
  let currentSection: GroupedTemarioItem | null = null;

  const isMainEmojiHeading = (point: string) => point.startsWith("💅") || point.startsWith("✨") || point.startsWith("💄");
  const isNumberedHeading = (point: string) => /^\d+\./.test(point);

  for (const point of temario) {
    const cleanedPoint = point.replace(/^\t•\t/, '').trim();

    if (isMainEmojiHeading(point)) {
      if (currentSection) {
        grouped.push(currentSection);
      }
      currentSection = null;
      grouped.push({ type: 'main', content: cleanedPoint });
    } else if (isNumberedHeading(point)) {
      if (currentSection && currentSection.type === 'section') {
        grouped.push(currentSection);
      }
      currentSection = { type: 'section', title: cleanedPoint, items: [] };
    } else if (currentSection && currentSection.type === 'section' && currentSection.items) {
      currentSection.items.push(cleanedPoint);
    } else if (point.startsWith("\t•\t") && !currentSection) { // Handle bullet points if no section started (e.g. Automaquillaje)
       if (grouped.length > 0 && grouped[grouped.length -1].type === 'main') {
         // Create an implicit section for these bullet points under the main title
         currentSection = { type: 'section', title: '', items: [cleanedPoint] };
       } else {
         // Or if there's an existing section without a title (edge case)
         const lastGroupedItem = grouped[grouped.length-1];
         if (lastGroupedItem && lastGroupedItem.type === 'section' && !lastGroupedItem.title && lastGroupedItem.items) {
            lastGroupedItem.items.push(cleanedPoint);
         } else {
            grouped.push({ type: 'raw', content: cleanedPoint }); // Fallback
         }
       }
    } else {
      grouped.push({ type: 'raw', content: cleanedPoint });
    }
  }

  if (currentSection) {
    grouped.push(currentSection);
  }
  
  // If the last main heading was for a course like Automaquillaje (main heading + direct bullet points)
  // ensure its currentSection (which is an implicit section) is pushed
  if (grouped.length > 0 && grouped[grouped.length-1].type === 'main' && currentSection === null && temario.some(p => p.startsWith("\t•\t") && !isNumberedHeading(p))) {
      const mainTitleItem = grouped.find(g => g.type === 'main' && temario.includes(g.content || ''));
      if (mainTitleItem && mainTitleItem.content) {
        const mainTitleIndex = temario.findIndex(p => p === mainTitleItem.content);
        if (mainTitleIndex !== -1) {
            const itemsUnderMain = temario.slice(mainTitleIndex + 1)
                                    .filter(p => p.startsWith("\t•\t"))
                                    .map(p => p.replace(/^\t•\t/, '').trim());
            if(itemsUnderMain.length > 0) {
                grouped.push({type: 'section', title: '', items: itemsUnderMain });
            }
        }
      }
  }


  return grouped;
};


export function InteractiveGallery() {
  const [activeItem, setActiveItem] = useState<GalleryItem>(galleryItems[0]);
  const [groupedTemarioState, setGroupedTemarioState] = useState<GroupedTemarioItem[]>([]);

  useEffect(() => {
    setGroupedTemarioState(processTemario(activeItem.temario));
  }, [activeItem]);


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

            {groupedTemarioState.length > 0 && (
              <Card className="shadow-xl rounded-lg bg-card border border-border/60">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-accent">
                    Temario: {activeItem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[250px] w-full pr-4">
                    <ul className="space-y-2">
                      {groupedTemarioState.map((group, groupIndex) => {
                        if (group.type === 'main') {
                          return (
                            <li key={`main-${groupIndex}`} className="mb-3">
                              <h4 className="text-lg font-semibold text-accent mt-2 mb-1">{group.content}</h4>
                            </li>
                          );
                        }
                        if (group.type === 'section') {
                          const sectionsOnly = groupedTemarioState.filter(g => g.type === 'section');
                          const isEffectivelyLastSection = sectionsOnly.length > 0 && 
                                                           sectionsOnly[sectionsOnly.length - 1].title === group.title && 
                                                           JSON.stringify(sectionsOnly[sectionsOnly.length - 1].items) === JSON.stringify(group.items);


                          return (
                            <li key={`section-${groupIndex}`} className="flex items-start">
                              <div className="flex flex-col items-center mr-3 shrink-0 pt-1">
                                <div className="h-2.5 w-2.5 bg-accent rounded-full mt-1"></div>
                                {!isEffectivelyLastSection && <div className="w-0.5 bg-accent flex-grow min-h-[calc(1rem_+_var(--section-content-height,1rem))]"></div>}
                              </div>
                              <div className="flex-1" style={{ '--section-content-height': `${(group.items?.length || 0) * 1.5}rem` } as React.CSSProperties}>
                                {group.title && (
                                  <h5 className="text-sm font-semibold text-foreground mb-1.5">{group.title}</h5>
                                )}
                                {group.items && group.items.length > 0 && (
                                  <ul className="space-y-1 pl-1">
                                    {group.items.map((item, itemIndex) => (
                                      <li key={`item-${itemIndex}`} className="text-sm text-foreground/80">
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </li>
                          );
                        }
                        if (group.type === 'raw') {
                           return <li key={`raw-${groupIndex}`} className="text-sm text-foreground/80 ml-7">{group.content}</li>;
                        }
                        return null;
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
