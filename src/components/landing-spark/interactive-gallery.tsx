"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Palette, Sparkles, Scissors, Megaphone, Bot, BookOpen, ArrowRight } from "lucide-react";
import type { ElementType } from "react";
import Link from "next/link";
import temarios from "@/data/temarios.json";

interface ProgramCard {
  id: string;
  nombre: string;
  descripcion: string;
  duracion: string;
  areas: string[];
  icon: ElementType;
}

// Iconos disponibles para el campo "tarjeta.icono" de temarios.json
const iconos: Record<string, ElementType> = {
  palette: Palette,
  sparkles: Sparkles,
  scissors: Scissors,
  megaphone: Megaphone,
  bot: Bot,
};

interface ProgramaJson {
  id: string;
  nombre: string;
  duracion: string;
  areas?: string[];
  tarjeta?: {
    nombre?: string;
    descripcion?: string;
    icono?: string;
    areas?: string[];
  };
}

// Cada programa de temarios.json genera su tarjeta automáticamente
const programas: ProgramCard[] = (temarios.programas as ProgramaJson[]).map((programa) => ({
  id: programa.id,
  nombre: programa.tarjeta?.nombre ?? programa.nombre,
  descripcion: programa.tarjeta?.descripcion ?? "",
  duracion: programa.duracion,
  areas: programa.tarjeta?.areas ?? programa.areas ?? [],
  icon: iconos[programa.tarjeta?.icono ?? ""] ?? BookOpen,
}));

export function InteractiveGallery() {
  return (
    <section id="features" className="py-20 md:py-28 bg-[#0F0F12]">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Un Mundo de Belleza te Espera:{" "}
            <span className="bg-gradient-to-r from-[#EEC7C1] to-[#D4A4A4] bg-clip-text text-transparent">
              ¿Qué Aprenderás?
            </span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-[#A0A0A5]">
            Elige el programa que mejor se adapte a tus objetivos y comienza tu transformación profesional en belleza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {programas.map((programa) => {
            const IconComponent = programa.icon;
            return (
              <Link
                key={programa.id}
                href={`/programs/${programa.id}`}
                className="group h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A4A4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F12]"
              >
                <Card className="relative h-full flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#1A1A1E] shadow-xl shadow-black/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#D4A4A4]/50 group-hover:shadow-2xl group-hover:shadow-black/60">
                  <div className="bg-[linear-gradient(135deg,#EEC7C1_0%,#D4A4A4_100%)] px-7 py-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        {/* Reserva 2 líneas para que la cabecera rosa mida igual en las 3 tarjetas */}
                        <h3 className="min-h-[3.5rem] text-xl font-bold leading-snug text-[#0F0F12]">
                          {programa.nombre}
                        </h3>
                        <p className="mt-2 text-sm font-medium text-[#0F0F12]/75">
                          {programa.duracion}
                        </p>
                      </div>
                      <div className="flex-shrink-0 rounded-lg border border-[#0F0F12]/30 p-2.5">
                        <IconComponent className="h-5 w-5 text-[#0F0F12]" />
                      </div>
                    </div>
                  </div>

                  <CardContent className="flex flex-1 flex-col p-7">
                    <p className="mb-7 text-sm leading-relaxed text-[#A0A0A5]">
                      {programa.descripcion}
                    </p>

                    <div className="mb-8">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A0A0A5]/70">
                        Áreas de estudio
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {programa.areas.map((area) => (
                          <span
                            key={area}
                            className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium text-[#A0A0A5]"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      className={cn(
                        "mt-auto flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3",
                        "border border-[#D4A4A4]/50 text-sm font-semibold text-[#EEC7C1]",
                        "transition-colors duration-300 group-hover:border-[#EEC7C1] group-hover:bg-[#EEC7C1]/10"
                      )}
                    >
                      Conocer más
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
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
