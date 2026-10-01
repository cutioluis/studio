"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ArrowLeft, BookOpen, Check } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import temarios from "@/data/temarios.json";

const ROSE_GRADIENT = "bg-gradient-to-r from-[#EEC7C1] to-[#D4A4A4]";

export default function ProgramPage() {
  const params = useParams();
  const router = useRouter();
  const programId = params.id as string;

  const [selectedModuloIndex, setSelectedModuloIndex] = useState(0);

  const programa = useMemo(() => {
    return temarios.programas.find(p => p.id === programId);
  }, [programId]);

  if (!programa) {
    return (
      <div className="min-h-screen bg-[#0F0F12] flex items-center justify-center">
        <Card className="border border-white/[0.08] bg-[#1A1A1E] p-8 text-center">
          <CardTitle className="mb-4 text-2xl text-white">Programa no encontrado</CardTitle>
          <Button onClick={() => router.back()}>Volver</Button>
        </Card>
      </div>
    );
  }

  const selectedModulo = programa.modulos[selectedModuloIndex];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F12]">
        {/* Header */}
        <div className="border-b border-white/[0.08] bg-[#1A1A1E]">
          <div className="container mx-auto max-w-screen-xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6 text-[#A0A0A5] hover:bg-white/[0.05] hover:text-[#EEC7C1]"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                {programa.nombre}
              </h1>
              <p className="text-lg text-[#A0A0A5]">Duración: {programa.duracion}</p>
              <div className={cn("h-px w-24", ROSE_GRADIENT)} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-screen-xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Módulos */}
            <div className="lg:col-span-1">
              <Card className="overflow-hidden border border-white/[0.08] bg-[#1A1A1E]">
                <CardHeader className="border-b border-white/[0.08] pb-4">
                  <CardTitle className="flex items-center gap-2 text-base text-white">
                    <BookOpen className="h-5 w-5 text-[#EEC7C1]" />
                    Módulos ({programa.modulos.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-1.5 p-3">
                      {programa.modulos.map((modulo, idx) => (
                        <button
                          key={modulo.numero}
                          onClick={() => setSelectedModuloIndex(idx)}
                          className={cn(
                            "w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all duration-200",
                            selectedModuloIndex === idx
                              ? "border-[#D4A4A4]/50 bg-white/[0.06] text-[#EEC7C1]"
                              : "border-transparent text-[#A0A0A5] hover:border-white/[0.08] hover:bg-white/[0.03] hover:text-white"
                          )}
                        >
                          {modulo.nombre}
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Temario */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border border-white/[0.08] bg-[#1A1A1E]">
                <CardHeader className="border-b border-white/[0.08] pb-6">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#EEC7C1]">
                      Módulo {selectedModulo.numero}
                    </div>
                    <CardTitle className="text-2xl text-white md:text-3xl">
                      {selectedModulo.nombre}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="pt-8">
                  <h3 className="mb-6 text-lg font-bold text-white">Temario Completo</h3>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-3">
                      {selectedModulo.temario.map((item, idx) => {
                        const cleanItem = item.replace(/^\t•\t/, "").trim();
                        const isMainHeading = /^[\d]+\./.test(cleanItem);
                        const isSubItem = item.startsWith("\t•\t");

                        return (
                          <div
                            key={idx}
                            className={cn(
                              isMainHeading && "mt-6 mb-2",
                              isMainHeading
                                ? "text-base font-bold text-white"
                                : "text-sm text-[#A0A0A5]",
                              isSubItem && "ml-4"
                            )}
                          >
                            {isSubItem && <span className="mr-2 text-[#D4A4A4]">•</span>}
                            {cleanItem}
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>

                  {programa.areas && programa.areas.length > 0 && (
                    <div className="mt-8 border-t border-white/[0.08] pt-8">
                      <h3 className="mb-4 text-base font-bold text-white">Áreas Cubiertas</h3>
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
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Inscripción */}
            <div className="lg:col-span-1">
              <Card className="overflow-hidden border border-[#D4A4A4]/30 bg-[#1A1A1E]">
                <div className={cn("h-px w-full", ROSE_GRADIENT)} />
                <CardContent className="space-y-6 p-6">
                  <div>
                    <h3 className="text-lg font-semibold leading-snug text-white">
                      {programa.nombre}
                    </h3>
                    <p className="mt-1 text-sm text-[#A0A0A5]">Acceso completo al programa</p>
                  </div>

                  <div className="space-y-3 border-t border-white/[0.08] pt-5 text-sm">
                    <div>
                      <p className="text-[#A0A0A5]">Cupos limitados</p>
                      <p className="font-semibold text-white">Disponibles</p>
                    </div>
                    <div>
                      <p className="text-[#A0A0A5]">Duración</p>
                      <p className="font-semibold text-white">{programa.duracion}</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-[#A0A0A5]">
                      Precio especial
                    </p>
                    <div className="mt-1 text-3xl font-bold text-white">$90</div>
                    <p className="mt-1 text-xs text-[#A0A0A5]">o 3 cuotas de $30</p>
                  </div>

                  <div>
                    <label
                      htmlFor="codigo-descuento"
                      className="mb-2 block text-xs text-[#A0A0A5]"
                    >
                      Código de descuento
                    </label>
                    <input
                      id="codigo-descuento"
                      type="text"
                      placeholder="CODIGO"
                      className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-[#A0A0A5]/60 focus:border-[#D4A4A4]/60 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => window.open("https://walink.co/bd3d37", "_blank")}
                    className={cn(
                      "w-full rounded-lg px-4 py-3 text-sm font-semibold text-[#0F0F12] transition-opacity hover:opacity-90",
                      ROSE_GRADIENT
                    )}
                  >
                    Inscribirse Ahora
                  </button>

                  <div className="space-y-2 border-t border-white/[0.08] pt-5 text-xs text-[#A0A0A5]">
                    {["Acceso de por vida", "Certificado incluido", "Garantía de satisfacción"].map(
                      (beneficio) => (
                        <div key={beneficio} className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 flex-shrink-0 text-[#EEC7C1]" />
                          {beneficio}
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
