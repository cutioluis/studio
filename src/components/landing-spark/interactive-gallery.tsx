import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Palette, Sparkles, Scissors, Megaphone, Bot, BookOpen, Crown } from "lucide-react";
import type { ElementType } from "react";
import Link from "next/link";
import type { Programa } from "@/features/catalog/domain/types";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { IconSwap, ShineSweep } from "@/components/ui/button-effects";

// Icons for the values of the `carreras.icono` enum (palette | sparkles | scissors | megaphone | bot)
const iconos: Record<string, ElementType> = {
  palette: Palette,
  sparkles: Sparkles,
  scissors: Scissors,
  megaphone: Megaphone,
  bot: Bot,
};

export function InteractiveGallery({ programas }: { programas: Programa[] }) {
  if (programas.length === 0) return null;

  return (
    <section id="features" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <RevealGroup className="text-center mb-14 md:mb-20">
          <RevealItem variant="text">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              Un Mundo de Belleza te Espera:{" "}
              <span className="bg-gradient-to-r from-primary to-primary-deep bg-clip-text text-transparent">
                ¿Qué Aprenderás?
              </span>
            </h2>
          </RevealItem>
          <RevealItem variant="text">
            <p className="mt-5 max-w-2xl mx-auto text-lg text-muted-foreground">
              Elige el programa que mejor se adapte a tus objetivos y comienza tu transformación profesional en belleza.
            </p>
          </RevealItem>
        </RevealGroup>

        {/* El padding vertical deja espacio para la etiqueta flotante y el realce de la tarjeta destacada */}
        <RevealGroup stagger={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8 pt-4 md:py-8">
          {programas.map((programa) => (
            <ProgramCardItem key={programa.id} programa={programa} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function ProgramCardItem({ programa }: { programa: Programa }) {
  const { mostSell: featured } = programa;
  const IconComponent = iconos[programa.icono ?? ""] ?? BookOpen;

  return (
    // The reveal wrapper is the grid item, so it carries the featured card's vertical bleed.
    <RevealItem className={cn(featured && "md:-my-4")}>
      <Link
        href={`/programs/${programa.id}`}
        className="group group/btn relative block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-deep focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {featured && (
          <span className="absolute -top-3.5 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-primary-foreground shadow-lg shadow-primary-deep/30">
            <Crown className="h-3.5 w-3.5" />
            La más elegida
          </span>
        )}

        {/* La tarjeta destacada usa un borde degradado: el wrapper pinta el borde y la Card va encima */}
        <div
          className={cn(
            "h-full rounded-2xl transition-all duration-300 group-hover:-translate-y-1",
            featured
              ? "bg-gradient-to-br from-primary via-primary-deep to-[#8A6A6A] p-px shadow-[0_0_60px_-15px_rgba(212,164,164,0.45)]"
              : ""
          )}
        >
          <Card
            className={cn(
              "relative h-full flex flex-col overflow-hidden rounded-2xl border-0 shadow-xl shadow-black/40 transition-all duration-300",
              featured
                ? "bg-[#1E1B1D]"
                : "border border-white/[0.08] bg-card group-hover:border-primary-deep/50 group-hover:shadow-2xl group-hover:shadow-black/60"
            )}
          >
            <div
              className={cn(
                "px-7",
                featured ? "bg-gradient-to-br from-primary to-primary-deep pt-9 pb-7" : "border-b border-white/[0.06] py-6"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  {/* Reserva 2 líneas para que la cabecera mida igual en todas las tarjetas */}
                  <h3
                    className={cn(
                      "min-h-[3.5rem] text-xl font-bold leading-snug",
                      featured ? "text-primary-foreground" : "text-white"
                    )}
                  >
                    {programa.nombre}
                  </h3>
                  <p className={cn("mt-2 text-sm font-medium", featured ? "text-primary-foreground/75" : "text-primary-deep")}>
                    {programa.duracion}
                  </p>
                </div>
                <div
                  className={cn(
                    "flex-shrink-0 rounded-lg border p-2.5",
                    featured ? "border-background/30" : "border-white/10 bg-white/[0.03]"
                  )}
                >
                  <IconComponent className={cn("h-5 w-5", featured ? "text-primary-foreground" : "text-primary")} />
                </div>
              </div>
            </div>

            <CardContent className="flex flex-1 flex-col p-7">
              <p className="mb-7 text-sm leading-relaxed text-muted-foreground">{programa.descripcion}</p>

              <div className="mb-8">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">
                  Áreas de estudio
                </p>
                <div className="flex flex-wrap gap-2">
                  {programa.areas.map((area) => (
                    <span
                      key={area}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium",
                        featured
                          ? "border-primary-deep/25 bg-primary-deep/[0.08] text-primary"
                          : "border-white/[0.08] bg-white/[0.03] text-muted-foreground"
                      )}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className={cn(
                  "relative mt-auto flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg px-4 py-3 text-sm font-semibold transition-colors duration-300",
                  featured
                    ? "bg-primary text-primary-foreground group-hover:bg-white"
                    : "border border-primary-deep/50 text-primary group-hover:border-primary group-hover:bg-primary/10"
                )}
              >
                <ShineSweep />
                <span className="relative">Conocer más</span>
                <IconSwap direction="right" />
              </div>
            </CardContent>
          </Card>
        </div>
      </Link>
    </RevealItem>
  );
}
