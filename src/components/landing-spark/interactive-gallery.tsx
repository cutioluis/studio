
"use client";

import React, { useState, useEffect, type ElementType } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ArrowRight, Palette, Eye, Paintbrush, Briefcase, Rocket } from "lucide-react";

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
    imageUrl: "/images/unas-rs.webp",
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
    imageUrl: "/images/3-rs.webp",
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
    imageUrl: "/images/4-rs.webp",
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
    imageUrl: "/images/5-rs.webp",
    imageHint: "beauty salon interior",
    icon: Briefcase,
    temario: undefined // No temario for this one, will show "Próximamente"
  },
];

interface GroupedTemarioItem {
  type: 'main' | 'section' | 'raw';
  content?: string;
  title?: string;
  items?: string[];
}

const processTemario = (temario?: string[]): GroupedTemarioItem[] => {
  if (!temario) return [];
  const grouped: GroupedTemarioItem[] = [];
  let currentSection: GroupedTemarioItem | null = null;
  const isMainEmojiHeading = (point: string) => /^(💅|✨|💄)\s/.test(point.trim());
  const isNumberedHeading = (point: string) => /^\d+\.\s/.test(point.trim());

  for (const point of temario) {
    const cleanedPoint = point.replace(/^\t•\t/, '').trim();
    if (isMainEmojiHeading(point)) {
      if (currentSection) grouped.push(currentSection);
      currentSection = null;
      grouped.push({ type: 'main', content: cleanedPoint });
    } else if (isNumberedHeading(point)) {
      if (currentSection && currentSection.type === 'section') grouped.push(currentSection);
      currentSection = { type: 'section', title: cleanedPoint, items: [] };
    } else if (currentSection && currentSection.type === 'section' && currentSection.items && point.startsWith("\t•\t")) {
      currentSection.items.push(cleanedPoint);
    } else if (point.startsWith("\t•\t")) { // For items directly under a main heading like Automaquillaje
        if (grouped.length > 0 && grouped[grouped.length-1].type === 'main') {
             // This item belongs to a new "section" under the last main heading
             if (currentSection && currentSection.type === 'section') grouped.push(currentSection);
             currentSection = { type: 'section', title: '', items: [cleanedPoint] };
        } else {
             grouped.push({ type: 'raw', content: cleanedPoint });
        }
    }
     else {
      // Fallback for any other lines, though ideally all temario points should be structured
      if (currentSection && currentSection.type === 'section') grouped.push(currentSection);
      currentSection = null;
      grouped.push({ type: 'raw', content: cleanedPoint });
    }
  }
  if (currentSection) grouped.push(currentSection);
  
  // Special handling for cases where a main heading is followed directly by bullet points
  // without numbered subheadings (like Automaquillaje)
  // This block tries to group such bullet points into one "section"
  const finalGrouped: GroupedTemarioItem[] = [];
  let tempSectionForMainBullets: GroupedTemarioItem | null = null;

  for(let i=0; i < grouped.length; i++){
    const group = grouped[i];
    if(group.type === 'main'){
      if(tempSectionForMainBullets){
        finalGrouped.push(tempSectionForMainBullets);
        tempSectionForMainBullets = null;
      }
      finalGrouped.push(group);
      // Check if next items are 'section' with no title and items, meaning they are bullets under main
      if(grouped[i+1] && grouped[i+1].type === 'section' && grouped[i+1].title === '' && grouped[i+1].items && grouped[i+1].items.length > 0){
        tempSectionForMainBullets = {type: 'section', title: '', items: []};
      }
    } else if (group.type === 'section' && group.title === '' && group.items && tempSectionForMainBullets && tempSectionForMainBullets.items) {
        tempSectionForMainBullets.items.push(...group.items);
    } else {
      if(tempSectionForMainBullets){
        finalGrouped.push(tempSectionForMainBullets);
        tempSectionForMainBullets = null;
      }
      finalGrouped.push(group);
    }
  }
  if(tempSectionForMainBullets) finalGrouped.push(tempSectionForMainBullets);

  return finalGrouped;
};


export function InteractiveGallery() {
  const [activeItem, setActiveItem] = useState<GalleryItem>(galleryItems[0]);
  const [groupedTemarioState, setGroupedTemarioState] = useState<GroupedTemarioItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setGroupedTemarioState(processTemario(activeItem.temario));
  }, [activeItem]);

  const renderTemarioContent = (isMobileView: boolean) => {
    if (groupedTemarioState.length === 0 && activeItem.id === '4') {
      return (
        <Card className={cn(
          "shadow-xl rounded-lg bg-card p-6 text-center",
          isMobileView ? "mt-4" : "",
          "border-2 border-transparent bg-gradient-to-br from-primary/20 to-accent/20 via-card"
        )}>
          <Rocket className="h-12 w-12 mx-auto text-accent mb-4 animate-pulse" />
          <h3 className="text-xl font-semibold text-accent mb-2">🚀 Próximamente</h3>
          <p className="text-foreground/70">
            ¡Estamos preparando contenido exclusivo sobre emprendimiento y gestión de salón para potenciar tu carrera!
          </p>
        </Card>
      );
    }

    if (groupedTemarioState.length > 0) {
      return (
        <Card className={cn("shadow-xl rounded-lg bg-card border border-border/60", isMobileView ? "mt-4" : "")}>
          <CardHeader>
            <CardTitle className={cn("font-semibold text-accent", isMobileView ? "text-lg" : "text-xl")}>
              Temario: {activeItem.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className={cn("w-full pr-4", isMobileView ? "h-[200px]" : "h-[250px]")}>
              <ul className="space-y-3">
                {groupedTemarioState.map((group, groupIndex) => {
                  if (group.type === 'main') {
                    return <li key={`main-${groupIndex}`} className="mb-3"><h4 className={cn("font-semibold text-accent mt-2 mb-1", isMobileView ? "text-base" : "text-lg")}>{group.content}</h4></li>;
                  }
                  if (group.type === 'section') {
                    const sectionsOnly = groupedTemarioState.filter(g => g.type === 'section');
                    const isLastSection = sectionsOnly.length > 0 && sectionsOnly[sectionsOnly.length - 1] === group;
                    
                    return (
                      <li key={`section-${groupIndex}`} className="flex items-start">
                        <div className="flex flex-col items-center mr-3 shrink-0 pt-1">
                          <div className="h-2.5 w-2.5 bg-accent rounded-full mt-1"></div>
                          {!isLastSection && group.items && group.items.length > 0 && <div className="w-0.5 bg-accent/50 flex-grow min-h-[1.5rem]" style={{minHeight: `calc(${group.items.length} * 1.6rem + ${group.title ? '1.2rem' : '0rem'})`}}></div>}
                        </div>
                        <div className="flex-1">
                          {group.title && <h5 className={cn("font-semibold text-foreground mb-1.5", isMobileView ? "text-sm" : "text-base")}>{group.title}</h5>}
                          {group.items && group.items.length > 0 && (
                            <ul className="space-y-1 pl-1 text-sm text-foreground/80">
                              {group.items.map((subItem, itemIndex) => <li key={`item-${itemIndex}`}>{subItem}</li>)}
                            </ul>
                          )}
                        </div>
                      </li>
                    );
                  }
                  if (group.type === 'raw') {
                    return <li key={`raw-${groupIndex}`} className={cn("ml-7", isMobileView ? "text-sm" : "text-base", "text-foreground/80")}>{group.content}</li>;
                  }
                  return null;
                })}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      );
    }
    return null;
  };

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
              <React.Fragment key={item.id}>
                <Card
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
                      activeItem.id === item.id ? "text-accent-foreground/80" : "text-foreground/60"
                    )}>
                      {item.description}
                    </p>
                  </CardContent>
                </Card>

                {isMobile && activeItem.id === item.id && (
                  <div className="mt-6 space-y-4 p-4 bg-background/50 rounded-lg shadow-lg">
                    <Card className="overflow-hidden shadow-xl rounded-lg">
                      <div className="aspect-w-16 aspect-h-9 relative w-full h-[250px] sm:h-[300px]">
                        <Image
                          src={activeItem.imageUrl}
                          alt={`${activeItem.title} - Contenido del curso integral de belleza Landing Spark`}
                          layout="fill"
                          objectFit="cover"
                          data-ai-hint={activeItem.imageHint}
                          className="rounded-lg"
                        />
                      </div>
                    </Card>
                     <p className="text-sm text-center text-foreground/60">
                        Actualmente viendo: <span className="font-semibold text-accent">{activeItem.title}</span>
                    </p>
                    {renderTemarioContent(true)}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {!isMobile && (
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
              {renderTemarioContent(false)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

    