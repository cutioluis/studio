"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Palette, Sparkles, Scissors, ArrowRight } from "lucide-react";
import type { ElementType } from "react";
import Link from "next/link";

interface ProgramCard {
  id: string;
  nombre: string;
  descripcion: string;
  duracion: string;
  areas: string[];
  icon: ElementType;
  color: string;
  bgGradient: string;
}

const programas: ProgramCard[] = [
  {
    id: "tecnica-integral-belleza",
    nombre: "Técnica Integral en Belleza",
    descripcion: "Programa completo de 5 meses que te convertirá en una profesional integral domando las técnicas esenciales de uñas, pestañas, cejas y maquillaje.",
    duracion: "5 meses",
    areas: ["Uñas", "Pestañas", "Cejas", "Automaquillaje"],
    icon: Palette,
    color: "from-pink-500 to-purple-500",
    bgGradient: "bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950"
  },
  {
    id: "maestra-artesanal-en-belleza",
    nombre: "Maestra Artesanal en Belleza",
    descripcion: "Carrera de 12 meses ultra completa con 12 módulos especializados. Domina desde uñas hasta barbería, colorimetría, química cosmética y más.",
    duracion: "12 meses",
    areas: ["Uñas", "Pestañas", "Maquillaje", "Peinados", "Cortes", "Tratamientos", "Colorimetría", "Barbería", "Cosmética", "Cosmetología"],
    icon: Sparkles,
    color: "from-rose-500 to-pink-500",
    bgGradient: "bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950"
  },
  {
    id: "especialista-unas-salon",
    nombre: "Especialista en Uñas de Salón",
    descripcion: "Especialización de 4 meses intensivos enfocada en técnicas profesionales de salón con fundamentos sólidos, nail art, polygel y acrílico.",
    duracion: "4 meses",
    areas: ["Fundamentos", "Nail Art", "Polygel", "Dual System", "Acrílico Profesional"],
    icon: Scissors,
    color: "from-fuchsia-500 to-purple-500",
    bgGradient: "bg-gradient-to-br from-fuchsia-50 to-purple-50 dark:from-fuchsia-950 dark:to-purple-950"
  }
];

export function InteractiveGallery() {
  return (
    <section id="features" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">
            Un Mundo de Belleza te Espera: <span className="text-accent">¿Qué Aprenderás?</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70 sm:text-xl">
            Elige el programa que mejor se adapte a tus objetivos y comienza tu transformación profesional en belleza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {programas.map((programa) => {
            const IconComponent = programa.icon;
            return (
              <Link
                key={programa.id}
                href={`/programs/${programa.id}`}
                className="group h-full"
              >
                <Card
                  className={cn(
                    "overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 border-0 h-full flex flex-col",
                    programa.bgGradient
                  )}
                >
                  <CardHeader className={cn("bg-gradient-to-r", programa.color, "text-white pb-8")}>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2 text-white">{programa.nombre}</CardTitle>
                        <p className="text-white/90 text-base font-semibold">
                          {programa.duracion}
                        </p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 pt-6 flex flex-col">
                    <p className="text-foreground/80 text-sm leading-relaxed mb-6">
                      {programa.descripcion}
                    </p>

                    <div className="mb-6">
                      <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-3">
                        Áreas de estudio
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {programa.areas.map((area, idx) => (
                          <span
                            key={idx}
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-medium",
                              `bg-gradient-to-r ${programa.color} text-white`
                            )}
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button
                      className={cn(
                        "w-full mt-auto bg-gradient-to-r",
                        programa.color,
                        "text-white hover:opacity-90 transition-opacity pointer-events-none"
                      )}
                    >
                      Conocer más
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
