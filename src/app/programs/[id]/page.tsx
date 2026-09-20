"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronDown, BookOpen } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import temarios from "@/data/temarios.json";

const colorMap = {
  "tecnica-integral-belleza": "from-pink-500 to-purple-500",
  "maestra-artesanal-en-belleza": "from-rose-500 to-pink-500",
  "especialista-unas-salon": "from-fuchsia-500 to-purple-500"
};

interface Modulo {
  numero: number;
  nombre: string;
  temario: string[];
}

interface Programa {
  id: string;
  nombre: string;
  duracion: string;
  areas?: string[];
  modulos: Modulo[];
}

export default function ProgramPage() {
  const params = useParams();
  const router = useRouter();
  const programId = params.id as string;

  const [expandedModulos, setExpandedModulos] = useState<number[]>([0]);
  const [selectedModuloIndex, setSelectedModuloIndex] = useState(0);

  const programa = useMemo(() => {
    const found = temarios.programas.find(p => p.id === programId);
    return found;
  }, [programId]);

  if (!programa) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <Card className="text-center p-8">
          <CardTitle className="text-2xl mb-4">Programa no encontrado</CardTitle>
          <Button onClick={() => router.back()}>
            Volver
          </Button>
        </Card>
      </div>
    );
  }

  const selectedModulo = programa.modulos[selectedModuloIndex];
  const colorGradient = colorMap[programId as keyof typeof colorMap] || "from-accent to-primary";

  const toggleModulo = (index: number) => {
    setExpandedModulos(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSelectModulo = (index: number) => {
    setSelectedModuloIndex(index);
    if (!expandedModulos.includes(index)) {
      setExpandedModulos([...expandedModulos, index]);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-secondary">
        {/* Header */}
        <div className={cn("bg-gradient-to-r", colorGradient, "text-white py-8 md:py-12")}>
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 mb-4"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold">{programa.nombre}</h1>
            <p className="text-white/80 text-lg">Duración: {programa.duracion}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Módulos Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardHeader className={cn("bg-gradient-to-r", colorGradient, "text-white pb-4")}>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Módulos ({programa.modulos.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <div className="space-y-1 p-4">
                    {programa.modulos.map((modulo, idx) => (
                      <div key={modulo.numero}>
                        <button
                          onClick={() => {
                            handleSelectModulo(idx);
                            toggleModulo(idx);
                          }}
                          className={cn(
                            "w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-start justify-between gap-2 group",
                            selectedModuloIndex === idx
                              ? cn("bg-gradient-to-r", colorGradient, "text-white shadow-md")
                              : "hover:bg-accent/10 text-foreground"
                          )}
                        >
                          <div className="flex-1 min-w-0">
                            <p className={cn(
                              "font-semibold text-sm line-clamp-2",
                              selectedModuloIndex === idx ? "text-white" : ""
                            )}>
                              {modulo.nombre}
                            </p>
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 shrink-0 transition-transform duration-200",
                              expandedModulos.includes(idx) ? "rotate-180" : ""
                            )}
                          />
                        </button>

                        {/* Temario expandible */}
                        {expandedModulos.includes(idx) && (
                          <div className="pl-6 pr-4 py-2 space-y-1 border-l-2 border-accent/20 ml-2">
                            {modulo.temario.map((item, itemIdx) => (
                              <div key={itemIdx} className="text-xs text-foreground/60 py-1">
                                {item.replace(/^\t•\t/, "").trim()}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Detalles Módulo */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardHeader className={cn("bg-gradient-to-r", colorGradient, "text-white pb-6")}>
                <div className="space-y-2">
                  <div className="text-sm font-semibold opacity-90">
                    Módulo {selectedModulo.numero}
                  </div>
                  <CardTitle className="text-3xl">{selectedModulo.nombre}</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="pt-8">
                <div className="space-y-6">
                  <div>
                    <h3 className={cn("text-xl font-bold mb-6 bg-gradient-to-r", colorGradient, "bg-clip-text text-transparent")}>
                      Temario Completo
                    </h3>
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
                              isMainHeading ? "font-bold text-foreground text-base" : "text-foreground/70 text-sm",
                              isSubItem && "ml-4"
                            )}
                          >
                            {isSubItem && <span className="text-accent mr-2">•</span>}
                            {cleanItem}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Áreas de Estudio */}
                  {programa.areas && programa.areas.length > 0 && (
                    <div className="border-t pt-8">
                      <h3 className={cn("text-lg font-bold mb-4 bg-gradient-to-r", colorGradient, "bg-clip-text text-transparent")}>
                        Áreas Cubiertas en este Programa
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {programa.areas.map((area, idx) => (
                          <span
                            key={idx}
                            className={cn(
                              "px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r",
                              colorGradient
                            )}
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="border-t pt-8">
                    <Button
                      size="lg"
                      className={cn("w-full bg-gradient-to-r", colorGradient, "text-white hover:opacity-90")}
                      onClick={() => window.open('https://walink.co/bd3d37', '_blank')}
                    >
                      Inscríbete Ahora
                    </Button>
                  </div>
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