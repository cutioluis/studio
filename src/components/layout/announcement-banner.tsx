"use client";

import { ArrowRight } from 'lucide-react';

const WHATSAPP_URL = "https://walink.co/bd3d37";

function getCurrentMonth(): string {
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  return months[new Date().getMonth()];
}

export function AnnouncementBanner() {
  const currentMonth = getCurrentMonth();

  return (
    <div className="relative border-b border-white/[0.08] bg-[#1A1A1E] py-4 md:py-5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4A4A4] to-transparent" />
      <div className="container mx-auto flex max-w-screen-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 sm:px-6 lg:px-8">
        {/* Inscripciones abiertas */}
        <div className="hidden items-center gap-3 sm:flex">
          <span className="h-2 w-2 rounded-full bg-[#EEC7C1] shadow-[0_0_8px_#EEC7C1]" />
          <span className="font-mono text-sm uppercase tracking-[0.3em] md:text-base text-[#EEC7C1]">
            Inscripciones abiertas
          </span>
        </div>

        <span className="hidden h-8 w-px bg-white/[0.12] sm:block" />

        {/* Plazas limitadas + mes automático */}
        <p className="flex items-baseline gap-2 text-[#A0A0A5]">
          <span className="font-serif text-xl italic text-white md:text-2xl">Plazas limitadas</span>
          <span className="text-sm md:text-base">
            hasta finales de{" "}
            <span className="text-lg font-semibold text-white md:text-xl">{currentMonth}</span>
          </span>
        </p>

        <span className="hidden h-8 w-px bg-white/[0.12] md:block" />

        {/* CTA WhatsApp */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 border-b border-[#EEC7C1]/70 pb-0.5 text-sm text-[#EEC7C1] transition-colors hover:border-[#EEC7C1] hover:text-white md:text-base"
        >
          Asegura tu cupo
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
