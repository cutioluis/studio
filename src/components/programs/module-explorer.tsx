"use client";

import { useState, type ReactNode } from "react";
import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Modulo } from "@/features/catalog/domain/types";

const SUB_ITEM_PREFIX = /^\t•\t/;
const MAIN_HEADING = /^\d+\./;

// Only the module selection needs client state; the rest of the program page renders on the server.
export function ModuleExplorer({ modulos, children }: { modulos: Modulo[]; children?: ReactNode }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedModulo = modulos[selectedIndex];

  return (
    <>
      <div className="lg:col-span-1">
        <Card className="overflow-hidden border border-white/[0.08] bg-card">
          <CardHeader className="border-b border-white/[0.08] pb-4">
            <CardTitle className="flex items-center gap-2 text-base text-white">
              <BookOpen className="h-5 w-5 text-primary" />
              Módulos ({modulos.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="lg:h-[600px]">
              <div className="flex flex-wrap gap-2 p-3 lg:flex-col lg:gap-1.5">
                {modulos.map((modulo, idx) => (
                  <button
                    key={modulo.numero}
                    type="button"
                    aria-pressed={selectedIndex === idx}
                    onClick={() => setSelectedIndex(idx)}
                    className={cn(
                      "rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all duration-200 lg:w-full",
                      selectedIndex === idx
                        ? "border-primary-deep/50 bg-white/[0.06] text-primary"
                        : "border-white/[0.08] text-muted-foreground lg:border-transparent hover:border-white/[0.08] hover:bg-white/[0.03] hover:text-white"
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

      <div className="lg:col-span-2">
        <Card className="overflow-hidden border border-white/[0.08] bg-card">
          <CardHeader className="border-b border-white/[0.08] pb-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Módulo {selectedModulo.numero}
              </div>
              <CardTitle className="text-2xl text-white md:text-3xl">{selectedModulo.nombre}</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="pt-6 sm:pt-8">
            <h3 className="mb-6 text-lg font-bold text-white">Temario Completo</h3>
            <ScrollArea className="lg:h-[400px] lg:pr-4">
              <div className="space-y-3">
                {selectedModulo.temario.map((item, idx) => {
                  const isSubItem = SUB_ITEM_PREFIX.test(item);
                  const text = item.replace(SUB_ITEM_PREFIX, "").trim();
                  const isMainHeading = MAIN_HEADING.test(text);

                  return (
                    <div
                      key={idx}
                      className={cn(
                        isMainHeading ? "mt-6 mb-2 text-base font-bold text-white" : "text-sm text-muted-foreground",
                        isSubItem && "ml-4"
                      )}
                    >
                      {isSubItem && <span className="mr-2 text-primary-deep">•</span>}
                      {text}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            {children}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
